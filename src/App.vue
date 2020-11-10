<template>
  <div id="app">
      <!-- getUser.email: {{getUser.email}}<br>
      getUser: {{getUser}} -->
      <div class="container-fluid">
        <div class="alert alert-danger" role="alert" v-if="getError!=null">{{getError}}</div>
        <div class="alert alert-success" role="alert" v-if="getIsSuccess">{{getIsSuccess}}</div>
          <div class="row">
                <div class="col-md-6 px-0">
                    <Header/>
                </div><!-- col-md-3 -->
                <div class="col-md-6" id="link">
                  <vue-page-transition name="fade-in-down">
                      <router-view/>
                  </vue-page-transition>
              </div><!-- col-md-9 -->
          </div><!-- row -->
          <div class="row">
            <div class="col-md-12">
              <div class="infobox">
                  <div class="row" v-if="stats.signIn">
                      <div class="col-md-4"><i class="fas fa-thumbs-up"></i><label><Counter :end="stats.signIn" /></label><span>Users Signed In</span></div>
                      <div class="col-md-4"><i class="fas fa-users"></i><label><Counter :end="stats.signUp" /></label><span>Users Signed Up</span></div>
                      <div class="col-md-4"><i class="fas fa-stopwatch"></i><label><Counter end="100" /></label><span>Uptime</span></div>
                  </div>
              </div><!-- infobox -->
            </div>
          </div>
          
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'Home',
  data(){
      return{
          stats:{signIn:null, signUp:null}
      }
  },
  components: {
    Header,
  },
  methods:{
      ...mapActions(['initAuth','setError'])
  },
  computed:{
      ...mapGetters(['getError', 'getUser', 'getIsSuccess', 'getApiUrl'])
  },
  created(){
    this.initAuth()
    axios.get(this.getApiUrl + 'stats')
        .then((response) => {
            try {
                this.stats.signIn = response.data.signIn
                this.stats.signUp = response.data.signUp
            } catch (error) {
                this.setError({error})
            }
        })
  }
};
</script>
<style>
.container-fluid{max-width:600px;}

    .avatar {width:100%; -webkit-border-radius: 50%; -moz-border-radius: 50%; border-radius: 50%;}
    .me-text {line-height:2rem; border-right:1px solid #f0f0f0;}

    .infobox {background-color:var(--mainColor); color:#fff; padding:30px 40px; margin-top:0px; text-align:center; -webkit-border-radius: 20px; -moz-border-radius: 20px; border-radius: 20px;}
        .infobox i {width:60px; height:60px; line-height:60px; font-size:1.4rem; background-color: var(--mainColor2); margin:0 auto; color:#fff; display:block; -webkit-border-radius: 50%; -moz-border-radius: 50%; border-radius: 50%;}
        .infobox label {display:block; font-size:2rem; font-weight:bold; margin:10px 0 0px;}

</style>