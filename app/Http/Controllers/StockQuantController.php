<?php

namespace App\Http\Controllers;

use App\Models\StockQuant;
use App\Models\Likutis;

use Illuminate\Http\Request;

class StockQuantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //ateiciai, gal reikes panaudoti
        $gam = 1; $pirk = 0; $paieska_big = 1;

        $min = 25;

        $tags = array("LMD-", "LME-", "LMB-", "LMC-", "LMC-");

        $likutis = Likutis::query()
            ->where(function ($query) use($tags, $paieska_big) {
                for ($i = 0; $i < count($tags); $i++){
                    if($paieska_big){
                        $query->orwhere('preke', 'like', "%{$tags[$i]}%");
                    }else{
                        $query->orwhere('preke', 'like', "{$tags[$i]}%");
                    }
                }   
            })  
            //isimam ko nereikia perkelti, pagal grupiu pavadinimus 
            //->whereNotIn('pavadinimas', ['Med. švarkas', 'Med. kelnės', 'Kelnaitės', 'Liemenėlė'])
            ->when(!$gam, function ($q) {
                return $q->where('registras', "GAM"); })
            ->when(!$pirk, function ($q) {
                return $q->where('registras', "PIRK"); })
            ->get();

        //sandeliu sarasas kuriu neitraukti
        $sandeliai = array("BROK", "ESTI", "4444", "TELSIAI", "1111", "SAND", "ZILT", "GALA");

        $kodai = array(); $count = array();
        foreach ( $likutis as $value ) {    
            if(!in_array($value['sandelis'], $sandeliai)){
                //sudedam pagal kodus
                $kodai[$value['preke']][] = $value;

                //sukaiciuojam kiek is viso likuciu
                if(!array_key_exists($value['preke'], $count)){
                    $count[$value['preke']] = $value['kiekis'];
                }else{
                    $count[$value['preke']] += $value['kiekis'];
                }
            }
        }

        $sand = array();
        foreach($kodai as $key => $val){
            //print_r($val);
            foreach($val as $row){
                //sudedam pagal sandelius
                if($count[$key] <= $min){
                    $sand[$row['salis']][$row['sandelis']][$key] = $row;
                }
            }
        }

        return response()->json([
            'status' => true,
            'settings' => array('min' => $min, 'paieska_big' => $paieska_big, 'tags' => $tags),
            'kiekis' => $count,
            'sarasas' => $sand
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
     * @param  \App\Models\StockQuant  $stockQuant
     * @return \Illuminate\Http\Response
     */
    public function show(StockQuant $stockQuant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StockQuant  $stockQuant
     * @return \Illuminate\Http\Response
     */
    public function edit(StockQuant $stockQuant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StockQuant  $stockQuant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StockQuant $stockQuant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StockQuant  $stockQuant
     * @return \Illuminate\Http\Response
     */
    public function destroy(StockQuant $stockQuant)
    {
        //
    }
}
