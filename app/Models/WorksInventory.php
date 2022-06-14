<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorksInventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'sandelis', 
        'nuo',
        'iki',
        'suma'
    ];    
}
