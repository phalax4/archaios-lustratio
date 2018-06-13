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
              Using RNN
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
              <div class="column is-one-third">1</div>
  
              <div class="column is-one-third">
                <h1 class="title">
                  [ {{ message }} ]
                </h1>
                <div class="has-text-centered">
                  <a class="button is-large is-info is-inverted" v-on:click="greet">Large</a>
                </div>
                <!-- <div class="has-text-centered">
                     <span class="">Message is: {{ message }}</span>
      
                    </div>-->
                <nav class="level section is-mobile">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply">
                      <span class="">
                           <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-dark ">saved</span>
                      <span class="tag is-primary">4</span>
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
          <div class="column is-one-third">3</div>
  
  
        </div>
    </div>
  </div>
  </section>
  <section class="section">
    <div class="container">
      <nav class="level is-mobile">
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
  import KerasJS from "keras-js";
  export default {
    name: "HelloWorld",
    props: {
      msg: String
    },
    data() {
      return {
        message: "Robot"
      };
    },
    methods: {
      loadModel() {
        const model = new KerasJS.Model({
          filepath: "../MapModelSimpleRNN.bin",
          gpu: false
        });
      },
      greet() {
        this.message = "Greetings"
      }
    },
    created() {
      //this.loadModel();
      //console.log("Model Loaded");
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
  h3 {
    margin: 40px 0 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
  
  .visible {
    font-weight: 600;
    overflow: hidden;
    height: 40px;
    padding: 0 40px;
    &:before {
      content: '[';
      left: 0;
      line-height: 40px;
    }
    &:after {
      content: ']';
      position: absolute;
      right: 0;
      line-height: 40px;
    }
    &:after,
    &:before {
      position: absolute;
      top: 0;
      color: #16a085;
      font-size: 42px;
      -webkit-animation-name: opacity;
      -webkit-animation-duration: 2s;
      -webkit-animation-iteration-count: infinite;
      animation-name: opacity;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }
  }
  
  p {
    display: inline;
    float: left;
    margin: 0;
  }
</style>
