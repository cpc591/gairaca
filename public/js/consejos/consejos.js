var app = angular.module("appPublicConsejos", ['consejoService', 'multipleDatePicker']);

app.controller('listadoConsejosCtrl', function($scope, consejoServi) {
    $scope.consejos = [];

    consejoServi.getListadoConsejos().then(function(dato) {
        $scope.consejos = dato.consejos;
        $("#load2").addClass("hidden");

    }).catch(function() {
        $("#load2").addClass("hidden");
        swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
    });
});
app.controller('calendarioConsejoEstudianteCtrl', function($scope, consejoServi) {
    moment().format();
    $scope.today = moment();
    $scope.fechas = [];
    $scope.fechasAux = [];
    $scope.highlightDays = [];

    $scope.$watch('id', function() {
        if ($scope.id) {

            $("#load2").removeClass("hidden");

            consejoServi.getFechasCalendarioConsejos($scope.id).then(function(data) {
                $scope.consejo = data.consejo
                for (var i = 0; i < data.fechas.length; i++) {
                    $scope.fechas.push(new moment(data.fechas[i].fecha));
                    $scope.highlightDays.push({ date: new moment(data.fechas[i].fecha), css: 'holiday', selectable: false, title: 'Reunión consejo de programa' });
                    $scope.fechasAux.push(data.fechas[i].fecha);
                }

                $("#load2").addClass("hidden");

            }).catch(function() {
                $("#load2").addClass("hidden");
                swal("Error", "Hubo un error en la petición intentalo nuevamente", "error");
            });
        }

    });

});