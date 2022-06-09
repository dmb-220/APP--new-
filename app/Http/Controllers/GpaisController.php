<?php

namespace App\Http\Controllers;

use App\Models\Gpais;

use App\Models\File;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Http\Request;

use Spatie\ArrayToXml\ArrayToXml;
use App\Imports\ExcelImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;

class GpaisController extends Controller
{
    public function valid_xml($xml, $painformat = 'gpais-vvs-zurnalas') {
        $reader = new \DOMDocument;
        $reader->loadXML($xml);
        if ($reader->schemaValidate(__DIR__ . '/xsd/' . $painformat . '.xsd')) {
            return true;
        }
        return false;
    }

    public $kategorija = array(
        "POLIETILENO PLĖVELĖ" => array(
            "62 POLIETILENO PLĖV.",
            "62 POLIETILENO PLĖVELĖ",
            "62 POLIETILENO PLĖVELĖ AUDINIUI",
            "62 POLIETILENO PLĖVELĖ AUDINIUI 50",
            "62 POLIETILENO PLĖVELĖ AUDINIUI 556",
            "62 POLIETILENO PLĖVELĖ AUDINIUI 71",
        ),
        "POLIETILENO MAIŠAI" => array(
            "62 POLIETILENO PLĖVELĖ MAŽA",
            "72 POLIETILENO PLĖVELĖ AUDINIUI", "72 POLIET. PLĖVELĖ MAŽA",
        ),
        "POPIERINĖS ETIKETĖS" => array(
            "25 ETIKETĖS 100", "25 ETIKETĖS 1000", "25 ETIKETĖS 102x150", "25 ETIKETĖS 125",
            "25 ETIKETĖS 49x40", "25 ETIKETĖS 55x17", "25 ETIKETĖS RULONIUKAIS 22x12",
            "65 ETIKETĖS 100", "65 ETIKETĖS 1000", "65 ETIKETĖS 55x17",
        ),
        "POLIETILENO MAIŠELIAI" => array(
            "02" => array(
                "02 KURJ. MAIŠ. 32,5x42,5", "02 KURJ. MAIŠ. 40x50", "02 KURJ. MAIŠ. 77X55", "02 MAIŠ.18x30 PARD. IŠ LT", 
                "02 MAIŠ. 22x40 PARD. IŠ LT", "02 MAIŠ. 24,95x30 PARD. IŠ LT", "02 MAIŠ. 26x46 PARD. IŠ LT", "02 MAIŠ. 28x50 PARD. IŠ LT", 
                "02 MAIŠ. 32,60x400 PARD. IŠ LT", "02 MAIŠ. 37X70 PARD. IŠ LT", "02 MAIŠ. 40x80 PARD. IŠ LT", "02 MAIŠ. 46,50x55 PARD. IŠ LT"
            ),  
            "12" => array(
                "12 MAIŠ. 18x30 PARD. LT", "12 MAIŠ. 22x40 PARD. LT", "12 MAIŠ. 24,95x30 PARD. LT", "12 MAIŠ. 25 LT PARD.", "12 MAIŠ. 28 LT PARD.", "12 MAIŠ. 26x46 PARD. LT", 
                "12 MAIŠ. 28x50 PARD.LT", "12 MAIŠ. 32 LT PARD.", "12 MAIŠ. 37x70 PARD. LT", "12 MAIŠ. 40x80 PARD. LT", "12 MAIŠ. 46,50x55 PARD. LT", "12 MAIŠ. 32,60x400 PARD. LT",
            ),
            "22" => array(       
                "22 KURJ. MAIŠ. 22,50 x 32,50", "22 KURJ. MAIŠ. 325x425", "22 KURJ. MAIŠ. 40x50", "22 KURJ. MAIŠ. 55x77", 
                "22 KURJ. MAIŠ. 77x55", "22 MAIŠ. SU LIPNIA JUOST. 90x120x30",
            ),
            "62" => array(
                "62 MAIŠ. 12 DID.", "62 MAIŠ. 18x30", "62 MAIŠ. 22x40", "62 MAIŠ. 25", "62 MAIŠ. 26x46", "62 MAIŠ. 28", "62 MAIŠ. 28x50", "62 MAIŠ. 30", "62 MAIŠ. 32", "62 MAIŠ. 32,60x400",
                "62 MAIŠ. 32 vnt", "62 MAIŠ. 33", "62 MAIŠ. 35", "62 MAIŠ. 37x70", "62 MAIŠ. 38", "62 MAIŠ. 40", "62 MAIŠ. 40x80", "62 MAIŠ. 44", "62 MAIŠ. 48", "62 MAIŠ. 60", 
                "62 MAIŠ. 64", "62 MAIŠ. 70", "62 MAIŠ. 85", "62 MAIŠ. DID. 15", "62 MAIŠ. DID. 18", "62 MAIŠ. DID. 21", "62 MAIŠ. DID. 31", "62 MAIŠ. DID. 38", "62 MAIŠ. DID. 40",
            ),
            "72" => array(
                "72 MAIŠ. 12 DID.", "72 MAIŠ. 25", "72 MAIŠ. 28", "72 MAIŠ. 32", "72 MAIŠ. 33", "72 MAIŠ. 35", "72 MAIŠ. 38", "72 MAIŠ. 40", "72 MAIŠ. 44", "72 MAIŠ. 60",
                "72 MAIŠ. 64", "72 MAIŠ. 70", "72 MAIŠ. 85", "72 MAIŠ. DID. 15", "72 MAIŠ. DID. 18", "72 MAIŠ. DID. 21", "72 MAIŠ. DID. 31", "72 MAIŠ. DID. 38", "72 MAIŠ. DID. 40",
            ),
        ),
        "KARTONO DĖŽĖ" => array(
            "25" => array(
                "25 DĖŽ. KURJ. 200x200x65", "25 DĖŽ. KURJ. 220x170x110", "25 DĖŽ. KURJ. 385x285x260", "25 DĖŽ. KURJ. 400x300x250",
            ),
            "65" => array(
                "65 DĖŽ. 20x28x27", "65 DĖŽ. 35x40x150", "65 DĖŽ. 38x28x27", "65 DĖŽ. 40x42x60", "65 DĖŽ. 40x60x85", "65 DĖŽ. 50x36x28", 
                "65 DĖŽ. 50x36x33", "65 DĖŽ. 50x38x36", "65 DĖŽ. 50x38x38", "65 DĖŽ. 52x32x48", "65 DĖŽ. 52x37x53", 
                "65 DĖŽ. 58x38x35", "65 DĖŽ. 5x10x12", "65 DĖŽ. 60x55x80", "65 DĖŽ. 60x80x20", "65 DĖŽ. 62x58x33", "65 DĖŽ. 64x43x62",
                "65 DĖŽ. 65x42x53", "65 DĖŽ. 65x42x68", "65 DĖŽ. 65x45x40", "65 DĖŽ. 65x65x15", "65 DĖŽ. 79x31x59",
            ),
            "75" => array(
                "75 DĖŽ. 20x28x27", "75 DĖŽ. 35x40x150", "75 DĖŽ. 38x28x27", "75 DĖŽ. 40x42x60", "75 DĖŽ. 40x60x85", "75 DĖŽ. 50x36x28",
                "75 DĖŽ. 50x36x33", "75 DĖŽ. 50x38x36", "75 DĖŽ. 50x38x38", "75 DĖŽ. 52x32x48", "75 DĖŽ. 52x37x53", "75 DĖŽ. 53x31x58",
                "75 DĖŽ. 58x38x35", "75 DĖŽ. 5x10x12", "75 DĖŽ. 60x35x40", "75 DĖŽ. 60x55x80", "75 DĖŽ. 60x80x20", "75 DĖŽ. 62x58x33",
                "75 DĖŽ. 64x43x62", "75 DĖŽ. 65x42x53", "75 DĖŽ. 65x42x68", "75 DĖŽ. 65x45x40", "75 DĖŽ. 65x65x15", "75 DĖŽ. 79x31x59",
            ),
        ),
    );
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $collection = Excel::toCollection(new ExcelImport, storage_path('app/XLSX/Pakuotes.xlsm'));
        $arr = array();
        $sk = 1; $last_blank = "";
        foreach($collection[0] as $val){
            //NEITERPIAM EILUCIU, KURIOSE NERA NURODYTO KIEKIO
            if($val['deklaruotas_kiekis_2022_03_men'] && $val['gaminiu_kiekis_pakuoteje_vnt']){
                //$arr[$sk]['produktoKodas'] = $val['pakuote_ir_jos_dalys'];
                $arr[$sk]['tiekimoRinkaiData'] = (String) date('Y-m-d', strtotime('last day of last month'));

                $arr[$sk]['pakuotes_rusis'] = $val['pakuotes_rusis'];
                //$arr[$sk]['veiklosBudas'] = $val['pakuote_ir_jos_dalys'];
                $ex = explode(" ", $val['sudetines_pakuotes_kategorija']);
                $kodas = $ex[1];
                $kls = "";
                if($kodas == '62' || $kodas == '65' || $kodas == '72' || $kodas == '75'){ $kls = 'CL118:SS:2016-12-07'; }
                if($kodas == '12' || $kodas == '22'){ $kls = 'CL118:MP:2016-12-07'; }
                if($kodas == '02'){ $kls = 'CL118:EV:2016-12-07'; }

                $pava = $val['pakuote_ir_jos_dalys']." ".$val['vienos_pakuotes_svoris_tonomis'];;
                $ey = explode(" ", $val['pakuote_ir_jos_dalys']);
                if($ey[0] == "Kartonas" && $ey[1] == "(dėžė)"){
                    foreach($this->kategorija["KARTONO DĖŽĖ"][$kodas] as $v){
                        $eo = explode(" ", $v);
                        if($ey[2] == $eo[2]){ $pava = $v;}
                    }
                }
                /*if($ey[0] == "Polietileno" && $ey[1] == "maišeliai"){
                    foreach($this->kategorija["POLIETILENO MAIŠELIAI"][$kodas] as $v){
                        $eo = explode(" ", $v);
                        if($ey[2] == $eo[2]){ $pava = $v;}
                    }
                }*/

                $arr[$sk]['produktoKodas'] = $pava; //$val['pakuote_ir_jos_dalys'];
                //pakolkas visos importuotos CL140:1:2017-02-22
                $arr[$sk]['gavimoBudas'] = 'CL140:1:2017-02-22';
                $arr[$sk]['veiklosBudas'] = $kls;
                $arr[$sk]['kiekis'] = $val['deklaruotas_kiekis_2022_03_men'];
                $arr[$sk]['vienos_pakuotes_svoris_tonomis'] = $val['vienos_pakuotes_svoris_tonomis'];
                if($val['saskaitos_nr']){
                    $last_blank = $val['saskaitos_nr'];
                    $arr[$sk]['dokumentoNr'] = $val['saskaitos_nr'];
                }else{
                    $arr[$sk]['dokumentoNr'] = $last_blank;
                }
                $arr[$sk]['dokumentoData'] = $val['saskaitos_data'] ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($val['saskaitos_data'])->format('Y-m-d') : null;

                //$old_nr = $val['eiles_nr'];
                //$old_name = $val['gaminio_pavadinimas'];
                $sk++;
            }
        }
        
        return response()->json([
            'status' => true,
            'colection' => $collection[0],
            'array' => array_values($arr),
        ]);     
    }


    public function get_xml()
    {
        $collection = Excel::toCollection(new ExcelImport, storage_path('app/XLSX/Pakuotes.xlsm'));
        $arr = array();
        $sk = 1; $last_blank = "";
        foreach($collection[0] as $val){
            //NEITERPIAM EILUCIU, KURIOSE NERA NURODYTO KIEKIO
            if($val['deklaruotas_kiekis_2022_03_men'] && $val['gaminiu_kiekis_pakuoteje_vnt']){
                $arr['subjektas'] = array('_attributes' => ['kodas' => '180886050']);
                $arr['irasai']['__custom:irasas:'.$sk] = array('_attributes' => ['id' => $sk]);
                $arr['irasai']['__custom:irasas:'.$sk]['registracijosId'] = '2151';
                //$arr['irasai']['__custom:irasas:'.$sk]['produktoKodas'] = $val['pakuote_ir_jos_dalys'];
                //$arr['irasai']['__custom:irasas:'.$sk]['tiekimoRinkaiData'] = (String) date("Y-m-d");

                $ex = explode(" ", $val['sudetines_pakuotes_kategorija']);
                $kodas = $ex[1];
                $kls = "";
                if($kodas == '62' || $kodas == '65' || $kodas == '72' || $kodas == '75'){ $kls = 'CL118:SS:2016-12-07';}
                if($kodas == '12' || $kodas == '22'){ $kls = 'CL118:MP:2016-12-07';}
                if($kodas == '02'){$kls = 'CL118:EV:2016-12-07';}

                $pava = $val['pakuote_ir_jos_dalys'];
                $ey = explode(" ", $val['pakuote_ir_jos_dalys']);
                if($ey[0] == "Kartonas" && $ey[1] == "(dėžė)"){
                    foreach($this->kategorija["KARTONO DĖŽĖ"][$kodas] as $v){
                        $eo = explode(" ", $v);
                        if($ey[2] == $eo[2]){ $pava = $v;}
                    }
                }

                $arr['irasai']['__custom:irasas:'.$sk]['produktoKodas'] = $pava; //$val['pakuote_ir_jos_dalys'];
                $arr['irasai']['__custom:irasas:'.$sk]['tiekimoRinkaiData'] = (String) date('Y-m-d', strtotime('last day of last month'));
                //pakolkas visos importuotos CL140:1:2017-02-22
                $arr['irasai']['__custom:irasas:'.$sk]['gavimoBudas'] = 'CL140:1:2017-02-22';
                $arr['irasai']['__custom:irasas:'.$sk]['veiklosBudas'] = $kls;
                $arr['irasai']['__custom:irasas:'.$sk]['kiekis'] = $val['deklaruotas_kiekis_2022_03_men'];
                if($val['saskaitos_nr']){
                    $last_blank = $val['saskaitos_nr'];
                    $arr['irasai']['__custom:irasas:'.$sk]['dokumentoNr'] = $val['saskaitos_nr'];
                }else{
                    $arr['irasai']['__custom:irasas:'.$sk]['dokumentoNr'] = $last_blank;
                }
                $arr['irasai']['__custom:irasas:'.$sk]['dokumentoData'] = $val['saskaitos_data'] ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($val['saskaitos_data'])->format('Y-m-d') : null;

                $old_nr = $val['eiles_nr'];
                $old_name = $val['gaminio_pavadinimas'];
                $sk++;
            }
        }
        
        $arrayToXml = ArrayToXml::convert($arr, [
            'rootElementName' => 'irasuSarasas',
            '_attributes' => [
                'xmlns' => 'urn:x-gpais:vvs:zurnalas',
                'xmlns:gpais' => "urn:x-gpais:bendra",
                'xmlns:kls' => "urn:x-gpais:kls",
            ],
        ], true, 'UTF-8');

        if($this->valid_xml($arrayToXml)){
            header('Content-type: "text/xml"; charset="utf8"');
            header('Content-Disposition: attachment; filename="GPAIS.xml"');
            echo $arrayToXml;
        }else{
            echo "Klaida";
        }       
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
        //
    }

    public function store_gpais(Request $request){
        $uploadedFile = $request->file('file');

        if (!$uploadedFile->isValid()) {
            abort( 422 );
        }

        $storePath = $uploadedFile->storeAs('Gpais/', $uploadedFile->getClientOriginalName());
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
     * @param  \App\Gpais  $gpais
     * @return \Illuminate\Http\Response
     */
    public function show(Gpais $gpais)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Gpais  $gpais
     * @return \Illuminate\Http\Response
     */
    public function edit(Gpais $gpais)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Gpais  $gpais
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Gpais $gpais)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Gpais  $gpais
     * @return \Illuminate\Http\Response
     */
    public function destroy(Gpais $gpais)
    {
        //
    }
}
