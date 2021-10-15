<?php

namespace App\Http\Controllers;

use App\EEList;
use App\Likutis;
use Illuminate\Http\Request;

class EEListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $nr = time();

        $likutis = array();
        $list = array();

        $re = Likutis::query()
            //->where('sandelis', 'INTE')
            //->where('salis', 2)
            ->whereIn('salis', [1, 2])
            ->get();

       

        foreach ( $re as $value ) {
            $likutis[$value['preke']] = $value;
        }
        
        //$failas = "GRA-LV-GAM.csv";
        $failas = "GRA-LV-PIRK.csv";

        $directory  = "app/EE/";
        $failas = $directory.$failas;

        $flag = true;
        if (($handle = fopen(storage_path($failas), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                //if($val[6] != "MAIS-KUR1"){
                //var_dump($val);
                $list[$val[0]]['blankas'] = "GR-".$nr;
                $list[$val[0]]['preke'] = $val[0];
                if(array_key_exists('kiekis', $list[$val[0]])){
                    $list[$val[0]]['kiekis'] += $val[1];
                }else{
                    $list[$val[0]]['kiekis'] = $val[1];
                    }
                if(array_key_exists($val[0], $likutis)){
                    $list[$val[0]]['kaina'] = $likutis[$val[0]]['kaina'];
                    $list[$val[0]]['savikaina'] = $likutis[$val[0]]['savikaina'];
                }else{
                    $list[$val[0]]['kaina'] = 'Nera'; 
                    $list[$val[0]]['savikaina'] = 'Nera'; 
                }
                    //$list[$val[0]]['procentas'] = '70';
                    $list[$val[0]]['procentas'] = '50';
                //}
            }
            fclose($handle);
            }

            $list = array_values($list);

        return response()->json([
            'status' => true,
            'list' => $list,
            //'likutis' => $likutis
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
     * @param  \App\EEList  $eEList
     * @return \Illuminate\Http\Response
     */
    public function show(EEList $eEList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\EEList  $eEList
     * @return \Illuminate\Http\Response
     */
    public function edit(EEList $eEList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\EEList  $eEList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EEList $eEList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\EEList  $eEList
     * @return \Illuminate\Http\Response
     */
    public function destroy(EEList $eEList)
    {
        //
    }
}
