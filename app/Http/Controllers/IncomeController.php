<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Likutis;
use Illuminate\Http\Request;

use App\Models\File;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Support\Facades\Storage;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $likutis = array();
        $list = array();

        $failas = "income.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile, filesize(storage_path($failas)));
        fclose($myfile);
        
        $key = explode("||", $key);
        $file = $key[0];

        //susidedam likučius, kad gautume pradine kaina
        $re = Likutis::query()
            ->whereIn('salis', [1, 2])
            ->get();

        foreach ( $re as $value ) {
            $likutis[$value['preke']] = $value;
        }
        
        //$failas_csv = "ATSARGU_OP.csv";
        $directory  = "app/Income/";
        $failas = $directory.$file;

        $flag = true;
        if (($handle = fopen(storage_path($failas), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                
                $list[$val[6]]['preke'] = $val[6];
                $list[$val[6]]['pavadinimas'] = $val[10];
                $kiek = explode(",", $val[7]);
                $kiek = $kiek[0];
                $list[$val[6]]['kiekis'] = $kiek;
                
                if(array_key_exists($val[6], $likutis)){
                    $list[$val[6]]['kaina'] = $likutis[$val[6]]['kaina'];
                    $list[$val[6]]['savikaina'] = $likutis[$val[6]]['savikaina'];
                }else{
                    $list[$val[6]]['kaina'] = 'Nerasta'; 
                    $list[$val[6]]['savikaina'] = 'Nerasta'; 
                }
            }
            fclose($handle);
            }

            $list = array_values($list);

        return response()->json([
            'status' => true,
            'list' => $list,
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
        $file = $data['file'];

        $failas = "income.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        //atnaujinam duomenis
        $myfile = fopen(storage_path($failas), "w");
        fwrite($myfile, $file."||");
        fclose($myfile);

        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }

    public function store_income(Request $request){
        $uploadedFile = $request->file('file');

        if (!$uploadedFile->isValid()) {
            abort( 422 );
        }

        $storePath = $uploadedFile->storeAs('Income/', $uploadedFile->getClientOriginalName());
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
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function show(Income $income)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function edit(Income $income)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Income $income)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function destroy(Income $income)
    {
        //
    }
}
