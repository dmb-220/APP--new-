<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ExcelImport implements ToCollection, SkipsEmptyRows, WithHeadingRow, WithValidation
{
    use Importable;

    public function collection(Collection $row)
    {
        return $row;
    }
    
    public function rules(): array
    {
        return [
                'required',
        ];
    }

}
