<template>
  <div class="columns is-centered">
    <div class="column">
     <app-title></app-title>
  
  <section class="hero is-info is-medium">
<app-header></app-header>
  
        <!-- Hero content: will be in the middle -->
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-one-third"></div>
  
              <div class="column is-one-third">
                <div class="columns is-mobile is-centered">
                  <div class="column  is-narrow">
                    <span class="left-brackets" />
                  </div>
                  <div class="column">
                    <h1 class="title output">
                      {{ message }}
                    </h1>
                  </div>
                  <div class="column is-narrow">
                    <span class="right-brackets" />
                  </div>
                </div>
                <div class="has-text-centered">
                  <a class="button is-large is-info is-inverted" v-on:click="doTensorProcess">Large</a>
                </div>
  
                <nav class="level section is-mobile">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply">
                      <span class="">
                                                                   <div class="control">
                                                            <div class="tags has-addons">
                                                              <span class="tag is-dark ">saved</span>
                      <span class="tag is-primary"> {{count}}</span>
                  </div>
              </div>
              </span>
              </a>
              <a class="level-item" aria-label="reply">
                <span class="icon is-medium has-text-primary">
                                                                  <i class="fas fa-reply" aria-hidden="true"></i>
                                                                    </span>
              </a>
              <a class="level-item" aria-label="retweet">
                <span class="icon is-medium has-text-primary">
                                                              <i class="fas fa-retweet" aria-hidden="true"></i>
                                                            </span>
              </a>
              <a class="level-item" aria-label="like">
                <span class="icon is-medium has-text-primary">
                                                              <i class="fas fa-heart" aria-hidden="true"></i>
                                                            </span>
              </a>
            </div>
            </nav>
  
          </div>
          <div class="column is-one-third"></div>
  
  
        </div>
    </div>
  </div>
  </section>
  <app-info></app-info>

    <app-footer></app-footer>

  </div>
  
  </div>
</template>

<script>
  import char2index from "../resources/pled/char2index_pled.json";
  import index2char from "../resources/pled/index2char_pled.json";
  import input_chars from "../resources/pled/input_chars_pled.json";
  import * as tf from '@tensorflow/tfjs';
  import AppFooter from './AppFooter.vue';
  import AppInfo from './AppInfo.vue';
  import AppTitle from './AppTitle.vue';
  import AppHeader from './AppHeader.vue';
  
  export default {
    name: "HelloWorld",
    model: null,
    props: {
      msg: String
    },
    components: {
      'app-footer': AppFooter,
      'app-info': AppInfo,
      'app-title': AppTitle,
      'app-header': AppHeader
  
    },
    data() {
      return {
        message: "Robot",
        count: 1
      };
    },
    methods: {
      doTensorProcess() {
  
        // var char2index = {"c": 0, "o": 1, "n": 2, "s": 3, "a": 4, "b": 5, "u": 6, "r": 7, "m": 8, "k": 9, "d": 10, "e": 11, "t": 12, "i": 13, "h": 14, "p": 15, "\u00e9": 16, "l": 17, " ": 18, "f": 19, "v": 20, "x": 21, "g": 22, ".": 23, "y": 24, "\u00fa": 25, "j": 26, "1": 27, "2": 28, "z": 29, "(": 30, ")": 31, ",": 32, "q": 33, "[": 34, "]": 35, "\u0101": 36, "-": 37, "\u0161": 38, "\u2019": 39, "\u00e1": 40, "\u1e43": 41, "\u00ed": 42, "\u012b": 43, "w": 44, "\u0113": 45, "\u1e2b": 46, "\u00f3": 47, "\u00e7": 48, "\u00f6": 49, "\u00fc": 50, "\u1e25": 51, "\u011f": 52, "\u0131": 53, "\u00e8": 54, "'": 55, "\u00ee": 56, "\u1e63": 57, "\u01e7": 58, "\u016b": 59, "0": 60, "\u014d": 61, "4": 62, "8": 63, "3": 64, "\u2026": 65, "\u02bf": 66, "\u00ec": 67, "\u00fb": 68, "\u015f": 69, "\u0121": 70, "\u0301": 71, "\u012d": 72, "\u02b9": 73, "\u1e53": 74, "\u1e33": 75, "\u1e6d": 76, "\u0307": 77, "\u0127": 78, "\u00ea": 79, "9": 80, "6": 81, "*": 82, "\u02be": 83, "\u1e15": 84, "\u00e4": 85, "\u017e": 86, "\u00f4": 87, "\u00eb": 88, "\u1e29": 89, "\u1eb9": 90, "\u0227": 91, "\u01dd": 92, "\u015b": 93, "\u1e07": 94, "\u02bb": 95, "\u0117": 96, "\u1ea1": 97, "\u0331": 98, "\u1e6f": 99, "\ua723": 100, "\u1e96": 101, "\u1e0f": 102, "\u1e17": 103, "\u00ef": 104, "\u0304": 105, "\u1e0d": 106, "\u010d": 107, "\u0323": 108, "\u00fd": 109, "\u0306": 110, "5": 111, "7": 112, "\u200e": 113, "\u0327": 114, "\u00f1": 115, "\u1e95": 116, "?": 117, "\u0308": 118, "\u00e2": 119, "\u1e5b": 120, "\u00f2": 121, "\u0163": 122, ":": 123, "+": 124, "\u2011": 125, "\u00e0": 126, "\u0144": 127, "\ufe20": 128, "\ufe21": 129, "\u00f9": 130, "\u0103": 131, "\u0142": 132, "\u017c": 133, "\u1e59": 134, "\u01f0": 135, "\u0565": 136, "\u0580": 137, "\u0566": 138, "\u056b": 139, "\u0576": 140, "\u056f": 141, "\u0561": 142, "\u030c": 143, "\u020b": 144, "\u00df": 145, "\u1e93": 146, "\u1e23": 147, "\u01d0": 148, "\u022f": 149, "\u2018": 150, "\t": 151, "\u1e05": 152, "\u1e61": 153};
        // var index2char = {"0": "c", "1": "o", "2": "n", "3": "s", "4": "a", "5": "b", "6": "u", "7": "r", "8": "m", "9": "k", "10": "d", "11": "e", "12": "t", "13": "i", "14": "h", "15": "p", "16": "\u00e9", "17": "l", "18": " ", "19": "f", "20": "v", "21": "x", "22": "g", "23": ".", "24": "y", "25": "\u00fa", "26": "j", "27": "1", "28": "2", "29": "z", "30": "(", "31": ")", "32": ",", "33": "q", "34": "[", "35": "]", "36": "\u0101", "37": "-", "38": "\u0161", "39": "\u2019", "40": "\u00e1", "41": "\u1e43", "42": "\u00ed", "43": "\u012b", "44": "w", "45": "\u0113", "46": "\u1e2b", "47": "\u00f3", "48": "\u00e7", "49": "\u00f6", "50": "\u00fc", "51": "\u1e25", "52": "\u011f", "53": "\u0131", "54": "\u00e8", "55": "'", "56": "\u00ee", "57": "\u1e63", "58": "\u01e7", "59": "\u016b", "60": "0", "61": "\u014d", "62": "4", "63": "8", "64": "3", "65": "\u2026", "66": "\u02bf", "67": "\u00ec", "68": "\u00fb", "69": "\u015f", "70": "\u0121", "71": "\u0301", "72": "\u012d", "73": "\u02b9", "74": "\u1e53", "75": "\u1e33", "76": "\u1e6d", "77": "\u0307", "78": "\u0127", "79": "\u00ea", "80": "9", "81": "6", "82": "*", "83": "\u02be", "84": "\u1e15", "85": "\u00e4", "86": "\u017e", "87": "\u00f4", "88": "\u00eb", "89": "\u1e29", "90": "\u1eb9", "91": "\u0227", "92": "\u01dd", "93": "\u015b", "94": "\u1e07", "95": "\u02bb", "96": "\u0117", "97": "\u1ea1", "98": "\u0331", "99": "\u1e6f", "100": "\ua723", "101": "\u1e96", "102": "\u1e0f", "103": "\u1e17", "104": "\u00ef", "105": "\u0304", "106": "\u1e0d", "107": "\u010d", "108": "\u0323", "109": "\u00fd", "110": "\u0306", "111": "5", "112": "7", "113": "\u200e", "114": "\u0327", "115": "\u00f1", "116": "\u1e95", "117": "?", "118": "\u0308", "119": "\u00e2", "120": "\u1e5b", "121": "\u00f2", "122": "\u0163", "123": ":", "124": "+", "125": "\u2011", "126": "\u00e0", "127": "\u0144", "128": "\ufe20", "129": "\ufe21", "130": "\u00f9", "131": "\u0103", "132": "\u0142", "133": "\u017c", "134": "\u1e59", "135": "\u01f0", "136": "\u0565", "137": "\u0580", "138": "\u0566", "139": "\u056b", "140": "\u0576", "141": "\u056f", "142": "\u0561", "143": "\u030c", "144": "\u020b", "145": "\u00df", "146": "\u1e93", "147": "\u1e23", "148": "\u01d0", "149": "\u022f", "150": "\u2018", "151": "\t", "152": "\u1e05", "153": "\u1e61"};
  
        async function asyncFun() {
          return tf.loadModel('../tfjs_75_pled/model.json');
        }
        (async() => {
  
          const nb_chars = 154;
          const SEQLEN = 3;
          const modelT = await asyncFun();
  
          let sample_idx = Math.floor(Math.random() * input_chars["input"].length);
          let test_chars = "nte"; //input_chars["input"][sample_idx];
          let master = test_chars;
          var test_chars_array = test_chars.split("");
          for (let t = 0; t < 100; t++) {
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
            }//GVue)tuNq6pg
  
            let Xinput = tf.tensor(input_array, [1, SEQLEN, nb_chars]);
            const predictedClass = tf.tidy(() => {
              const predictions = modelT.predict(Xinput);
              return predictions.as1D().argMax();
            });
            const classId = (await predictedClass.data())[0];
            let ypred = index2char[classId];
            predictedClass.dispose();
            test_chars_array = test_chars_array.slice(1)
            master += ypred
            test_chars_array.push(ypred);
            console.log(ypred);
          }
          this.message = master;
        })()
  
      },
  
      oneHotEncode(test_chars_array) {
        const nb_chars = 154;
        const SEQLEN = 3;
  
        //Return a flattened one hot encoded array
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
        return input_array;
      }
    },
    created() {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
  @keyframes example {
    0% {
      background-color: red;
      left: 0px;
      top: 0px;
    }
    25% {
      background-color: yellow;
      left: 200px;
      top: 0px;
    }
    50% {
      background-color: blue;
      left: 200px;
      top: 200px;
    }
    75% {
      background-color: green;
      left: 0px;
      top: 200px;
    }
    100% {
      background-color: red;
      left: 0px;
      top: 0px;
    }
  }
  
  .output {
    padding-top: 4.5%
  }
  
  .brackets {
    animation-name: example;
    animation-duration: 4s;
  }
  
  .left-brackets::before {
    content: '[';
    left: 0;
    font-weight: 600;
    height: 40px;
    font-size: 42px;
  }
  
  .right-brackets::before {
    content: ']';
    right: 0;
    font-weight: 600;
    height: 40px;
    font-size: 42px;
  }
</style>
