angular.module('todoController', [])


	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope', '$http', 'Todos', function ($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function (data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function () {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined && $scope.formData.value != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function (data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function (id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function (data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		// login
		$scope.login = function () {
			$scope.loading = true;
			Todos.get_user_by_name($scope.formData.username)
				.success(function (data) {
					user = data[0]
					if (user.password != undefined && user.password === $scope.formData.password) {
						location.href = '../../business/user.html'
					}
					else {
						alert("password error or user does not exist");
					}

					$scope.loading = false;
					$scope.formData = {username:$scope.formData.username};
				})
		}

		// sign up
		$scope.sign_up = function () {
			$scope.loading = true;

			// check duplicate
			Todos.get_user_by_name($scope.formData.username)
				.success(function (data) {
					if (data.length != 0) {
						$scope.loading = false;
						$scope.formData = {username:$scope.formData.username};
						alert("user already exist, please sign in");
					}
					else {
						// add user
						Todos.add_user($scope.formData)
							.success(function (data) {
								console.log(data)
								$scope.loading = false;
								$scope.formData = {username:$scope.formData.username};
								alert("successfully sign up, use your username to login in");
							})
					}
				})
		}
	}]);
