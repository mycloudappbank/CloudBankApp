angular.module('todoController', ['ngCookies'])


	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope', '$http', 'Todos','$cookies', function ($scope, $http, Todos, $cookies) {
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

<<<<<<< HEAD
		$scope.login_user = undefined

		// login status check
		$scope.check_login_status = function(){
			console.log($cookies.get('user_name'))
			user_name = $cookies.get('user_name')
			if (user_name === undefined){
				alert("please login")
				location.href = "../index.html"
			}
		}
=======
		//deposit
        $scope.deposit=function(){
			if($scope.formData.mySavings!=undefined&&$scope.formData.mySavings>0){
				$scope.loading = true;
				Todos.deposit_money($scope.formData)
				.success(function(data){
					$scope.mySavings=data;
					$scope.loading=false;
					$scope.formData={};
					location.href = '../../../business/deposit.html'
				});
			}
		};

		//withdraw
        $scope.withdraw=function(){
			$scope.loading=true;
			Todos.withdraw_money($scope.formData.withdraw)
			.success(function(data){
				user =data[0];
				if($scope.formData.withdraw<=0){
					alert("The withdraw money should be greater than 0.");
					location.href = '../../../business/withdrawals.html'
				}
				else if($scope.formData.withdraw>user.balance){
					alert("The withdraw money should be less than balance.");
					location.href = '../../../business/withdrawals.html'
				}
				$scope.loading = false;
				$scope.formData = {balance:$scope.formData.balance};
			})
		};

>>>>>>> f8b28f40f9035047b8bdf75699e20305219026b7

		// login
		$scope.login = function () {
			$scope.loading = true;
			Todos.get_user_by_name($scope.formData.username)
				.success(function (data) {
					user = data[0]
					if (user.password != undefined && user.password === $scope.formData.password) {
						$cookies.put('user_name',user.user_name)
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

