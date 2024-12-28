<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Expense;
use App\Models\Income;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $data = [
            'totalIncomeThisMonth' => Income::whereYear('purchase_date', Carbon::now()->year)
                ->whereMonth('purchase_date', Carbon::now()->month)
                ->sum('total_amount'),
            'totalExpenseThisMonth' => Expense::whereYear('restock_date', Carbon::now()->year)
                ->whereMonth('restock_date', Carbon::now()->month)
                ->sum('total_amount'),
            'topProducts' => Product::withCount('incomes')
                ->orderByDesc('incomes_count')
                ->take(5)
                ->get(),
            'topCustomers' => Customer::select('customers.id', 'customers.name', DB::raw('SUM(incomes.total_amount) as total_spent'))
                ->join('incomes', 'customers.id', '=', 'incomes.customer_id')
                ->groupBy('customers.id', 'customers.name')
                ->orderByDesc('total_spent')
                ->take(5)
                ->get(),
            'monthlyIncome' => Income::selectRaw('DATE_FORMAT(purchase_date, "%Y-%m") as month, SUM(total_amount) as total')
                ->groupBy('month')
                ->orderBy('month')
                ->get(),
            'monthlyExpense' => Expense::selectRaw('DATE_FORMAT(restock_date, "%Y-%m") as month, SUM(total_amount) as total')
                ->groupBy('month')
                ->orderBy('month')
                ->get(),
            'productQuantities' => Product::select('name', 'quantity')
                ->orderBy('quantity', 'asc')
                ->take(5)
                ->get(),
            'recentTransactions' => Income::with('product', 'customer')
                ->orderByDesc('purchase_date')
                ->take(10)
                ->get(),
        ];

        return Inertia::render('Dashboard', $data);
    }
}
