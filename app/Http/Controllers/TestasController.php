<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Pardavimai;
use App\Models\Likutis;
use App\Models\Atsargos;
use App\Models\Pirkimai;

class TestasController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $failas = "data.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("|||", $key);
        $dt = explode(" --- ", $key[0]);

        $warehouse  = array(
            'LT' => array("MINS", "TELS", "MADA", "MARI", "MOLA", "NORF", "BIGA", "BABI", "UKME", "MANT", "VISA", "KEDA","AREN", "MAXI", "PANE", "KREV", "MAZE", "TAIK", "SAUL", "TAUB", "UTEN", "INTE", "INLV", "INEE"),
            'LV' => array("DOLE", "KULD", "BRIV", "DITO", "MATI", "OGRE", "TAL2", "TUKU", "VALD", "VENT", "AIZK", "DAUG", "LIMB", "MELN", "SALD", "VALM", "BALV", "CESI", "DOBE", "GOBA", "JEKA", "LIEP", "SIGU", "MADO"),
            'EE' => array("Johvi", "Mustamäe", "Narva", "Rakvere", "Sopruse", "Võru 55 Tartu", "Ümera","Eden", "Haapsalu", "Kopli", "Parnu", "Riia Parnu")
        );
        
        foreach($warehouse as $k => $value){
            if($k == "EE"){$k = 'viso';}
            $res[$k] = Pardavimai::select(
                DB::raw("(sum(kiekis)) as kiekis"),
                DB::raw("(DATE_FORMAT(dok_data, '%d-%m-%Y')) as data"))
                ->where('kiekis', ">", 0)
                ->when($k != 'viso', function ($q) use ($value) {
                    return $q->whereIn('sandelis', $value); })
                ->when($k == 'viso', function ($q) use ($warehouse) {
                    return $q->whereIn('sandelis', array_merge($warehouse['LT'], $warehouse['LV'])); })
                ->whereIn('registras',['GAM', 'PIRK'])
                ->orderBy('dok_data')
                ->groupBy(DB::raw("DATE_FORMAT(dok_data, '%d-%m-%Y')"))
                ->get();
        }

        $inte = array("INTE", "INLV", "INEE");
        foreach($inte as $val){
            $in[$val] = Pardavimai::select(
                DB::raw("(sum(kiekis)) as kiekis"),
                DB::raw("(DATE_FORMAT(dok_data, '%d-%m-%Y')) as data"))
                ->where('sandelis', $val)
                ->where('kiekis', ">", 0)
                ->whereIn('registras',['GAM', 'PIRK'])
                ->orderBy('dok_data')
                ->groupBy(DB::raw("DATE_FORMAT(dok_data, '%d-%m-%Y')"))
                ->get();
        }

        //pardavimu skai2ius pagal prekiu grupes
        foreach($warehouse as $k => $value){
            $buy[$k] = Pardavimai::select(
                "grupe",
                DB::raw("(sum(kiekis)) as kiekis"))
                ->whereIn('sandelis', $value)
                ->whereIn('registras',['GAM', 'PIRK'])
                ->orderBy('kiekis', 'DESC')
                ->groupBy(DB::raw("grupe"))
                ->get();  
        }       

        return response()->json([
            'data' => array(
                'pardavimai' => $key[0], 
                'likutis' => $key[1],
                'nuo' => $dt[0],
                'iki' => $dt[1]
            ),
            'buy' => $buy,
            'query' => $res,
            'inte' => $in
        ]);
    }

    public function idx(){
        function tofloat($num) {
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

        //$da = array();

        $data = Atsargos::whereIn('blanko_nr', ['AIZK0138', 'ALUK0164', 'CESI0114', 'DAUG0087', 'LIMB0136', 'MADO0170', 'SIGU0131', 'VALM0131'])->get();
        foreach($data as $val){
            $val = $val->toArray();
            $list[$val['preke']] = $val['preke'];

            $da[$val['preke']]['preke'] = $val['preke'];
            $da[$val['preke']]['kaina'] = $val['kaina'];
            $kai = round(tofloat($val['kaina'])*0.5, 4);
            $kai = number_format($kai, 4);
            $da[$val['preke']]['kaina2'] = $kai;
            $da[$val['preke']]['kiek'][] = $val['kiekis'];
            $k = explode(',', $val['kiekis']);
            if(array_key_exists('kiekis', $da[$val['preke']])){
                $da[$val['preke']]['kiekis'] += $k[0];
            }else{
                $da[$val['preke']]['kiekis'] = $k[0];
            }
        }
        
        $list = array_values($list);
        $pirk = Pirkimai::whereIn('preke', $list)->get();
        foreach($pirk as $va){
            $pi[$va['preke']][] = $va;
            $da[$va['preke']]['pirk_kaina'] = $va['pirk_kaina'];
            $da[$va['preke']]['pardavimas'] = $va['data'];
        }

        $da = array_values($da);

        return response()->json([
            'd' => $da,
            'pirk' => $pi
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
