@extends('Layout.master')
@section('Title','Calendario')
@section('app','ng-app="appPublicConsejos"')
@section('controller','ng-controller="calendarioConsejoEstudianteCtrl"')



@section('contenido')

    <div class="container">
            <input type="hidden" ng-model="id" ng-init="id={{$id}}"/>
            <div class="row">
                <div class="col-xs-12">
                    <ol class="breadcrumb">
                      <li><a href="/bandeja3">Inicio</a></li>
                      <li class="active">Calendario @{{consejo}}</li>
                    </ol>
                </div>
            </div>
            <div class="alert alert-info">
                
                <span class="messages">
                        <span>Ayuda</span><br/>
                        <span>*Reunión de consejo se programa: Se refiere a los días en los que definió reunión del consejo.</span><br>
                </span>
            </div>
            <div class="alert alert-danger" ng-if="errores != null">
                <h6>Errores</h6>
                <span class="messages" ng-repeat="error in errores">
                      <span>@{{error[0]}}</span><br>
                </span>
            </div>
            <div class="alert alert-warning" ng-if="fechasMalas != null">
                <h6>Fechas que no pudieron ser almacenadas</h6>
                <span class="messages" ng-repeat="fecha in fechasMalas">
                      <span>@{{fecha}}</span><br>
                </span>
            </div>
            <div class="row">
                <div class="col-md-12 col-xs-12 col-sm-12">
                    <multiple-date-picker highlight-days="highlightDays" all-days-off="true" ng-model="fechas"></multiple-date-picker>
                </div>  
            </div>
            
            <br/>
            <div class="row">
                <div class="col-xs-12">
                    <p>
                        <i style="background: #00a267;
                            width: 20px;
                            height: 15px;
                            display: -webkit-inline-box;">
                            
                        </i> Reunión de consejo de programa
                    </p>
                </div>
                
            </div>         
                    
    </div>
@endsection
@section('javascript')
    <script src="{{asset('/js/plugins/multiple_calendar/multipleDatePicker.min.js')}}"></script>
	<script src="{{asset('/js/plugins/multiple_calendar/moment.js')}}"></script>
    
   
    <script src="{{asset('/js/plugins/sweetalert.min.js')}}"></script>
  	<script src="{{asset('/js/consejos/consejos.js')}}"></script>
    <script src="{{asset('/js/consejos/consejosServices.js')}}"></script>
@endsection