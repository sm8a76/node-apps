var getFundamentals = require('./fundamentalsProvider');

var sticker = 'AAPL';

getFundamentals(sticker, function(err, object){
    if(err){
        console.log("Got error: " + err.message);
        throw err;
    }
    
    console.log('Fundamentals information for ' + sticker + ' is ');
    console.log('index = ' + object.index);
    console.log('pe = ' + object.pe);
    console.log('eps = ' + object.eps);
    console.log('insiderOwn = ' + object.insiderOwn);
    console.log('shsOutstand = ' + object.shsOutstand);
    console.log('perfWeek = ' + object.perfWeek);
    console.log('forwardPE = ' + object.forwardPE);
    console.log('epsNextYear = ' + object.epsNextYear);
    console.log('insiderTrans = ' + object.insiderTrans);
    console.log('shsFloat = ' + object.shsFloat);
    console.log('perfMonth = ' + object.perfMonth);
    console.log('income = ' + object.income);
    console.log('perfMonth = ' + object.perfMonth);
    console.log('peg = ' + object.peg);
    console.log('epsNextQuarter = ' + object.epsNextQuarter);
    console.log('instOwn = ' + object.instOwn);
    console.log('shortFloat = ' + object.shortFloat);
    console.log('perfQuarter = ' + object.perfQuarter);    
});
