## About

RNN model to generate random wordings based on city names from https://pleiades.stoa.org/
Static site Vue application using vuex state management, Bulma and tensorflowjs. Keras model was built using python, then converted.

Static site url: phalax4.github.io/archaois-lustratio/

## Build and Deploy
npm install -g vue-cli-ghpages
npm run build
vcg

## Credits
https://codepen.io/yoannhel/pen/sJpDj
https://www.npmjs.com/package/vue-cli-ghpages
https://bulma.io/
https://github.com/tensorflow/tfjs

## Issues I had
* node-gyp rebuild would not let me compile vue app. Had to path to the python 3.8 install instead of using the pip installed build tools.