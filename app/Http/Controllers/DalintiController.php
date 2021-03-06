<?php

namespace App\Http\Controllers;


use App\Models\File;
use App\Models\Dalinti;
use App\Models\Likutis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class DalintiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $warehouse  = array(
            0 => array("LIEP", "VENT", "KULD", "SALD", "VALK", "TUKU", "DOBE", "SIGU", "VALM", "CESI", "BALV", "LIMB", "MELN", "MATI", "DOLE", 
            "BRIV", "GOBA", "JEKA", "AIZK", "OGRE", "MADO", "VALD", "DITO", "TAL2", "INLV"),
            1 => array("TELS", "UKME", "BIGA", "MANT", "SAUL", "MAZE", "MAXI", "BABI", "KEDA", "MARI", "NORF", "VISA", "PANE", "AREN", "MADA", "MINS", "TAIK", "TAUB", "UTEN", "INTE"),
            2 => array("Parnu", "Rakvere", "Johvi", "Sopruse", "Mustamäe", "Ümera", "Riia Parnu", "Võru 55 Tartu", "Eden", "Haapsalu", "Kopli", "INEE")
        );

        $sandeliai = array_merge($warehouse[0], $warehouse[1], $warehouse[2]);

        //paimam ikeltus duomenis
        $dalinti = Dalinti::all();

        $list = array();
        foreach($dalinti as $row){
            $list[] = $row['barkodas'];
        }

        $liko = Likutis::whereIn('sandelis', $sandeliai)
            ->whereIn('preke', $list)
            ->get();  

        $array = array();
        //pasidarom masyva
        //pagal prekiu sarasa, ir sandeliuse nustatom 0
        foreach($list as $va){
            foreach($sandeliai as $v){
                $array[$va][$v] = 0;
            }
        }

        //jei sandelis turi preke, irasomas kiekis
        //kitu atveju lieka 0
        foreach($liko as $val){
            $array[$val['preke']][$val['sandelis']] = $val['kiekis'];
        }

        //paliekam masyve tik reiksmes  su 0
        $arr = array();
        foreach($array as $x => $xx){
            foreach($xx as $y => $yy){
                if($yy == 0){
                    $arr[$x][] = $y;
                }
            }
        }

        return response()->json([
            'status' => true,
            'dalinti' => $dalinti,
            'sandeliai' => $sandeliai,
            'warehouse' => $warehouse,
            'array' => $arr
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

    public function store_file(Request $request){
        $uploadedFile = $request->file('file');

        if (!$uploadedFile->isValid()) {
            abort( 422 );}

        $storePath = $uploadedFile->storeAs('CSV_DATA', $uploadedFile->getClientOriginalName());

        $file = new File;
        $file->name = $uploadedFile->getClientOriginalName();
        $file->file = $storePath;
        $file->mime = $uploadedFile->getMimeType();
        $file->size = $uploadedFile->getSize();
        $file->save();

        return response()->json([
            'status' => true,
            'data' => $file,
            'upload' => $uploadedFile
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $failas = $request->file;

        $directory  = "app/CSV_DATA/";
        $failas = $directory.$failas;
        //uzkeliam naujus duomenis, senus istrindami
        DB::table('dalintis')->delete();
        //$flag = true;
        $da = [];
        if (($handle = fopen(storage_path($failas), "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
            //praleidziam pirma eilute
            //if($flag) { $flag = false; continue; }
            $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
            //if($val[1] > 0){
                $da[] = [
                    'barkodas' => $val[0],
                    'likutis' => $val[1],
                ];
            //}
        }
        fclose($handle);
        }
        unlink(storage_path($failas));
        
        $chunks = array_chunk($da, 300);
        foreach($chunks as $val){
            Dalinti::insert($val);
        }

        return response()->json([
            'status' => true,
            'data' => $request
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dalinti  $dalinti
     * @return \Illuminate\Http\Response
     */
    public function show(Dalinti $dalinti)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Dalinti  $dalinti
     * @return \Illuminate\Http\Response
     */
    public function edit(Dalinti $dalinti)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Dalinti  $dalinti
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Dalinti $dalinti)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dalinti  $dalinti
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dalinti $dalinti)
    {
        //
    }
}
