var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

var output = [];
var parser = parse({delimiter: ','})
var input = fs.createReadStream('./tblSVGattributesToUpdate.csv');
var output = fs.createWriteStream('./tblSVGattributesToUpdate2.sql');
var transformer = transform(function(record, callback){
  /*setTimeout(function(){
    callback(null, record.join(' ')+'\n');
  }, 500);*/
  var array = record.join(' ').split(' ');
  callback(null, 'UPDATE tblSVGPolygonGroupDetail SET isUnknownEstimated=1, dataSourceId=' + array[1] + ' WHERE groupId=' + array[0] + ';\n');
}, {parallel: 10});
input.pipe(parser).pipe(transformer).pipe(output);