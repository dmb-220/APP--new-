<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Imports\ExcelImport;
use Maatwebsite\Excel\Facades\Excel;

class ExcelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $failas = 'E:\wamp64\www\APP\storage\app\XLSX\excel.xlsx';

        //$array = Excel::toArray(new ExcelImport, storage_path('app\XLSX\excel.xlsx'));
        
        $collection = Excel::toCollection(new ExcelImport, storage_path('app\XLSX\excel.xlsx'));
        $arr = array();
        $kodai = array();
        $sk = 0;
        
        foreach($collection[1] as $val){
            if($val[0] == "Kodas" && $val[1]){
                $sk++;
                for($i = 1; $i < 10; $i++){
                    //if($val[$i]){
                        $kodai[$sk]["NR-".$i]['name'] = $val[$i];
                        $kodai[$sk]["NR-".$i]['kiek'] = 0;
                    //}
                }
            }

            if($val[0] != "Gaminys" && $val[0] != "Kaina" && $val[0] != "Viso:" && $val[0] != null && $val[0] != "Kodas" &&
            $val[0] != "Suma:" && $val[0] != "Suma LT" && $val[0] != "Suma LV" && $val[0] != "Suma ES" && $val[0] != "Balansas:" && $val[0] != "didmena"){
                //$arr[$val[0]]["SAND"] =  $val[0];
                $arr[$val[0]][$sk]['VISO'] = 0;
                for($i = 1; $i < 10; $i++){
                    if($kodai[$sk]["NR-".$i]['name']){
                        $name = $kodai[$sk]["NR-".$i]['name'];
                        $arr[$val[0]][$sk][$name]['name'] = $name;
                        $arr[$val[0]][$sk][$name]['kiek'] = $val[$i] ? $val[$i] : 0;
                        $arr[$val[0]][$sk]['VISO'] += $val[$i] ? (int)$val[$i] : 0;
                   }
                }
            }
        }

        return response()->json([
            'status' => true,
            'sheets' => $collection[1],
            'data' => $arr,
            'kodai' => $kodai
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\excel  $excel
     * @return \Illuminate\Http\Response
     */
    public function show(excel $excel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\excel  $excel
     * @return \Illuminate\Http\Response
     */
    public function edit(excel $excel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\excel  $excel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, excel $excel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\excel  $excel
     * @return \Illuminate\Http\Response
     */
    public function destroy(excel $excel)
    {
        //
    }
}
