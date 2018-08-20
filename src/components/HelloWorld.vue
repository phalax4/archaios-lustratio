<template>
  <div class="columns is-centered">
    <div class="column">
      <section class="hero is-info">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Pleaides Word Generator
            </h1>
            <h2 class="subtitle">
              Using Recurrent Neural Networks
            </h2>
          </div>
        </div>
      </section>
  
      <section class="hero is-info is-medium">
        <!-- Hero head: will stick at the top -->
        <div class="hero-head">
          <nav class="navbar">
            <div class="container">
              <div class="navbar-brand">
                <a class="navbar-item">
                  <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo">
                </a>
                <span class="navbar-burger burger" data-target="navbarMenuHeroA">
                                                                                  <span></span>
                <span></span>
                <span></span>
                </span>
              </div>
              <div id="navbarMenuHeroA" class="navbar-menu">
                <div class="navbar-end">
                  <!--<a class="navbar-item is-active">
                                                                                    Home
                                                                                  </a>
                                                        <a class="navbar-item">
                                                                                    Examples
                                                                                  </a>
                                                        <a class="navbar-item">
                                                                                    Documentation
                                                                                  </a>-->
                  <span class="navbar-item">
                                                                                    <a class="button is-info is-inverted">
                                                                                      <span class="icon">
                                                                                        <i class="fab fa-github"></i>
                                                                                      </span>
                  <span>Download</span>
                  </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
  
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
  
  <section class="section section-padding-medium">
    <div class="">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Trigrams</p>
            <p class="title">3,456</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Total Words</p>
            <p class="title">512</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Possible Combinations</p>
            <p class="title">456K</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Likes</p>
            <p class="title">789</p>
          </div>
        </div>
      </nav>
    </div>
  </section>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </div>
  </footer>
  </div>
  
  </div>
</template>

<script>
  import char2index from "../resources/char2index.json";
  import index2char from "../resources/index2char.json";
  import input_chars from "../resources/input_chars.json";
  import numjs from "numjs";
  import * as tf from '@tensorflow/tfjs';
  import hotData from '../resources/input_test.json';
  
  export default {
    name: "HelloWorld",
    props: {
      msg: String
    },
    data() {
      return {
        message: "Robot",
        count: 1
      };
    },
    methods: {
      doTensorProcess() {
        async function asyncFun() {
          return tf.loadModel('../tfjs_75/model.json');
        }
        (async() => {

                  const nb_chars = 55;
        const SEQLEN = 10;
          const modelT = await asyncFun();
          let sample_idx = Math.floor(Math.random() * input_chars["input"].length);
          let test_chars = input_chars["input"][sample_idx];
          let hotDataDecoded = hotData["input"]
          let master = test_chars;
          for (let t = 0; t < 100; t++) {
            let XinputEncoded = this.oneHotEncode(test_chars);
            let Xinput = tf.tensor(XinputEncoded, [1, SEQLEN, nb_chars]);
            const predictedClass = tf.tidy(() => {
              const predictions = modelT.predict(Xinput);
              return predictions.as1D().argMax();
            });
            const classId = (await predictedClass.data())[0];
            predictedClass.dispose();
            let ypred = index2char[classId];
            test_chars = test_chars.slice(1)
            master += ypred
            test_chars += ypred
            console.log(ypred);
  
          }
          this.message = master;
        })()
  
      },
      
      oneHotEncode(test_chars_array) {
        const nb_chars = 55;
        const SEQLEN = 10;

        //Return a flattened one hot encoded array
         var input_array = [];
          for(var i = 0; i < SEQLEN; i++){
            for(var k = 0 ; k < nb_chars; k++){

              if(k === char2index[test_chars_array[i]]){
                  input_array.push(1.0);
              }else{
                input_array.push(0.0);
              }
          }
        }
        return input_array;
      }
    },
    created() {
    }
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
