<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $incomes = Income::query()
            ->with('product', 'customer')
            ->orderBy('purchase_date', 'desc')
            ->paginate(10)
            ->through(function ($income) {
                return [
                    'id' => $income->id,
                    'product' => $income->product->name,
                    'customer' => $income->customer->name,
                    'quantity' => $income->quantity,
                    'price_per_item' => $income->price_per_item,
                    'total_amount' => $income->total_amount,
                    'purchase_date' => $income->purchase_date
                ];
            });

        return Inertia::render('Incomes/Index', [
            'incomes' => $incomes,
            'filters' => FacadesRequest::all('search', 'trashed'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Incomes/Create', $this->getFormData());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'customer_id' => 'required|exists:customers,id',
            'quantity' => 'required|integer|min:1',
            'price_per_item' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'purchase_date' => 'required|date',
        ]);

        try {
            DB::beginTransaction();

            $product = Product::findOrFail($validated['product_id']);

            if ($product->quantity < $validated['quantity']) {
                throw new \Exception("Insufficient stock. Available: {$product->quantity}, Requested: {$validated['quantity']}");
            }

            Income::create($validated);

            $product->decreaseStock($validated['quantity']);

            DB::commit();

            return redirect()->route('incomes.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()])->withInput();
        }
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
        $income->load('product:id,name,price', 'customer:id,name');

        return Inertia::render('Incomes/Edit', array_merge(
            ['income' => $income],
            $this->getFormData()
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Income $income)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
            'price_per_item' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'purchase_date' => 'required|date',
        ]);

        try {
            DB::beginTransaction();

            $product = $income->product;
            $oldQuantity = $income->quantity;
            $newQuantity = $validated['quantity'];

            if ($newQuantity > $oldQuantity) {
                $additionalQuantity = $newQuantity - $oldQuantity;
                if ($product->quantity < $additionalQuantity) {
                    throw new \Exception("Insufficient stock. Available: {$product->quantity}, Additional Requested: {$additionalQuantity}");
                }
                $product->decreaseStock($additionalQuantity);
            } elseif ($newQuantity < $oldQuantity) {
                $returnedQuantity = $oldQuantity - $newQuantity;
                $product->increaseStock($returnedQuantity);
            }

            $income->update($validated);

            DB::commit();

            return redirect()->route('incomes.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Income $income)
    {
        Income::destroy($income->id);
        return redirect()->route('incomes.index');
    }

    private function getFormData()
    {
        return [
            'products' => Product::select('id', 'name', 'price')->get(),
            'customers' => Customer::select('id', 'name')->get(),
        ];
    }
}
