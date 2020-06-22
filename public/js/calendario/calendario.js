var app = angular.module("appCalendario", ['calendarioService', 'multipleDatePicker']);
app.controller('calendarioCtrl', function($scope, calendarioServi) {
    moment().format();
    $scope.today = moment();
    $scope.fechas = [];
    $scope.fechasAux = [];
    $scope.highlightDays = [];

    $("#load2").removeClass("hidden");
    calendarioServi.getFechasCalendario().then(function(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.fechas.push(new moment(data[i].fecha));
            if (data[i].tipo == 1) {
                $scope.highlightDays.push({ date: new moment(data[i].fecha), css: 'holiday', selectable: false, title: 'Día incluido' });
            } else {
                $scope.highlightDays.push({ date: new moment(data[i].fecha), css: 'birthday', selectable: false, title: 'Día Excluido' });
            }

            //$scope.highlightDays[i].valueOf(), css: 'holiday', selectable: false,title: 'Holiday time !',
            $scope.fechasAux.push(data[i].fecha);
        }
        $("#load2").addClass("hidden");

    }).catch(function() {
        $("#load2").addClass("hidden");
        swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
    });


    $scope.agregarFecha = function() {
        $("#load2").removeClass("hidden");
        calendarioServi.agregarFechas($scope.fechas, $scope.tipoFecha).then(function(data) {
            if (data.success == true) {
                if (data.fechasMalas.length > 0) {
                    $scope.fechasMalas = data.fechasMalas;
                }
                swal({
                        title: "Éxito",
                        text: "Novedad creada satisfactoriamente",
                        type: "success",
                        confirmButtonText: "",
                    },
                    function() {
                        $('#novedad').modal('hide');

                    });
                //window.location.href="/bandeja";
            } else {
                swal("Error", "la novedad no se pudo realizar", "error");
                $scope.errores = data.errores;

            }
            $("#load2").addClass("hidden");

        }).catch(function() {
            $("#load2").addClass("hidden");
            swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
        });
    }
});
app.controller('calendarioConsejosCtrl', function($scope, calendarioServi) {
    moment().format();
    $scope.today = moment();
    $scope.fechas = [];
    $scope.fechasAux = [];
    $scope.highlightDays = [];

    $("#load2").removeClass("hidden");
    calendarioServi.getFechasCalendarioConsejos().then(function(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.fechas.push(new moment(data[i].fecha));
            $scope.highlightDays.push({ date: new moment(data[i].fecha), css: 'holiday', selectable: false, title: 'Reunión consejo de programa' });
            $scope.fechasAux.push(data[i].fecha);
        }
        $("#load2").addClass("hidden");

    }).catch(function() {
        $("#load2").addClass("hidden");
        swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
    });

});

app.controller('calendarioIncluidosCtrl', function($scope, calendarioServi) {
    moment().format();
    $scope.today = moment();

    $scope.fechas = [];
    $scope.fechasAux = [];

    $("#load2").removeClass("hidden");
    calendarioServi.getFechasCalendarioIncluidos().then(function(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.fechas.push(new moment(data[i].fecha));
            $scope.fechasAux.push(data[i].fecha);
        }
        $("#load2").addClass("hidden");

    }).catch(function() {
        $("#load2").addClass("hidden");
        swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
    });


    $scope.agregarFecha = function() {
        $("#load2").removeClass("hidden");
        calendarioServi.agregarFechas($scope.fechas, 1).then(function(data) {
            if (data.success == true) {
                if (data.fechasMalas.length > 0) {
                    $scope.fechasMalas = data.fechasMalas;
                }
                swal({
                        title: "Éxito",
                        text: "Novedad creada satisfactoriamente",
                        type: "success",
                        confirmButtonText: "",
                    },
                    function() {
                        $('#novedad').modal('hide');

                    });
                //window.location.href="/bandeja";
            } else {
                swal("Error", "la novedad no se pudo realizar", "error");
                $scope.errores = data.errores;

            }
            $("#load2").addClass("hidden");

        }).catch(function() {
            $("#load2").addClass("hidden");
            swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
        });
    }
});
app.controller('calendarioExcluidosCtrl', function($scope, calendarioServi) {
    moment().format();
    $scope.today = moment();

    $scope.fechas = [];
    $scope.fechasAux = [];

    $("#load2").removeClass("hidden");
    calendarioServi.getFechasCalendarioExcluidos().then(function(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.fechas.push(new moment(data[i].fecha));
            $scope.fechasAux.push(data[i].fecha);
        }
        $("#load2").addClass("hidden");

    }).catch(function() {
        $("#load2").addClass("hidden");
        swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
    });


    $scope.agregarFecha = function() {
        $("#load2").removeClass("hidden");
        calendarioServi.agregarFechas($scope.fechas, 0).then(function(data) {
            if (data.success == true) {
                if (data.fechasMalas.length > 0) {
                    $scope.fechasMalas = data.fechasMalas;
                }
                swal({
                        title: "Éxito",
                        text: "Novedad creada satisfactoriamente",
                        type: "success",
                        confirmButtonText: "",
                    },
                    function() {
                        $('#novedad').modal('hide');

                    });
                //window.location.href="/bandeja";
            } else {
                swal("Error", "la novedad no se pudo realizar", "error");
                $scope.errores = data.errores;

            }
            $("#load2").addClass("hidden");

        }).catch(function() {
            $("#load2").addClass("hidden");
            swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
        });
    }
});
app.controller('calendarioAgregarConsejosCtrl', function($scope, calendarioServi) {
    moment().format();
    $scope.today = moment();

    $scope.fechas = [];
    $scope.fechasAux = [];

    $("#load2").removeClass("hidden");
    calendarioServi.getFechasCalendarioConsejos().then(function(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.fechas.push(new moment(data[i].fecha));
            $scope.fechasAux.push(data[i].fecha);
        }
        $("#load2").addClass("hidden");

    }).catch(function() {
        $("#load2").addClass("hidden");
        swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
    });


    $scope.agregarFecha = function() {
        $("#load2").removeClass("hidden");
        calendarioServi.agregarFechasConsejos($scope.fechas, 0).then(function(data) {
            if (data.success == true) {
                if (data.fechasMalas.length > 0) {
                    $scope.fechasMalas = data.fechasMalas;
                }
                swal({
                        title: "Éxito",
                        text: "Novedad creada satisfactoriamente",
                        type: "success",
                        confirmButtonText: "",
                    },
                    function() {
                        $('#novedad').modal('hide');

                    });
                //window.location.href="/bandeja";
            } else {
                swal("Error", "la novedad no se pudo realizar", "error");
                $scope.errores = data.errores;

            }
            $("#load2").addClass("hidden");

        }).catch(function() {
            $("#load2").addClass("hidden");
            swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
        });
    }
});