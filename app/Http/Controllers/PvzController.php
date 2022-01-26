<?php

namespace App\Http\Controllers;

use App\Models\Pvz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PvzController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list = array();
        $prekes = array();
        $pr = array();

        $failas_csv = "VISI.csv";
        $directory  = "app/CSV_DATA/";
        $failas = $directory.$failas_csv;

        $flag = true;
        if (($handle = fopen(storage_path($failas), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");

                //perkelimu sarasas
                //if($val[4] != "INTE" && $val[4] != "INLV" && $val[4] != "BROK" && $val[4] != "ESTI" && $val[4] != "99EE" && $val[4] != "SAND" && $val[4] != "ZILT" && $val[4] != "99LT"){
                    //$list[$val[3]][] = $val;
                //}

                //prekiu sarasas pagal blanko nr
                $kiek = explode(",", $val[7]);
                $kiek = $kiek[0];

                $prekes[$val[6]]/*['nr']*/[] = $val[3]." - ".$kiek;
                $pr[$val[3]]/*['nr']*/[] = $val;
                //if(array_key_exists("kiek",  $prekes[$val[6]])){ 
                    ///$prekes[$val[6]]['kiek'] += $kiek;
                //}else{ $prekes[$val[6]]['kiek'] = $kiek; } 
                
            }
            fclose($handle);
            }

            $failas_csv = "ATSARGU_OP.csv";
            $directory  = "app/CSV_DATA/";
            $failas = $directory.$failas_csv;

            $flag = true;
                if (($handle = fopen(storage_path($failas), "r")) !== FALSE) {
                while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                    if($flag) { $flag = false; continue; }
                    $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                    //$kiek = explode(",", $val[4]);
                    //$kiek = $kiek[0];

                        //'preke' => $val[0],
                        //'pavadinimas' => $val[1],
                        //'kaina' => floatval(str_replace(",", ".", $val[3])),
                        //'kiekis' => $kiek,
                        //'suma' => floatval(str_replace(",", ".", $val[5])),
                        //'sandelis' => $val[6],
                        //'registras' => $val[7],
                        //'savikaina' => floatval(str_replace(",", ".", $val[8])),
                    //if(array_key_exists($val[0],  $prekes)){
                        $list[$val[6]] = $prekes[$val[6]];

                        
                    //}
                }
                fclose($handle);
                }

            ksort($list);
            ksort($prekes);
            //$list = array_values($list);

        return response()->json([
            'status' => true,
            'list' => $list,
            'prekes' => $pr
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
     * @param  \App\Pvz  $pvz
     * @return \Illuminate\Http\Response
     */
    public function show(Pvz $pvz)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Pvz  $pvz
     * @return \Illuminate\Http\Response
     */
    public function edit(Pvz $pvz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Pvz  $pvz
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pvz $pvz)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Pvz  $pvz
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pvz $pvz)
    {
        //
    }
}
