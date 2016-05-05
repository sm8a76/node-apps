var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');
var counter = 0;

var output = [];
var parser = parse({delimiter: ','})
var input = fs.createReadStream('./svgOriginalAttributes.csv');
//var output = fs.createWriteStream('./tblSVGattributesToUpdate6.sql');
//var output = fs.createWriteStream('./InsertDCUD_1840_CSV_1.sql');
//var output = fs.createWriteStream('./InsertDCUD_1840_CSV_2.sql');
//var output = fs.createWriteStream('./InsertDCUD_1840_CSV_3.sql');
//var output = fs.createWriteStream('./InsertDCUD_1840_CSV_4.sql');
//var output = fs.createWriteStream('./InsertDCUD_1840_CSV_5.sql');
var output = fs.createWriteStream('./InsertDCUD_1840_CSV_6.sql');
var transformer = transform(function(record, callback){
  /*setTimeout(function(){
    callback(null, record.join(' ')+'\n');
  }, 500);*/
  counter++;

  //if(counter <= 100000){    
  //if(counter <= 200000 && counter > 100000){    
  //if(counter <= 300000 && counter > 200000){
  //if(counter <= 400000 && counter > 300000){
  //if(counter <= 500000 && counter > 400000){  
  if(counter <= 600000 && counter > 500000){
      var array = record.join(' ').split(' ');
      callback(null, 'INSERT INTO DCUD_1840_CSV(groupID,datasourceID,isUnknownEstimated) VALUES(' + array[0] + ',' + array[1] + ',' + array[2] + ');\n');      
      //callback(null, 'UPDATE tblSVGPolygonGroupDetail SET isUnknownEstimated=' + array[2] + ', dataSourceId=' + array[1] + ' WHERE groupId=' + array[0] + ';\n');
  } else {
      callback(null, '');
  }
    
}, {parallel: 10});
input.pipe(parser).pipe(transformer).pipe(output);