(function(angular) {
	var AppController = function($scope, Cliente) {
		$scope.clienteSaque;

		Cliente.query(function(response) {
			$scope.clientes = response ? response : [];
		});

		$scope.addCliente = function(cNome, cSaldo) {
			new Cliente({
				nome : cNome,
				saldo : cSaldo
			}).$save(function(cliente) {
				$scope.clientes.push(cliente);
			});
		};

		$scope.deleteCliente = function(cliente) {
			cliente.$remove(function() {
				$scope.clientes.splice($scope.clientes.indexOf(cliente), 1);
			});
		};

		$scope.selecionarClienteSaque = function(cliente) {
			$scope.clienteSaque = cliente;
		};

		$scope.realizarSaque = function(valor) {
			Cliente.query({
				id : $scope.clienteSaque.id,
				valor : valor
			}, function(response) {
				console.log(JSON.stringify(response));
				$scope.clientes.saqueRealizado = response;
			});
		};

	};

	AppController.$inject = [ '$scope', 'Cliente' ];
	angular.module("myApp.controllers").controller("AppController",
			AppController);
}(angular));