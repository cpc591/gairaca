var app = angular.module("calendarioService", []);

app.factory("calendarioServi", ["$http", "$q", function($http, $q) {

    return {

        getFechasCalendario: function() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/fechasCalendario').success(function(data) {
                defered.resolve(data);
            }).error(function(err) {
                defered.reject(err);
            })
            return promise;
        },
        getFechasCalendarioIncluidos: function() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/fechasCalendarioIncluidos').success(function(data) {
                defered.resolve(data);
            }).error(function(err) {
                defered.reject(err);
            })
            return promise;
        },
        getFechasCalendarioExcluidos: function() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/fechasCalendarioExcluidos').success(function(data) {
                defered.resolve(data);
            }).error(function(err) {
                defered.reject(err);
            })
            return promise;
        },
        getFechasCalendarioConsejos: function() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/fechasCalendarioConsejos').success(function(data) {
                defered.resolve(data);
            }).error(function(err) {
                defered.reject(err);
            })
            return promise;
        },

        agregarFechas: function(fechas, tipoFecha) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/agregarFechasExcluidos', { 'fechas': fechas, 'tipo': tipoFecha })
                .success(function(data) {
                    defered.resolve(data);
                }).error(function(err) {
                    defered.reject(err);
                })
            return promise;
        },
        agregarFechasConsejos: function(fechas) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/fechasAgregarConsejos', { 'fechas': fechas })
                .success(function(data) {
                    defered.resolve(data);
                }).error(function(err) {
                    defered.reject(err);
                })
            return promise;
        },

    }
}]);