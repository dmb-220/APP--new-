<?php

namespace App\Exports;

use App\Models\Dalinti;
use Maatwebsite\Excel\Concerns\FromCollection;

class DalintiXLS implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Dalinti::all();
    }
}
