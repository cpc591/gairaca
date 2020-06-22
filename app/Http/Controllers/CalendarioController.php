<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use App\Calendario_fecha;
use App\Fecha_Consejo;


use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
class CalendarioController extends Controller
{
    private $headers = [  'Content-Type' => 'application/json; charset=utf-8', 'Accept'=>'application/json' ];
     private $desarrollo_estudiantil = 9;
     private $creada = 1;
     private $sinaprobar =2;
     private $aprobada = 3;
     private $tramite = 4;
     private $respondida_a_desarrollo = 5;
     private $reenviada = 6;
     //private $respondida = 7;
     private $esperaAbropacionDirector = 8;
     private $respondida = 7;
     private $rolEstudiantes = 2;
     private $rolDependencias = 1;
     
     private $academico = 39;
     private $directorAcademico = 43;
     
    public function __construct()
	{
	    $this->middleware('auth');
	    //$this->middleware('role:consejoAcademico');
	}
	
	public function calendario() {
          
            return view('Calendario.calendario');
      }
      public function calendarioIncluidos() {
          
            return view('Calendario.calendarioIncluidos');
      }
      public function calendarioExcluidos() {
          
            return view('Calendario.calendarioExcluidos');
      }

      public function calendarioConsejos() {
          
            return view('Calendario.calendarioConsejos');
        }
        public function calendarioAgregarConsejos() {
          
            return view('Calendario.calendarioAgregarConsejos');
        }
	
    public function agregarFechasIncluidos(Request $request){
        
        //return $request->all();
        $validator = \Validator::make($request->all(),[
            
            'tipo' => 'required',
            
        ],[
            
            'tipoFecha.required' => 'El tipo de acción  es requerida.',
            ]
        );
        if($validator->fails()){
            return ["success"=>false,"errores"=>$validator->errors()];
        }
        
        $listaFechas=[];
        $fechasMalas=[];
        $diasEliminados=[];
        $fechaActual = Carbon::now();
        $fechaActual  = date('Y-m-d',strtotime($fechaActual));
        $busquedaFechas = Calendario_fecha::where('fecha',">=",$fechaActual)->get();
        //return $busquedaFechas;
        
        for($i=0;$i<sizeof($busquedaFechas);$i++){
            for($j=0;$j<sizeof($request->fechas);$j++){
                if($busquedaFechas[$i]->fecha!=date('Y-m-d',strtotime($request->fechas[$j])) && $busquedaFechas[$i]->tipo==1){
                    //return $busquedaFechas[$i]->fecha;
                    array_push($diasEliminados,$busquedaFechas[$i]->fecha);
                    $busquedaFechas[$i]->delete();
                    //$busquedaFechas->save();
                    break;
                }
            }
            
        }
        //return $busquedaFechas;
        for($i=0;$i<sizeof($request->fechas);$i++){
            $sw=0;
            $calendario = new Calendario_fecha();
            $calendario->fecha = date('Y-m-d',strtotime($request->fechas[$i]));
            $dia = intval(date('N',strtotime($request->fechas[$i])));
            //if(strlen($request->fechas[$i])>10){
                if($busquedaFechas){
                    for($j=0;$j<sizeof($busquedaFechas);$j++){
                        if($busquedaFechas[$j]->fecha==date('Y-m-d',strtotime($request->fechas[$i]))){
                            /*
                            if($diasEliminados!=null || $diasEliminados!=[]){
                                for($k=0;$k<sizeof($diasEliminados);$k++){
                                    
                                }
                            }*/
                            
                            //return $busquedaFechas[$j]->fecha;
                            $busquedaFechas[$j]->tipo = intval($request->tipo);
                            $busquedaFechas[$j]->save();
                            $sw=1;
                            //return $request->fechas[$i];
                            //break;
                        }
                        /*
                        if(($j+1)==sizeof($busquedaFechas) && $sw==0 && date('Y-m-d',strtotime(date('Y-m-d',strtotime($request->fechas[$i])))) > date('Y-m-d',strtotime($fechaActual))){
                            return "si";
                            $eliminarFecha = Calendario_fecha::where('fecha',date('Y-m-d',strtotime($request->fechas[$i])));
                            if($eliminarFecha!=null){
                                //return date('Y-m-d',strtotime($request->fechas[$i]));
                                $eliminarFecha->delete();
                            }
                            
                        }*/
                    }
                    if($sw==0){
                        if($dia==0){
                            array_push($fechasMalas,$calendario->fecha);
                        }else{
                            if(date('Y-m-d',strtotime(date('Y-m-d',strtotime($request->fechas[$i])))) > date('Y-m-d',strtotime($fechaActual))){
                                $calendario->tipo = intval($request->tipo);
                                $calendario->save();
                                //$fecha = date_format("Ymd",$request->fechas[$i]);
                                //$dia = date('Y-m-d',strtotime($request->fechas[$i]));
                                array_push($listaFechas,$dia);
                            }else{
                                if(date('Y-m-d',strtotime(date('Y-m-d',strtotime($request->fechas[$i])))) >= date('Y-m-d',strtotime($fechaActual))){
                                    array_push($fechasMalas,date('Y-m-d',strtotime($request->fechas[$i])));
                            
                                }    
                            }
                            
                        }
                    }
                }
                
                
            //}
            //$listaFechas[$i] = date('N', $listaFechas->date);
        }
        
        
        
        return ["success"=>true,"fechasMalas"=>$fechasMalas];
    }
    public function agregarFechasExcluidos(Request $request){
        
        //return $request->all();
        $validator = \Validator::make($request->all(),[
            
            'tipo' => 'required',
            
        ],[
            
            'tipoFecha.required' => 'El tipo de acción  es requerida.',
            ]
        );
        if($validator->fails()){
            return ["success"=>false,"errores"=>$validator->errors()];
        }
        
        $listaFechas=[];
        $fechasMalas=[];
        $diasEliminados=[];
        $fechaActual = Carbon::now();
        $fechaActual  = date('Y-m-d',strtotime($fechaActual));
        $busquedaFechas = Calendario_fecha::where('fecha',">=",$fechaActual)->get();
        //return $busquedaFechas;
        
        for($i=0;$i<sizeof($busquedaFechas);$i++){
            for($j=0;$j<sizeof($request->fechas);$j++){
                if($busquedaFechas[$i]->fecha!=date('Y-m-d',strtotime($request->fechas[$j])) && $busquedaFechas[$i]->tipo==0){
                    array_push($diasEliminados,$busquedaFechas[$i]->fecha);
                    $busquedaFechas[$i]->delete();
                    //$busquedaFechas->save();
                    break;
                }
            }
            
        }
        //return $busquedaFechas;
        for($i=0;$i<sizeof($request->fechas);$i++){
            $sw=0;
            $calendario = new Calendario_fecha();
            $calendario->fecha = date('Y-m-d',strtotime($request->fechas[$i]));
            $dia = intval(date('N',strtotime($request->fechas[$i])));
            //if(strlen($request->fechas[$i])>10){
                if($busquedaFechas){
                    for($j=0;$j<sizeof($busquedaFechas);$j++){
                        if($busquedaFechas[$j]->fecha==date('Y-m-d',strtotime($request->fechas[$i]))){
                            /*
                            if($diasEliminados!=null || $diasEliminados!=[]){
                                for($k=0;$k<sizeof($diasEliminados);$k++){
                                    
                                }
                            }*/
                            
                            //return $busquedaFechas[$j]->fecha;
                            $busquedaFechas[$j]->tipo = intval($request->tipo);
                            $busquedaFechas[$j]->save();
                            $sw=1;
                            //return $request->fechas[$i];
                            //break;
                        }
                        /*
                        if(($j+1)==sizeof($busquedaFechas) && $sw==0 && date('Y-m-d',strtotime(date('Y-m-d',strtotime($request->fechas[$i])))) > date('Y-m-d',strtotime($fechaActual))){
                            return "si";
                            $eliminarFecha = Calendario_fecha::where('fecha',date('Y-m-d',strtotime($request->fechas[$i])));
                            if($eliminarFecha!=null){
                                //return date('Y-m-d',strtotime($request->fechas[$i]));
                                $eliminarFecha->delete();
                            }
                            
                        }*/
                    }
                    if($sw==0){
                        if($dia==0){
                            array_push($fechasMalas,$calendario->fecha);
                        }else{
                            if(date('Y-m-d',strtotime(date('Y-m-d',strtotime($request->fechas[$i])))) > date('Y-m-d',strtotime($fechaActual))){
                                $calendario->tipo = intval($request->tipo);
                                $calendario->save();
                                //$fecha = date_format("Ymd",$request->fechas[$i]);
                                //$dia = date('Y-m-d',strtotime($request->fechas[$i]));
                                array_push($listaFechas,$dia);
                            }else{
                                if(date('Y-m-d',strtotime(date('Y-m-d',strtotime($request->fechas[$i])))) >= date('Y-m-d',strtotime($fechaActual))){
                                    array_push($fechasMalas,date('Y-m-d',strtotime($request->fechas[$i])));
                            
                                }    
                            }
                            
                        }
                    }
                }
                
                
            //}
            //$listaFechas[$i] = date('N', $listaFechas->date);
        }
        
        
        
        return ["success"=>true,"fechasMalas"=>$fechasMalas];
    }
    public function agregarFechasConsejos(Request $request){
        
        //return $request->all();
        
        $listaFechas=[];
        $fechasMalas=[];
        $diasEliminados=[];
        $fechaActual = Carbon::now();
        $fechaActual  = date('Y-m-d',strtotime($fechaActual));
        $busquedaFechas = Fecha_Consejo::where('fecha',">=",$fechaActual)->where('user_id',Auth::user()->id)->get();
        //return $busquedaFechas;
        
        for($i=0;$i<sizeof($busquedaFechas);$i++){
            for($j=0;$j<sizeof($request->fechas);$j++){
                if($busquedaFechas[$i]->fecha!=date('Y-m-d',strtotime($request->fechas[$j])) && $busquedaFechas[$i]->user_id == Auth::user()->id){
                    array_push($diasEliminados,$busquedaFechas[$i]->fecha);
                    $busquedaFechas[$i]->delete();
                    //$busquedaFechas->save();
                    break;
                }
            }
            
        }
        //return $busquedaFechas;
        for($i=0;$i<sizeof($request->fechas);$i++){
            $sw=0;
            $calendario = new Fecha_Consejo();
            $calendario->fecha = date('Y-m-d',strtotime($request->fechas[$i]));
            $dia = intval(date('N',strtotime($request->fechas[$i])));
            //if(strlen($request->fechas[$i])>10){
                if($busquedaFechas){
                    for($j=0;$j<sizeof($busquedaFechas);$j++){
                        if($busquedaFechas[$j]->fecha==date('Y-m-d',strtotime($request->fechas[$i]))){
                            $busquedaFechas[$j]->save();
                            $sw=1;
                        }
                    }
                    if($sw==0){
                        if($dia==0){
                            array_push($fechasMalas,$calendario->fecha);
                        }else{
                            if(date('Y-m-d',strtotime(date('Y-m-d',strtotime($request->fechas[$i])))) >= date('Y-m-d',strtotime($fechaActual))){
                                $calendario->user_id = Auth::user()->id;
                                $calendario->save();
                                //$fecha = date_format("Ymd",$request->fechas[$i]);
                                //$dia = date('Y-m-d',strtotime($request->fechas[$i]));
                                array_push($listaFechas,$dia);
                            }else{
                                if(date('Y-m-d',strtotime(date('Y-m-d',strtotime($request->fechas[$i])))) > date('Y-m-d',strtotime($fechaActual))){
                                    array_push($fechasMalas,date('Y-m-d',strtotime($request->fechas[$i])));
                            
                                }    
                            }
                            
                        }
                    }
                }
        }
        
        
        
        return ["success"=>true,"fechasMalas"=>$fechasMalas];
    }
    public function fechasCalendario(){
        $fechaActual = Carbon::now();
        $fechaActual  = date('Y',strtotime($fechaActual));
        //return $fechaActual;
        $fechasCalendario = Calendario_fecha::whereYear('fecha','=',$fechaActual)->get();
        return $fechasCalendario;
    }
    public function fechasCalendarioConsejos(){
        $fechasCalendario = Fecha_Consejo::where('user_id',Auth::user()->id)->get();
        
        return $fechasCalendario;
    }
    
    public function fechasAgregarConsejos(){
        $fechaActual = Carbon::now();
        $fechaActual  = date('Y',strtotime($fechaActual));
        //return $fechaActual;
        $fechasCalendario = Fecha_Consejo::whereYear('fecha','=',$fechaActual)->get();
        return $fechasCalendario;
    }
    public function fechasCalendarioIncluidos(){
        $fechaActual = Carbon::now();
        $fechaActual  = date('Y',strtotime($fechaActual));
        //return $fechaActual;
        $fechasCalendario = Calendario_fecha::where('tipo',1)->whereYear('fecha','=',$fechaActual)->get();
        return $fechasCalendario;
    }
    public function fechasCalendarioExcluidos(){
        $fechaActual = Carbon::now();
        $fechaActual  = date('Y',strtotime($fechaActual));
        //return $fechaActual;
        $fechasCalendario = Calendario_fecha::where('tipo',0)->whereYear('fecha','=',$fechaActual)->get();
        return $fechasCalendario;
    }
}
