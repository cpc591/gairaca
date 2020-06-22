var app = angular.module("directorAcademicoService", []);

app.factory("directorAcademicoServi", ["$http", "$q", function($http, $q) {

    return {

        ver_mas_academico: function(solicitud_id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/ver_mas_solicitudAcademico', { 'solicitud_id': solicitud_id })
                .success(function(data) {
                    defered.resolve(data);
                }).error(function(err) {
                    defered.reject(err);
                })
            return promise;
        },
        reenviar: function(respuesta) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/ver_mas_solicitudAcademico', respuesta)
                .success(function(data) {
                    defered.resolve(data);
                }).error(function(err) {
                    defered.reject(err);
                })
            return promise;
        },
        aprobar: function(solicitud_id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/aprobar_solicitud', { 'solicitud_id': solicitud_id })
                .success(function(data) {
                    defered.resolve(data);
                }).error(function(err) {
                    defered.reject(err);
                })
            return promise;
        },
        noAprobar: function(noAprobacion) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/noAprobarDirector', noAprobacion)
                .success(function(data) {
                    defered.resolve(data);
                }).error(function(err) {
                    defered.reject(err);
                })
            return promise;
        },
        eliminarSoporte: function(soporte_id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/eliminar_soporteRespuesta', soporte_id)
                .success(function(data) {
                    defered.resolve(data);
                }).error(function(err) {
                    defered.reject(err);
                })
            return promise;
        },
        corregir: function(data) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/corregir', data, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function(data) {
                defered.resolve(data);
            }).error(function(err) {
                defered.reject(err);
            })
            return promise;
        },
    }
}]);