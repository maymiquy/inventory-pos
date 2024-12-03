<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::with('product', 'supplier')->get();
        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();
        $suppliers = Supplier::all();
        return Inertia::render('Expenses/Create', [
            'products' => $products,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'quantity' => 'required|numeric',
            'price_per_item' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'restock_date' => 'required|date',
        ]);

        Expense::create($validatedData);

        return redirect()->route('expenses.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        $expense->load('product', 'supplier');
        return Inertia::render('Expenses/Show', [
            'expense' => $expense,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        $products = Product::all();
        $suppliers = Supplier::all();
        $expense->load('product', 'supplier');
        return Inertia::render('Expenses/Edit', [
            'expense' => $expense,
            'products' => $products,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'quantity' => 'required|numeric',
            'price_per_item' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'restock_date' => 'required|date',
        ]);

        Expense::where('id', $expense->id)->update($validatedData);

        return redirect()->route('expenses.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        Expense::destroy($expense->id);

        return redirect()->route('expenses.index');
    }
}
