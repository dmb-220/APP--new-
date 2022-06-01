<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
    //return view('welcome');
//});

Auth::routes([
  'register' => false, // Registration Routes...
  'reset' => false, // Password Reset Routes...
  'verify' => false, // Email Verification Routes...
]);

Route::prefix('/visilikuciai')->group(function () {
    Route::get('', [App\Http\Controllers\VisiLikuciaiController::class, 'index'])->name('index');
    Route::post('store', [App\Http\Controllers\VisiLikuciaiController::class, 'store'])->name('store');
});

Route::get('/', [App\Http\Controllers\IndexController::class, 'index'])->name('index');

//dalinimo analizavimas
Route::get('/excel', [App\Http\Controllers\ExcelController::class, 'index'])->name('index');

//Darbo apskaita
Route::get('/works', [App\Http\Controllers\WorksController::class, 'index'])->name('index');

//GPAIS
Route::prefix('/gpais')->group(function () {
    Route::get('/', [App\Http\Controllers\GpaisController::class, 'index'])->name('index');
    Route::get('/get_xml', [App\Http\Controllers\GpaisController::class, 'get_xml'])->name('get_xml');
});

//lipduku spausdinimui
Route::prefix('/export')->group(function () {
    Route::get('/', [App\Http\Controllers\ExportController::class, 'index'])->name('index');
    Route::post('store',  [App\Http\Controllers\ExportController::class, 'store'])->name('store');
    Route::post('store_akcija',  [App\Http\Controllers\ExportController::class, 'store_akcija'])->name('store_akcija');
});

//Parduotuviu bankinis mokejimas
Route::prefix('/terminal')->group(function () {
    Route::get('/', [App\Http\Controllers\TerminalController::class, 'index'])->name('index');
    Route::get('/save_xlsx', [App\Http\Controllers\TerminalController::class, 'save_xlsx'])->name('save_xlsx');
    Route::post('store',  [App\Http\Controllers\TerminalController::class, 'store'])->name('store');
    Route::post('store_terminalas',  [App\Http\Controllers\TerminalController::class, 'store_terminalas'])->name('store_terminalas');
});

/* Prekių grazinimas is EE ar LV */ 
Route::prefix('/return')->group(function () {
    Route::get('/', [App\Http\Controllers\ReturnProductController::class, 'index'])->name('index');
    Route::post('store',  [App\Http\Controllers\ReturnProductController::class, 'store'])->name('store');
});


Route::prefix('pvz')->group(function () {
    Route::get('/', [App\Http\Controllers\PvzController::class, 'index'])->name('index');
    Route::post('store',  [App\Http\Controllers\PvzController::class, 'store'])->name('store');
});
/* Testas */
Route::prefix('/testas')->group(function () {
    Route::get('/', [App\Http\Controllers\TestasController::class, 'index'])->name('index');
    Route::get('idx', [App\Http\Controllers\TestasController::class, 'idx'])->name('idx');
});

/* Dalinti prekes */
Route::prefix('/dalinti')->group(function () {
    Route::get('/', [App\Http\Controllers\DalintiController::class, 'index'])->name('index');
    Route::post('store_file', [App\Http\Controllers\DAlintiController::class, 'store_file'])->name('store_file');
    Route::post('store', [App\Http\Controllers\DAlintiController::class, 'store'])->name('store');
    Route::get('export', [App\Http\Controllers\DalintiController::class, 'export'])->name('export');
});

/* CSV */ 
Route::prefix('/csv')->group(function () {
    Route::get('/', [App\Http\Controllers\CSVController::class, 'index'])->name('index');
    Route::get('{csv}', [App\Http\Controllers\CSVController::class, 'show'])->name('show');
    Route::post('store', [App\Http\Controllers\CSVController::class, 'store'])->name('store');
    Route::post('CSV_store', [App\Http\Controllers\CSVController::class, 'CSV_store'])->name('CSV_store');
    Route::patch('{csv}', [App\Http\Controllers\CSVController::class, 'update'])->name('update');
    Route::delete('{csv}/destroy', [App\Http\Controllers\CSVController::class, 'destroy'])->name('destroy');
});

/* Statistika */ 
Route::prefix('/statistika')->group(function () {
    Route::get('/', [App\Http\Controllers\StatistikaController::class, 'index'])->name('index');
    Route::post('store',  [App\Http\Controllers\StatistikaController::class, 'store'])->name('store');
    //Route::get('/{id}', [App\Http\Controllers\StatistikaController::class, 'show'])->name('show');
});

/* Prekes */ 
Route::prefix('/prekes')->group(function () {
    Route::get('/', [App\Http\Controllers\PrekesController::class, 'index'])->name('index');
    Route::post('store',  [App\Http\Controllers\PrekesController::class, 'store'])->name('store');
    //Route::get('/{id}', [App\Http\Controllers\StatistikaController::class, 'show'])->name('show');
});

/* Likutis */ 
Route::prefix('/likutis')->group(function () {
    Route::get('/', [App\Http\Controllers\LikutisController::class, 'index'])->name('index');
    Route::post('store',  [App\Http\Controllers\LikutisController::class, 'store'])->name('store');
});

/* Prekes */ 
Route::prefix('/pardavimai')->group(function () {
    Route::get('/', [App\Http\Controllers\PardavimaiController::class, 'index'])->name('index');
    Route::post('store',  [App\Http\Controllers\PardavimaiController::class, 'store'])->name('store');
});

/* Akcijos */ 
Route::prefix('/akcijos')->group(function () {
    Route::get('/', [App\Http\Controllers\AkcijosController::class, 'index'])->name('index');
    Route::post('store',  [App\Http\Controllers\AkcijosController::class, 'store'])->name('store');
    Route::post('store_akcija',  [App\Http\Controllers\AkcijosController::class, 'store_akcija'])->name('store_akcija');
});

/* Keliones lapas */ 
Route::prefix('/kelione')->group(function () {
    Route::get('/', [App\Http\Controllers\KelioneController::class, 'index'])->name('index');
    Route::post('store',  [App\Http\Controllers\KelioneController::class, 'store'])->name('store');
});

/* Grazinimu formavimas */ 
Route::prefix('/grazinimai')->group(function () {
    //LT
    Route::get('/', [App\Http\Controllers\GrazinimaiController::class, 'index'])->name('index');
    Route::post('sepa', [App\Http\Controllers\GrazinimaiController::class, 'sepa'])->name('sepa');
    Route::post('store', [App\Http\Controllers\GrazinimaiController::class, 'store'])->name('store');
    //LV
    Route::get('grazinimai_lv', [App\Http\Controllers\GrazinimaiController::class, 'grazinimai_lv'])->name('grazinimai_lv');
    Route::post('sepa_LV', [App\Http\Controllers\GrazinimaiController::class, 'sepa_LV'])->name('sepa_LV');
    Route::post('store_LV', [App\Http\Controllers\GrazinimaiController::class, 'store_LV'])->name('store_LV');
    //EE
    Route::get('grazinimai_ee', [App\Http\Controllers\GrazinimaiController::class, 'grazinimai_ee'])->name('grazinimai_ee');
    Route::post('sepa_EE', [App\Http\Controllers\GrazinimaiController::class, 'sepa_EE'])->name('sepa_EE');
    Route::post('store_EE', [App\Http\Controllers\GrazinimaiController::class, 'store_EE'])->name('store_EE');
    //Failu uzkelimas
    Route::post('store_bankas',  [App\Http\Controllers\GrazinimaiController::class, 'store_bankas'])->name('store_bankas');
    Route::post('store_grazinimai',  [App\Http\Controllers\GrazinimaiController::class, 'store_grazinimai'])->name('store_grazinimai');
});

/* INTE perkelimai */ 
Route::prefix('/intepreke')->group(function () {
    Route::get('/', [App\Http\Controllers\IntePrekeController::class, 'index'])->name('index');
    Route::post('store_lt', [App\Http\Controllers\IntePrekeController::class, 'store_lt'])->name('store_lt');
    Route::post('store_lv', [App\Http\Controllers\IntePrekeController::class, 'store_lv'])->name('store_lv');
    Route::post('store_ee', [App\Http\Controllers\IntePrekeController::class, 'store_ee'])->name('store_ee');
    Route::post('store', [App\Http\Controllers\IntePrekeController::class, 'store'])->name('store');
    Route::post('store_save', [App\Http\Controllers\IntePrekeController::class, 'store_save'])->name('store_save');
 });

/* INTE sudengimas su banku */ 
Route::prefix('/inte')->group(function () {
    Route::get('/', [App\Http\Controllers\InteController::class, 'index'])->name('index');
    Route::get('pigult', [App\Http\Controllers\InteController::class, 'pigult'])->name('pigult');
    Route::get('indexlv', [App\Http\Controllers\InteController::class, 'indexlv'])->name('indexlv');
    Route::get('indexee', [App\Http\Controllers\InteController::class, 'indexee'])->name('indexee');
    Route::post('store', [App\Http\Controllers\InteController::class, 'store'])->name('store');
    Route::post('store_bankas', [App\Http\Controllers\InteController::class, 'store_bankas'])->name('store_bankas');
    Route::post('store_pardavimai', [App\Http\Controllers\InteController::class, 'store_pardavimai'])->name('store_pardavimai');
});

Route::prefix('/soap')->group(function () {
    Route::get('', [\App\Http\Controllers\SoapController::class, 'index']);
    Route::post('store', [\App\Http\Controllers\SoapController::class, 'store']);
});

Route::prefix('/soaplt')->group(function () {
    Route::get('', [\App\Http\Controllers\SoapLTController::class, 'index']);
    Route::post('store', [\App\Http\Controllers\SoapLTController::class, 'store']);
});

/* Clients management */
Route::prefix('/clients')->group(function () {
    Route::get('/', [\App\Http\Controllers\ClientsController::class, 'index']);
    Route::get('/{client}', [\App\Http\Controllers\ClientsController::class, 'show']);
    Route::post('/store', [\App\Http\Controllers\ClientsController::class, 'store']);
    Route::patch('/{client}', [\App\Http\Controllers\ClientsController::class, 'update']);
    Route::post('/destroy', [\App\Http\Controllers\ClientsController::class, 'destroyMass']);
    Route::delete('/{client}/destroy', [\App\Http\Controllers\ClientsController::class, 'destroy']);
});

/* Current user */
Route::prefix('/user')->group(function () {
    Route::get('/', [\App\Http\Controllers\CurrentUserController::class, 'show']);
    Route::patch('/', [\App\Http\Controllers\CurrentUserController::class, 'update']);
    Route::patch('/password', [\App\Http\Controllers\CurrentUserController::class, 'updatePassword']);
});

/* File upload (e.g. avatar) */
Route::post('/files/store', [\App\Http\Controllers\FilesController::class, 'store']);
