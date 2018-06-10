console.log("Hello");

function argMax(array) {
  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

function processData(index2char){
  var inputX;

  var fs = require('fs')
    , filename = "input_test.txt";
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    //console.log(data)
    inputX = data;
    var X = JSON.parse(inputX)
    var XR;
    var tempA = [];
    for(var i = 0; i < X.length; i++){
      for(var j = 0; j < X[i].length; j++){
        for(var k = 0; k < X[i][j].length; k++){
          tempA.push(X[i][j][k]);
        }
        //tempA.push(new Float32Array(X[i][j]));
      }
    }
    XR = new Float32Array(tempA)
    const KerasJS = require('keras-js')
  
  const model = new KerasJS.Model({
    filepath: 'MaptModelSimpleRNN.bin',
    filesystem: true
  })
    model
    .ready()
    .then(() => {
      // input data object keyed by names of the input layers
      // or `input` for Sequential models
      // values are the flattened Float32Array data
      // (input tensor shapes are specified in the model config)
      const inputData = {
        input: XR
      }
     // console.log(XR)
      // make predictions
      return model.predict(inputData)
    })
    .then(outputData => {
      // outputData is an object keyed by names of the output layers
      // or `output` for Sequential models
      // e.g.,
      // outputData['fc1000']
      console.log(argMax(Array.from(outputData['output'])));
      var v = index2char[argMax(Array.from(outputData['output'])).toString()];
      console.log(v);
  
    })
    .catch(err => {
      // handle error
      console.log(err)
    });
    
  });
}

/*
const KerasJS = require('keras-js')

const model = new KerasJS.Model({
  filepath: 'test.bin',
  filesystem: true
})*/

var t = "[[[1.0,2.0],[1.0]]]"
console.log(JSON.parse(t))


// Read the file and print its contents.
var fs = require('fs')
  , filename ="index2char.txt";
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  //console.log(JSON.parse(data))
  processData(JSON.parse(data));
 // console.log(idx);

});
//console.log(inputX)

 /*
model
  .ready()
  .then(() => {
    // input data object keyed by names of the input layers
    // or `input` for Sequential models
    // values are the flattened Float32Array data
    // (input tensor shapes are specified in the model config)
    const inputData = {
      input: new Float32Array(inputX)
    }
    console.log(typeof inputX)
    // make predictions
    return model.predict(inputData)
  })
  .then(outputData => {
    // outputData is an object keyed by names of the output layers
    // or `output` for Sequential models
    // e.g.,
    // outputData['fc1000']
    console.log(outputData)
  })
  .catch(err => {
    // handle error
    console.log(err)
  })
  */
 /*
// Read the file and print its contents.
var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  console.log(data)
});
 */