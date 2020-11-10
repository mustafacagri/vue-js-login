<template>
  <div id="forget">
    <div class="mainbox">
      <div class="title">Forget?</div>
      <div class="inner-addon left-addon mb-4">
        <i class="fas fa-at"></i>      
        <input type="text" class="input" @blur="$v.email.$touch()" :class="{'is-invalid' : $v.email.$error}" v-model="$v.email.$model" placeholder="E-mail" />
      </div>
      <p class="text-center"><small>If you entered your email address correctly, you will receive a password reset email.</small></p>
      <div class="col-auto mt-4 p-0 text-center">
        <button class="btn btn-3" @click="send">Send Me My Pass</button>
      </div>
    </div><!-- mainbox -->
  </div>
</template>
<script>
import {required, email} from "vuelidate/lib/validators"
import firebase from 'firebase'
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  data(){
    return{
      email: null
    }
  },
  validations: {
    email: {
        required,
        email
    }
  },
  methods:{
      ...mapActions(['setError', 'setIsSuccess']),
      send(){
        if(this.$v.$invalid){
            if(this.$v.email.$invalid){ this.setError({error:"Plase control the email field"}) }
        }
        else{
            const auth = firebase.auth();
            auth.sendPasswordResetEmail(this.email)
                .then( () => this.setIsSuccess({message:"Password reset email was sent upon your request."}) )
                .catch(error => this.setError({error}) )
        }
      }
  }
}
</script>
<style scoped>
  .title {margin-bottom:30px;}
</style>