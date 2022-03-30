var fs = require('fs');
var thunkify = require('thunkify');

function readFile(fileName, callback) {
    console.log('fileName:',fileName)
    fs.readFile(fileName,callback)
}

var readFile = thunkify(readFile);

var gen = function* (){
  var r1 = yield readFile('./package.json');
  console.log(r1.toString().length);
  var r2 = yield readFile('./tsconfig.json');
  console.log(r2.toString().length);
};

var g = gen();

var r1 = g.next();
console.log(r1)
r1.value(function(err, data){
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function(err, data){
    if (err) throw err;
    g.next(data);
  });
});