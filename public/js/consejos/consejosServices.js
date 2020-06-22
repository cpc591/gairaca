var app = angular.module("consejoService", []);

app.factory("consejoServi", ["$http", "$q", function($http, $q) {

    return {

        getListadoConsejos: function() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/getListadoConsejos').success(function(data) {
                defered.resolve(data);
            }).error(function(err) {
                defered.reject(err);
            })
            return promise;
        },
        getFechasCalendarioConsejos: function(id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/fechasCalendarioConsejosEstudiantes/' + id).success(function(data) {
                defered.resolve(data);
            }).error(function(err) {
                defered.reject(err);
            })
            return promise;
        },

    }
}]);