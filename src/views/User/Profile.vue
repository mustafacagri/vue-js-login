<template>
  <div id="about">
    <div class="mainbox">
        <template v-if="userData.email">
            <div class="title">Profile</div>
            <div class="inner-addon left-addon mb-3 ">
                <i class="fas fa-at"></i>      
                <input type="text" class="input" v-model="userData.email" placeholder="E-mail" disabled />
            </div>
            <div class="inner-addon left-addon mb-3 ">
                <i class="fas fa-signature"></i>      
                <input type="text" class="input" v-model="userData.displayName" placeholder="Display Name" />
            </div>
            <div class="inner-addon left-addon mb-2 ">
                <i class="fas fa-images"></i>      
                <input type="text" class="input" v-model="userData.photoURL" placeholder="Avatar Pic URL" />
            </div>
            <div class="col-auto mt-3 p-0 text-center">
                <button @click="update" class="btn btn-3">Update Profile</button>
            </div>
        </template>
    </div><!-- mainbox -->

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from 'firebase'
export default {
  name: 'Home',
  data(){
    return{
      userData: {
          email: null,
          displayName: null,
          photoURL: null
      }
    }
  },
  methods:{
    ...mapActions(['setUser','setError','isItUser', 'setIsSuccess']),
    update(){
        const user = firebase.auth().currentUser
        if(this.userData.displayName == user.displayName && this.userData.photoURL == user.photoURL){
            this.setError({error:"You did not change anything!"})
        }
        else{
            user.updateProfile({displayName: this.userData.displayName, photoURL: this.userData.photoURL})
                .then( () => { this.setIsSuccess({message:"Your profile information was successfully updated!"}) })
                .catch( error => this.setError({time:3000, error}) )
        }
    }
  },
  mounted(){
    this.isItUser()
        .then(response => {
            this.setUser(response)
            this.userData.email = response.email
            this.userData.displayName = response.displayName
            this.userData.photoURL = response.photoURL
        })
  }
}
</script>