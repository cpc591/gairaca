@extends('Layout.master')
@section('Title','Listado de consejos')
@section('app','ng-app="appPublicConsejos"')
@section('controller','ng-controller="listadoConsejosCtrl"')

@section('contenido')
    
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <ol class="breadcrumb">
                    <li><a href="/">Inicio</a></li>
                    <li class="active">Listado de consejos</li>
                </ol>
            </div>
        </div>
        <div class="alert alert-info">
                
            <span class="messages">
                    <span>A continación, se presenta el listado de los consejos que hacen parte a la Universidad del Magdalena.</span><br>
            </span>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <ul ng-repeat="consejo in consejos">
                    <li><a href="/calendarioPublicoConsejos/@{{consejo.id}}">@{{consejo.nombre}}</a></li>
                </ul>
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
