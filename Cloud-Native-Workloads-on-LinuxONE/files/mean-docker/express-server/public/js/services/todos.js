angular.module('todoService', [])

	// super simple service
	// each function returns a promise object
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			get_user_by_name: function(username){
				return $http.get('/api/get_user_by_name/' + username)
			},
			add_user: function(user_data){
				return $http.post('/api/add_user',user_data);
			},
		  deposit: function(info){
				return $http.post('/api/deposit', info);
			},
			withdraw: function(info){
				return $http.post('/api/withdraw', info);
			},
			transfer: function(info){
				return $http.post('/api/transfer', info);
			}
		}
	}]);

