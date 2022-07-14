<?php

namespace App\Http\Controllers;

use App\Models\IntePreke;
use App\Models\InteReturn;
use Illuminate\Http\Request;

class InteReturnController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $file_liko = "app/INTE/stock_quant.csv";
        $file_export = "app/INTE/EXPORT.txt";

        //LIKUCIAI
        $flag = true;
        $likutis = array();
        if (($handle = fopen(storage_path($file_liko), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");

                if($val[6] == "INTE" || $val[6] == "INLV" || $val[6] == "INEE"){
                    $likutis[$val[6]][$val[0]]['kodas'] = $val[0];
                    $kiek = explode(",", $val[4]);
                    $kiek = $kiek[0];
                    if(!array_key_exists('kiekis', $likutis[$val[6]][$val[0]])){
                        $likutis[$val[6]][$val[0]]['kiekis'] = $kiek;
                    }else{
                        $likutis[$val[6]][$val[0]]['kiekis'] += $kiek;
                    }
                }
            }
        }

        //EXPORT
        $export = array();
        if (($handle = fopen(storage_path($file_export), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");

                $export[$val[0]]['kodas'] = $val[0];

                if(!array_key_exists('kiekis', $export[$val[0]])){
                    $export[$val[0]]['kiekis'] = (int) $val[18];
                }else{
                    $export[$val[0]]['kiekis'] += $val[18];
                }
            }
        }

        //Sulyginti duomenis, sugeneruoti nauja masyva
        $list = array();
        foreach($export as $val){
            if(array_key_exists($val['kodas'], $likutis["INTE"])){
                if($val['kiekis'] > $likutis["INTE"][$val['kodas']]['kiekis']){
                    $list[$val['kodas']]['kodas'] = $val['kodas'];
                    $list[$val['kodas']]['perkelti'] = $val['kiekis'];
                    
                    $list[$val['kodas']]['INTE_old'] = (int) $likutis["INTE"][$val['kodas']]['kiekis'];

                    if(array_key_exists($val['kodas'], $likutis["INLV"])){
                        $list[$val['kodas']]['INLV_old'] = (int) $likutis["INLV"][$val['kodas']]['kiekis'];
                    }
                    if(array_key_exists($val['kodas'], $likutis["INEE"])){
                        $list[$val['kodas']]['INEE_old'] = (int) $likutis["INEE"][$val['kodas']]['kiekis'];
                    }
                }
            }else{
                $list[$val['kodas']]['kodas'] = $val['kodas'];
                $list[$val['kodas']]['perkelti'] = $val['kiekis'];
                if(array_key_exists($val['kodas'], $likutis["INLV"])){
                    $list[$val['kodas']]['INLV_old'] = (int) $likutis["INLV"][$val['kodas']]['kiekis'];
                }
                if(array_key_exists($val['kodas'], $likutis["INEE"])){
                    $list[$val['kodas']]['INEE_old'] = (int) $likutis["INEE"][$val['kodas']]['kiekis'];
                }
            }
        }

        //Sukurti masyva perkelimui ir lentelei
        $to = array();
        $sarasas = array();
        //$o = array();
        foreach($list as $key => $row){
            $ok = 1;
            $sarasas[$key] = $row;
            //kartais neturi reiksmes, reikia priskirti 0
            if(!array_key_exists('INTE_old', $row)){ $INTE_old = 0;}else{ $INTE_old = $row['INTE_old']; }
            if(!array_key_exists('INLV_old', $row)){ $INLV_old = 0;}else{ $INLV_old = $row['INLV_old']; }
            if(!array_key_exists('INEE_old', $row)){ $INEE_old = 0;}else{ $INEE_old = $row['INEE_old']; }

            $sarasas[$key]['INTE_old'] = $INTE_old;
            $sarasas[$key]['INLV_old'] = $INLV_old;
            $sarasas[$key]['INEE_old'] = $INEE_old;

            $sarasas[$key]['INTE_new'] = $INTE_old;
            $sarasas[$key]['INLV_new'] = $INLV_old;
            $sarasas[$key]['INEE_new'] = $INEE_old;

            $max = max($INLV_old, $INEE_old);

            if($INTE_old > 0){
                $reikia = $row['perkelti'] - $INTE_old;
                $sarasas[$key]['INTE_new'] = $sarasas[$key]['INTE_new'] - $INTE_old;
                $sarasas[$key]['INTE_liko'] = $reikia;
            }else{
                $reikia = $row['perkelti'];
                $sarasas[$key]['INTE_liko'] = $reikia;
            }
            //diagnostika
            //$o[$key] = $ok;

            if($max == $INEE_old && $ok == 1){
                $ok = -66; //$o[$key] = $ok;
                if($INEE_old >= $reikia){
                    $sarasas[$key]['INEE_new'] = $sarasas[$key]['INEE_new'] - $reikia;
                    $sarasas[$key]['INEE_liko'] = 0;
                    $kiek_ee = $reikia;
                    $reikia = 0;

                    $to[$key."INEE-INTE"]['preke'] = $row['kodas'];
                    $to[$key."INEE-INTE"]['nr'] = "INEE-INTE";
                    $to[$key."INEE-INTE"]['kiekis'] = $kiek_ee;
                    $to[$key."INEE-INTE"]['sand_is'] = "INEE";
                    $to[$key."INEE-INTE"]['sand_i'] = "INTE";
                }else if($INEE_old > 0){
                    //paimam visus is EE
                    $sarasas[$key]['INEE_new'] = $sarasas[$key]['INEE_new'] - $INEE_old; 
                    $kiek_ee = $INEE_old;
                    $reikia = $reikia - $INEE_old; 
                    $sarasas[$key]['INEE_liko'] = $reikia;

                    $to[$key."INEE-INTE"]['preke'] = $row['kodas'];
                    $to[$key."INEE-INTE"]['nr'] = "INEE-INTE";
                    $to[$key."INEE-INTE"]['kiekis'] = $kiek_ee;
                    $to[$key."INEE-INTE"]['sand_is'] = "INEE";
                    $to[$key."INEE-INTE"]['sand_i'] = "INTE";

                    //jei neuztenka EE, imam dar is LV
                    if($INLV_old >= $reikia){
                        $sarasas[$key]['INLV_new'] = $sarasas[$key]['INLV_new'] - $reikia;
                        $kiek_lv = $reikia;

                        $to[$key."INLV-INTE"]['preke'] = $row['kodas'];
                        $to[$key."INLV-INTE"]['nr'] = "INLV-INTE";
                        $to[$key."INLV-INTE"]['kiekis'] = $kiek_lv;
                        $to[$key."INLV-INTE"]['sand_is'] = "INLV";
                        $to[$key."INLV-INTE"]['sand_i'] = "INTE";
                    }
                }
            }          

            if($max == $INLV_old && $ok == 1){
                $ok = -99; //$o[$key] = $ok;
                if($INLV_old >= $reikia){
                    $sarasas[$key]['INLV_new'] = $sarasas[$key]['INLV_new'] - $reikia;
                    $sarasas[$key]['INLV_liko'] = 0;
                    $kiek_lv = $reikia;
                    $reikia = 0;

                    $to[$key."INLV-INTE"]['preke'] = $row['kodas'];
                    $to[$key."INLV-INTE"]['nr'] = "INLV-INTE";
                    $to[$key."INLV-INTE"]['kiekis'] = $kiek_lv;
                    $to[$key."INLV-INTE"]['sand_is'] = "INLV";
                    $to[$key."INLV-INTE"]['sand_i'] = "INTE";
                }else if($INLV_old > 0){
                    $sarasas[$key]['INLV_new'] = $sarasas[$key]['INLV_new'] - $INLV_old; 
                    $kiek_lv = $INLV_old;
                    $reikia = $reikia - $INLV_old; 
                    $sarasas[$key]['INLV_liko'] = $reikia;

                    $to[$key."INLV-INTE"]['preke'] = $row['kodas'];
                    $to[$key."INLV-INTE"]['nr'] = "INLV-INTE";
                    $to[$key."INLV-INTE"]['kiekis'] = $kiek_lv;
                    $to[$key."INLV-INTE"]['sand_is'] = "INLV";
                    $to[$key."INLV-INTE"]['sand_i'] = "INTE";

                    if($INEE_old >= $reikia){
                        $sarasas[$key]['INEE_new'] = $sarasas[$key]['INEE_new'] - $reikia; 
                        $kiek_ee = $reikia;

                        $to[$key."INEE-INTE"]['preke'] = $row['kodas'];
                        $to[$key."INEE-INTE"]['nr'] = "INEE-INTE";
                        $to[$key."INEE-INTE"]['kiekis'] = $kiek_ee;
                        $to[$key."INEE-INTE"]['sand_is'] = "INEE";
                        $to[$key."INEE-INTE"]['sand_i'] = "INTE";
                    }
                }

            }

        }

        return response()->json([
            'status' => true,
            'sarasas' => array_values($sarasas),
            'csv' => array_values($to),
            //'ok' => $o
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
     * @param  \App\Models\InteReturn  $inteReturn
     * @return \Illuminate\Http\Response
     */
    public function show(InteReturn $inteReturn)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\InteReturn  $inteReturn
     * @return \Illuminate\Http\Response
     */
    public function edit(InteReturn $inteReturn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InteReturn  $inteReturn
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InteReturn $inteReturn)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InteReturn  $inteReturn
     * @return \Illuminate\Http\Response
     */
    public function destroy(InteReturn $inteReturn)
    {
        //
    }
}
