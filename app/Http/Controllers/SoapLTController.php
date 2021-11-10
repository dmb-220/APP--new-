<?php

namespace App\Http\Controllers;

use App\Models\Soap;
use Illuminate\Http\Request;

use SoapClient;

class SoapLTController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $failas = "soaplt.txt";
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
            "TELS" => array("name" => "Telšiai", "adresas" => "Kęstučio g. 25, Telšiai, LT-87120", "laikas" => "I - V 10 - 19 VI 10 - 16"),
            "MAXI" => array("name" => "Kaunas (MAXI)", "adresas" => "Pramonės pr. 29. Maxima XXX, Kaunas, LT-33135", "laikas" => "I - VI 10 - 20 VII 10 - 18"),
            "NORF" => array("name" => "Kaunas (NORF)", "adresas" => "Šiaurės pr. 44, Norfa XXL, Kaunas, LT-49227", "laikas" => "I - VI 10 - 19 VII 10 - 16"),
            "MOLA" => array("name" => "Kaunas (MOLA)", "adresas" => "K.Baršausko g. 66A, PPC Molas, Kaunas LT-51436", "laikas" => "I-VII 10-21"),
            "TAUB" => array("name" => "Kaunas (TAUB)", "adresas" => "Jotvingių g. 15, Kaunas LT-48124", "laikas" => "I - V 10 - 19"),
            "SAUL" => array("name" => "Šiauliai (SAUL)", "adresas" => "Tilžės g. 109, PPC SAULĖS MIESTAS, Šiauliai, LT-77159", "laikas" => "I - VII 10 - 21"),
            "AREN" => array("name" => "Šiauliai (AREN)", "adresas" => "Gegužių g. 30, PC ARENA, Šiauliai, LT-78346", "laikas" => "I - VI 10 - 19 VII 10 - 18"),
            "MAZE" => array("name" => "Mažeikiai", "adresas" => "M.Daukšos g. 26, Mažeikiai, LT-89234", "laikas" => "II - V 10 - 18 VI 9 - 15"),
            "MANT" => array("name" => "Klaipėda (MANT)", "adresas" => "H. Manto 31, Klaipėda, PC IKI, LT-92236", "laikas" => "I - V 10 - 18"), 
            "TAIK" => array("name" => "Klaipėda (TAIK)", "adresas" => "Taikos pr. 64, PC Taikos64, Klaipėda", "laikas" => "I - VI 10 - 20 VII 10 - 18"),
            "BIGA" => array("name" => "Klaipėda (BIGA)", "adresas" => "Taikos pr. 139, Klaipėda, PC MOLAS, LT-94284", "laikas" => "I - VI 10 - 20 VII 10 - 19"),
            "MARI" => array("name" => "Marijampolė", "adresas" => "Vytauto g. 48A, PC IKI, Marijampolė, LT-68296", "laikas" => "I - VI 10 - 19 VII 10 - 16"),    
            "KEDA" => array("name" => "Kedainiai", "adresas" => "Tilto g. 2, Kėdainiai, PC IKI, LT-57256", "laikas" => "I - VI 10 - 20 VII 10 - 17"),            
            "VISA" => array("name" => "Visaginas", "adresas" => "Veteranų g. 2, PC DOMINO, Visaginas, LT-31138", "laikas" => "I - V 10 - 19 VI 10 - 17 VII 10 - 16"),
            //"UTEN" => array("name" => "Telšiai", "adresas" => "Kęstučio 25, Telšiai", "laikas" => "I - V 10 - 18 VI 10 - 14"),            
            "MADA" => array("name" => "Vilnius (MADA)", "adresas" => "Viršuliškių g. 40, PC MADA, Vilnius, LT-05112", "laikas" => "I - VI 10 - 21 VII 10 - 18"),
            "MINS" => array("name" => "Vilnius (MINS)", "adresas" => "Liepkalnio g. 112, MAXIMA XXX, Vilnius, LT-02121", "laikas" => "I - V 10 - 20 VI - VII 10 - 18"),
            "UKME" => array("name" => "Vilnius (UKME)", "adresas" => "Ukmergės g. 369, PC BIG, LT-06327 Vilnius", "laikas" => "I - VI 10 - 21 VII 10 - 20"),
            "BABI" => array("name" => "Panevėžys (BABI)", "adresas" => "Klaipėdos g. 143A, PPC BABILONAS, Panevėžys", "laikas" => "I - VII 10 - 20"),
            "PANE" => array("name" => "Panevėžys (PANE)", "adresas" => "Ukmergės g. 23, PC MAXIMA, Panevėžys, LT-35177", "laikas" => "I - V 9 - 19 VI 9 - 18 VII 10 - 16"),
        );
    
    
        $arr = array();
        $arr['list'] = array();

        if($ieskoti != ""){
            $client = new SoapClient('http://lt2.dineta.eu/sidonas/ws/export/ws.php?wsdl');   
            // parametru padavimas
            /*$p['param'][0]['name'] = 'date';
            $p['param'][0]['value'] = date("Y-m-d");
            $p['param'][1]['name'] = 'stockid';
            $p['param'][1]['value'] = $ieskoti;
            $p['param'][2]['name'] = 'storeid';
            $p['param'][2]['value'] = $sandelis;
            $p['param'][3]['name'] = 'null_quant';
            $p['param'][3]['value'] = 0;*/

            $p = array();
            $p['param'][0]['name'] = "date";
            $p['param'][0]['value'] = "2021-07-13";
            $p['param'][1]['name'] = "storeid";
            $p['param'][1]['value'] = "BIGA";
            $p['param'][2]['name'] = "null_quant";
            $p['param'][2]['value'] = "1";


            $response = $client->get_stock_quant($p);

            //var_dump($client->__getFunctions()); 
            //var_dump($client->__getTypes()); 

            var_dump($response);
            exit;

            $arr['kodas'] = $p['param'][1]['value'];
            $arr['data'] = $p['param'][0]['value'];
            

            foreach($response->stock as $v){
                //isimtys
                if($v->storeid != "TELSIAI" && $v->storeid != "ZILT"  && $v->storeid != "INTE"){
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

        $failas = "soaplt.txt";
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
