import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from "../router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    isSucess: null,
    user: {},
    apiUrl: 'http://localhost:3000/api/'    
  },
  mutations: {
    setUser(state, payLoad){
        state.user = payLoad
    },
    clearError(state){
        state.error = null
    },
    setError(state, payLoad){
      state.error = payLoad
    },
    setIsSuccess(state, payLoad){
        state.isSucess = payLoad
    },
    clearIsSuccess(state){
      state.isSucess = null
    }
  },
  actions: {
    getUser(state){
        return state.user
    },
    setErrorClear(context,payLoad){
        context.commit("setError", payLoad.error)
        let time = (payLoad.time && payLoad.time!=undefined) ? payLoad.time : 5000
        setTimeout(() => {context.commit("clearError")}, time)
    },
    setError(context,payLoad){
        try {
            context.commit("clearIsSuccess")
            context.dispatch("setErrorClear", payLoad)
        } catch (error) {
            context.dispatch("setErrorClear", {error, time:5000})
        }
    },
    setIsSuccessClear(context,payLoad){
        context.commit("setIsSuccess", payLoad.message)
        let time = (payLoad.time && payLoad.time!=undefined) ? payLoad.time : 5000
        setTimeout(() => {context.commit("clearIsSuccess")}, time)
    },
    setIsSuccess(context,payLoad){
        context.commit("setError")
        try {
            context.dispatch("setIsSuccessClear", payLoad)
        } catch (error) {
            context.dispatch("setErrorClear", {error, time:5000})
        }
    },
    setUser(context,payLoad){
        try {
            context.commit("setUser", payLoad)
        } catch (error) {
            context.dispatch("setErrorClear", {error, time:3000})
        }
    },
    initAuth(context){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                context.commit("setUser", user)
            } else {
                context.commit("setUser", null)
            }
        })
    },
    isItUser(context){
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(function(user) {
                try {
                    if (user) {
                        context.commit("setUser", user)
                        resolve(user)
                    }
                } catch (error) {
                    context.commit("setUser", null)
                    context.dispatch("setError",{time:3000, error:"Your user information could not get!"})
                    reject()
                }
            })
        })
    },
    logout(context){
        firebase.auth().signOut()
            .then(function() {
                context.commit("setUser", null)
                router.push("/")
            })
            .catch(function(error) {
                context.dispatch("setError",{time:3000, error})
            })
    }
  },
  modules: {
  },
  getters: {
    getError(state) {
      return state.error
    },
    getUser(state){
        return state.user
    },
    getIsSuccess(state){
        return state.isSucess
    },
    isAuthenticated(){
        const user = firebase.auth().currentUser;
        if(!user){return false}
    },
    getApiUrl(state){
        return state.apiUrl
    }
  }
})
