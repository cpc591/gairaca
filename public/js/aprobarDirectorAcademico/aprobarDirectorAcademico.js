var app = angular.module("appAprobarDirectorAcademico", ['directorAcademicoService', 'ngMaterial', 'ngMessages', 'angularUtils.directives.dirPagination', 'lfNgMdFileInput']);

app.controller('aprobar_vista_academicoCtrl', function($scope, directorAcademicoServi) {


    $scope.$watch('solicitud_id', function() {
        if ($scope.solicitud_id) {
            $("#load2").removeClass("hidden");
            directorAcademicoServi.ver_mas_academico(parseInt($scope.solicitud_id)).then(function(dato) {
                if (dato.success == true) {
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
                } else {
                    swal("Error", "la novedad no se pudo realizar", "error");
                    $scope.errores = dato.errores;

                }
                $("#load2").addClass("hidden");

            }).catch(function() {
                $("#load2").addClass("hidden");
                swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
            });
        }

    });

    $scope.reenviar = function(dependencia) {
        $scope.respuesta.solicitud = $scope.solicitud.id;
        if (dependencia != null) {
            $("#load2").removeClass("hidden");
            directorAcademicoServi.reenviar($scope.respuesta).then(function(data) {
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
                $("#load2").addClass("hidden");

            }).catch(function() {
                $("#load2").addClass("hidden");
                swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
            });
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
        $("#load2").removeClass("hidden");
        directorAcademicoServi.aprobar($scope.solicitud_id).then(function(dato) {
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
                $scope.errores = dato.errores;
                swal("Error", "Corriga los errores", "error");

            }
            $("#load2").addClass("hidden");

        }).catch(function() {
            $("#load2").addClass("hidden");
            swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
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
        $("#load2").removeClass("hidden");
        directorAcademicoServi.noAprobar($scope.noAprobacion).then(function(data) {
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
            $("#load2").addClass("hidden");

        }).catch(function() {
            $("#load2").addClass("hidden");
            swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
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
                $("#load2").removeClass("hidden");
                directorAcademicoServi.eliminarSoporte($scope.soporte.id).then(function(data) {
                    if (data.success == true) {
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

                    } else {
                        swal("Error", "No se pudo efectuar el registro del encargado", "error");
                        $scope.errores = data.errores;

                    }
                    $("#load2").addClass("hidden");

                }).catch(function() {
                    $("#load2").addClass("hidden");
                    swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
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


        $scope.errores = null;

        $("#load2").removeClass("hidden");
        directorAcademicoServi.corregir(fd).then(function(data) {
            $("#load2").addClass("hidden");
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
            $("#load2").addClass("hidden");

        }).catch(function() {
            $("#load2").addClass("hidden");
            swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
        });
    }

});