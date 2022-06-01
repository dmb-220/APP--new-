<?php

namespace App\Http\Controllers;

use App\Models\Gpais;

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
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $collection = Excel::toCollection(new ExcelImport, storage_path('app/XLSX/Pakuotes.xlsm'));
        $arr = array();
        $sk = 1;
        foreach($collection[0] as $val){
            //NEITERPIAM EILUCIU, KURIOSE NERA NURODYTO KIEKIO
            if($val['gaminiu_kiekis_pakuoteje_vnt']){
                $arr[$sk]['produktoKodas'] = $val['pakuote_ir_jos_dalys'];
                $arr[$sk]['tiekimoRinkaiData'] = (String) date("Y-m-d");

                $arr[$sk]['pakuotes_rusis'] = $val['pakuotes_rusis'];
                //$arr[$sk]['veiklosBudas'] = $val['pakuote_ir_jos_dalys'];
                $ex = explode(" ", $val['sudetines_pakuotes_kategorija']);
                $kodas = $ex[1];
                $kls = "";
                if($kodas == '62' || $kodas == '65' || $kodas == '72' || $kodas == '75'){ $kls = 'CL118:SS:2016-12-07'; }
                if($kodas == '12' || $kodas == '22'){ $kls = 'CL118:MP:2016-12-07'; }
                if($kodas == '02'){ $kls = 'CL118:EV:2016-12-07'; }

                $arr[$sk]['vienos_pakuotes_svoris_tonomis'] = $val['vienos_pakuotes_svoris_tonomis'];

                //pakolkas visos importuotos CL140:1:2017-02-22
                $arr[$sk]['gavimoBudas'] = 'CL140:1:2017-02-22';
                $arr[$sk]['veiklosBudas'] = $kls;
                $arr[$sk]['kiekis'] = $val['gaminiu_kiekis_pakuoteje_vnt'];
                $arr[$sk]['dokumentoNr'] = $val['saskaitos_nr'];
                $arr[$sk]['dokumentoData'] = $val['saskaitos_data'] ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($val['saskaitos_data'])->format('Y-m-d') : null;

                //$old_nr = $val['eiles_nr'];
                //$old_name = $val['gaminio_pavadinimas'];
                $sk++;
            }
        }
        
        return response()->json([
            'status' => true,
            'array' => array_values($arr)
        ]);     
    }


    public function get_xml()
    {
        $collection = Excel::toCollection(new ExcelImport, storage_path('app/XLSX/Pakuotes.xlsm'));
        $arr = array();
        $sk = 1;
        foreach($collection[0] as $val){
            //NEITERPIAM EILUCIU, KURIOSE NERA NURODYTO KIEKIO
            if($val['gaminiu_kiekis_pakuoteje_vnt']){
                $arr['subjektas'] = array('_attributes' => ['kodas' => '180886050']);
                $arr['irasai']['__custom:irasas:'.$sk] = array('_attributes' => ['id' => $sk]);
                $arr['irasai']['__custom:irasas:'.$sk]['registracijosId'] = '2151';
                $arr['irasai']['__custom:irasas:'.$sk]['produktoKodas'] = $val['pakuote_ir_jos_dalys'];
                $arr['irasai']['__custom:irasas:'.$sk]['tiekimoRinkaiData'] = (String) date("Y-m-d");

                //$arr['irasai']['__custom:irasas:'.$sk]['gavimoBudas'] = $val['pakuotes_rusis'];
                //$arr['irasai']['__custom:irasas:'.$sk]['veiklosBudas'] = $val['pakuote_ir_jos_dalys'];
                $ex = explode(" ", $val['sudetines_pakuotes_kategorija']);
                $kodas = $ex[1];
                $kls = "";
                if($kodas == '62' || $kodas == '65' || $kodas == '72' || $kodas == '75'){
                    $kls = 'CL118:SS:2016-12-07';
                }
                if($kodas == '12' || $kodas == '22'){
                    $kls = 'CL118:MP:2016-12-07';
                }
                if($kodas == '02'){
                    $kls = 'CL118:EV:2016-12-07';
                }

                //$arr['irasai']['__custom:irasas:'.$sk]['vienos_pakuotes_svoris_tonomis'] = $val['vienos_pakuotes_svoris_tonomis'];

                //pakolkas visos importuotos CL140:1:2017-02-22
                $arr['irasai']['__custom:irasas:'.$sk]['gavimoBudas'] = 'CL140:1:2017-02-22';
                $arr['irasai']['__custom:irasas:'.$sk]['veiklosBudas'] = $kls;
                $arr['irasai']['__custom:irasas:'.$sk]['kiekis'] = $val['gaminiu_kiekis_pakuoteje_vnt'];
                $arr['irasai']['__custom:irasas:'.$sk]['dokumentoNr'] = $val['saskaitos_nr'];
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
