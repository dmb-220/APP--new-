<?php

namespace App\Http\Controllers;

use App\Models\Works;
use App\Models\WorksInventory;
use Illuminate\Http\Request;

use App\Models\File;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\DB;

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
        $nuo = $key[1];
        $iki = $key[2];

        //pataisom data
        $nuo2 = \Carbon\Carbon::parse($nuo)->setTimezone('Europe/Vilnius')->format('Y-m-d');
        $iki2 = \Carbon\Carbon::parse($iki)->setTimezone('Europe/Vilnius')->format('Y-m-d');

        $dir  = "app/Works/".$file;

        $works = array();
        $value = Works::query()
            //imam intervala
            ->when($nuo != $iki, function ($q) use ($nuo2, $iki2) {
                return $q->whereBetween('doc_date', [$nuo2, $iki2]);
            })
            //jei pasirinks viena diena
            ->when($nuo == $iki, function ($q) use ($nuo2) {
                return $q->whereDate('doc_date', $nuo2);
            })
            ->get(); 

        foreach($value as $val){
            if($val['sandelis'] != "INTE" && $val['sandelis'] != "INLV" && $val['sandelis'] != "INEE" && $val['sandelis'] != "PIGU" &&
                $val['sandelis'] != "TELSIAI" && $val['sandelis'] != "99EE" && $val['sandelis'] != "99LT" && $val['sandelis'] != "99LV"  && $val['sandelis'] != "3333"){
                    
                $works[$val['sandelis']]['pardavejos'][$val['vartotojas']]['pardaveja'] = $val['vartotojas'];
                $works[$val['sandelis']]['sandelis'] = $val['sandelis'];
                //$works[$val['sandelis']]['data'][] = $val['doc_date'];
                if($val['dk'] != "R"){
                    if(isset($works[$val['sandelis']]['pardavejos'][$val['vartotojas']]['suma'])){
                        $works[$val['sandelis']]['pardavejos'][$val['vartotojas']]['suma'] += $val['suma'];
                    }else{
                        $works[$val['sandelis']]['pardavejos'][$val['vartotojas']]['suma'] = $val['suma'];
                    }
                }else{
                    if(isset($works[$val['sandelis']]['pardavejos'][$val['vartotojas']]['graza'])){
                        $works[$val['sandelis']]['pardavejos'][$val['vartotojas']]['graza'] += $val['suma'];
                    }else{
                        $works[$val['sandelis']]['pardavejos'][$val['vartotojas']]['graza'] = $val['suma'];
                    }
                }
            }
        }

        //pasalinam masyvo KEY
        foreach($works as $idx => $val){
            $works[$idx]['pardavejos'] = array_values($val['pardavejos']);
        }
        $works = array_values($works);

        return response()->json([
            'status' => true,
            'works' => $works,
            'nuo_iki' => array("nuo" => $nuo2, "iki" => $iki2)
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
        $data = $request->all();
        $file = $data['file_works'];
        $nuo = $data['nuo'];
        $iki = $data['iki'];

        $failas = "works.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        //jei failas nepasirinktas leistu keisti tik data
        if(!$file){
            $myfile = fopen(storage_path($failas), "r");
            $key = fread($myfile,filesize(storage_path($failas)));
            fclose($myfile);

            $key = explode("||", $key);
            $f = $key[0];
            //priskiriam jau ikelto failo varda           
            $file = $f;
        }else{
            //atnaujiman duomenis
            //jei ikeliamas naujas failas
            $dir  = "app/Works/".$file;
            DB::table('works')->delete();
            $flag = true;
            if (($handle = fopen(storage_path($dir), "r")) !== FALSE) {
                while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                    //praleidziam pirma eilute
                    if($flag) { $flag = false; continue; }
                    $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                    $da[] = [
                        'doc_date' => date('Y-m-d h:i:s', strtotime($val[1]."T".$val[2]."Z")),
                        'vartotojas' => $val[5],
                        'sandelis' => $val[6],
                        'dk' => $val[12],
                        'suma' => floatval(str_replace(",", ".", $val[15])),
                    ];

                }
                fclose($handle);
            }

            $chunks = array_chunk($da, 300);
            foreach($chunks as $val){
                Works::insert($val);
            }
        }
        //atnaujinam duomenis
        $myfile = fopen(storage_path($failas), "w");
        fwrite($myfile, $file."||".$nuo."||".$iki);
        fclose($myfile);

        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }

    public function store_works(Request $request){
        $uploadedFile = $request->file('file');

        if (!$uploadedFile->isValid()) {
            abort( 422 );
        }

        $storePath = $uploadedFile->storeAs('Works/', $uploadedFile->getClientOriginalName());
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
