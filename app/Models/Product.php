<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    public function incomes()
    {
        return $this->hasMany(Income::class);
    }

    public function decreaseStock($amount)
    {
        if ($this->quantity < $amount) {
            throw new \Exception('Insufficient stock for this product.');
        }
        $this->decrement('quantity', $amount);
        $this->save();
    }

    public function increaseStock($amount)
    {
        $this->increment('quantity', $amount);
        $this->save();
    }
}
