<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Expense;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::orderBy('report_date', 'desc')
            ->paginate(10)
            ->through(fn($report) => [
                'id' => $report->id,
                'report_date' => $report->report_date->format('Y-m-d'),
                'year' => $report->report_date->year,
                'month' => $report->report_date->format('F'),
                'total_income' => $report->total_income,
                'total_expense' => $report->total_expense
            ]);

        return Inertia::render('Reports/Index', [
            'reports' => $reports,
        ]);
    }

    public function generateReports(Request $request)
    {
        $request->validate([
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'months' => 'required|array|min:1',
            'months.*' => 'integer|min:1|max:12',
        ]);

        $year = $request->input('year');
        $months = $request->input('months');

        DB::beginTransaction();

        try {
            foreach ($months as $month) {
                $reportDate = Carbon::createFromDate($year, $month, 1)->startOfMonth();

                $totalIncome = Income::whereYear('purchase_date', $year)
                    ->whereMonth('purchase_date', $month)
                    ->sum('total_amount');

                $totalExpense = Expense::whereYear('restock_date', $year)
                    ->whereMonth('restock_date', $month)
                    ->sum('total_amount');

                Report::updateOrCreate(
                    ['report_date' => $reportDate],
                    [
                        'total_income' => $totalIncome,
                        'total_expense' => $totalExpense,
                    ]
                );
            }

            DB::commit();
            return redirect()->back()->with('success', 'Reports generated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error generating reports: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to generate reports');
        }
    }

    public function show(Report $report)
    {
        return view('reports.show', compact('report'));
    }

    public function calculateAverages(Request $request)
    {
        $request->validate([
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 1),
        ]);

        $year = $request->input('year');

        $reports = Report::whereYear('report_date', $year)->get();

        $annualIncome = $reports->sum('total_income');
        $annualExpense = $reports->sum('total_expense');

        $averageMonthlyIncome = $reports->count() > 0 ? $annualIncome / $reports->count() : 0;
        $averageMonthlyExpense = $reports->count() > 0 ? $annualExpense / $reports->count() : 0;

        $expensePercentage = $annualIncome > 0 ? ($annualExpense / $annualIncome) * 100 : 0;

        return response()->json([
            'annualIncome' => round($annualIncome, 2),
            'annualExpense' => round($annualExpense, 2),
            'averageMonthlyIncome' => round($averageMonthlyIncome, 2),
            'averageMonthlyExpense' => round($averageMonthlyExpense, 2),
            'expensePercentage' => round($expensePercentage, 2),
            'year' => $year,
        ]);
    }

    public function destroy(Report $report)
    {
        $report->delete();
        return redirect()->route('reports.index')->with('success', 'Report deleted successfully');
    }
}
