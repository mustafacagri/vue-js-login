<template>
  <div id="about">
    <div class="mainbox">
        <div class="title">Login</div>
        <div class="inner-addon left-addon mb-3 ">
            <i class="fas fa-at"></i>      
            <input type="text" class="input" @blur="$v.email.$touch()" :class="{'is-invalid' : $v.email.$error}" v-model="$v.email.$model" placeholder="E-mail" />
        </div>
        <div class="inner-addon left-addon ">
            <i class="fas fa-unlock"></i>      
            <input type="password" class="input" @blur="$v.password.$touch()" :class="{'is-invalid' : $v.password.$error}" v-model="$v.password.$model" placeholder="Password" />
        </div>
        <div class="col-auto mt-3 text-center">
            <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="autoSizingCheck">
                <label class="form-check-label" for="autoSizingCheck">Remember me</label>
            </div>
        </div>
        <div class="col-auto mt-4 p-0 text-center"><button @click="login" class="btn btn-3">Login</button></div>
    </div><!-- mainbox -->
  </div>
</template>
<script>
import firebase from 'firebase'
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import axios from 'axios'
import {required, email, minLength, maxLength} from "vuelidate/lib/validators"
export default {
  name: 'Home',
  data(){
    return{
        email: "",
        password: "",
        user: null
    }
  },
  validations: {
    email: {
        required,
        email
    },
    password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(28)
    }
  },
  methods:{
    ...mapActions(['setError']),
    login(){
        if(this.$v.$invalid){
            if(this.$v.email.$invalid){ this.setError({time:3000, error:"Plase control the email field"}) }
            if(this.$v.password.$invalid){
                console.log(this.$v.password.minLength)
                console.log(this.$v.password.maxLength)
                if(!this.$v.password.minLength){this.setError({time:3000, error:`Password must be at least ${this.$v.password.$params.minLength.min} characters.`})}
                else if(!this.$v.password.maxLength){this.setError({time:3000, error:`Password must be maximum ${this.$v.password.$params.maxLength.max} characters.`})}
                else{this.setError({error:"Plase control the password field"})}
            }
        }
        else{
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then( () => { 
                    axios.put(this.getApiUrl + 'stats/signIn')
                        .then(() => router.push("/profile"))
                        .catch(error => this.setError({error}) )
                })
                .catch( error => { this.setError({error:error.message}) }) // let errorCode = error.code;
        }
    }
  },
  computed:{
      ...mapGetters(["getApiUrl"])
  },
  created(){
    const user = firebase.auth().currentUser;
        if(user){
            this.user = user
        }
  },
  watch:{
      user: function(oldVal, newVal){
          if(!oldVal && newVal){
            // router.push("/profile")
          }
      }
  }
}
</script>

<style scoped>
    .title {margin-bottom:30px;}
</style>