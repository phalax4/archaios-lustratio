<template>
  <div class="hello">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
    </section>
  
    <section class="hero is-primary is-medium">
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
                <a class="navbar-item is-active">
                Home
              </a>
                <a class="navbar-item">
                Examples
              </a>
                <a class="navbar-item">
                Documentation
              </a>
                <span class="navbar-item">
                <a class="button is-primary is-inverted">
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
        <div class="container has-text-centered">
          <h1 class="title">
            Title
          </h1>
          <h2 class="subtitle">
            <div class="field">
              <div class="control">
                <input v-model="message" class="input is-primary" type="text" placeholder="Primary input">
              </div>
            </div>
            <p>Message is: {{ message }}</p>
            <h1>{{ msg }}</h1>
          </h2>
        </div>
      </div>
      </section>

  </div>
</template>

<script>
  import KerasJS from 'keras-js';
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data() {
      return {
        message: "RObot"
      }
    },
    methods: {
      loadModel() {
        const model = new KerasJS.Model({
          filepath: '../MapModelSimpleRNN.bin',
          gpu: false
        })
      }
    },
    created() {
      this.loadModel();
      console.log("Model Loaded");
    }
  
  }
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
</style>
