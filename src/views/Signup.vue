<template>
  <div id="signup">
    <div class="mainbox">
        <div class="title">Sign Up</div>
        <template v-if="user==null">
            <div class="inner-addon left-addon mb-3 ">
                <i class="fas fa-at"></i>      
                <input type="text" class="input" @blur="$v.email.$touch()" :class="{'is-invalid' : $v.email.$error}" v-model="$v.email.$model" placeholder="E-mail" />
            </div>
            <div class="inner-addon left-addon mb-3 ">
                <i class="fas fa-user"></i>      
                <input type="text" class="input" v-model="displayName" placeholder="Full Name" />
            </div>
            <div class="inner-addon left-addon ">
                <i class="fas fa-unlock"></i>      
                <input type="password" class="input" @blur="$v.password.$touch()" :class="{'is-invalid' : $v.password.$error}" v-model="$v.password.$model" placeholder="Password" />
            </div>
            <div class="col-auto mt-3 p-0 text-center">
                <button @click="register" class="btn btn-3">Sign Up</button>
            </div>
        </template>
        <div v-else class="text-center">
            <!-- asd@asd.com -->
            <p>Your user has been successfully created.</p>
            <p>Now, you logged automatically.</p>
            <router-link to="/profile" class="btn btn-3 mt-5">Go to Profile</router-link>
        </div>
    </div><!-- mainbox -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import firebase from 'firebase'
import {required, email, minLength, maxLength} from "vuelidate/lib/validators"
import axios from 'axios'
export default {
  name: 'Home',
  data(){
    return{
        email: "",
        displayName: "",
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
    ...mapActions(['setError', 'setIsSuccess']),
    register(){
        if(this.$v.$invalid){
            if(this.$v.email.$invalid){ this.setError({error:"Plase control the email field"}) }
            else if(this.$v.password.$invalid){
                if(!this.$v.password.minLength){this.setError({error:`Password must be at least ${this.$v.password.$params.minLength.min} characters.`})}
                else if(!this.$v.password.maxLength){this.setError({error:`Password must be maximum ${this.$v.password.$params.maxLength.max} characters.`})}
                else{this.setError({error:"Plase control the password field"})}
            }
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(
                    createdUser => {
                        this.user =  createdUser
                        let user = firebase.auth().currentUser
                        let getApiUrl = this.getApiUrl
                        user.updateProfile({displayName: this.displayName})
                            .then( () => {
                                axios.put(getApiUrl + 'stats/signUp')
                                    .then(() => this.setIsSuccess({message:"Your account was successfully created!"})  )
                                    .catch(error => this.setError({error}) )

                                axios.put(this.getApiUrl + 'stats/signIn')
                                    .catch(error => this.setError({error}) )
                            })
                            .catch( error => this.setError({error}) )
                    },
                    err => {
                        this.setError({error:err.message})
                    }
                )
                .catch()
        }
    }
  },
  computed:{
    ...mapGetters(['getError','getApiUrl']),
  },
  created(){
  }
}
</script>
<style scoped>
    .title {margin-bottom:30px;}
</style>