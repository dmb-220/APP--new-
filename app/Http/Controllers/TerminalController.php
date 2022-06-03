<?php

namespace App\Http\Controllers;

use App\Models\Terminal;
use Illuminate\Http\Request;

use App\Models\File;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Support\Facades\Storage;

class TerminalController extends Controller
{

    public $pard = array(
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

    public $pard_swed = array(
        "MADA", "BABI", "UKME", "VISA", "AREN", "MAXI", "PANE", "TAIK", "UTEN", "TAUB"
    );

    public $pard_lumi = array(
        "MINS", "TELS", "MARI", "NORF", "BIGA", "MANT", "KEDA", "MAZE", "SAUL", 
    );

    public function getDatesFromRange($start_date, $end_date, $date_format = 'Y-m-d')
    {
       $dates_array = array();
       for ($x = strtotime($start_date); $x <= strtotime($end_date); $x += 86400) {
          $da = date($date_format, $x);
          $dates_array[$da] = array(
              'pard' => array(), 'swedbank' => 0, 'luminor' => 0
          );
       }
       return $dates_array;
    }

    public function getDatesFromRange2($start_date, $end_date, $date_format = 'Y-m-d')
    {
       $dates_array = array();
       for ($x = strtotime($start_date); $x <= strtotime($end_date); $x += 86400) {
           $da = date($date_format, $x);
           $dates_array[$da] = array(
               'data' => $da, 'suma' => 0, 'komisiniai' => 0, 'pajamos' => 0, 'dineta' => 0, 'gauta' => '00-00'
            );
       }
       return $dates_array;
    }
 

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
        $failas = "terminalas.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $file = $key[0];
        $file2 = $key[1];
        $pardavimai = $key[2];

        $dir  = "app/XLSX/".$file;
        $dir2  = "app/XLSX/".$file2;
        $pard = "app/XLSX/".$pardavimai;

        //gaunam menesio pirma diena, ir -1 diena
        $first = date('Y-m-d', strtotime(date('Y-m-d', strtotime('first day of last month')).' - 1day'));
        $last = date('Y-m-d', strtotime('last day of last month'));
        $menuo = date('m', strtotime('first day of last month'));
        $date_range = $this->getDatesFromRange($first, $last);
        $date_range2 = $this->getDatesFromRange2($first, $last);

        //PARDAVIMAI
        $arr3 = $date_range;
        $st = array();
        $flag = true;
        if (($handle = fopen(storage_path($pard), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }

                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                $ex = explode(" ", $val[9]);
                $op = "no";
                $date = $val[2];
                $sand = $val[0];
                $suma = $val[15];
                if($ex[0] == "Pardavimas"){
                    if($ex[4] == "grynais."){ $op = "grynais"; $op2 = "gryni"; }
                    if($ex[4] == "kortele."){ $op = "kortele"; $op2 = "korta"; }

                    if(array_key_exists($date, $arr3)){
                        $arr3[$date]['pard'][$sand][$op][] = $suma;

                        if(array_key_exists($op2, $arr3[$date]['pard'][$sand])){
                            $arr3[$date]['pard'][$sand][$op2] += $this->tofloat($suma);
                        }else{
                            $arr3[$date]['pard'][$sand][$op2] = $this->tofloat($suma);
                        }

                        if(in_array($sand, $this->pard_lumi) && $ex[4] == "kortele."){
                            if(array_key_exists('luminor', $arr3[$date])){
                                $arr3[$date]['luminor'] += $this->tofloat($suma);
                            }else{
                                $arr3[$date]['luminor'] = $this->tofloat($suma);
                            }
                        }

                        if(in_array($sand, $this->pard_swed) && $ex[4] == "kortele."){
                            if(array_key_exists('swedbank', $arr3[$date])){
                                $arr3[$date]['swedbank'] += $this->tofloat($suma);
                            }else{
                                $arr3[$date]['swedbank'] = $this->tofloat($suma);
                            }
                        }
                    }

                    if(in_array($sand, $this->pard_lumi) && $ex[4] == "kortele."){
                        $st[$date][$sand]['parduotuve'] = $sand;
                        if(array_key_exists('suma', $st[$date][$sand])){
                            $st[$date][$sand]['suma'] += $this->tofloat($suma);
                        }else{
                            $st[$date][$sand]['suma'] = $this->tofloat($suma); 
                        }
                    }
                }
            }
            fclose($handle);
        }

        //Swedbank
        $arr = $date_range2;
        $store = array();       
        if (($handle = fopen(storage_path($dir), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                $ex = explode("#", $val[4]);
                $imone = explode(":", $ex[0]);
                if($imone[0] == "Swedbank IMONE"){
                    $date = explode(": ", $ex[5]);
                    $date = str_replace(".","-", $date[1]);
                    $date = date('Y-m-d', strtotime($date));

                    $id = explode(" ID ", $ex[1]);
                    $suma = explode(": ", $ex[3]);
                    $kom = explode(": ", $ex[4]);

                    //is ID pasidarom parduotuves pavadinima
                    $pa = $this->pard[$id[1]];                

                    //sudedam pagal data
                    if(isset($arr[$date])){
                        $arr[$date]['pard'][$pa]['suma'] = $suma[1];
                        $arr[$date]['pard'][$pa]['komisiniai'] = $kom[1];
                        $arr[$date]['pard'][$pa]['pajamos'] = $suma[1] - $kom[1];
                        $arr[$date]['pard'][$pa]['ID'] = $id[1];
                        $arr[$date]['pard'][$pa]['parduotuve'] = $pa;

                        $arr[$date]['data'] = $date;
                        $arr[$date]['gauta'] = date('m-d', strtotime($val[2]));
                        if(array_key_exists($date, $arr3)){
                            $arr[$date]['dineta'] = $arr3[$date]['swedbank'];
                        }

                        $arr[$date]['suma'] += $suma[1];
                        $arr[$date]['komisiniai'] += $kom[1];
                        $arr[$date]['pajamos'] += $suma[1] - $kom[1];    
                    }
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
        
        //LUMINOR
        $arr2 = $date_range2;
        if (($handle = fopen(storage_path($dir2), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");

                $ex = explode(" ", $val[12]);
                if(count($ex) > 1){
                    if($ex[1] == "mok."){
                        $date = $ex[6];
                        $date = str_replace(".","-", $date);

                        //sukuriam pradines reiksmes
                        if(isset($arr2[$date])){                       
                            //suskaiciuojam
                            $sum = $ex[9] + $ex[13];

                            if(array_key_exists('suma', $arr2[$date])){
                                $arr2[$date]['suma'] += $sum;
                            }else{ $arr2[$date]['suma'] = $sum; }

                            if(array_key_exists('komisiniai', $arr2[$date])){
                                $arr2[$date]['komisiniai'] += $ex[13];
                            }else{ $arr2[$date]['komisiniai'] = $ex[13]; }

                            if(array_key_exists('pajamos', $arr2[$date])){
                                $arr2[$date]['pajamos'] += $ex[9];
                            }else{ $arr2[$date]['pajamos'] = $ex[9]; }

                            $arr2[$date]['data'] = $date;
                            $arr2[$date]['gauta'] = date('m-d', strtotime($val[1]));

                            /*if(array_key_exists($date, $arr3)){
                                if(number_format($sum, 2) == number_format($arr3[$date]['luminor'], 2)){
                                    $arr2[$date]['dineta'] = $arr3[$date]['luminor'];
                                }else{
                                    //surandai PRIES ir PO dienas
                                    $prev = date('Y-m-d', strtotime($date .' - 1day'));
                                    $next = date('Y-m-d', strtotime($date .' + 1day'));

                                    //buna praleistos dienos, reikia prideti praleista
                                    if(number_format($sum, 2) == number_format(($arr3[$date]['luminor'] + $arr3[$prev]['luminor']), 2)){
                                        $arr2[$date]['dineta'] = $arr3[$date]['luminor'] + $arr3[$prev]['luminor'];
                                    }else
                                    if(number_format($sum, 2) == number_format(($arr3[$date]['luminor'] + $arr3[$next]['luminor']), 2)){
                                        $arr2[$date]['dineta'] = $arr3[$date]['luminor'] + $arr3[$next]['luminor'];
                                    }else{
                                        $arr2[$date]['dineta'] = $arr3[$date]['luminor'];
                                    }
                                }
                            }*/
                        }
                    }
                }
            }
            fclose($handle);
        }
        //luminor praleidiza dinetos duomenis
        foreach($arr2 as $key => $v){
            $arr2[$key]['dineta'] = $arr3[$key]['luminor'];
            if(array_key_exists($key, $st)){
                $arr2[$key]['pard'] = $st[$key];
            }
            //$arr[$key]['dineta'] = $arr3[$key]['swedbank'];
        }
        
        $swed_viso = array(
            'pinigai' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0, "dineta" => 0),
            'pajamos' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0, "dineta" => 0)
        );

        $lumi_viso = array(
            'pinigai' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0, "dineta" => 0),
            'pajamos' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0, "dineta" => 0)
        );

        //suskaičiuojam viso, keleta variantu
        $last_key = array_key_last($arr);
        $first_key = array_key_first($arr);
        
        foreach($arr as $key => $va){
            if ($key != $last_key) {
                $swed_viso['pinigai']['dineta'] += $va['dineta'];
                $swed_viso['pinigai']['suma'] += $va['suma'];
                $swed_viso['pinigai']['komisiniai'] += $va['komisiniai'];
                $swed_viso['pinigai']['pajamos'] += $va['suma'] - $va['komisiniai'];
            }

            if ($key != $first_key) {
                $swed_viso['pajamos']['dineta'] += $va['dineta'];
                $swed_viso['pajamos']['suma'] += $va['suma'];
                $swed_viso['pajamos']['komisiniai'] += $va['komisiniai'];
                $swed_viso['pajamos']['pajamos'] += $va['suma'] - $va['komisiniai'];
            }
        }

        $last_key2 = array_key_last($arr2);
        foreach($arr2 as $key => $va){        
            //var_dump($va['gauta']);
            $ex = explode("-", $va['data']);
            if ($ex[1] == $menuo) {
                if(isset($va['dineta'])){
                    $lumi_viso['pinigai']['dineta'] += $va['dineta'];
                }
                if(isset($va['suma'])){
                    $lumi_viso['pinigai']['suma'] += $va['suma'];
                }
                if(isset($va['komisiniai'])){
                    $lumi_viso['pinigai']['komisiniai'] += $va['komisiniai'];
                }
                if(isset($va['suma']) && isset($va['komisiniai'])){
                    $lumi_viso['pinigai']['pajamos'] += $va['suma'] - $va['komisiniai'];
                }
                if($va['gauta'] == '00-00' && $last_key2 == $key) {
                    if(isset($va['dineta'])){
                        $lumi_viso['pinigai']['suma'] += $va['dineta'];
                    }
                }
            }

            if(isset($va['gauta'])){
                $ey = explode("-", $va['gauta']);
                //var_dump($va['data']);
                if ($ey[0] == $menuo) {
                    if(isset($va['dineta'])){
                        $lumi_viso['pajamos']['dineta'] += $va['dineta'];
                    }
                    if(isset($va['suma'])){
                        $lumi_viso['pajamos']['suma'] += $va['suma'];
                    }
                    if(isset($va['komisiniai'])){
                        $lumi_viso['pajamos']['komisiniai'] += $va['komisiniai'];
                    }
                    if(isset($va['suma']) && isset($va['komisiniai'])){
                        $lumi_viso['pajamos']['pajamos'] += $va['suma'] - $va['komisiniai'];
                    }
                }else{  
                   //paskutini jei tai ne luminor gauta          
                    if($ey[0] == '00' && $last_key2 != $key) {
                        if(isset($va['dineta'])){
                            $lumi_viso['pajamos']['dineta'] += $va['dineta'];
                        } 
                    }
                }
            }
        }

        //$arr = array_values($arr);
        //$arr2 = array_values($arr2);
        //$store = array_values($store);
        ksort($arr3);
        ksort($arr2);

        return response()->json([
            'status' => true,
            'swedbank' => $arr,
            'swed_viso' => $swed_viso,
            'lumi_viso' => $lumi_viso,
            //'store' => $store,
            'luminor' => $arr2,
            'pardavimai' => $arr3,
        ]);
    }

    //Atsisiunciam EXCEL faila
    public function save_xlsx()
    {
        $failas = "terminalas.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $file = $key[0];
        $file2 = $key[1];

        $dir  = "app/XLSX/".$file;
        $dir2  = "app/XLSX/".$file2;

        $data = array(
            'swedbank' => array(),
            'luminor' => array()
        );

        //Swedbank
        $arr = array();     
        if (($handle = fopen(storage_path($dir), "r")) !== FALSE) {
            while (($da = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $val = mb_convert_encoding($da, "UTF-8", "ISO-8859-13");
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

                    $arr[$date[1]]['data'] = $date[1];
                    $arr[$date[1]]['suma'] += $suma[1];
                    $arr[$date[1]]['komisiniai'] += $kom[1];
                    $arr[$date[1]]['pajamos'] += $suma[1] - $kom[1];    
                }
            }
        }

        $data['swedbank']['duomenys'] = array_values($arr);

        //LUMINOR
        $arr2 = array();
        if (($handle = fopen(storage_path($dir2), "r")) !== FALSE) {
            while (($da = fgetcsv($handle, 1000, ";")) !== FALSE) {
                $val = mb_convert_encoding($da, "UTF-8", "ISO-8859-13");

                $ex = explode(" ", $val[12]);
                if(count($ex) > 1){
                    if($ex[1] == "mok."){
                        //sukuriam pradines reiksmes
                        if(!array_key_exists($ex[6], $arr2)){
                            $arr2[$ex[6]]['suma'] = 0;
                            $arr2[$ex[6]]['komisiniai'] = 0;
                            $arr2[$ex[6]]['pajamos'] = 0;
                        }

                        $arr2[$ex[6]]['data'] = $ex[6];
                        $arr2[$ex[6]]['suma'] += $ex[9] + $ex[13];
                        $arr2[$ex[6]]['komisiniai'] += $ex[13];
                        $arr2[$ex[6]]['pajamos'] += $ex[9];
                    }
                }
            }
        }

        $data['luminor']['duomenys'] = array_values($arr2);

        $viso = array(
            'pinigai' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0),
            'pajamos' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0)
        );

        //suskaičiuojam viso, keleta variantu
        $last_key = array_key_last($arr);
        $first_key = array_key_first($arr);
        
        foreach($arr as $key => $va){
            if ($key != $last_key) {
                $viso['pinigai']['suma'] += $va['suma'];
                $viso['pinigai']['komisiniai'] += $va['komisiniai'];
                $viso['pinigai']['pajamos'] += $va['suma'] - $va['komisiniai'];
            }

            if ($key != $first_key) {
                $viso['pajamos']['suma'] += $va['suma'];
                $viso['pajamos']['komisiniai'] += $va['komisiniai'];
                $viso['pajamos']['pajamos'] += $va['suma'] - $va['komisiniai'];
            }
        }

        $data['swedbank']['viso'] = $viso;

        $viso = array(
            'pinigai' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0),
            'pajamos' => array("suma" => 0, "komisiniai" => 0, "pajamos" => 0)
        );

        $last_key2 = array_key_last($arr2);
        $first_key2 = array_key_first($arr2);
        
        foreach($arr2 as $key => $va){
            if ($key != $last_key2) {
                $viso['pinigai']['suma'] += $va['suma'];
                $viso['pinigai']['komisiniai'] += $va['komisiniai'];
                $viso['pinigai']['pajamos'] += $va['suma'] - $va['komisiniai'];
            }

            if ($key != $first_key2) {
                $viso['pajamos']['suma'] += $va['suma'];
                $viso['pajamos']['komisiniai'] += $va['komisiniai'];
                $viso['pajamos']['pajamos'] += $va['suma'] - $va['komisiniai'];
            }
        }

        $data['luminor']['viso'] = $viso;

        $save = 'app/save_xlsx/generated_document.xlsx';

        // Save as XLSX (Excel)
        (new \AnourValar\Office\TemplateService())
            ->generate(storage_path('app/save_xlsx/template.xlsx'), $data)
            ->saveAs(storage_path($save));
            
        return Storage::download('save_xlsx/generated_document.xlsx');
        
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
        $file2 = $data['file_bankas2'];
        $pardavimai = $data['file_pardavimai'];

        $failas = "terminalas.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        //jei pasirinktas tik vieno banko failas
        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $fi = $key[0];
        $fi2 = $key[1];
        $pard = $key[2];

        if(!$file){$file = $fi;}
        if(!$file2){$file2 = $fi2;}
        if(!$pardavimai){$pardavimai = $pard;}

        $myfile = fopen(storage_path($failas), "w");
        fwrite($myfile, $file."||".$file2."||".$pardavimai);
        fclose($myfile);

        return response()->json([
            'status' => true,
            'data' => $data
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
