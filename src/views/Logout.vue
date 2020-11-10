<template>
    <div id="Logout">
        <div class="mainbox">
            <div class="title">Logout</div>
            You are currently logging out ...
        </div>
    </div>
</template>

<script>// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Logout',
    methods: {
        ...mapActions(['logout'])
    },
    computed:{
        ...mapGetters(['getError', 'getUser'])
    },
    created(){
        this.logout()
    }
}
</script>
