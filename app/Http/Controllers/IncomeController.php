<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $incomes = Income::with('product', 'customer')->get();
        return Inertia::render('Incomes/Index', [
            'incomes' => $incomes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();
        $customers = Customer::all();
        return Inertia::render('Incomes/Create', [
            'products' => $products,
            'customers' => $customers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'customer_id' => 'required|exists:customers,id',
            'quantity' => 'required|numeric',
            'price_per_item' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'purchase_date' => 'required|date',
        ]);

        Income::create($validatedData);

        return redirect()->route('incomes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Income $income)
    {
        $income->load('product', 'customer');
        return Inertia::render('Incomes/Show', [
            'income' => $income,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Income $income)
    {
        $products = Product::all();
        $customers = Customer::all();
        $income->load('product', 'customer');
        return Inertia::render('Incomes/Edit', [
            'income' => $income,
            'products' => $products,
            'customers' => $customers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Income $income)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'customer_id' => 'required|exists:customers,id',
            'quantity' => 'required|numeric',
            'price_per_item' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'purchase_date' => 'required|date',
        ]);

        Income::where('id', $income->id)->update($validatedData);

        return redirect()->route('incomes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Income $income)
    {
        Income::destroy($income->id);
        return redirect()->route('incomes.index');
    }
}
