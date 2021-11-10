<?php

namespace App\Http\Controllers;

use App\Models\Soap;
use Illuminate\Http\Request;

use SoapClient;

class SoapController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $failas = "soap.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $myfile = fopen(storage_path($failas), "r");
        $key = fread($myfile,filesize(storage_path($failas)));
        fclose($myfile);

        $key = explode("||", $key);
        $ieskoti = $key[0];
        $sandelis = $key[1];

        //if($sandelis == 0){ $sandelis = "";}

        $sandeliai = array(
            "" => array("name" => "Paieska pagal sandeli isjungta"), 
            //pajuris
            "LIEP" => array("name" => "LIEPĀJA", "adresas" => "Rakstvežu iela 8, LV-3401, LIEPĀJA", "laikas" => "I - V 10 - 18 VI 10 - 16"),
            "VENT" => array("name" => "VENTSPILS", "adresas" => "Lauku iela 4-1, LV-3601, VENTSPILS", "laikas" => "II - VI 10 - 18"),
            "KULD" => array("name" => "KULDĪGA", "adresas" => "Smilšu iela 24, LV-3301, KULDĪGA", "laikas" => "I - V 10 - 18 V 9 - 15"),
            "SALD" => array("name" => "SALDUS", "adresas" => "Striķu iela 12, LV-3801, SALDUS", "laikas" => "I V 10 - 18 VI 9 - 14"),
            "TAL2" => array("name" => "TALSI", "adresas" => "Rīgas iela 8, LV-3201, TALSI", "laikas" => "I-V 10-20 VI 10-17 VII 10-16"),
            "TUKU" => array("name" => "TUKUMS", "adresas" => "Kurzemes iela 36, LV-3101, TUKUMS", "laikas" => "I - V 10 - 20 VI 10 - 18 VII 10 - 16"),
            "DOBE" => array("name" => "DOBELE", "adresas" => "Tirgus laukums 5, LV-3701, DOBELE", "laikas" => "II - V 10 - 18 VI 10 - 16"),
            //vidzeme
            "SIGU" => array("name" => "SIGULDA", "adresas" => "Kr.Valdemāra iela 1, LV-2150, SIGULDA", "laikas" => "II - VI 10 - 18"),
            "VALM" => array("name" => "VALMIERA", "adresas" => "Rīgas iela 28, LV-4201, VALMIERA", "laikas" => "I - V 9 - 18 VI 9 - 14"), 
            "CESI" => array("name" => "CĒSIS", "adresas" => "Pļavas iela 5, LV-4101, CĒSIS", "laikas" => "II - VI 9 - 18 VI 9 - 14"),
            "BALV" => array("name" => "BALVI", "adresas" => "Brīvības iela 57, LV-4501, BALVI", "laikas" => "I - V 10 - 18 VI 9 - 15"),
            "LIMB" => array("name" => "LIMBAŽI", "adresas" => "Torņu iela 1, LV-4001, LIMBAŽI", "laikas" => "II - V 10 - 18 VI 10 - 14"),
            "VALK" => array("name" => "VALKA", "adresas" => "Ausekļa iela 54, Valka", "laikas" => "I - VI 10 - 19 VII 10 - 18"),
            "MADO" => array("name" => "MADONA", "adresas" => "Saules iela 23B, LV-4801, MADONA", "laikas" => "II - VI 10 - 18"),

            //ryga
            "VALD" => array("name" => "JELGAVA (VALD)", "adresas" => "Rīgas iela 11A, LV-3002, JELGAVA", "laikas" => "I - VII 10 - 21"),
            "MELN" => array("name" => "RīGA (MELN)", "adresas" => "Melnsila iela 10, LV-1046, RĪGA", "laikas" => "I - V 10 - 19 VI 10 - 18"),
            "MATI" => array("name" => "RīGA (MATI)", "adresas" => "Matīsa iela 25, LV-1001, RĪGA", "laikas" => "I - VI 10 - 18"),
            "DOLE" => array("name" => "RĪGA (DOLE)", "adresas" => "Maskavas iela 357, RĪGA, ", "laikas" => "I - VI 10 - 21 VII 10 - 20"),
            "BRIV" => array("name" => "RīGA (BRIV)", "adresas" => "Brīvības iela 49/53, LV-1010, RĪGA", "laikas" => "I - V 10 - 19 VI 10 - 18"),
            "GOBA" => array("name" => "RĪGA (GOBA)", "adresas" => "Gobas iela 10A, LV-1016, RĪGA", "laikas" => "II - VI 10 - 18"),

            //daugpilis
            "DAUG" => array("name" => "DAUGAVPILS", "adresas" => "Viestura iela 80, LV-5401, DAUGAVPILS", "laikas" => "I - V 10 - 18 VI 10 - 14"),
            "DITO" => array("name" => "DAUGAVPILS (DITO)", "adresas" => "Cietokšņa iela 60, LV-5401, DAUGAVPILS", "laikas" => "I 9 - 17 II - VI 9 - 19 VII 9 - 16"),
            "JEKA" => array("name" => "JĒKABPILS", "adresas" => "Viestura iela 5, LV-5201, JĒKABPILS", "laikas" => "I - V 10 - 18 VI 10 - 15"),
            "AIZK" => array("name" => "AIZKRAUKLE", "adresas" => "Druvas iela 2, T/C Beta, LV-5101, AIZKRAUKLE", "laikas" => "I - V 10 - 19 VI - VII 10 - 16"),        
        );
    
    
        $arr = array();
        $arr['list'] = array();

        if($ieskoti != ""){
            $client = new SoapClient('http://lt2.dineta.eu/sidonaslv/ws/export/ws.php?wsdl');   
            // parametru padavimas
            $p['param'][0]['name'] = 'date';
            $p['param'][0]['value'] = date("Y-m-d");
            $p['param'][1]['name'] = 'stockid';
            $p['param'][1]['value'] = $ieskoti;
            $p['param'][2]['name'] = 'storeid';
            $p['param'][2]['value'] = $sandelis;
            $p['param'][3]['name'] = 'null_quant';
            $p['param'][3]['value'] = '0';

            $response = $client->get_stock_quant($p);

            //var_dump($client->__getFunctions()); 
            //var_dump($client->__getTypes()); 

            //var_dump($response);
            
            $arr['kodas'] = $p['param'][1]['value'];
            $arr['data'] = $p['param'][0]['value'];
            

            foreach($response->stock as $v){
                //isimtys
                if($v->storeid != "OGRE" && $v->storeid != "ZILV"  && $v->storeid != "INTE"){
                    $arr['list'][$v->storeid]['sandelis'] = $v->storeid;
                    if(array_key_exists($v->storeid, $sandeliai)){
                        $arr['list'][$v->storeid]['adresas'] = $sandeliai[$v->storeid]['adresas'];
                        $arr['list'][$v->storeid]['laikas'] = $sandeliai[$v->storeid]['laikas'];
                        $arr['list'][$v->storeid]['name'] = $sandeliai[$v->storeid]['name'];
                    }else{$arr['list'][$v->storeid]['adresas'] = " "; }
                    $arr['list'][$v->storeid]['kiekis'] = $v->quant;
                }
            }

            $arr['list'] = array_values($arr['list']);
        }
        //var_dump($arr);
        return response()->json([
            'status' => true,
            'sarasas' => $arr,
            'sandeliai' => $sandeliai,
            'ieskoti' => $ieskoti,
            'sandelis' => $sandelis
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
        $ieskoti = $data['ieskoti'];
        $sandelis= $data['sandelis'];

        $failas = "soap.txt";
        $directory  = "app/";
        $failas = $directory.$failas;

        $eilute = strtoupper($ieskoti)."||".$sandelis;

        $myfile = fopen(storage_path($failas), "w");
        fwrite($myfile, $eilute);
        fclose($myfile);

        return response()->json([
            'status' => true,
            'data' => $ieskoti,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Soap  $soap
     * @return \Illuminate\Http\Response
     */
    public function show(Soap $soap)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Soap  $soap
     * @return \Illuminate\Http\Response
     */
    public function edit(Soap $soap)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Soap  $soap
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Soap $soap)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Soap  $soap
     * @return \Illuminate\Http\Response
     */
    public function destroy(Soap $soap)
    {
        //
    }
}
