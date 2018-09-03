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
                      {{ text }}
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

  import AppFooter from './AppFooter.vue';
  import AppInfo from './AppInfo.vue';
  import AppTitle from './AppTitle.vue';
  import AppHeader from './AppHeader.vue';
  import { mapGetters, mapState  } from 'vuex'

  export default {
    name: "AppMainLayout",
    props: {
      msg: String
    },
    components: {
      'app-footer': AppFooter,
      'app-info': AppInfo,
      'app-title': AppTitle,
      'app-header': AppHeader
  
    },
    computed: {
      ...mapGetters({
        model: 'getModel',
        textStatus: 'isTextLoading'
      }),
      ...mapState([
        'model',
        'text',
        'textStatus'
      ])
    },
    data() {
      return {
        message: "Robot",
        count: 1
      };
    },
    methods: {
      doTensorProcess() {
        this.$store.dispatch('generateText', this.model);
      
  
      },
    },
    created() {
        this.$store.dispatch('loadModel')
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
