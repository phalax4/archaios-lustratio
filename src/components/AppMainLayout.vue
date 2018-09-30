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
                            <span class="left-brackets brackets" />
                          </div>
                        </div>
                      </div>
                      <div class="level-item has-text-centered">
                        <div v-show="isModelLoading">
                          <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" color="#ff1d5e" />
                        </div>
                        <div v-show="!isModelLoading">
                          <h1 class="title output ">
                            <div ref="myDiv" v-show="clicked" class="baz">nomos velta m.</div>
  
                          </h1>
  
                        </div>
  
                      </div>
  
                      <div class="level-right">
                        <div class="level-item">
                          <div>
                            <div class="right-brackets brackets" />
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>
  
                </div>
  
              <nav class="level section is-mobile">
                <div class="level-item has-text-centered">
                  <a class="button is-large is-primary" v-bind:class="{ 'is-loading': isModelLoading }" v-on:click="doTensorProcess">Go!</a>
                </div>
              </nav>
                <nav class="level is-mobile">
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
                                                                              <i class="fas fa-download" aria-hidden="true"></i>
                                                                                </span>
              </a>
              
              <a class="level-item" aria-label="like">
                <span v-on:click="incrementSaved" class="icon is-medium has-text-primary">
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
        isModelLoading: 'isModelLoading',
        isTextLoading: 'isTextLoading'
      }),
      ...mapState([
        'model',
        'text',
      ])
    },
    data() {
      return {
        message: "Robot",
        count: 1,
        baffleInstance: {},
        clicked: false
      };
    },
    methods: {
      incrementSaved(){
        this.count++;
      },

      doTensorProcess() {
        if (!this.isModelLoading && !this.isTextLoading) {
          this.clicked = true;
          this.$store.dispatch('generateText', this.model).then(() => {
            this.baffleInstance.text(currentText => this.text).reveal(1500);
          });
        }
  
  
  
      },
    },
    created() {
      this.$store.dispatch('loadModel');
  
  
    },
    mounted() {
      this.baffleInstance = baffle('.baz', {
        characters: "ℳℕ℘ⅈ№ℒℌℜ℗ℚ℣℥</>ΩÅℭℲℼⅅ⅀ℾℽⅉ⅋⅌</>▓░▒█▙▘▞▗▟▖▜▝▛▚",
        speed: 70
      });
  
      this.baffleInstance.start();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
  .output {
    padding-top: 4.5%
  }
  
  .left-brackets::before {
    content: '[';
    left: 0;
  }
  
  .right-brackets::before {
    content: ']';
    right: 0;
  }
  
  .brackets:after,
  .brackets:before {
    top: 0;
    font-weight: 600;
    color: #FFFF;
    height: 40px;
    font-size: 42px;
    -webkit-animation-name: opacity;
    -webkit-animation-duration: 2s;
    -webkit-animation-iteration-count: infinite;
    animation-name: opacity;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  
  @-webkit-keyframes opacity {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
  
  @-webkit-keyframes change {
    0%,
    12%,
    100% {
      transform: translateY(0);
    }
    17%,
    29% {
      transform: translateY(-25%);
    }
    34%,
    46% {
      transform: translateY(-50%);
    }
    51%,
    63% {
      transform: translateY(-75%);
    }
    68%,
    80% {
      transform: translateY(-50%);
    }
    85%,
    97% {
      transform: translateY(-25%);
    }
  }
  
  @keyframes opacity {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
  
  @keyframes change {
    0%,
    12%,
    100% {
      transform: translateY(0);
    }
    17%,
    29% {
      transform: translateY(-25%);
    }
    34%,
    46% {
      transform: translateY(-50%);
    }
    51%,
    63% {
      transform: translateY(-75%);
    }
    68%,
    80% {
      transform: translateY(-50%);
    }
    85%,
    97% {
      transform: translateY(-25%);
    }
  }
</style>
