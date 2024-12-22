<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::query()
            ->with('product', 'supplier')
            ->orderBy('restock_date', 'desc')
            ->paginate(10)
            ->through(function ($expense) {
                return [
                    'id' => $expense->id,
                    'supplier' => $expense->supplier->company_name,
                    'product' => $expense->product->name,
                    'quantity' => $expense->quantity,
                    'price_per_item' => $expense->price_per_item,
                    'total_amount' => $expense->total_amount,
                    'restock_date' => $expense->restock_date,
                ];
            });

        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses,
            'filters' => FacadesRequest::all('search', 'trashed'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Expenses/Create', $this->getFormData());
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

        try {
            DB::beginTransaction();

            $product = Product::findOrFail($validatedData['product_id']);

            Expense::create($validatedData);

            $product->increaseStock($validatedData['quantity']);

            DB::commit();

            return redirect()->route('expenses.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()])->withInput();
        }
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
        $expense->load('product:id,name,price', 'supplier:id,company_name');
        return Inertia::render('Expenses/Edit', array_merge(
            ['expense' => $expense],
            $this->getFormData()
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        $validatedData = $request->validate([
            'quantity' => 'required|numeric',
            'price_per_item' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'restock_date' => 'required|date',
        ]);

        try {
            DB::beginTransaction();

            $product = $expense->product;
            $oldQuantity = $expense->quantity;
            $newQuantity = $validatedData['quantity'];

            $expense->update($validatedData);

            if ($newQuantity > $oldQuantity) {
                $additionalQuantity = $newQuantity - $oldQuantity;
                $product->increaseStock($additionalQuantity);
            } else if ($newQuantity < $oldQuantity) {
                $reduceQuantity = $oldQuantity - $newQuantity;
                $product->decreaseStock($reduceQuantity);
            }

            DB::commit();

            return redirect()->route('expenses.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        Expense::destroy($expense->id);

        return redirect()->route('expenses.index');
    }

    public function getFormData()
    {
        return [
            'products' => Product::select('id', 'name', 'price')->get(),
            'suppliers' => Supplier::select('id', 'company_name')->get(),
        ];
    }
}
