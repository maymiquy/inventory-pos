<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = ['report_date', 'total_income', 'total_expense'];

    protected $casts = [
        'report_date' => 'date',
    ];
}
