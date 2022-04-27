<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;

class ExcelImport implements ToModel
{
    public function model(array $row)
    {
        return $row[0];
    }
}
