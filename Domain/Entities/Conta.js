var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var contaSchema = new Schema({

    nome:     {type:String},
    valor:    {type:Number},
    tipoConta: {
        nome:{type:String}
    },
    dataPagamento : {type:Date},
    status:{type:Boolean}
});

module.exports = mongoose.model('Conta',contaSchema);
