<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Expense;
use App\Models\Report;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::all();
        return view('reports.index', compact('reports'));
    }

    public function generateReports()
    {
        $currentYear = Carbon::now()->year;

        for ($month = 1; $month <= 12; $month++) {
            $totalIncome = Income::whereYear('purchase_date', $currentYear)
                ->whereMonth('purchase_date', $month)
                ->sum('total_amount');

            $totalExpense = Expense::whereYear('restock_date', $currentYear)
                ->whereMonth('restock_date', $month)
                ->sum('total_amount');

            $report = Report::where('year', $currentYear)
                ->where('month', $month)
                ->first();

            if ($report) {
                $report->total_income = $totalIncome;
                $report->total_expense = $totalExpense;
                $report->save();
            } else {
                Report::create([
                    'year' => $currentYear,
                    'month' => $month,
                    'total_income' => $totalIncome,
                    'total_expense' => $totalExpense,
                ]);
            }
        }

        return redirect()->route('reports.index');
    }

    public function show(Report $report)
    {
        return view('reports.show', compact('report'));
    }

    public function calculateAverages()
    {
        $reports = Report::all();

        $totalIncome = $reports->sum('total_income');
        $totalExpense = $reports->sum('total_expense');
        $numReports = $reports->count();

        $averageIncome = $totalIncome / $numReports;
        $averageExpense = $totalExpense / $numReports;

        return view('reports.averages', [
            'averageIncome' => $averageIncome,
            'averageExpense' => $averageExpense,
        ]);
    }
}
