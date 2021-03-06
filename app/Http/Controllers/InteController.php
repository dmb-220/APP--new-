<?php

namespace App\Http\Controllers;

Use \Carbon\Carbon;
use App\Models\Inte;
use App\Models\Bankas;
use App\Models\Pardavimai;

use App\Models\File;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class InteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public $start;
    public $end;

    public function __construct() {
        $this->start = "2022-02-01"; /*Carbon::now()->startOfMonth()->subMonthNoOverflow()->toDateTimeString();*/
        $this->end = "2022-02-28"; /*Carbon::now()->endOfMonth()->subMonthNoOverflow()->toDateTimeString();*/
        }

    public function index(){
        //nustatymai
        $failas = "apyvarta.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $data_nuo = $key[0];
        $data_iki = $key[1];

        $sarasas = array();

        $sarasas = Inte::query()
            ->where('sandelis', 'INTE')
            ->whereBetween('dok_data', [$this->start, $this->end])
            ->get();

        $bankas = Bankas::query()
            ->where('salis', 'LT')
            ->get();


        $naujas = array();
        $graza = array();

        $nr = array();

        $bank = array();
        $gra = array();
        $gra2 = array();
        foreach($bankas as $row){
            $ex = explode(" ", $row['paskirtis']);
            if(count($ex) == 1){
                $bank[$row['paskirtis']] = $row;
            }
			
			if($ex[0] == "ORDER" || $ex[0] == "Order"){
                $bank[$ex[1]] = $row;
            }

            if(count($ex) > 1){
                if($ex[0] == "Payment"){
                    $bank[$ex[1]] = $row;
                }

                if($ex[1] == "GRĄŽINIMAS" || $ex[1] == "grąžinimas"){
                    $gra[$ex[0]]/*[]*/ = $row;
                    $gra2[$ex[0]][] = $row['suma'];
                }
            }
        }

        $sa = Inte::query()
        ->where('salis', '1')
        ->where('sandelis', 'INTE')
        ->get();

        $list_gra = array();
        foreach($sa as $ro){
            if(is_numeric($ro['blanko_nr'])){
                //$ey = explode(' ', $ro['aprasymas']);
                $list_gra[$ro['blanko_nr']] = $ro;
            }
        }

        $pigu = array();
        $pigu_gra = array();

        foreach($sarasas as $value){
            //INTE
        if($value['sandelis'] == "INTE"){
            if(is_numeric($value['blanko_nr'])){
    
                if($value['blanko_nr'] == "0"){
                    $value['blanko_nr'] = $value['blanko_nr']."-".$value['pirkejas'];
                }

                $naujas[$value['blanko_nr']]['saskaitos_nr'] = intval($value['blanko_nr']);
                $naujas[$value['blanko_nr']]['prekes'][] = $value;
                $naujas[$value['blanko_nr']]['data'] = $value['dok_data'];
                $naujas[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];

                $naujas[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];

                $ey = explode(' ', $value['aprasymas']);

                if(count($ey) > 2){
                $naujas[$value['blanko_nr']]['unikalus'] = $ey[1];
                if(array_key_exists($ey[1], $bank)){
                   $naujas[$value['blanko_nr']]['bankas'] = $bank[$ey[1]];
                   $naujas[$value['blanko_nr']]['bankas_suma'] = $bank[$ey[1]]['suma'];
                   } 
               }
                
                if($value['barkodas'] != 'BIG-170715'){
                    if(!array_key_exists('pristatymas', $naujas[$value['blanko_nr']])){
                        //if($naujas[$value['blanko_nr']]['pristatymas']){
                            $naujas[$value['blanko_nr']]['pristatymas'] = 0;
                        //}
                    }

                    if(array_key_exists('suma', $naujas[$value['blanko_nr']])){

                        $naujas[$value['blanko_nr']]['suma'] = round($value['suma'] + $naujas[$value['blanko_nr']]['suma'], 2);
                        }else{
                            $naujas[$value['blanko_nr']]['suma'] = $value['suma']; 
                        }

                    if(array_key_exists('pardavimo_suma', $naujas[$value['blanko_nr']])){
                        $naujas[$value['blanko_nr']]['pardavimo_suma'] = round($value['pardavimo_suma'] + $naujas[$value['blanko_nr']]['pardavimo_suma'], 2);
                        }else{
                            $naujas[$value['blanko_nr']]['pardavimo_suma'] = $value['pardavimo_suma']; 
                        }

                    if(array_key_exists('pvm_suma', $naujas[$value['blanko_nr']])){
                        $naujas[$value['blanko_nr']]['pvm_suma'] = round($value['pvm_suma'] + $naujas[$value['blanko_nr']]['pvm_suma'], 2);

                        }else{
                            $naujas[$value['blanko_nr']]['pvm_suma'] = $value['pvm_suma'];
                        }
                }else{
                    $naujas[$value['blanko_nr']]['pristatymas'] = $value['suma'];
                }
            }else{
                //darysim grazinimus
                $graza[$value['blanko_nr']]['saskaitos_nr'] = $value['blanko_nr'];
                $graza[$value['blanko_nr']]['prekes'][] = $value['barkodas'];
                $graza[$value['blanko_nr']]['data'] = $value['dok_data'];

                $graza[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];
                $graza[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];

                $ey = explode(' ', $value['aprasymas']);

                if(count($ey) > 2){
                    $graza[$value['blanko_nr']]['unikalus'] = $ey[2];
                    if(array_key_exists($ey[2], $gra)){ 
                            $graza[$value['blanko_nr']]['bankas'] = $gra[$ey[2]]/*[0]*/;
                            $graza[$value['blanko_nr']]['bankas_list'] = $gra2[$ey[2]];

                            $graza[$value['blanko_nr']]['bankas_suma'] = $gra[$ey[2]]['suma'];
                    } 
                }else{
                   if(array_key_exists($ey[0], $list_gra)){ 
                        $ee = explode(" ", $list_gra[$ey[0]]['aprasymas']);
                        if(count($ee) > 1){
                            $graza[$value['blanko_nr']]['unikalus'] =  $ee[1];
                            if(array_key_exists($ee[1], $gra)){ 
                                $graza[$value['blanko_nr']]['bankas'] = $gra[$ee[1]]/*[0]*/;
                                $graza[$value['blanko_nr']]['bankas_list'] = $gra2[$ee[1]];

                                $graza[$value['blanko_nr']]['bankas_suma'] = $gra[$ee[1]]['suma'];
                            } 
                        }
                   }else{
                      $graza[$value['blanko_nr']]['unikalus'] =  $ey[0];
                   }
                }


                    if(array_key_exists('suma', $graza[$value['blanko_nr']])){

                        $graza[$value['blanko_nr']]['suma'] = round($value['suma'] + $graza[$value['blanko_nr']]['suma'], 2);
                        }else{
                            $graza[$value['blanko_nr']]['suma'] = $value['suma']; 
                        }

                    if(array_key_exists('pardavimo_suma', $graza[$value['blanko_nr']])){
                        $graza[$value['blanko_nr']]['pardavimo_suma'] = round($value['pardavimo_suma'] + $graza[$value['blanko_nr']]['pardavimo_suma'], 2);
                        }else{
                            $graza[$value['blanko_nr']]['pardavimo_suma'] = $value['pardavimo_suma']; 
                        }

                    if(array_key_exists('pvm_suma', $graza[$value['blanko_nr']])){
                        $graza[$value['blanko_nr']]['pvm_suma'] = round($value['pvm_suma'] + $graza[$value['blanko_nr']]['pvm_suma'], 2);

                        }else{
                            $graza[$value['blanko_nr']]['pvm_suma'] = $value['pvm_suma'];
                        }
                }
            }
        }     

        //pasiziuret kiek susimok4jo kurjeriui atvezus preke
        $ne = array();
        $ne2 = array();
        foreach($naujas as $val){
            if($val['pristatymas'] == "1.5" || $val['pristatymas'] == "5"){
                $ne[] = $val;
            }else{
                $ne2[] = $val;
            }
        }

        $naujas = array_values($naujas);
        sort($graza);
        $graza = array_values($graza);

        return response()->json([
            'status' => true,
            'sarasas' => $naujas,
            'bepasto' => $ne2,
            'pastas' => $ne,
            'graza' => $graza,
        ]);
    }

    public function pigult()
    {
        //nustatymai
        $failas = "apyvarta.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $data_nuo = $key[0];
        $data_iki = $key[1];

        $sarasas = array();

        $sarasas = Inte::query()
            ->where('sandelis', 'PIGU')
            ->whereBetween('dok_data', [$this->start, $this->end])
            ->get();

        $pigu = array();
        $pigu_gra = array();

        foreach($sarasas as $value){
            if(strpos($value['blanko_nr'], "GR") === false){
            if($value['blanko_nr'] == "0"){
                $value['blanko_nr'] = $value['blanko_nr']."-".$value['pirkejas'];
            }

            $pigu[$value['blanko_nr']]['saskaitos_nr'] = $value['blanko_nr'];
            $pigu[$value['blanko_nr']]['prekes'][] = $value;
            $pigu[$value['blanko_nr']]['data'] = $value['dok_data'];
            $pigu[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];
            $pi = explode("ID:", $value['aprasymas']);
            $pigu[$value['blanko_nr']]['unikalus'] = $pi['1'];
            $pigu[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];

            $pigu[$value['blanko_nr']]['pristatymas'] = 0;

                if(array_key_exists('suma', $pigu[$value['blanko_nr']])){
                    $pigu[$value['blanko_nr']]['suma'] = round($value['suma'] + $pigu[$value['blanko_nr']]['suma'], 2);
                    }else{
                        $pigu[$value['blanko_nr']]['suma'] = $value['suma']; 
                    }

                if(array_key_exists('pardavimo_suma', $pigu[$value['blanko_nr']])){
                    $pigu[$value['blanko_nr']]['pardavimo_suma'] = round($value['pardavimo_suma'] + $pigu[$value['blanko_nr']]['pardavimo_suma'], 2);
                    }else{
                        $pigu[$value['blanko_nr']]['pardavimo_suma'] = $value['pardavimo_suma']; 
                    }

                if(array_key_exists('pvm_suma', $pigu[$value['blanko_nr']])){
                    $pigu[$value['blanko_nr']]['pvm_suma'] = round($value['pvm_suma'] + $pigu[$value['blanko_nr']]['pvm_suma'], 2);

                    }else{
                        $pigu[$value['blanko_nr']]['pvm_suma'] = $value['pvm_suma'];}
            }else{
            //darysim grazinimus
            $pigu_gra[$value['blanko_nr']]['saskaitos_nr'] = $value['blanko_nr'];
            $pigu_gra[$value['blanko_nr']]['prekes'][] = $value['barkodas'];
            $pigu_gra[$value['blanko_nr']]['data'] = $value['dok_data'];

            $pi = explode("ID:", $value['aprasymas']);
            $pigu_gra[$value['blanko_nr']]['unikalus'] = $pi['1'];
            $pigu_gra[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];

            $pigu_gra[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];

                if(array_key_exists('suma', $pigu_gra[$value['blanko_nr']])){
                    $pigu_gra[$value['blanko_nr']]['suma'] = round($value['suma'] + $pigu_gra[$value['blanko_nr']]['suma'], 2);
                    }else{
                        $pigu_gra[$value['blanko_nr']]['suma'] = $value['suma']; 
                    }

                if(array_key_exists('pardavimo_suma', $pigu_gra[$value['blanko_nr']])){
                    $pigu_gra[$value['blanko_nr']]['pardavimo_suma'] = round($value['pardavimo_suma'] + $pigu_gra[$value['blanko_nr']]['pardavimo_suma'], 2);
                    }else{
                        $pigu_gra[$value['blanko_nr']]['pardavimo_suma'] = $value['pardavimo_suma']; 
                    }

                if(array_key_exists('pvm_suma', $pigu_gra[$value['blanko_nr']])){
                    $pigu_gra[$value['blanko_nr']]['pvm_suma'] = round($value['pvm_suma'] + $pigu_gra[$value['blanko_nr']]['pvm_suma'], 2);

                    }else{
                        $pigu_gra[$value['blanko_nr']]['pvm_suma'] = $value['pvm_suma'];
                    }
                }
        }

        $pigu = array_values($pigu);
        $pigu_gra = array_values($pigu_gra);

        return response()->json([
            'status' => true,
            'sarasas' => $pigu,
            'graza' => $pigu_gra,
        ]);
    }

    public function indexlv()
    {
        //nustatymai
        $failas = "apyvarta.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $data_nuo = $key[0];
        $data_iki = $key[1];

        $sarasas = array();
        $bankas = array();

        $sarasas = Inte::query()
            ->where('sandelis', 'INLV')
            ->whereBetween('dok_data', [$this->start, $this->end])
            ->get();

        $bankas = Bankas::query()
            ->where('salis', 'LV')
            ->get();


        $naujas = array();
        $graza = array();

        $nr = array();

        $bank = array();
        $gra = array();
        $gra2 = array();

        foreach($bankas as $row){
            $ex = explode(" ", $row['paskirtis']);
			
			if(count($ex) == 1){
                $bank[$row['paskirtis']] = $row;
            }
            if($ex[0] == "ORDER" || $ex[0] == "Order"){
                $bank[$ex[1]] = $row;
            }

            if(count($ex) > 1){
                if($ex[0] == "Payment"){
                    $bank[$ex[1]] = $row;
                }

                if($ex[1] == "GRĄŽINIMAS" || $ex[1] == "grąžinimas"){
                    $gra[$ex[0]]/*[]*/ = $row;
                    $gra2[$ex[0]][] = $row['suma'];
                }
            }
        }

        //ne=inau ka cia daro
        $sa = Inte::query()
        ->where('sandelis', 'INLV')
        ->get();

        $list_gra = array();
        foreach($sa as $ro){
            if(is_numeric($ro['blanko_nr'])){
                //$ey = explode(' ', $ro['aprasymas']);
                $list_gra[$ro['blanko_nr']] = $ro;
            }
        }

        

        foreach($sarasas as $value){
            if(is_numeric($value['blanko_nr'])){
                //apsauga, jei nesuteiktas blanko nr
                if($value['blanko_nr'] == "0"){
                    $value['blanko_nr'] = $value['blanko_nr']."-".$value['pirkejas'];
                }

                $naujas[$value['blanko_nr']]['saskaitos_nr'] = intval($value['blanko_nr']);
                $naujas[$value['blanko_nr']]['prekes'][] = $value;
                $naujas[$value['blanko_nr']]['data'] = $value['dok_data'];
                $naujas[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];

                $naujas[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];

                $ey = explode(' ', $value['aprasymas']);

                if(count($ey) > 2){
                    $naujas[$value['blanko_nr']]['unikalus'] = $ey[1];
                    if(array_key_exists($ey[1], $bank)){
                        $naujas[$value['blanko_nr']]['bankas'] = $bank[$ey[1]];
                        $naujas[$value['blanko_nr']]['bankas_suma'] = $bank[$ey[1]]['suma'];
                    } 
                }
                
                if($value['barkodas'] != 'BIG-170715'){
                    if(!array_key_exists('pristatymas', $naujas[$value['blanko_nr']])){
                        //if($naujas[$value['blanko_nr']]['pristatymas']){
                            $naujas[$value['blanko_nr']]['pristatymas'] = 0;
                        //}
                    }

                    if(array_key_exists('suma', $naujas[$value['blanko_nr']])){
                        $naujas[$value['blanko_nr']]['suma'] = round($value['suma'] + $naujas[$value['blanko_nr']]['suma'], 2);
                    }else{
                        $naujas[$value['blanko_nr']]['suma'] = $value['suma']; 
                    }

                    if(array_key_exists('pardavimo_suma', $naujas[$value['blanko_nr']])){
                        $naujas[$value['blanko_nr']]['pardavimo_suma'] = round($value['pardavimo_suma'] + $naujas[$value['blanko_nr']]['pardavimo_suma'], 2);
                    }else{
                        $naujas[$value['blanko_nr']]['pardavimo_suma'] = $value['pardavimo_suma']; 
                    }

                    if(array_key_exists('pvm_suma', $naujas[$value['blanko_nr']])){
                        $naujas[$value['blanko_nr']]['pvm_suma'] = round($value['pvm_suma'] + $naujas[$value['blanko_nr']]['pvm_suma'], 2);
                        }else{
                            $naujas[$value['blanko_nr']]['pvm_suma'] = $value['pvm_suma'];
                        }
                    }else{
                        $naujas[$value['blanko_nr']]['pristatymas'] = $value['suma'];
                }
            }else{
                //darysim grazinimus
                $graza[$value['blanko_nr']]['saskaitos_nr'] = $value['blanko_nr'];
                $graza[$value['blanko_nr']]['prekes'][] = $value['barkodas'];
                $graza[$value['blanko_nr']]['data'] = $value['dok_data'];

                $graza[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];
                $graza[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];

                $ey = explode(' ', $value['aprasymas']);

                if(count($ey) > 2){
                    $graza[$value['blanko_nr']]['unikalus'] = $ey[2];
                    if(array_key_exists($ey[2], $gra)){ 
                            $graza[$value['blanko_nr']]['bankas'] = $gra[$ey[2]]/*[0]*/;
                            $graza[$value['blanko_nr']]['bankas_list'] = $gra2[$ey[2]];

                            $graza[$value['blanko_nr']]['bankas_suma'] = $gra[$ey[2]]['suma'];
                    } 
                }else{
                    if(array_key_exists($ey[0], $list_gra)){ 
                            $ee = explode(" ", $list_gra[$ey[0]]['aprasymas']);
                            if(count($ee) > 1){
                                $graza[$value['blanko_nr']]['unikalus'] =  $ee[1];
                                if(array_key_exists($ee[1], $gra)){ 
                                    $graza[$value['blanko_nr']]['bankas'] = $gra[$ee[1]]/*[0]*/;
                                    $graza[$value['blanko_nr']]['bankas_list'] = $gra2[$ee[1]];

                                    $graza[$value['blanko_nr']]['bankas_suma'] = $gra[$ee[1]]['suma'];
                                } 
                            }
                    }else{
                        $graza[$value['blanko_nr']]['unikalus'] =  $ey[0];
                    }
                }

                if(array_key_exists('suma', $graza[$value['blanko_nr']])){
                    $graza[$value['blanko_nr']]['suma'] = round($value['suma'] + $graza[$value['blanko_nr']]['suma'], 2);
                }else{
                    $graza[$value['blanko_nr']]['suma'] = $value['suma']; 
                }

                if(array_key_exists('pardavimo_suma', $graza[$value['blanko_nr']])){
                    $graza[$value['blanko_nr']]['pardavimo_suma'] = round($value['pardavimo_suma'] + $graza[$value['blanko_nr']]['pardavimo_suma'], 2);
                }else{
                    $graza[$value['blanko_nr']]['pardavimo_suma'] = $value['pardavimo_suma']; 
                }

                if(array_key_exists('pvm_suma', $graza[$value['blanko_nr']])){
                    $graza[$value['blanko_nr']]['pvm_suma'] = round($value['pvm_suma'] + $graza[$value['blanko_nr']]['pvm_suma'], 2);

                }else{
                    $graza[$value['blanko_nr']]['pvm_suma'] = $value['pvm_suma'];
                }
            }
                
        }

        $venipak = array();
        foreach($naujas as $new){
            $ea = explode(" ", $new['aprasymas']);
            if(count($ea) > 3){
                if($ea[2] == "Venipak"){
                    $venipak[] = $new;
                }
            }
        }

        $venipak = array_values($venipak);
        $naujas = array_values($naujas);
        sort($graza);
        $graza = array_values($graza);

        return response()->json([
            'status' => true,
            'sarasas' => $naujas,
            'graza' => $graza,
            'venipak' => $venipak
        ]);
    }

    public function indexee()
    {
        //nustatymai
        $failas = "apyvarta.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $data_nuo = $key[0];
        $data_iki = $key[1];

        $sarasas = array();
        $bankas = array();

        $sarasas = Inte::query()
            ->where('sandelis', 'INEE')
            ->whereBetween('dok_data', [$this->start, $this->end])
            ->get();

        $bankas = Bankas::query()
            ->where('salis', 'EE')
            ->get();


        $naujas = array();
        $graza = array();

        $nr = array();

        $bank = array();
        $gra = array();
        $gra2 = array();

        foreach($bankas as $row){
            $ex = explode(" ", $row['paskirtis']);
			
			if(count($ex) == 1){
                $bank[$row['paskirtis']] = $row;
            }
            if($ex[0] == "ORDER" || $ex[0] == "Order"){
                $bank[$ex[1]] = $row;
            }

            if(count($ex) > 1){
                if($ex[0] == "Payment"){
                    $bank[$ex[1]] = $row;
                }

                if($ex[1] == "GRĄŽINIMAS" || $ex[1] == "grąžinimas"){
                    $gra[$ex[0]]/*[]*/ = $row;
                    $gra2[$ex[0]][] = $row['suma'];
                }
            }
        }

        //ne=inau ka cia daro
        $sa = Inte::query()
        ->where('sandelis', 'INEE')
        ->get();

        $list_gra = array();
        foreach($sa as $ro){
            if(is_numeric($ro['blanko_nr'])){
                //$ey = explode(' ', $ro['aprasymas']);
                $list_gra[$ro['blanko_nr']] = $ro;
            }
        }

        

        foreach($sarasas as $value){
            if(is_numeric($value['blanko_nr'])){
                //apsauga, jei nesuteiktas blanko nr
                if($value['blanko_nr'] == "0"){
                    $value['blanko_nr'] = $value['blanko_nr']."-".$value['pirkejas'];
                }

                $naujas[$value['blanko_nr']]['saskaitos_nr'] = intval($value['blanko_nr']);
                $naujas[$value['blanko_nr']]['prekes'][] = $value;
                $naujas[$value['blanko_nr']]['data'] = $value['dok_data'];
                $naujas[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];

                $naujas[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];

                $ey = explode(' ', $value['aprasymas']);

                if(count($ey) > 2){
                    $naujas[$value['blanko_nr']]['unikalus'] = $ey[1];
                    if(array_key_exists($ey[1], $bank)){
                        $naujas[$value['blanko_nr']]['bankas'] = $bank[$ey[1]];
                        $naujas[$value['blanko_nr']]['bankas_suma'] = $bank[$ey[1]]['suma'];
                    } 
                }
                
                if($value['barkodas'] != 'BIG-170716'){
                    if(!array_key_exists('pristatymas', $naujas[$value['blanko_nr']])){
                        //if($naujas[$value['blanko_nr']]['pristatymas']){
                            $naujas[$value['blanko_nr']]['pristatymas'] = 0;
                        //}
                    }

                    if(array_key_exists('suma', $naujas[$value['blanko_nr']])){
                        $naujas[$value['blanko_nr']]['suma'] = round($value['suma'] + $naujas[$value['blanko_nr']]['suma'], 2);
                    }else{
                        $naujas[$value['blanko_nr']]['suma'] = $value['suma']; 
                    }

                    if(array_key_exists('pardavimo_suma', $naujas[$value['blanko_nr']])){
                        $naujas[$value['blanko_nr']]['pardavimo_suma'] = round($value['pardavimo_suma'] + $naujas[$value['blanko_nr']]['pardavimo_suma'], 2);
                    }else{
                        $naujas[$value['blanko_nr']]['pardavimo_suma'] = $value['pardavimo_suma']; 
                    }

                    if(array_key_exists('pvm_suma', $naujas[$value['blanko_nr']])){
                        $naujas[$value['blanko_nr']]['pvm_suma'] = round($value['pvm_suma'] + $naujas[$value['blanko_nr']]['pvm_suma'], 2);
                        }else{
                            $naujas[$value['blanko_nr']]['pvm_suma'] = $value['pvm_suma'];
                        }
                    }else{
                        $naujas[$value['blanko_nr']]['pristatymas'] = $value['suma'];
                }
            }else{
                //darysim grazinimus
                $graza[$value['blanko_nr']]['saskaitos_nr'] = $value['blanko_nr'];
                $graza[$value['blanko_nr']]['prekes'][] = $value['barkodas'];
                $graza[$value['blanko_nr']]['data'] = $value['dok_data'];

                $graza[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];
                $graza[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];

                $ey = explode(' ', $value['aprasymas']);

                if(count($ey) > 2){
                    $graza[$value['blanko_nr']]['unikalus'] = $ey[2];
                    if(array_key_exists($ey[2], $gra)){ 
                            $graza[$value['blanko_nr']]['bankas'] = $gra[$ey[2]]/*[0]*/;
                            $graza[$value['blanko_nr']]['bankas_list'] = $gra2[$ey[2]];

                            $graza[$value['blanko_nr']]['bankas_suma'] = $gra[$ey[2]]['suma'];
                    } 
                }else{
                    if(array_key_exists($ey[0], $list_gra)){ 
                            $ee = explode(" ", $list_gra[$ey[0]]['aprasymas']);
                            if(count($ee) > 1){
                                $graza[$value['blanko_nr']]['unikalus'] =  $ee[1];
                                if(array_key_exists($ee[1], $gra)){ 
                                    $graza[$value['blanko_nr']]['bankas'] = $gra[$ee[1]]/*[0]*/;
                                    $graza[$value['blanko_nr']]['bankas_list'] = $gra2[$ee[1]];

                                    $graza[$value['blanko_nr']]['bankas_suma'] = $gra[$ee[1]]['suma'];
                                } 
                            }
                    }else{
                        $graza[$value['blanko_nr']]['unikalus'] =  $ey[0];
                    }
                }

                if(array_key_exists('suma', $graza[$value['blanko_nr']])){
                    $graza[$value['blanko_nr']]['suma'] = round($value['suma'] + $graza[$value['blanko_nr']]['suma'], 2);
                }else{
                    $graza[$value['blanko_nr']]['suma'] = $value['suma']; 
                }

                if(array_key_exists('pardavimo_suma', $graza[$value['blanko_nr']])){
                    $graza[$value['blanko_nr']]['pardavimo_suma'] = round($value['pardavimo_suma'] + $graza[$value['blanko_nr']]['pardavimo_suma'], 2);
                }else{
                    $graza[$value['blanko_nr']]['pardavimo_suma'] = $value['pardavimo_suma']; 
                }

                if(array_key_exists('pvm_suma', $graza[$value['blanko_nr']])){
                    $graza[$value['blanko_nr']]['pvm_suma'] = round($value['pvm_suma'] + $graza[$value['blanko_nr']]['pvm_suma'], 2);

                }else{
                    $graza[$value['blanko_nr']]['pvm_suma'] = $value['pvm_suma'];
                }
            }  
        }

        $venipak = array();
        foreach($naujas as $new){
            $ea = explode(" ", $new['aprasymas']);
            if(count($ea) > 3){
                if($ea[2] == "Venipak"){
                    $venipak[] = $new;
                }
            }
        }

        $venipak = array_values($venipak);

        $naujas = array_values($naujas);
        sort($graza);
        $graza = array_values($graza);

        return response()->json([
            'status' => true,
            'sarasas' => $naujas,
            'graza' => $graza,
            'venipak' => $venipak
        ]);
    }

    public function store_bankas(Request $request){
        $uploadedFile = $request->file('file_bankas');

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

    public function store_pardavimai(Request $request){
        $uploadedFile = $request->file('file_pardavimai');

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
        $bankas = $request->file_bankas;
        $pardavimai = $request->file_pardavimai;
        $sandelis = $request->sandelis;
        $bid = $request->bankas;

        $directory  = "app/CSV_DATA/";
        $bankas = $directory.$bankas;
        $pardavimai = $directory.$pardavimai;

        if($bid != ""){
            DB::table('bankas')->where('salis', $bid)->delete();
            $flag = true;
            $da = [];
            if (($handle = fopen(storage_path($bankas), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");

                if($val[12] != ""){
                    $da[] = [
                        'data' => $val[1],
                        'suma' => $val[3],
                        'c_d' => $val[5],
                        'paskirtis' => $val[12],
                        'pavadinimas' =>  $val[16],
                        'saskaita' => $val[15],
                        'salis' => $bid,
                    ];
                }
            }
            fclose($handle);
            }
            unlink(storage_path($bankas));
            
            $chunks = array_chunk($da, 300);
            foreach($chunks as $val){
                Bankas::insert($val);
            }
        }

        DB::table('intes')->where('sandelis', $sandelis)->delete();
        $flag = true;
        $da = [];
        if (($handle = fopen(storage_path($pardavimai), "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
            //praleidziam pirma eilute
            if($flag) { $flag = false; continue; }
            $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");

            if($val[0] == $sandelis){
                $kiek = explode(",", $val[11]);
                $kiek = $kiek[0];
                if(!$bid){$bid = "LT";}

                $da[] = [
                    'preke' => $val[6],
                    'pavadinimas' => $val[7],
                    'barkodas' => $val[5],
                    'grupe' => $val[7],
                    'sandelis' => $val[0],
                    'kiekis' => $kiek,
                    'pardavimo_kaina' => floatval(str_replace(",", ".", $val[12])),
                    'pardavimo_suma' => floatval(str_replace(",", ".", $val[12])),
                    'pvm' => floatval(str_replace(",", ".", $val[13])),
                    'pvm_suma' => floatval(str_replace(",", ".", $val[14])),
                    'suma' => floatval(str_replace(",", ".", $val[15])),
                    'grupes_pavadinimas' => $val[7],
                    'registras' => $val[8],
                    'salis' => $bid,
                    'dok_nr' => $val[1],
                    'dok_data' => $val[2],
                    'blanko_nr' => $val[3],
                    'pirkejas' => $val[4],
                    'pirkejas2' => preg_replace('/\d/', '', $val[4] ),
                    'aprasymas' => $val[9],
                ];
            }
        }
        fclose($handle);
        }
        unlink(storage_path($pardavimai));

        $chunks = array_chunk($da, 300);
        foreach($chunks as $val){
            Inte::insert($val);
        }


        return response()->json([
            'status' => true,
            'data' => $request,
            'sandelis' => $sandelis,
            'bid' => $bid
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Inte  $inte
     * @return \Illuminate\Http\Response
     */
    public function show(Inte $inte)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Inte  $inte
     * @return \Illuminate\Http\Response
     */
    public function edit(Inte $inte)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Inte  $inte
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Inte $inte)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Inte  $inte
     * @return \Illuminate\Http\Response
     */
    public function destroy(Inte $inte)
    {
        //
    }
}
