<?php

namespace App\Http\Controllers;

use App\Models\WorksInventory;
use Illuminate\Http\Request;

class WorksInventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        $arr = array();
        foreach(WorksInventory::query()->get() as $v){
            $arr[$v['sandelis']][] = $v;
        }

        return response()->json([
            'status' => true,
            'list' => $arr
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
        $inventory = new WorksInventory([
            'nuo' => $request->input('modal_nuo'),
            'iki' => $request->input('modal_iki'),
            'suma' => $request->input('modal_suma'),
            'sandelis' => $request->input('sandelis')
        ]);
        $inventory->save();
        return response()->json('Inventorizacijos irasas pridetas!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\WorksInventory  $worksInventory
     * @return \Illuminate\Http\Response
     */
    public function show(WorksInventory $worksInventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\WorksInventory  $worksInventory
     * @return \Illuminate\Http\Response
     */
    public function edit(WorksInventory $worksInventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\WorksInventory  $worksInventory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WorksInventory $worksinventory)
    {
        $worksinventory->update($request->all());

        return response()->json("Duomenys atnaujinti!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\WorksInventory  $worksInventory
     * @return \Illuminate\Http\Response
     */
    public function destroy(WorksInventory $worksinventory)
    {
        $worksinventory->delete();

        return response()->json('Įrašas ištrintas!');
    }
}
