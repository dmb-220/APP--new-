<?php

namespace App\Http\Controllers\GPAIS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GpaisController extends Controller
{

    //VEIKLOS BUDAS
    public $activity = array(
        "0" => array('name' => "Didmeninė prekyba", 'value' => "CL118:DP:2016-12-07"),
        "1" => array('name' => "Išvežimas iš LR vidaus rinkos per trečiuosius asmenis", 'value' => "CL118:ET:2016-12-07"),
        "2" => array('name' => "Išvežimas iš LR vidaus rinkos", 'value' => "CL118:EV:2016-12-07"),
        "3" => array('name' => "Mažmeninė prekyba", 'value' => "CL118:MP:2016-12-07"),
        "4" => array('name' => "Nuotolinė prekyba", 'value' => "CL118:NP:2016-12-07"),
        "5" => array('name' => "Prekyba LR vidaus rinkai", 'value' => "CL118:PV:2016-12-07"),
        "6" => array('name' => "Sunaudojimas savo reikmėms", 'value' => "CL118:SS:2016-12-07"),
    );

    //GAVIMO BUDAS
    public $receive = array(
        "0" => array('name' => "Importuota (įvežta)", 'value' => "CL140:1:2017-02-22"),
        "1" => array('name' => "Pagaminta", 'value' => "CL140:2:2017-02-22"),
        "2" => array('name' => "Susigrąžinta", 'value' => "CL140:3:2017-02-22"),
    );

    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
