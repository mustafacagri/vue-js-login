<template>
  <div id="about">
    <div class="mainbox">
        <template v-if="email">
            <div class="title">Password</div>
            <div class="inner-addon left-addon ">
                <i class="fas fa-lock"></i>      
                <input type="password" class="input" @blur="$v.password.$touch()" :class="{'is-invalid' : $v.password.$error}" v-model="$v.password.$model" placeholder="New Password" />
            </div>
            <div class="inner-addon left-addon my-3">
                <i class="fas fa-unlock"></i>      
                <input type="password" class="input" @blur="$v.repassword.$touch()" :class="{'is-invalid' : $v.repassword.$error}" v-model="$v.repassword.$model" placeholder="Re Password" />
            </div>
            <p class="text-center"><small>* You will not need to re-login.</small></p>
            <div class="col-auto mt-4 p-0 text-center">
                <button @click="update" class="btn btn-3">Change My Pass</button>
            </div>
        </template>
    </div><!-- mainbox -->

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from 'firebase'
import {required, minLength, maxLength, sameAs} from "vuelidate/lib/validators"
export default {
  name: 'Home',
  data(){
    return{
        email: null,
        password: null,
        repassword: null
    }
  },
  validations: {
    password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(28)
    },
    repassword: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(28),
        sameAs: sameAs('password')
    }
  },
  methods:{
    ...mapActions(['setUser','setError','isItUser', 'setIsSuccess']),
    update(){
        const user = firebase.auth().currentUser
        if(this.$v.$invalid){
            if(this.$v.password.$invalid){
                if(!this.$v.password.minLength){this.setError({error:`Password must be at least ${this.$v.password.$params.minLength.min} characters.`})}
                else if(!this.$v.password.maxLength){this.setError({error:`Password must be maximum ${this.$v.password.$params.maxLength.max} characters.`})}
                else{this.setError({time:3000, error:"Plase control the password field"})}
            }
            else if(this.$v.repassword.$invalid){
                if(!this.$v.repassword.minLength){this.setError({error:`Password must be at least ${this.$v.repassword.$params.minLength.min} characters.`})}
                else if(!this.$v.repassword.maxLength){this.setError({error:`Password must be maximum ${this.$v.repassword.$params.maxLength.max} characters.`})}
                else if(!this.$v.repassword.sameAs){this.setError({error:`Both password fileds must be same.`})}
                else{this.setError({time:3000, error:"Plase control the re-password field"})}
            }
        }
        else{
            user.updatePassword(this.password)
                .then( () => {
                    this.setIsSuccess({message:"Your password was successfully updated!"})
                    this.password = null
                    this.repassword = null
                })
                .catch( error => {
                    this.setError({time:3000, error})
                })
        }
    }
  },
  mounted(){
    this.isItUser()
        .then(response => {
            // console.log(response.email)
            this.setUser(response)
            this.email = response.email
            this.displayName = response.displayName
            this.photoURL = response.photoURL
        })
  }
}
</script>
<style scoped>
    .mainbox > .title:before {margin-right:10px;}
</style>