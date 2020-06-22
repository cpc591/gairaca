@extends('Layout.master')
@section('Title','Calendario días excluidos')
@section('app','ng-app="appCalendario"')
@section('controller','ng-controller="calendarioExcluidosCtrl"')


@section('estilo')
<style type="text/css">
    .picker-day.picker-selected {
        background-color: #ded100!important;
        color: #000!important;
        
    }
    .picker-day.today.picker-selected, .picker-day.today:hover {
        color: #000!important;
    }

</style>
@endsection
@section('contenido')
    <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <ol class="breadcrumb">
                      <li><a href="/bandeja3">Inicio</a></li>
                      <li class="active">Días excluidos</li>
                    </ol>
                </div>
            </div>
            <div class="alert alert-info">
                
                <span class="messages">
                        <span>Ayuda</span><br/>
                        <span>En este calendario se encuentran los días que han sido excluidos, es decir, los días no laborales.</span><br>
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
                    <multiple-date-picker disable-days-before="today"  week-days-off="[0,6]" ng-model="fechas"></multiple-date-picker>
                </div>  
            </div>
            <br/>
            <div class="row" style="text-align:center;">
                <div class="col-md-12 col-xs-12 col-sm-12">
                    <a href="" ng-click="agregarFecha()" type="button" title="Excluir días" class="btn btn-success"><span>Excluir días</span></a>
                </div>
            </div>
                    
    </div>
@endsection
@section('javascript')
    <script src="{{asset('/js/plugins/multiple_calendar/multipleDatePicker.min.js')}}"></script>
	<script src="{{asset('/js/plugins/multiple_calendar/moment.js')}}"></script>
    
   
  	<script src="{{asset('/js/plugins/sweetalert.min.js')}}"></script>
  	<script src="{{asset('/js/calendario/calendario.js')}}"></script>
    <script src="{{asset('/js/calendario/calendarioServices.js')}}"></script>
@endsection