import Vue from 'vue'
import Vuex from 'vuex'
import * as tf from '@tensorflow/tfjs';
import appService from '../services/app.services.js'

Vue.config.devtools = true;

Vue.use(Vuex)

const state = {
  model: {},
  textStatus: false,
  text: '',
  modelStatus: ''
}

const store = new Vuex.Store({
    state,
    getters: {
      getModel: (state) => {
        return state.model
      },
      isTextLoading: (state) => {
        return state.textStatus
      },
      isModelLoading: (state) => {
        if(state.modelStatus === 'pending'){
          return true;
        }
        return false;
      }
    },
    actions: {
      async loadModel (context) {
        context.commit('pendingModel');

        try{
          const m = await tf.loadModel('tfjs_75_pled/model.json')
            context.commit('loadModel', m)
          context.commit('successModel');

        }catch (err){
            console.error(err);
            //context.commit('fail');

        }
      },
     async generateText (context, model) {
      context.commit('pending');
      try{
         
        context.commit('setText',  await appService.generateText(model));

      }catch (err){
          console.error(err);
          context.commit('fail');
      }
      context.commit('success');

      },
      
    },
    mutations: {
      loadModel (state, model) {
        state.model = model;
      },
      setText (state, text){
        state.text = text;
      },
      pending (state) {
        state.textStatus = true;
      },
      fail (state){
        state.textStatus = false;
      },
      success (state) {
        state.textStatus = false;
      },

      pendingModel (state){
        state.modelStatus = 'pending';
      },
      successModel(state){
        state.modelStatus = 'success';
      }

    }

  })

  
  export default store