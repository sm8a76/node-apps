var http = require('http');
var config = require('./config');
var getData = require('./dataProvider');

module.exports = function(sticker, callback) {
    var options = {
      host: config.host,
      port: 80,
      path: config.path + sticker
    };
    
    http.get(options, function(res) {
      console.log("Got response: " + res.statusCode);
      var body = '';
        
      res.on('data', function(chunk) {
        body += chunk;
      });        

      res.on("end", function() {
          
          try{
              var index = getData(config.keys.index, body);
              var pe = getData(config.keys.pe, body);
              var eps = getData(config.keys.eps, body);
              var insiderOwn = getData(config.keys.insiderOwn, body);
              var shsOutstand = getData(config.keys.shsOutstand, body);
              var perfWeek = getData(config.keys.perfWeek, body);
              var marketCap = getData(config.keys.marketCap, body);
              var forwardPE = getData(config.keys.forwardPE, body);
              var epsNextYear = getData(config.keys.epsNextYear, body);
              var insiderTrans = getData(config.keys.insiderTrans, body);
              var shsFloat = getData(config.keys.shsFloat, body);
              var perfMonth = getData(config.keys.perfMonth, body);
              var income = getData(config.keys.income, body);
              var peg = getData(config.keys.peg, body);
              var epsNextQuarter = getData(config.keys.epsNextQuarter, body);
              var instOwn = getData(config.keys.instOwn, body);
              var shortFloat = getData(config.keys.shortFloat, body);
              var perfQuarter = getData(config.keys.perfQuarter, body);
              
              var fundamentals = {
                   index: index,
                   pe: pe,
                   eps: eps,
                   insiderOwn: insiderOwn,
                   shsOutstand: shsOutstand,
                   perfWeek: perfWeek,
                   marketCap: marketCap,
                   forwardPE: forwardPE,
                   epsNextYear: epsNextYear,
                   insiderTrans: insiderTrans,
                   shsFloat: shsFloat,
                   perfMonth: perfMonth,
                   income: income,
                   peg: peg,
                   epsNextQuarter: epsNextQuarter,
                   instOwn: instOwn,
                   shortFloat: shortFloat,
                   perfQuarter: perfQuarter
              };

              callback(null, fundamentals);
              
          }catch(error){
              callback(error);
          }

      });
    }).on('error', function(error) {
        //console.log("Got error: " + e.message);
        callback(error);
    });    
    
    
}


