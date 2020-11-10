<template>
<div class="container-fluid">
    <div id="Header" class="mb-4">
        <h2>Vue Js Login</h2>
        <div class="menu" v-if="!this.$store.state.user">
            <vue-typed-js :strings="['A different way to login...', 'Vue Counter', 'Vue Typed Js', 'Vue Page Transition', 'Vuelidate', 'axios']" :loop="true" :typeSpeed="60">
                <div class="text text-center mb-4"><span class="typing"></span></div>
            </vue-typed-js>
            
            <router-link to="/" class="selected" exact><i class="fas fa-sign-in-alt"></i>Login</router-link>
            <router-link to="/signup" exact><i class="fas fa-user-plus"></i>Sign Up</router-link>
            <router-link to="/forget" exact><i class="fas fa-unlock-alt"></i>Forget Password?</router-link>
        </div>

        <template v-else>
            <template v-if="userDisplayName.length>0">
                <vue-typed-js :strings="userDisplayName" :loop="true" :typeSpeed="60">
                    <div class="text text-center"><span class="typing"></span></div>
                </vue-typed-js>
            </template>
            <div class="menu">
                <router-link to="/profile" exact><i class="fas fa-user"></i>Profile</router-link>
                <router-link to="/change-password" exact><i class="fas fa-lock"></i>Change Password</router-link>
                <router-link to="/logout" exact><i class="fas fa-user-times"></i>Logout</router-link>
            </div>
        </template>

        <div class="social">
            <a href="https://twitter.com/mustafacagri" @click="link"><i class="fab fa-twitter"></i></a>
            <a href="https://instagram.com/mustafacagri" @click="link"><i class="fab fa-instagram"></i></a>
            <a href="https://tr.linkedin.com/in/mustafacagri" @click="link"><i class="fab fa-linkedin"></i></a>
            <a href="https://github.com/mustafacagri" @click="link"><i class="fab fa-github"></i></a>
        </div>
        <div class="copyright">© {{new Date().getFullYear()}} Mustafa Çağrı Güven</div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Header',
    data(){
        return{
            user: null,
            userDisplayName: []
        }
    },
    methods: {
        ...mapActions(['isItUser']),
        ...mapGetters(['getUser']),
        link: function (event) {
            event.preventDefault()
            window.open(event.target.parentElement.href)
        }
    },
    created(){
        this.isItUser()
            .then(response => {
                this.user = response
                // console.log(response)
                let userDisplayName
                userDisplayName = (this.user.displayName && this.user.displayName!=undefined) ? this.user.displayName : this.user.email
                if(userDisplayName!=undefined){this.userDisplayName.push("Welcome back " + userDisplayName)}
            })
    },
    computed:{
    }
}
</script>