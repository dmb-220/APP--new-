<?php

namespace App\Http\Controllers;

use App\Models\Likutis;
use App\Models\ReturnProduct;
use Illuminate\Http\Request;

use App\Models\File;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Support\Facades\Storage;

class ReturnProductController extends Controller
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

        $partneris = "EE";

        $failas = "return.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $failas_csv = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        //jei tai EE grazinimas, pasiruosiam likuiciu sarasa, 
        //kitu atveju taupom resursus
        if($partneris == "EE"){
            $re = Likutis::query()
                //->where('sandelis', 'INTE')
                //->where('salis', 2)
                ->whereIn('salis', [1, 2])
                ->get();

            foreach ( $re as $value ) {
                $likutis[$value['preke']] = $value;
            }
        }
        
        //$failas = "GRA-LV-GAM.csv";
        $failas_csv = "LV.csv";
        $directory  = "app/RETURN/";
        $failas = $directory.$failas_csv;

        $flag = true;
        if (($handle = fopen(storage_path($failas), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                //if($val[6] != "MAIS-KUR1"){
                //var_dump($val);
                $kiek = explode(",", $val[4]);
                $kiek = $kiek[0];

                $list[$val[0]]['blankas'] = "GR-".$nr;
                $list[$val[0]]['preke'] = $val[0];
                if(array_key_exists('kiekis', $list[$val[0]])){
                    $list[$val[0]]['kiekis'] += $kiek;
                }else{
                    $list[$val[0]]['kiekis'] = $kiek;
                    }
                
                //jei grazinama iš EE, reikia nuskaityti dinetos likucius
                //ir pagal prekes koda susirasti kaina ir savikaina
                //jei neranda, irasyti paciam ranbkiniu budu
                if($partneris == "EE"){
                    if(array_key_exists($val[0], $likutis)){
                        $list[$val[0]]['kaina'] = $likutis[$val[0]]['kaina'];
                        $list[$val[0]]['savikaina'] = $likutis[$val[0]]['savikaina'];
                    }else{
                        $list[$val[0]]['kaina'] = 'Nera'; 
                        $list[$val[0]]['savikaina'] = 'Nera'; 
                    }
                }
                //jei grazinama iš LV dineta turi savikainas
                if($partneris == "LV"){
                    $list[$val[0]]['kaina'] = number_format(floatval(str_replace(",", ".", $val[3])), 2);
                    $list[$val[0]]['savikaina'] = number_format(floatval(str_replace(",", ".", $val[8])), 4);
                }
                if($val[7] == "GAM"){
                    $list[$val[0]]['procentas'] = '70';
                }
                if($val[7] == "PIRK"){
                    $list[$val[0]]['procentas'] = '50';
                }
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
        $uploadedFile = $request->file('file');

        if (!$uploadedFile->isValid()) {
            abort( 422 );}

        $storePath = $uploadedFile->storeAs('RETURN', $uploadedFile->getClientOriginalName());
        $file = new File;

        $file->name = $uploadedFile->getClientOriginalName();
        $fail = $file->name;
        $file->file = $storePath;
        $file->mime = $uploadedFile->getMimeType();
        $file->size = $uploadedFile->getSize();

        $file->save();

        $failas = "return.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "w");
        fwrite($myfile, $fail);
        fclose($myfile);


        return response()->json([
            'status' => true,
            'data' => $file,
            'upload' => $uploadedFile
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ReturnProduct  $returnProduct
     * @return \Illuminate\Http\Response
     */
    public function show(ReturnProduct $returnProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ReturnProduct  $returnProduct
     * @return \Illuminate\Http\Response
     */
    public function edit(ReturnProduct $returnProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ReturnProduct  $returnProduct
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ReturnProduct $returnProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReturnProduct  $returnProduct
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReturnProduct $returnProduct)
    {
        //
    }
}
