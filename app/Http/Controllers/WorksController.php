<?php

namespace App\Http\Controllers;

use App\Models\Works;
use Illuminate\Http\Request;

class WorksController extends Controller
{
    public function tofloat($num) {
        $dotPos = strrpos($num, '.');
        $commaPos = strrpos($num, ',');
        $sep = (($dotPos > $commaPos) && $dotPos) ? $dotPos : 
            ((($commaPos > $dotPos) && $commaPos) ? $commaPos : false);      
        if (!$sep) {
            return floatval(preg_replace("/[^0-9]/", "", $num));
        } 
        return floatval(
            preg_replace("/[^0-9]/", "", substr($num, 0, $sep)) . '.' .
            preg_replace("/[^0-9]/", "", substr($num, $sep+1, strlen($num)))
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $failas = "works.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $file = $key[0];
        //$file2 = $key[1];

        $dir  = "app/Works/".$file;

        $works = array();
        $flag = true;
        if (($handle = fopen(storage_path($dir), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                if($val[6] != "INTE" && $val[6] != "INLV" && $val[6] != "INEE" && $val[6] != "PIGU" &&
                    $val[6] != "TELSIAI" && $val[6] != "99EE" && $val[6] != "99LT" && $val[6] != "99LV"){
                        
                    $works[$val[6]]['pardavejos'][$val[5]]['pardaveja'] = $val[5];
                    $works[$val[6]]['sandelis'] = $val[6];
                    if($val[12] != "R"){
                        if(isset($works[$val[6]]['pardavejos'][$val[5]]['suma'])){
                            $works[$val[6]]['pardavejos'][$val[5]]['suma'] += $this->tofloat($val[15]);
                        }else{
                            $works[$val[6]]['pardavejos'][$val[5]]['suma'] = $this->tofloat($val[15]);
                        }
                    }else{
                        if(isset($works[$val[6]]['pardavejos'][$val[5]]['graza'])){
                            $works[$val[6]]['pardavejos'][$val[5]]['graza'] += $this->tofloat($val[15]);
                        }else{
                            $works[$val[6]]['pardavejos'][$val[5]]['graza'] = $this->tofloat($val[15]);
                        }
                    }
                }
            }
        }

        $works = array_values($works);

        return response()->json([
            'status' => true,
            'works' => $works
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
     * @param  \App\Models\Works  $works
     * @return \Illuminate\Http\Response
     */
    public function show(Works $works)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Works  $works
     * @return \Illuminate\Http\Response
     */
    public function edit(Works $works)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Works  $works
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Works $works)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Works  $works
     * @return \Illuminate\Http\Response
     */
    public function destroy(Works $works)
    {
        //
    }
}
