<?php

namespace App\Http\Controllers;

use App\Models\Export;
use Illuminate\Http\Request;

use App\Models\File;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Support\Facades\Storage;

class ExportController extends Controller
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
        $failas = "export.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $date = $key[0];
        $file = $key[1];
        $file2 = $key[2];

        //prekiu sarasas
        $arr = array();
        $flag = true;
        if (($handle = fopen(storage_path("app/Export/".$file), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                $arr[$val[0]]['kodas'] = $val[0];
                $arr[$val[0]]['p_lt'] = $val[1];
                $arr[$val[0]]['p_lv'] = $val[2];
                $arr[$val[0]]['p_ee'] = $val[3];
                $arr[$val[0]]['sudetis_lt'] = $val[4];
                $arr[$val[0]]['sudetis_lv'] = $val[5];
                $arr[$val[0]]['sudetis_ee'] = $val[6];
                $arr[$val[0]]['pirkimo_kaina'] = number_format($this->tofloat($val[7]), 2);
                $arr[$val[0]]['gamintojas_lt'] = $val[8];
                $arr[$val[0]]['gamintojas_lv'] = $val[9];
                $arr[$val[0]]['gamintojas_ee'] = $val[10];
                $arr[$val[0]]['pardavimo_kaina_lt'] = number_format($this->tofloat($val[11]), 2);
                $arr[$val[0]]['pardavimo_kaina_lv'] = number_format($this->tofloat($val[12]), 2);
                $arr[$val[0]]['pardavimo_kaina_ee'] = number_format($this->tofloat($val[13]), 2);
                $arr[$val[0]]['dydis'] = $val[14];               
            }
        }

        $pro = array();
        $flag = true;
        if (($handle = fopen(storage_path("app/Export/".$file2), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                $pro[$val[0]] = $arr[$val[0]];
            }
        }
        
        $pro = array_values($pro);
       
        return response()->json([
            'status' => true,
            'date' => $date,
            'sarasas' => $pro,
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

    public function store_akcija(Request $request){
        $uploadedFile = $request->file('file');

        if (!$uploadedFile->isValid()) {
            abort( 422 );}

        $storePath = $uploadedFile->storeAs('Export', $uploadedFile->getClientOriginalName());
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
        $file = $data['file'];
        $file2 = $data['file2'];

        $failas = "export.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $date = $key[0];
        $fil = $key[1];
        $fil2 = $key[2];

        if(!$file){
            $file = $fil;
        }else{
            $date = date("Y-m-d");
        }
        if(!$file2){
            $file2 = $fil2;
        }

        $eilute = strtoupper($date)."||".$file."||".$file2;

        $myfile = fopen(storage_path($failas), "w");
        fwrite($myfile, $eilute);
        fclose($myfile);

        return response()->json([
            'status' => true,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Export  $export
     * @return \Illuminate\Http\Response
     */
    public function show(Export $export)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Export  $export
     * @return \Illuminate\Http\Response
     */
    public function edit(Export $export)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Export  $export
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Export $export)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Export  $export
     * @return \Illuminate\Http\Response
     */
    public function destroy(Export $export)
    {
        //
    }
}
