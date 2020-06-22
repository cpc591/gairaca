var app = angular.module("appDirectorAcademico", ['directorAcademicoService', 'ngMaterial', 'ngMessages', 'angularUtils.directives.dirPagination', 'ADM-dateTimePicker', 'lfNgMdFileInput', 'ng.ckeditor']);

app.directive('ngHtml', ['$compile', function($compile) {
    return function(scope, elem, attrs) {
        if (attrs.ngHtml) {
            elem.html(scope.$eval(attrs.ngHtml));
            $compile(elem.contents())(scope);
        }
        scope.$watch(attrs.ngHtml, function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                elem.html(newValue);
                $compile(elem.contents())(scope);
            }
        });
    };
}]);

app.controller('listado_solicitudes_directorAcademicoCtrl', function($scope, directorAcademicoServi) {
    $scope.duracionSolicitud = 15;
    //$scope.today = moment();

    $scope.respondidas_dependencias = [];
    $scope.respondidas_dependencias.duracion = [];
    $scope.respondidas_dependencias.accion_id = [];
    $scope.listado_solicitudes_directorAcademico = [];
    var cont_res = 0;
    var cont_res2 = 0;

    $("#load2").removeClass("hidden");
    directorAcademicoServi.getSolicitudes().then(function(dato) {
        for (var i = 0; i < dato.lista_solicitudes.length; i++) {

            dato.lista_solicitudes[i].duracion = parseInt(dato.lista_solicitudes[i].duracion);
            if (dato.lista_solicitudes[i].acciones[0].id_acciones != 8) {
                $scope.respondidas_dependencias.push(dato.lista_solicitudes[i]);

                $scope.respondidas_dependencias[cont_res].accion_id = $scope.respondidas_dependencias[cont_res].acciones[0].id_acciones;
                $scope.respondidas_dependencias[cont_res2].accion_nombre = $scope.respondidas_dependencias[cont_res2].acciones[0].accion;
                cont_res++;
            } else {
                $scope.listado_solicitudes_directorAcademico.push(dato.lista_solicitudes[i]);
                $scope.listado_solicitudes_directorAcademico[cont_res2].accion_id = $scope.listado_solicitudes_directorAcademico[cont_res2].acciones[0].id_acciones;
                $scope.listado_solicitudes_directorAcademico[cont_res2].accion_nombre = $scope.listado_solicitudes_directorAcademico[cont_res2].acciones[0].accion;

                cont_res2++;
            }


        }

        $("#load2").addClass("hidden");

    }).catch(function() {
        $("#load2").addClass("hidden");
        swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
    });

    $scope.detalle_solicitud = function(response) {

        $scope.lista_acciones = response.acciones;
        $scope.lista_respuestas = response.respuestas;
        console.log(($scope.lista_respuestas));
    }


});

app.controller('aprobar_vista_academicoCtrl', function($scope, $http) {


    $scope.$watch('solicitud_id', function() {
        if ($scope.solicitud_id) {
            $http.post('/ver_mas_solicitudAcademico', { 'solicitud_id': parseInt($scope.solicitud_id) })
                .success(function(dato) {
                    $scope.estudiante = dato.estudiante;
                    $scope.datos_solicitud = dato.datos_solicitud;
                    $scope.novedades = dato.novedades;
                    $scope.solicitudesConceptos = dato.solicitudesConceptos;
                    $scope.respuesta = {};
                    $scope.respuesta.solicitud = $scope.solicitud_id;
                    for (var i = 0; i < $scope.datos_solicitud.length; i++) {
                        if ($scope.datos_solicitud[i].solicitude_user.respuestas.length > 0) {

                            for (var j = 0; j < $scope.datos_solicitud[i].solicitude_user.respuestas.length; j++) {
                                if ($scope.datos_solicitud[i].solicitude_user.respuestas[j].mensaje != "" && $scope.datos_solicitud[i].solicitude_user.respuestas[j].mensaje != null) {
                                    $scope.respuesta.contenido = $scope.datos_solicitud[i].solicitude_user.respuestas[j].mensaje;
                                    $scope.respuesta.multimediaRespuesta = $scope.datos_solicitud[i].solicitude_user.respuestas[j].multimedias_respuestas;
                                }
                                if ($scope.datos_solicitud[i].solicitude_user.respuestas[j].multimedias_respuestas.length > 0) {
                                    $scope.datos_solicitud[i].multimedia = $scope.datos_solicitud[i].solicitude_user.respuestas[j].multimedias_respuestas;

                                    break;
                                }
                            }
                        }
                    }

                    $scope.solicitud = dato["datos_solicitud"][0].solicitude_user.solicitude;
                    $scope.m_solicitud = $scope.solicitud.multimedias_solicitudes;
                    if ($scope.solicitud.asunto_id != null) {
                        $scope.solicitud.asunto = $scope.solicitud.asunto_nuevo.nombre;
                    }

                });
        }

    });

    $scope.reenviar = function(dependencia) {
        $scope.respuesta.solicitud = $scope.solicitud.id;
        if (dependencia != null) {

            $("#load2").removeClass("hidden");
            //console.log(dependencia);

            $http.post('/reenviar_solicitud', $scope.respuesta)
                .success(function(dato) {

                    $("#load2").addClass("hidden");

                    if (data.success == true) {
                        swal({
                                title: "Éxito",
                                text: "Solicitud reenviada satisfactoriamente",
                                type: "success",
                                confirmButtonText: "",
                            },
                            function() {
                                window.location.href = "/bandeja";
                            });
                        //swal("Exito", "Solicitud reenviada", "success");
                        //window.location.href("/bandeja3");

                    } else {
                        $scope.errores = data.errores;
                        swal("Error", "Corriga los errores", "error");

                    }
                })
                .error(function() {
                    $("#load2").addClass("hidden");
                    swal({
                            title: "Error",
                            text: "Error en el reenvío de la solicitud",
                            type: "error",
                            confirmButtonText: "",
                        },
                        function() {
                            //window.location.href="/bandeja";
                        });

                });


            //console.log($scope.respuesta);
        } else {
            swal("Error", "Llenar campo de dependencia", "error");
        }
    }
    $scope.ver_pdf = function(ruta) {
        $scope.ruta = ruta;
        $('#pdf').modal({
            show: 'true'
        });
    }
    $scope.ver_pdf_sol = function(ruta) {
        $scope.ruta = ruta;
        $('#pdf_sol').modal({
            show: 'true'
        });
    }
    $(document).on('click', '.signo', function() {

        if ($(this).find('.glyphicon-plus').css("display") == 'inline-block') {
            $('.glyphicon-minus').css("display", "none");
            $('.glyphicon-plus').css("display", "inline-block");
            $(this).find('.glyphicon-plus').css("display", "none");
            $(this).find('.glyphicon-minus').css("display", "inline-block");
        } else {
            $(this).find('.glyphicon-plus').css("display", "inline-block");
            $(this).find('.glyphicon-minus').css("display", "none");
        }
    });



    $scope.aprobar_solicitud = function() {
        //console.log(solicitud);
        $("#load2").removeClass("hidden");
        $http.post('/aprobar_solicitud', { 'solicitud_id': $scope.solicitud_id })
            .success(function(dato) {
                $("#load2").addClass("hidden");
                if (dato.success == true) {
                    swal({
                            title: "Éxito",
                            text: "Solicitud aprobada satisfactoriamente",
                            type: "success",
                            confirmButtonText: "",
                        },
                        function() {
                            window.location.href = "/directorAcademico";
                        });
                } else {
                    $scope.errores = data.errores;
                    swal("Error", "Corriga los errores", "error");

                }
            })
            .error(function(dato) {
                swal({
                        title: "Error",
                        text: "Error en la aprobación",
                        type: "error",
                        confirmButtonText: "",
                    },
                    function() {
                        //window.location.href="/bandeja";
                    });
            });
    }
    $scope.ver_pdf = function(ruta) {
        $scope.ruta = ruta;
        $('#pdf').modal({
            show: 'true'
        });
    }

    $scope.noAprobar_modal = function(solicitud) {
        $scope.formNoAprobar.$setPristine();
        $scope.formNoAprobar.$setUntouched();
        $scope.formNoAprobar.$submitted = false;
        $scope.noAprobacion = {};
        $scope.noAprobacion.solicitudId = solicitud;

        $scope.errores = null;
        $('#noAprobacion').modal({
            show: 'true'
        });

    }
    $scope.noAprobar = function(solicitud) {
        if (!$scope.formNoAprobar.$valid) {
            $scope.formNoAprobar.$submitted = true;
            swal("Error", "Corriga los errores", "error");
            return;
        }
        $("body").attr("class", "cbp-spmenu-push charging");
        $("#load2").removeClass("hidden");
        $http.post('/noAprobarDirector', $scope.noAprobacion)
            .success(function(data) {
                console.log(data);
                $("#load2").addClass("hidden");

                //swal("Exito", "Datos guardados con éxito", "success");
                //window.location.href="/bandeja2";
                if (data.success == true) {
                    swal({
                            title: "Éxito",
                            text: "Encargado registrado satisfactoriamente",
                            type: "success",
                            confirmButtonText: "",
                        },
                        function() {
                            $('#noAprobacion').modal('hide');
                            window.location.href = "/directorAcademico"

                        });
                    //window.location.href="/bandeja";

                } else {
                    swal("Error", "No se pudo efectuar el registro del encargado", "error");
                    $scope.errores = data.errores;

                }

            })
            .error(function(data) {
                $("#load2").addClass("hidden");
                $scope.errores = data.errores;
                swal("Error", "Corriga los errores", "error");


            });
    }

    $scope.eliminar_soporteRespuesta = function(soporte) {
        swal({
                title: "¿Eliminar soporte?",
                text: "Realmente desea eliminar el soporte seleccionado",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar",
                closeOnConfirm: false
            },
            function() {
                $http.post('/eliminar_soporteRespuesta', soporte.id)
                    .success(function(dato) {
                        $scope.respuesta.multimediaRespuesta.splice($scope.respuesta.multimediaRespuesta.indexOf(obj), 1);
                        swal({
                                    title: "Eliminado!",
                                    text: "Soporte eliminado satisfactoriamente.",
                                    type: "success",

                                    confirmButtonText: "Ok",
                                },
                                function() {

                                    //location.reload();

                                })
                            .error(function() {


                            });

                    });
            })
    }

    $scope.corregir = function(dato) {

        if (!$scope.formRespuesta.$valid || $scope.respuesta.contenido == null || $scope.respuesta.contenido == "") {
            $scope.formRespuesta.$submitted = true;
            swal("Error", "La respuesta es obligatoria", "error");
            return;
        }
        var fd = new FormData();
        $scope.errores = null
        $("body").attr("class", "cbp-spmenu-push charging");






        var fd = new FormData();
        //pasar todo al formData
        for (contenido in $scope.respuesta) {



            if ($scope.respuesta[contenido] != null && $scope.respuesta[contenido] != "") {
                fd.append(contenido, $scope.respuesta[contenido])

            }


        }

        if ($scope.galeria != null) {
            if (($scope.numero_mult + $scope.galeria.length) > 3) {
                swal("Error", "El limite son 3 archivos", "error");
                return;
            }
            for (k = 0; k < $scope.galeria.length; k++) {
                fd.append("Galeria[]", $scope.galeria[k].lfFile);
            }
        }


        $scope.errores = null
        $("body").attr("class", "cbp-spmenu-push charging");
        $("#load2").removeClass("hidden");
        $http.post('/corregir', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
            .success(function(data) {
                console.log(data);
                $("#load2").addClass("hidden");

                //swal("Exito", "Datos guardados con éxito", "success");
                //window.location.href="/bandeja2";
                if (data.success == true) {
                    swal({
                            title: "Éxito",
                            text: "Respuesta creada satisfactoriamente",
                            type: "success",
                            confirmButtonText: "",
                        },
                        function() {
                            window.location.href = "/directorAcademico";
                            //window.location.href="javascript:history.back(-1);";
                        });
                    //window.location.href="/bandeja";

                } else {
                    swal("Error", "la respuesta no se pudo realizar", "error");
                    $scope.errores = data.errores;

                }

            })
            .error(function(data) {
                $("#load2").addClass("hidden");
                $scope.errores = data.errores;
                swal("Error", "Corriga los errores", "error");


            });
    }

});