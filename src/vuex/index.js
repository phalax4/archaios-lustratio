import Vue from 'vue'
import Vuex from 'vuex'
import * as tf from '@tensorflow/tfjs';
import appService from '../services/app.services.js'

Vue.config.devtools = true;

Vue.use(Vuex)

const state = {
  model: {},
  textStatus: '',
  text: ''
}

const store = new Vuex.Store({
    state,
    getters: {
      getModel: (state) => {
        return state.model
      },
      isTextLoading: (state) => {
        return state.textStatus;
      }
    },
    actions: {
      async loadModel (context) {
        try{
          const m = await tf.loadModel('../tfjs_75_pled/model.json')
            context.commit('loadModel', m)
        }catch (err){
            console.error(err);
        }
      },
     async generateText (context, model) {
       context.commit('pending');
        try{
          const text = await appService.generateText(model);
          console.log(text);
         context.commit('success');
          context.commit('setText', text);
        }catch (err){
            console.error(err);
            context.commit('fail');
        }
      }
    },
    mutations: {
      loadModel (state, model) {
        state.model = model;
      },
      setText (state, text){
        state.text = text;
      },
      pending (state) {
        state.textStatus = 'pending';
      },
      fail (state){
        state.textStatus = 'fail';
      },
      success (state) {
        state.textStatus = 'success';
      }
    }

  })

  
  export default store