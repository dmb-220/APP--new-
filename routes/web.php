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

Auth::routes();

Route::get('/', [App\Http\Controllers\IndexController::class, 'index'])->name('index');

/* Testas */
Route::prefix('/testas')->group(function () {
    Route::get('/', [App\Http\Controllers\TestasController::class, 'index'])->name('index');
    Route::get('idx', [App\Http\Controllers\TestasController::class, 'idx'])->name('idx');
});

/* Statistika */ 
Route::prefix('/statistika')->group(function () {
    Route::get('/', [App\Http\Controllers\StatistikaController::class, 'index'])->name('index');
    Route::post('store',  [App\Http\Controllers\StatistikaController::class, 'store'])->name('store');
    Route::get('/{id}', [App\Http\Controllers\StatistikaController::class, 'show'])->name('show');
    Route::get('store',  [App\Http\Controllers\StatistikaController::class, 'store'])->name('store');
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
