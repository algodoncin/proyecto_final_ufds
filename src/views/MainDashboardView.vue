<template>
    <v-app>
        <!-- Sidebar -->
        <v-navigation-drawer permanent color="blue-lighten-4" v-if="conf">
            <v-list-item title="My Application" subtitle="Vuetify" :height="64">{{ user.username }}</v-list-item>
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
        }
    },
    created(){
        this.validateAccess();
    },
    beforeUpdate(){
        this.user = this.$store.state.user;
    }
}
</script>
<style scoped>  


</style>