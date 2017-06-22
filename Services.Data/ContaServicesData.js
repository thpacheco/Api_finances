var mongoose = require('mongoose');
var Conta = mongoose.model('Conta');

//GET - Return all Receitas in the DB
exports.findAllContas = function (req, res) {
    Conta.find(function (err, contas) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(contas);
    });
};

//GET - Return a Receitas with specified ID
exports.findById = function (req, res) {
    Conta.findById(req.params.id, function (err, conta) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(conta);
    });
};


//POST - Insert a new Receita in the DB
exports.addConta = function (req, res) {

    var conta = new Conta({
        nome: req.body.nome,
        valor: req.body.valor,
        tipoConta: req.body.tipoConta,
        dataPagamento: req.body.dataPagamento,
        status: req.body.status
    });

    conta.save(function (err, conta) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(conta);
    });
};

//PUT - Update a register already exists
exports.updateConta = function (req, res) {
    Receita.findById(req.params.id, function (err, conta) {
            conta.nome = req.nome,
            conta.valor = req.valor,
            conta.tipoConta = req.tipoConta,
            conta.dataPagamento = req.dataPagamento,
            conta.status = req.status

        Conta.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(conta);
        });
    });
};

//DELETE - Delete a Receita with specified ID
exports.deleteConta = function (req, res) {
    Conta.findById(req.params.id, function (err, conta) {
        Conta.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200);
        })
    });
};