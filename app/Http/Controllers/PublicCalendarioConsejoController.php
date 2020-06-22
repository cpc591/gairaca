<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use App\Fecha_Consejo;

class PublicCalendarioConsejoController extends Controller
{
    //
    public function getListadoConsejos(){
        $consejos = User::where('estado',1)->whereHas('roles', function ($query) {
            $query->where('role_id','=',1)->orWhere('role_id','=',6);
        })->get();
        return ["consejos"=>$consejos]; 
    }
    public function calendarioPublicoConsejos($id) {
          
        return view('Calendario.publicCalendarioConsejos', array('id' => $id));
  }
    public function fechasCalendarioConsejosEstudiantes($id){
        //return $id;
        $fechasCalendario = Fecha_Consejo::where('user_id',$id)->get();
        $consejo = User::where('id',$id)->first();
        return ["fechas"=>$fechasCalendario,"consejo"=>$consejo->nombre];
    }
}