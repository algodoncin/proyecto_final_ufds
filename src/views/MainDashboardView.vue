<template>
    <v-app>
      <!-- Sidebar -->
      <v-navigation-drawer app permanent color="indigo lighten-1">
        <v-container class="pa-4">
          <v-row align="center">
            <v-avatar size="100" class="mx-auto">
              <v-img :src="avatar" alt="User Avatar"></v-img>
            </v-avatar>
          </v-row>
          <v-row align="center" class="mt-2">
            <v-list-item-content class="text-center white--text">@{{ user.username }}</v-list-item-content>
          </v-row>
          <v-divider class="mt-2"></v-divider>
  
          <v-list dense>
            <v-list-item link to="/dashboard/home">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Home</v-list-item-content>
            </v-list-item>
  
            <v-list-item link @click="redirectProfile(user.id)">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Profile</v-list-item-content>
            </v-list-item>
  
            <v-list-item link to="/dashboard/search">
              <v-list-item-icon>
                <v-icon>mdi-magnify</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Search</v-list-item-content>
            </v-list-item>
  
            <v-list-item link to="/dashboard/configuration">
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Configuration</v-list-item-content>
            </v-list-item>
  
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Log out</v-list-item-content>
            </v-list-item>
            
          </v-list>
          </v-container>
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
            axios.get(`https://ufds-back.onrender.com/api/user/profile/${this.currentId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((res)=>{
                console.log(res);
                if(res.status == 200){
                    let fileName = res.data.user.image;
                    // let data = localStorage.getItem('userData')
                    // clg
                    let url = `https://ufds-back.onrender.com/api/user/avatar/${fileName}`;
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