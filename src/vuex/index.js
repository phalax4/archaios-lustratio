import Vue from 'vue'
import Vuex from 'vuex'
import * as tf from '@tensorflow/tfjs';

Vue.use(Vuex)

const state = {
  model: null
}

const store = new Vuex.Store({
    state,
    getters: {
      getModel: (state) => {
        return state.model
      }
    },
    actions: {
      loadModel (context) {
        try{
            context.commit('loadModel', await tf.loadModel('../tfjs_75_pled/model.json'))
        }catch (err){
            console.error(err);
        }
      }
    },
    mutations: {
    loadModel (state, model) {
        
        state.model = model;
      }
    }
  })
  
  
  export default store