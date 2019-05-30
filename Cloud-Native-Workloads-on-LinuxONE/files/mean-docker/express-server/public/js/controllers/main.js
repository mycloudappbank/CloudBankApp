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

		// deposit
		$scope.deposit = function () {
			if ($scope.formData.deposit_amount != undefined && $scope.formData.deposit_amount > 0) {
				$scope.loading = true;
				$scope.formData.user_name = $cookies.get('user_name');
				Todos.deposit($scope.formData)
					.success(function (data) {
						// data 是什么
						// $scope.formData = { balance: data };
						alert("Congratulation！Deposit sucessfully！");
					});
				$scope.loading = false;
			}
			else {
				alert("Sorry,you had better deposit a larger-than-zero amount.");
			}
		};

		// withdraw
		$scope.withdraw = function () {
			if ($scope.formData.withdrawals_amount != undefined && $scope.formData.withdrawals_amount > 0) {
				$scope.loading = true;
				$scope.formData.user_name = $cookies.get('user_name');
				Todos.get_user_by_name($scope.formData.user_name)
					.success(function (data) {
						if (data[0].balance >= $scope.formData.withdrawals_amount) {
							Todos.withdraw($scope.formData)
								.success(function (data) {
									// data 是什么
									// $scope.formData = { balance: data };
									alert("Congratulation！Withdraw sucessfully！");
									location.href = '../../business/user.html'
								})
						}
						else{
							alert("Sorry,your balance is insufficient！");
							location.href = '../../business/withdrawals.html'
						}
					})
				$scope.loading = false;
			}
			else {
				alert("Sorry,you had better withdraw a larger-than-zero amount.");
				location.href = '../../business/withdrawals.html'
			}
		};

		// transfer
		$scope.transfer = function () {
			if ($scope.formData.transfer_amount != undefined && $scope.formData.transfer_amount > 0) {
				$scope.loading = true;
				$scope.formData.transfer_source = $cookies.get('user_name');
				Todos.get_user_by_name($scope.formData.transfer_source)
					.success(function (data) {
						if (data[0].balance >= $scope.formData.transfer_amount) {
							Todos.get_user_by_name($scope.formData.transfer_target)
								.success(function (data) {
									if (data.length != 0) {
										Todos.transfer($scope.formData)
											.success(function (data) {
												// data 是什么
												// $scope.formData = { balance: data };
												alert("Congratulation！Transfer sucessfully！");
											})
									}
									else{
										alert("Sorry,the user you are transferring to is not existent.");
									}
								})
						}
						else{
							alert("Sorry,your balance is insufficient！");
						}
					})
				$scope.loading = false;
			}
			else {
				alert("Sorry,you had better transfer to user with a larger-than-zero amount.");
			}
		};

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
						alert("Password error or the user does not exist.");
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
						alert("The user already exist, please sign in.");
					}
					else {
						// add user
						Todos.add_user($scope.formData)
							.success(function (data) {
								console.log(data)
								$scope.loading = false;
								$scope.formData = {username:$scope.formData.username};
								alert("Successfully sign up, use your username to login in");
							})
					}
				})
		}
	}]);

