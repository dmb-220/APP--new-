<?php

namespace App\Http\Controllers;

use App\Models\IntePreke;
//use App\Pardavimai;
//use App\Likutis;
//use App\Atsargos;
use App\Models\File;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class IntePrekeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //KATEGORIJA
        //pagal koki algoritma daryti perkelimus
        $category = 1;

        $failas = "inte.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $k = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $k = explode("||", $k);

        $paieska_big = $k[1];
        $keyword = $k[0];

        $salis['LT'] = $k[2];
        $salis['LV'] = $k[3]; 
        $salis['EE'] = $k[4];
        
        $tags = unserialize($k[5]);

        if($paieska_big){
            $pa = "%{$keyword}%";
        }else{
            $pa = "{$keyword}%";
        }

        //palieku, gal ateityje bus reikalinga
        $pirk = 1;
        $gam = 1;

        $likutis = IntePreke::where('salis', "1")
        ->whereIn('sandelis', ['INTE', 'INLV', 'INEE'])
        ->where(function ($query) use($tags, $paieska_big) {
            for ($i = 0; $i < count($tags); $i++){
                if($paieska_big){
                    $query->orwhere('preke', 'like', "%{$tags[$i]}%");
                }else{
                    $query->orwhere('preke', 'like', "{$tags[$i]}%");
                }
            }   
        })  
        //isimam ko nereikia perkelti, pagal grupiu pavadinimus 
        ->whereNotIn('pavadinimas', ['Med. švarkas', 'Med. kelnės', 'Kelnaitės'])
        ->when(!$gam, function ($q) {
            return $q->where('registras', "GAM");
        })
        ->when(!$pirk, function ($q) {
            return $q->where('registras', "PIRK");
        })
        ->get();
        
        $list = array();

        foreach($likutis as $row){
            $ne = $row['preke'];

            if($row['sandelis'] == "INTE"){$arr = 'LT';}
            if($row['sandelis'] == "INLV"){$arr = 'LV';}
            if($row['sandelis'] == "INEE"){$arr = 'EE';}

            $list[$ne]['preke'] = $ne;
            $list[$ne]['registras'] = $row['registras'];
            $list[$ne]['savikaina'] = $row['savikaina'];
            if(!array_key_exists('kaina', $list[$ne])){
                $list[$ne]['kaina'] = $row['kaina'];
            }else{
                if($list[$ne]['kaina'] == 0){
                    $list[$ne]['kaina'] = $row['kaina'];
                }
            }            
            if(!array_key_exists('liko_'.$arr, $list[$ne])){
                $list[$ne]['liko_'.$arr] = $row['kiekis'];
            }else{
                $list[$ne]['liko_'.$arr] += $row['kiekis'];
            }
        }

        $sarasas = array();
        $to = array();

        if($category == 2){

        }

        if($category == 1){
            foreach($list as $key => $row){
                $row['new_LT'] = 0;
                $row['new_LV'] = 0;
                $row['new_EE'] = 0; 
                //pasiimam kiekius
                if(!array_key_exists('liko_LT', $row)){ 
                    $liko_LT = 0;}else{ $liko_LT = $row['liko_LT']; }
                if(!array_key_exists('liko_LV', $row)){ 
                    $liko_LV = 0;}else{ $liko_LV = $row['liko_LV']; }
                if(!array_key_exists('liko_EE', $row)){ 
                    $liko_EE = 0;}else{ $liko_EE = $row['liko_EE']; }

                //echo $liko_LT." /-/ ".$liko_LV." /-/ ".$liko_EE."<br>";
                $row['new_LT'] = $liko_LT;
                $row['new_LV'] = $liko_LV;
                $row['new_EE'] = $liko_EE; 

                //tikrinam ar kodas yra 0 LV, LT ar EE likutis
                if($liko_LT == 0 || $liko_LV == 0  || $liko_EE == 0){
                    //tikrinam ar yra is ko daryti perkelimus LT > 2, LV ir EE > 1
                    $viso = $liko_LT + $liko_LV + $liko_EE;
                    //ZIURETI KUR DAUGIAU, IS TOS SALIES KELTI
                    //randam max kieki
                    $max = 0;
                    $max = max($liko_LT, $liko_LV, $liko_EE);
                    $row['max'] = $max;
                    $kiek_lt = 0;
                    $kiek_lv = 0;
                    $kiek_ee = 0;

                    //jei LT nebeturi, reikia viska perkelti is EE,
                    //Jei EE nera ir LT  nera, kelti is LV
                    
                    if($liko_LT == 0){
                        $nb_lv = 1; $nb_ee = 0;
                    }else if($liko_LT == 0 && $liko_EE == 0){
                        $nb_lv = 0; $nb_ee = 0;
                    }else{
                        $nb_lv = 2; $nb_ee = 2;
                    }

                    //tikrinam ar max atitinka su LT
                    //jei taip darom is jos perkelima
                    if($max == $liko_LT && $liko_LT > 2){                        
                        //kiek perkelti
                        if($viso >= 10 && $liko_LT - 2 > $liko_LV){$nr = 2;}else{$nr = 1;}
                        if($liko_LV < 1){ $kiek_lv = $nr; }
                        if($liko_EE < 1 && $liko_LT - $kiek_lv > 2){ $kiek_ee = $nr;}

                        //reik tikrinti kad LT likutis netaptu mazesnis negu perkeliam
                        if($liko_LV < 1 && $row['new_LV'] <= 2 && $kiek_lv > 0){
                            $to[$key."INTE-INLV"]['preke'] = $row['preke'];
                            $to[$key."INTE-INLV"]['nr'] = "INTE-INLV";
                            $to[$key."INTE-INLV"]['kiekis'] = $kiek_lv;
                            $to[$key."INTE-INLV"]['sand_is'] = "INTE";
                            $to[$key."INTE-INLV"]['sand_i'] = "INLV";
                            $row['new_LT'] = $row['new_LT'] - $kiek_lv;
                            $row['new_LV'] = $row['new_LV'] + $kiek_lv;
                        }
                        if($liko_EE < 1 && $row['new_EE'] <= 1 && $kiek_ee > 0){
                            $to[$key."INTE-INEE"]['preke'] = $row['preke'];
                            $to[$key."INTE-INEE"]['nr'] = "INTE-INEE";
                            $to[$key."INTE-INEE"]['kiekis'] = $kiek_ee;
                            $to[$key."INTE-INEE"]['sand_is'] = "INTE";
                            $to[$key."INTE-INEE"]['sand_i'] = "INEE";
                            $row['new_LT'] = $row['new_LT'] - $kiek_ee;
                            $row['new_EE'] = $row['new_EE'] + $kiek_ee;
                        }

                        $sarasas[$key] = $row;
                    }

                    //tikrinam ar max atitinka su LV
                    //jei taip darom is jos perkelima
                    if($max == $liko_LV && $liko_LV > $nb_lv){
                        //kiek perkelti
                        if($viso >= 10 && $liko_LV - 2 > $liko_LT){$nr = 2;}else{$nr = 1;}

                        //su klaustuku reikia dar tobulinti
                        //perkelti i LT daugiau negu lieka LV
                        //ir jei lieka ir i EE
                        if($liko_LT < 1){
                            //i LT perkelti daugiau negu lieka LV
                            if($nr > ($row['new_LV'] - $nr)){
                                $kiek_lt = $nr;
                            }else{
                                if($liko_EE != $liko_LV){
                                $kiek_lt = $nr + (floor($liko_LV/2) - $nr);
                                }else{
                                    $kiek_lt = $nr + (floor($liko_LV/2) - ($nr + 1));
                                }
                            }
                        }

                        //nes <= 2, kad ir EE gautu, jei LV 3, duoda 1 LT ir 1 EE
                        if($liko_EE < 1 && $liko_LV - $kiek_lt >= 2){ $kiek_ee = $nr;}

                        //reik tikrinti kad LT likutis netaptu mazesnis negu perkeliam
                        if($liko_LT < 2 && $row['new_LT'] <= 2  && $kiek_lt > 0){
                            $to[$key."INLV-INTE"]['preke'] = $row['preke'];
                            $to[$key."INLV-INTE"]['nr'] = "INLV-INTE";
                            $to[$key."INLV-INTE"]['kiekis'] = $kiek_lt;
                            $to[$key."INLV-INTE"]['sand_is'] = "INLV";
                            $to[$key."INLV-INTE"]['sand_i'] = "INTE";
                            $row['new_LV'] = $row['new_LV'] - $kiek_lt;
                            $row['new_LT'] = $row['new_LT'] + $kiek_lt;
                        }
                        if($liko_EE < 1 && $row['new_EE'] <= 1 && $kiek_ee > 0){
                            $to[$key."INLV-INEE"]['preke'] = $row['preke'];
                            $to[$key."INLV-INEE"]['nr'] = "INLV-INEE";
                            $to[$key."INLV-INEE"]['kiekis'] = $kiek_ee;
                            $to[$key."INLV-INEE"]['sand_is'] = "INLV";
                            $to[$key."INLV-INEE"]['sand_i'] = "INEE";
                            $row['new_LV'] = $row['new_LV'] - $kiek_ee;
                            $row['new_EE'] = $row['new_EE'] + $kiek_ee;
                        }

                        $sarasas[$key] = $row;
                    }

                    //tikrinam ar max atitinka su EE
                    //jei taip darom is jos perkelima
                    if($max == $liko_EE && $liko_EE > $nb_ee){
                        //kiek perkelti
                        if($viso >= 10 && $liko_EE - 1 > $liko_LT){$nr = 2;}else{$nr = 1;}
                        
                        if($liko_LT < 1){
                                $kiek_lt = $nr;
                        }
                        if($liko_LV < 1 && $liko_EE - $kiek_lt > 1){ $kiek_lv = $nr;}

                        //reik tikrinti kad LT likutis netaptu mazesnis negu perkeliam
                        if($liko_LT < 2 && $row['new_LT'] <= 2  && $kiek_lt > 0){
                            $to[$key."INEE-INTE"]['preke'] = $row['preke'];
                            $to[$key."INEE-INTE"]['nr'] = "INEE-INTE";
                            $to[$key."INEE-INTE"]['kiekis'] = $kiek_lt;
                            $to[$key."INEE-INTE"]['sand_is'] = "INEE";
                            $to[$key."INEE-INTE"]['sand_i'] = "INTE";
                            $row['new_EE'] = $row['new_EE'] - $kiek_lt;
                            $row['new_LT'] = $row['new_LT'] + $kiek_lt;
                        }
                        if($liko_LV < 1 && $row['new_LV'] <= 1 && $kiek_lv > 0){
                            $to[$key."INEE-INLV"]['preke'] = $row['preke'];
                            $to[$key."INEE-INLV"]['nr'] = "INEE-INLV";
                            $to[$key."INEE-INLV"]['kiekis'] = $kiek_lv;
                            $to[$key."INEE-INLV"]['sand_is'] = "INEE";
                            $to[$key."INEE-INLV"]['sand_i'] = "INLV";
                            $row['new_EE'] = $row['new_EE'] - $kiek_lv;
                            $row['new_LV'] = $row['new_LV'] + $kiek_lv;
                        }

                        $sarasas[$key] = $row;
                    }
                }
            }
        }


        if($category == 0){
            
        }
        
        $sarasas = array_values($sarasas);
        $to = array_values($to);

        return response()->json([
            'status' => true,
            'sarasas' => $sarasas,
            'LTto' => $to,
            'tags' => $tags,
            'paieska' => $keyword,
            'paieska_big' => $paieska_big,
            'salis' => $salis
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

    public function store_save(Request $request)
    {
        $data = $request->all();
        $ieskoti = $data['ieskoti'];
        $salis = $data['salis'];
        $tags = serialize($data['tags']);
        //$gam = $data['gam'];
        //$pirk = $data['pirk'];
        $paieska_big= $data['paieska_big'];

        $failas = "inte.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $eilute = strtoupper($ieskoti)."||".$paieska_big."||".$salis['LT']."||".$salis['LV']."||".$salis['EE']."||".$tags;

        $myfile = fopen(storage_path($failas), "w");
        fwrite($myfile, $eilute);
        fclose($myfile);

        return response()->json([
            'status' => true,
            'tags' => $tags
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
        $file_LT = $request->file_LT;

        $directory  = "app/CSV_DATA/";

        //Uzkelime duomenis
        if($file_LT){
            DB::table('inte_prekes')->where('salis', 1)->delete();
            $failas = $directory.$file_LT;
            $valstybe = 1;
        
            $flag = true;
            $da = [];
            if (($handle = fopen(storage_path($failas), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                $kiek = explode(",", $val[4]);
                $kiek = $kiek[0];

                $da[] = [
                    'preke' => $val[0],
                    'pavadinimas' => $val[1],
                    'kaina' => floatval(str_replace(",", ".", $val[3])),
                    'kiekis' => $kiek,
                    'suma' => floatval(str_replace(",", ".", $val[5])),
                    'sandelis' => $val[6],
                    'registras' => $val[7],
                    'savikaina' => floatval(str_replace(",", ".", $val[8])),
                    'salis' => $valstybe
                ];
            }
            fclose($handle);
            unlink(storage_path($failas));
            }

            $chunks = array_chunk($da, 5000);
            foreach($chunks as $val){
                IntePreke::insert($val);
            }
        }

        return response()->json([
            'status' => true,
            'data' => $request->all()
        ]);
    }

    public function store_lt(Request $request){
        $uploadedFile = $request->file('file_LT');

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
     * Display the specified resource.
     *
     * @param  \App\IntePreke  $intePreke
     * @return \Illuminate\Http\Response
     */
    public function show(IntePreke $intePreke)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\IntePreke  $intePreke
     * @return \Illuminate\Http\Response
     */
    public function edit(IntePreke $intePreke)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\IntePreke  $intePreke
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IntePreke $intePreke)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\IntePreke  $intePreke
     * @return \Illuminate\Http\Response
     */
    public function destroy(IntePreke $intePreke)
    {
        //
    }
}
