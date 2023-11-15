<template>
    <v-app>
        <!-- Sidebar -->
        <v-navigation-drawer permanent color="blue-lighten-4" v-if="conf">
            <v-list-item align="center">
                <v-avatar
                    size="100"
                    rounded="10"
                    
                >
                    <v-img :src="avatar" class="bg-white"></v-img>
                </v-avatar>
            </v-list-item>
            <v-list-item  align="center" >@{{ user.username }}</v-list-item>
            <hr>
            <v-divider></v-divider>
            <v-list-item link title="Home" to="/dashboard/home"></v-list-item>
            <v-list-item link title="Profile" @click="redirectProfile(user.id)"></v-list-item>
            <v-list-item link title="Search" to="/dashboard/search"></v-list-item>
            <v-list-item link title="Configuration" to="/dashboard/configuration"></v-list-item>
            <v-list-item link title="Log out" @click="logout()"></v-list-item>
        </v-navigation-drawer>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>
<script>
import axios from 'axios';

export default {
    name: 'MainDashboardView',
    data(){
        return{
            currentId: this.$store.state.user.id,
            currentToken: this.$store.state.token,
            conf: true,
            user: {
                id: '',
                email: '',
                username: ''
            },
            avatar: ''
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logoutAction');
            this.$router.push('/login')
        },
        validateAccess(){
            let data = localStorage.getItem('userData')
            if(data){
                this.$store.dispatch('loginAction', JSON.parse(data));
                let localStoredUser = JSON.parse(data);
                this.user = localStoredUser.user;
                this.$router.push('/dashboard')
            } else {
                this.$router.push('/')
            }
        },
        redirectProfile(id){
            this.$router.push(`/dashboard/user/${id}`)
        },
        getUserImg(){
            axios.get(`http://localhost:2046/api/user/profile/${this.currentId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((res)=>{
                console.log(res);
                if(res.status == 200){
                    let fileName = res.data.user.image;
                    let url = `http://localhost:2046/api/user/avatar/${fileName}`;
                    this.avatar = url;
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    created(){
        this.validateAccess();
        this.getUserImg();
    },
    beforeUpdate(){
        this.user = this.$store.state.user;
        this.getUserImg();
    }
}
</script>
<style scoped>  


</style>