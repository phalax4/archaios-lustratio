import char2index from "../resources/pled/char2index_pled.json";
import index2char from "../resources/pled/index2char_pled.json";
import input_chars from "../resources/pled/input_chars_pled.json";
import * as tf from '@tensorflow/tfjs';
const appService = {
     async generateText (modelT) {
         console.log(modelT);
        let test_chars = "nte"; //input_chars["input"][sample_idx];
        let master = test_chars;
       // (async() => {
        const nb_chars = 154;
        const SEQLEN = 3;

        let sample_idx = Math.floor(Math.random() * input_chars["input"].length);
       
        var test_chars_array = test_chars.split("");
        for (let t = 0; t < 10; t++) {
          //let XinputEncoded = this.oneHotEncode(test_chars.split(""));

          var input_array = [];
          for (var i = 0; i < SEQLEN; i++) {
            for (var k = 0; k < nb_chars; k++) {

              if (k === char2index[test_chars_array[i]]) {
                input_array.push(1.0);
              } else {
                input_array.push(0.0);
              }
            }
          }

          let Xinput = tf.tensor(input_array, [1, SEQLEN, nb_chars]);
          const predictedClass = tf.tidy(() => {
            const predictions = modelT.predict(Xinput);
            return predictions.as1D().argMax();
          });
          const classId = await predictedClass.dataSync()[0];
          console.log(classId);

          let ypred = index2char[classId];
          predictedClass.dispose();
          test_chars_array = test_chars_array.slice(1)
          master += ypred
          test_chars_array.push(ypred);
        }
    //})();

    return master;
 
        
    }
}

export default appService;