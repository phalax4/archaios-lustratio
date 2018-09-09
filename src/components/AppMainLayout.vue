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
                <div>
  
                  <div>
                    <nav class="level">
                      <div class="level-left">
                        <div class="level-item ">
                          <div>
                            <span class="left-brackets" />
                          </div>
                        </div>
                      </div>
                      <div class="level-item has-text-centered">
                        <div v-show="isModelLoading">
                          <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" color="#ff1d5e" />
                        </div>
                        <div v-show="!isModelLoading">
                          <h1 class="title output ">
                            {{text}}
                            <div ref="myDiv" class="baz">qwe123</div>

                          </h1>
  
                        </div>
  
                      </div>
  
                      <div class="level-right">
                        <div class="level-item">
                          <div>
                            <div class="right-brackets" />
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>
  
                </div>
  
  
                <div class="has-text-centered">
                  <a class="button is-large is-primary" v-bind:class="{ 'is-loading': textStatus || isModelLoading }" v-on:click="doTensorProcess">Go!</a>
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
  import {
    HollowDotsSpinner
  } from 'epic-spinners'
  import baffle from 'baffle';
  import {
    mapGetters,
    mapState
  } from 'vuex'
  
  export default {
    name: "AppMainLayout",
    props: {
      msg: String
    },
    components: {
      'app-footer': AppFooter,
      'app-info': AppInfo,
      'app-title': AppTitle,
      'app-header': AppHeader,
      'hollow-dots-spinner': HollowDotsSpinner
  
    },
    computed: {
      ...mapGetters({
        model: 'getModel',
        isModelLoading: 'isModelLoading'
      }),
      ...mapState([
        'model',
        'text',
        'textStatus',
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
      this.$store.dispatch('loadModel');
   

    },
    mounted() {
         let b = baffle('.baz', {
    characters: '+-•~!=*',
        speed: 200
      });
      b.start();
                 console.log(this.$refs.myDiv);
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
