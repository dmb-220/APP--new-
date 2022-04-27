<?php

namespace App\Http\Controllers;

use App\Models\Terminal;
use Illuminate\Http\Request;

use App\Models\File;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Support\Facades\Storage;

class TerminalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pard = array(
            "0016141117" => "TAIK", 
            "0014270514" => "BABI", 
            "0009260721" => "UTEN", 
            "0009060418" => "UKME", 
            "0007260117" => "VISA", 
            "0006260117" => "PANE", 
            "0004150518" => "MAXI", 
            "0003020317" => "MADA",
            "0002020317" => "AREN",
            "0001090818" => "TAUB",
        );

        $failas = "terminalas.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $file = $key[0];
        $dir  = "app/XLSX/".$file;

        $arr = array();
        $store = array();
        
        if (($handle = fopen(storage_path($dir), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                $ex = explode("#", $val[4]);
                $imone = explode(":", $ex[0]);
                if($imone[0] == "Swedbank IMONE"){
                    $date = explode(": ", $ex[5]);
                    $id = explode(" ID ", $ex[1]);
                    $suma = explode(": ", $ex[3]);
                    $kom = explode(": ", $ex[4]);

                    if(!array_key_exists($date[1], $arr)){
                        $arr[$date[1]]['suma'] = 0;
                        $arr[$date[1]]['komisiniai'] = 0;
                        $arr[$date[1]]['pajamos'] = 0;
                    }

                    //is ID pasidarom parduotuves pavadinima
                    $pa = $pard[$id[1]];                

                    //sudedam pagal data
                    $arr[$date[1]]['pard'][$id[1]]['suma'] = $suma[1];
                    $arr[$date[1]]['pard'][$id[1]]['komisiniai'] = $kom[1];
                    $arr[$date[1]]['pard'][$id[1]]['pajamos'] = $suma[1] - $kom[1];
                    $arr[$date[1]]['pard'][$id[1]]['ID'] = $id[1];
                    $arr[$date[1]]['pard'][$id[1]]['parduotuve'] = $pa;

                    $arr[$date[1]]['data'] = $date[1];
                    $arr[$date[1]]['suma'] += $suma[1];
                    $arr[$date[1]]['komisiniai'] += $kom[1];
                    $arr[$date[1]]['pajamos'] += $suma[1] - $kom[1];    

                    if(!array_key_exists($pa, $store)){
                        $store[$pa]['suma'] = 0;
                        $store[$pa]['komisiniai'] = 0;
                        $store[$pa]['pajamos'] = 0;
                    }
                    //sudedam pagal parduotuves
                    $store[$pa]['store'] = $pa;
                    $store[$pa]['suma'] += $suma[1];
                    $store[$pa]['komisiniai'] += $kom[1];
                    $store[$pa]['pajamos'] += $suma[1] - $kom[1];
                }
            }
        }

        $viso = array(
            'pinigai' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0),
            'pajamos' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0),
            'viso' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0)
        );

        $title = array("pirmas" => "", "antras" => "", "trecias" => "");

        //suskaičiuojam viso, keleta variantu
        $last_key = array_key_last($arr);
        $first_key = array_key_first($arr);
        
        foreach($arr as $key => $va){
            if ($key != $last_key && $key != $first_key) {
                $viso['viso']['suma'] += $va['suma'];
                $viso['viso']['komisiniai'] += $va['komisiniai'];
                $viso['viso']['pajamos'] += $va['suma'] - $va['komisiniai'];
            }else{
                $title['pirmas'] .= $va['data']." ";
            }

            if ($key != $last_key) {
                $viso['pinigai']['suma'] += $va['suma'];
                $viso['pinigai']['komisiniai'] += $va['komisiniai'];
                $viso['pinigai']['pajamos'] += $va['suma'] - $va['komisiniai'];
            }else{
                $title['antras'] .= $va['data'];
            }

            if ($key != $first_key) {
                $viso['pajamos']['suma'] += $va['suma'];
                $viso['pajamos']['komisiniai'] += $va['komisiniai'];
                $viso['pajamos']['pajamos'] += $va['suma'] - $va['komisiniai'];
            }else{
                $title['trecias'] .= $va['data'];
            }
        }

        $arr = array_values($arr);
        $store = array_values($store);

        return response()->json([
            'status' => true,
            'data' => $arr,
            'viso' => $viso,
            'title' => $title,
            'store' => $store
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

    public function store_terminalas(Request $request){
        $uploadedFile = $request->file('file_bankas');

        if (!$uploadedFile->isValid()) {
            abort( 422 );
        }

        $storePath = $uploadedFile->storeAs('XLSX/', $uploadedFile->getClientOriginalName());
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
        $data = $request->all();
        $file = $data['file_bankas'];

        $failas = "terminalas.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "w");
        fwrite($myfile, $file."||");
        fclose($myfile);

        return response()->json([
            'status' => true,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Terminal  $terminal
     * @return \Illuminate\Http\Response
     */
    public function show(Terminal $terminal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Terminal  $terminal
     * @return \Illuminate\Http\Response
     */
    public function edit(Terminal $terminal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Terminal  $terminal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Terminal $terminal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Terminal  $terminal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Terminal $terminal)
    {
        //
    }
}
