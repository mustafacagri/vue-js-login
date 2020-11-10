import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Counter from 'vue-js-counter'
import firebase from 'firebase'

import VuePageTransition from 'vue-page-transition'
import VueTypedJs from 'vue-typed-js'

Vue.component('Counter', Counter);
Vue.config.productionTip = false
Vue.use(VuePageTransition)
Vue.use(VueTypedJs)


import Vuelidate from "vuelidate"
Vue.use(Vuelidate)

    // please replace the all properties with your firebase account info
    let config = {
        apiKey: "xxxxxxxxxxxxxxxxxxxxxxx",
        authDomain: "vuejslogin-abcdef.firebaseapp.com",
        databaseURL: "https://vuejslogin-abcdef.firebaseio.com",
        projectId: "aaaaaaaaaaaaaaa",
        storageBucket: "vuejslogin-abcdef.appspot.com"
    }
  
  firebase.initializeApp(config);

  let app = ''
  firebase.auth().onAuthStateChanged( () =>  {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
          }).$mount('#app')
        }
  })