var mongoose = require('mongoose');
var Conta = mongoose.model('Conta');

//GET - Return all Contas in the DB
exports.findAllContas = function (req, res) {
	Conta.find(function (err, Contas) {
		if (err) res.send(500, err.message);

		console.log('GET /Contas')
		res.status(200).jsonp(Contas);
	});
};


//GET - Return a Contas with specified ID
exports.findById = function (req, res) {
	Conta.findById(req.params.id, function (err, Conta) {
		if (err) return res.send(500, err.message);
		res.status(200).jsonp(Conta);
	});
};


//POST - Insert a new Conta in the DB
exports.addConta = function (req, res) {

	var Conta = new Conta({
		nome: req.body.nome,
		valor: req.body.valor,
		diaMelhorCompra: req.diaMelhorCompra,
		melhorDiaPagamento:req.melhorDiaPagamento,
		tipoConta: req.body.tipoConta,
		dataPagamento: req.body.dataPagamento,
		status: req.body.status
	});

	Conta.save(function (err, Conta) {
		if (err) return res.send(500, err.message);
		res.status(200).jsonp(Conta);
	});
};

//PUT - Update a register already exists
exports.updateConta = function (req, res) {
	Conta.findById(req.params.id, function (err, Conta) {
		Conta.nome = req.nome,
			Conta.valor = req.valor,
			Conta.tipoConta = req.tipoConta,
			Conta.dataPagamento = req.dataPagamento,
			Conta.status = req.status

		Conta.save(function (err) {
			if (err) return res.send(500, err.message);
			res.status(200).jsonp(Conta);
		});
	});
};

//DELETE - Delete a Conta with specified ID
exports.deleteConta = function (req, res) {
	Conta.findById(req.params.id, function (err, Conta) {
		Conta.remove(function (err) {
			if (err) return res.send(500, err.message);
			res.status(200);
		})
	});
};