<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SarasasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $failas_inte = "app/CSV_DATA/INTE.csv";

        $inte = array();
        $flag = true;
        if (($handle = fopen(storage_path($failas_inte), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                if($flag) { $flag = false; continue; }
                $value = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");

                $inte[$value[0]] = $value[0];
            }
        }
        $failas = "app/CSV_DATA/Perkainavimas_vasara.csv";
        $arr = array();

        if (($handle = fopen(storage_path($failas), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                $value = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");

                if(array_key_exists($value[0], $inte)){
                    $a = explode("-", $value[0]);
                    if(count($a) >= 4){$ne = $a[0]."-".$a[1]."-".$a[2]."-";}
                    if(count($a) == 3){$ne = $a[0]."-".$a[1]."-";}
                    if(count($a) == 2){$ne = $a[0]."-";}
                    //turi veikti tik su BROK
                    if(count($a) == 1){$ne = preg_replace('#[0-9 ]*#', '', $a[0]);}
                    $arr[$ne] = array('kodas' => $ne, 'kaina' => $value[1]);
                }             
            }
        }

        $arr = array_values($arr);

        return response()->json([
            'status' => true,
            'array' => $arr,
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
