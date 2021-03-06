<?php

namespace App\Http\Controllers;

use App\Models\Bankas;
use App\Models\Grazinimai;

use App\Models\File;
use App\Http\Requests\FileUploadRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

use Carbon\Carbon;

class GrazinimaiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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

       $data_nuo = "2020-11-01";
       $data_iki = "2020-11-30";

       $sarasas = array();

       $sarasas = Grazinimai::query()
           ->where('salis', '1')
           ->where('sandelis', 'INTE')
           //->where('sandelis', 'PIGU')
           ->get();

       $bankas = Bankas::query()
           ->where('salis', '1')
           ->get();


       $graza = array();

       $bank = array();
       foreach($bankas as $row){
        $ex = explode(" ", $row['paskirtis']);
        //EX[1] yra kodas, bet jei padarytas grazinimas, kodas buna EX[0]
        if(count($ex) > 1 && $ex[1] != "grąžinimas"){$ba = $ex[1];}else{$ba = $row['paskirtis'];}
        $bank[$ba] = $row;
        }
       //foreach($bankas as $row){
           //$ex = explode(" ", $row['paskirtis']);
           //$bank[$row['paskirtis']] = $row;
       //}

       foreach($sarasas as $value){
           if(!is_numeric($value['blanko_nr'])){
               //darysim grazinimus
               $graza[$value['blanko_nr']]['saskaitos_nr'] = $value['blanko_nr'];
               $graza[$value['blanko_nr']]['prekes'][] = $value['barkodas'];
               $graza[$value['blanko_nr']]['data'] = $value['dok_data'];

               $graza[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];

               $graza[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];
               


               $ey = explode(' ', $value['aprasymas']);

               if(count($ey) > 2){
                $graza[$value['blanko_nr']]['unikalus'] = $ey[2];
                //var_dump($ey[2]);
                //$graza[$value['blanko_nr']]['pristatymas'] = $ey[count($ey)-2]." ".$ey[count($ey)-1];
                if(array_key_exists($ey[2], $bank)){
                    //var_dump($ey[2]);
                   $graza[$value['blanko_nr']]['bankas'] = $bank[$ey[2]];
                   }  else {
                    $graza[$value['blanko_nr']]['bankas']['saskaita'] = "LT";
                   }
               }else{
                $graza[$value['blanko_nr']]['bankas']['saskaita'] = "LT";
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
    
       //pasiziuret kiek susimok4jo kurjeriui atvezus preke
       $graza = array_values($graza);

       return response()->json([
           'status' => true,
           'bankas' => $bank,
           'graza' => $graza,
       ]);
    }

    public function grazinimai_lv()
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

       $data_nuo = "2020-11-01";
       $data_iki = "2020-11-30";

       $sarasas = array();

       $sarasas = Grazinimai::query()
           ->where('salis', '2')
           ->where('sandelis', 'INLV')
           //->where('sandelis', 'PIGU')
           ->get();

       $bankas = Bankas::query()
           ->where('salis', '2')
           ->get();


       $graza = array();

       $bank = array();
       foreach($bankas as $row){
           $ex = explode(" ", $row['paskirtis']);
           //EX[1] yra kodas, bet jei padarytas grazinimas, kodas buna EX[0]
           if(count($ex) > 1 && $ex[1] != "grąžinimas"){$ba = $ex[1];}else{$ba = $row['paskirtis'];}
           $bank[$ba] = $row;
       }

       foreach($sarasas as $value){
           if(!is_numeric($value['blanko_nr'])){
               //darysim grazinimus
               $graza[$value['blanko_nr']]['saskaitos_nr'] = $value['blanko_nr'];
               $graza[$value['blanko_nr']]['prekes'][] = $value['barkodas'];
               $graza[$value['blanko_nr']]['data'] = $value['dok_data'];

               $graza[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];

               $graza[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];
               


               $ey = explode(' ', $value['aprasymas']);

               if(count($ey) > 2){
                $graza[$value['blanko_nr']]['unikalus'] = $ey[2];
                //var_dump($ey[2]);
                //$graza[$value['blanko_nr']]['pristatymas'] = $ey[count($ey)-2]." ".$ey[count($ey)-1];
                if(array_key_exists($ey[2], $bank)){
                    //var_dump($ey[2]);
                   $graza[$value['blanko_nr']]['bankas'] = $bank[$ey[2]];
                   }  else {
                    $graza[$value['blanko_nr']]['bankas']['saskaita'] = "LV";
                   }
               }else{
                $graza[$value['blanko_nr']]['bankas']['saskaita'] = "LV";
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
    
       //pasiziuret kiek susimok4jo kurjeriui atvezus preke
       $graza = array_values($graza);

       return response()->json([
           'status' => true,
           'bankas' => $bank,
           'graza' => $graza,
       ]);
    }

    public function grazinimai_ee()
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

       $data_nuo = "2020-11-01";
       $data_iki = "2020-11-30";

       $sarasas = array();

       $sarasas = Grazinimai::query()
           ->where('salis', '3')
           ->where('sandelis', 'INEE')
           //->where('sandelis', 'PIGU')
           ->get();

       $bankas = Bankas::query()
           ->where('salis', '3')
           ->get();


       $graza = array();
       $bank = array();
       foreach($bankas as $row){
        $ex = explode(" ", $row['paskirtis']);
        //EX[1] yra kodas, bet jei padarytas grazinimas, kodas buna EX[0]
        if(count($ex) > 1 && $ex[1] != "grąžinimas"){$ba = $ex[1];}else{$ba = $row['paskirtis'];}
        $bank[$ba] = $row;
        }


       foreach($sarasas as $value){
           if(!is_numeric($value['blanko_nr'])){
               //darysim grazinimus
               $graza[$value['blanko_nr']]['saskaitos_nr'] = $value['blanko_nr'];
               $graza[$value['blanko_nr']]['prekes'][] = $value['barkodas'];
               $graza[$value['blanko_nr']]['data'] = $value['dok_data'];

               $graza[$value['blanko_nr']]['pirkejas'] = $value['pirkejas'];

               $graza[$value['blanko_nr']]['aprasymas'] = $value['aprasymas'];
               


               $ey = explode(' ', $value['aprasymas']);

               if(count($ey) > 2){
                $graza[$value['blanko_nr']]['unikalus'] = $ey[2];
                //var_dump($ey[2]);
                //$graza[$value['blanko_nr']]['pristatymas'] = $ey[count($ey)-2]." ".$ey[count($ey)-1];
                if(array_key_exists($ey[2], $bank)){
                    //var_dump($ey[2]);
                   $graza[$value['blanko_nr']]['bankas'] = $bank[$ey[2]];
                   }  else {
                    $graza[$value['blanko_nr']]['bankas']['saskaita'] = "EE";
                   }
               }else{
                $graza[$value['blanko_nr']]['bankas']['saskaita'] = "EE";
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
    
       //pasiziuret kiek susimok4jo kurjeriui atvezus preke
       $graza = array_values($graza);

       return response()->json([
           'status' => true,
           'bankas' => $bank,
           'graza' => $graza,
           'ok' => 'OK'
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

    public function store_grazinimai(Request $request){
        $uploadedFile = $request->file('file_grazinimai');

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

    public function sepa(Request $request){

        $list = $request->list;

        $all = 0;

        foreach($list as $li){
            $all = $all + $li['suma'];
        }

        $creditTransfer = new \Sepa\CreditTransfer();
        //group header
        $groupHeader = new \Sepa\CreditTransfer\GroupHeader();
        $groupHeader->setControlSum(abs($all))
                ->setInitiatingPartyName('UAB Sidonas Ir Ko')
                ->setInitiatingPartyId('180886050')
                ->setMessageIdentification(Carbon::now()->toDateTimeString())
                ->setNumberOfTransactions(count($list));
        $creditTransfer->setGroupHeader($groupHeader);
        //payment information
        $paymentInformation = new \Sepa\CreditTransfer\PaymentInformation;
        
        $paymentInformation
                ->setControlSum(abs($all))
                ->setDebtorIBAN('LT414010051005488306')
                ->setDebtorBIC('AGBLLT2X')
                ->setDebtorName('UAB Sidonas Ir Ko')
                ->setPaymentInformationIdentification(date("Ymd-His"))
                ->setNumberOfTransactions(count($list))
                ->setRequestedExecutionDate(date("Y-m-d"));
        $ii = 0;
        foreach($list as $row){
            //payment
            $payment = new \Sepa\CreditTransfer\Payment;
            $ii++;
            $payment->setAmount(abs($row['suma']))
                    ->setCreditorIBAN($row['bankas']['saskaita'])
                    ->setCreditorName($row['bankas']['pavadinimas'])
                    ->setEndToEndId(date("Ymd-His")."-".$ii)
                    ->setRemittanceInformation($row['unikalus']." grąžinimas");
            
            $paymentInformation->addPayments($payment);
        }
        
        $creditTransfer->setPaymentInformation($paymentInformation);
        $xml = $creditTransfer->xml();
 
        $xml = $creditTransfer->xml();
        if ($creditTransfer->validate($xml) === true) {
            header('Content-type: "text/xml"; charset="utf8"');
            header('Content-Disposition: attachment; filename="sepa_credit_transfer.xml"');
            echo $xml;
        } else {
            echo"KLAIDA";
        }
    }

    public function sepa_LV(Request $request){

        $list = $request->list;

        $all = 0;

        foreach($list as $li){
            $all = $all + $li['suma'];
        }

        $creditTransfer = new \Sepa\CreditTransfer();
        //group header
        $groupHeader = new \Sepa\CreditTransfer\GroupHeader();
        $groupHeader->setControlSum(abs($all))
                ->setInitiatingPartyName('UAB Sidonas Ir Ko')
                ->setInitiatingPartyId('180886050')
                ->setMessageIdentification(Carbon::now()->toDateTimeString())
                ->setNumberOfTransactions(count($list));
        $creditTransfer->setGroupHeader($groupHeader);
        //payment information
        $paymentInformation = new \Sepa\CreditTransfer\PaymentInformation;
        
        $paymentInformation
                ->setControlSum(abs($all))
                ->setDebtorIBAN('LT104010051005555697')
                ->setDebtorBIC('AGBLLT2X')
                ->setDebtorName('UAB Sidonas Ir Ko')
                ->setPaymentInformationIdentification(date("Ymd-His"))
                ->setNumberOfTransactions(count($list))
                ->setRequestedExecutionDate(date("Y-m-d"));
        $ii = 0;
        foreach($list as $row){
            //payment
            $payment = new \Sepa\CreditTransfer\Payment;
            $ii++;
            $payment->setAmount(abs($row['suma']))
                    ->setCreditorIBAN($row['bankas']['saskaita'])
                    ->setCreditorName($row['bankas']['pavadinimas'])
                    ->setEndToEndId(date("Ymd-His")."-".$ii)
                    ->setRemittanceInformation($row['unikalus']." grąžinimas");
            
            $paymentInformation->addPayments($payment);
        }
        
        $creditTransfer->setPaymentInformation($paymentInformation);
        $xml = $creditTransfer->xml();
 
        $xml = $creditTransfer->xml();
        if ($creditTransfer->validate($xml) === true) {
            header('Content-type: "text/xml"; charset="utf8"');
            header('Content-Disposition: attachment; filename="sepa_credit_transfer.xml"');
            echo $xml;
        } else {
            echo"KLAIDA";
        }
    }

    public function sepa_LV2(Request $request){

        $list = $request->list;

        $count = 0;
        foreach ($list as $type) {
            $count+= $type['suma'];
        }

        //Sukuriam TXT faila
        $txt = "{1:xxxXXXXXXXXXXXXxxxxXXXXXX}{2:E11AXXXXXXXXXXXXxXxxx}{4:".PHP_EOL.":20:".time().PHP_EOL.":32A:".date("ymd")."EUR".abs($count).PHP_EOL.":50:SIDONAS SIA".PHP_EOL.":52:LV64RIKO0001080036917".PHP_EOL.":70: Prestashop Return no ".date("Y-m-d").PHP_EOL;

            $ii = 0;
            foreach($list as $row){
                $ii++;
                $txt .= ":16:".$ii.PHP_EOL.":25:".$row['bankas']['saskaita'].PHP_EOL.":3a:".abs($row['suma']).PHP_EOL.":9a:".$row['bankas']['pavadinimas'].PHP_EOL.":72:".$row['unikalus']." return".PHP_EOL; 
            }

        $txt .= "-}";

        header('Content-type: "text/plain"; charset="utf8"');
        echo $txt;
    }

    public function sepa_EE(Request $request){

        $list = $request->list;

        $all = 0;

        foreach($list as $li){
            $all = $all + $li['suma'];
        }

        $creditTransfer = new \Sepa\CreditTransfer();
        //group header
        $groupHeader = new \Sepa\CreditTransfer\GroupHeader();
        $groupHeader->setControlSum(abs($all))
                ->setInitiatingPartyName('UAB Sidonas Ir Ko')
                ->setInitiatingPartyId('180886050')
                ->setMessageIdentification(Carbon::now()->toDateTimeString())
                ->setNumberOfTransactions(count($list));
        $creditTransfer->setGroupHeader($groupHeader);
        //payment information
        $paymentInformation = new \Sepa\CreditTransfer\PaymentInformation;
        
        $paymentInformation
                ->setControlSum(abs($all))
                ->setDebtorIBAN('LT434010051005554909')
                ->setDebtorBIC('AGBLLT2X')
                ->setDebtorName('UAB Sidonas Ir Ko')
                ->setPaymentInformationIdentification(date("Ymd-His"))
                ->setNumberOfTransactions(count($list))
                ->setRequestedExecutionDate(date("Y-m-d"));
        $ii = 0;
        foreach($list as $row){
            //payment
            $payment = new \Sepa\CreditTransfer\Payment;
            $ii++;
            $payment->setAmount(abs($row['suma']))
                    ->setCreditorIBAN($row['bankas']['saskaita'])
                    ->setCreditorName($row['bankas']['pavadinimas'])
                    ->setEndToEndId(date("Ymd-His")."-".$ii)
                    ->setRemittanceInformation($row['unikalus']." grąžinimas");
            
            $paymentInformation->addPayments($payment);
        }
        
        $creditTransfer->setPaymentInformation($paymentInformation);
        $xml = $creditTransfer->xml();
 
        $xml = $creditTransfer->xml();
        if ($creditTransfer->validate($xml) === true) {
            header('Content-type: "text/xml"; charset="utf8"');
            header('Content-Disposition: attachment; filename="sepa_credit_transfer.xml"');
            echo $xml;
        } else {
            echo"KLAIDA";
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
    public function store(Request $request) {

        $bankas = $request->file_bankas;
        $grazinimai = $request->file_grazinimai;

        $directory  = "app/CSV_DATA/";
        $bankas = $directory.$bankas;
        $grazinimai = $directory.$grazinimai;


        DB::table('bankas')->where("salis", 1)->delete();
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
                    'salis' => 1,
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

        DB::table('grazinimais')->where('salis', 1)->delete();
        $flag = true;
        $da = [];
        if (($handle = fopen(storage_path($grazinimai), "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
            //praleidziam pirma eilute
            if($flag) { $flag = false; continue; }
            $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
            $kiek = explode(",", $val[11]);
            $kiek = $kiek[0];

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
                'salis' => 1,
                'dok_nr' => $val[1],
                'dok_data' => $val[2],
                'blanko_nr' => $val[3],
                'pirkejas' => $val[4],
                'pirkejas2' => preg_replace('/\d/', '', $val[4] ),
                'aprasymas' => $val[9],
            ];
        }
        fclose($handle);
        }
        unlink(storage_path($grazinimai));

        $chunks = array_chunk($da, 300);
        foreach($chunks as $val){
            Grazinimai::insert($val);
        }


        return response()->json([
            'status' => true,
            'data' => $request
        ]);
    }

    public function store_EE(Request $request) {

        $bankas = $request->file_bankas;
        $grazinimai = $request->file_grazinimai;

        $directory  = "app/CSV_DATA/";
        $bankas = $directory.$bankas;
        $grazinimai = $directory.$grazinimai;


        DB::table('bankas')->where("salis", 3)->delete();
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
                    'salis' => 3,
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

        DB::table('grazinimais')->where('salis', 3)->delete();
        $flag = true;
        $da = [];
        if (($handle = fopen(storage_path($grazinimai), "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
            //praleidziam pirma eilute
            if($flag) { $flag = false; continue; }
            $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
            $kiek = explode(",", $val[11]);
            $kiek = $kiek[0];

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
                'salis' => 3,
                'dok_nr' => $val[1],
                'dok_data' => $val[2],
                'blanko_nr' => $val[3],
                'pirkejas' => $val[4],
                'pirkejas2' => preg_replace('/\d/', '', $val[4] ),
                'aprasymas' => $val[9],
            ];
        }
        fclose($handle);
        }
        unlink(storage_path($grazinimai));

        $chunks = array_chunk($da, 300);
        foreach($chunks as $val){
            Grazinimai::insert($val);
        }


        return response()->json([
            'status' => true,
            'data' => $request
        ]);
    }
    

    public function store_LV(Request $request) {

        $bankas = $request->file_bankas;
        $grazinimai = $request->file_grazinimai;

        //$checkboxBank = $request->checkboxBank;
        //$radioboxBank = $request->radioboxBank;

        $directory  = "app/CSV_DATA/";
        $bankas = $directory.$bankas;
        $grazinimai = $directory.$grazinimai;

        if($request->file_bankas){
            //if($checkboxBank){
                DB::table('bankas')->where("salis", 2)->delete();
            //}

            $flag = true;
            $da = [];
            if (($handle = fopen(storage_path($bankas), "r")) !== FALSE) {

                //LUMINOR
                //if($radioboxBank == "1"){
                    while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                        //praleidziam pirma eilute
                        if($flag) { $flag = false; continue; }
                        //$val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
        
                        $da[] = [
                            'data' => date("Y-m-d", strtotime($data[2])),
                            'suma' => $data[6],
                            'c_d' => $data[5],
                            'paskirtis' => $data[12],
                            'pavadinimas' =>  $data[16],
                            'saskaita' => $data[15],
                            'salis' => 2,
                        ];
                    }
                //}

                //PAYSERA
                /*if($radioboxBank == "2"){
                    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                        //praleidziam pirma eilute
                        if($flag) { $flag = false; continue; }
                    //$val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                    //$saskaita = "";
                    //$pirkejas = "";
                    if($data[4] == "Paysera LT"){
                        $pirkejas = $data[4];
                        $saskaita = $data[4];
                    }else{
                        $kk = explode(" ", $data[4]);
                        $sk = count($kk);
                        if($sk == 3){
                            $pirkejas = $kk[0]." ".$kk[1];
                            $saskaita = $kk[2]; 
                        }else{
                            $pirkejas = $kk[0]." ".$kk[1];
                            $saskaita = $kk[$sk-1];   
                        }
                    }
        
                    $d = explode(" ", $data[3]);

                    $da[] = [
                        'data' => date("Y-m-d", strtotime($d[0])),//$data[2],
                        'suma' => $data[6],
                        'c_d' => $data[10],
                        'paskirtis' => $data[8],
                        'pavadinimas' =>  $pirkejas,
                        'saskaita' => $saskaita,
                        'salis' => 2,
                    ];
                }
            }*/
            
            fclose($handle);
            }

            unlink(storage_path($bankas));
            
            $chunks = array_chunk($da, 300);
            foreach($chunks as $val){
                Bankas::insert($val);
            }
        }

        if($request->file_grazinimai){
            DB::table('grazinimais')->where("salis", 2)->delete();
            $flag = true;
            $da = [];
            if (($handle = fopen(storage_path($grazinimai), "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                //praleidziam pirma eilute
                if($flag) { $flag = false; continue; }
                $val = mb_convert_encoding($data, "UTF-8", "ISO-8859-13");
                $kiek = explode(",", $val[11]);
                $kiek = $kiek[0];

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
                    'salis' => 2,
                    'dok_nr' => $val[1],
                    'dok_data' => $val[2],
                    'blanko_nr' => $val[3],
                    'pirkejas' => $val[4],
                    'pirkejas2' => preg_replace('/\d/', '', $val[4] ),
                    'aprasymas' => $val[9],
                ];
            }
            fclose($handle);
            }
            unlink(storage_path($grazinimai));

            $chunks = array_chunk($da, 300);
            foreach($chunks as $val){
                Grazinimai::insert($val);
            }
        }


        return response()->json([
            'status' => true,
            'data' => $da
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Grazinimai  $grazinimai
     * @return \Illuminate\Http\Response
     */
    public function show(Grazinimai $grazinimai)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Grazinimai  $grazinimai
     * @return \Illuminate\Http\Response
     */
    public function edit(Grazinimai $grazinimai)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Grazinimai  $grazinimai
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Grazinimai $grazinimai)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Grazinimai  $grazinimai
     * @return \Illuminate\Http\Response
     */
    public function destroy(Grazinimai $grazinimai)
    {
        //
    }
}
