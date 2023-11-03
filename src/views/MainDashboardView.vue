<template>
    <v-app>
        <!-- Sidebar -->
        <v-navigation-drawer permanent color="blue-lighten-4" v-if="conf">
            <v-list-item title="My Application" subtitle="Vuetify" :height="64">{{ user.username }}</v-list-item>
            <v-divider></v-divider>
            <v-list-item link title="Home" to="/dashboard/home"></v-list-item>
            <v-list-item link title="Profile" to="/dashboard/profile"></v-list-item>
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
            conf: true,
            user: {
                id: this.$store.state.user.id,
                email: this.$store.state.user.email,
                username: this.$store.state.user.username
            }
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logoutAction');
            this.$router.push('/login')
        }
    },
    beforeCreate(){
        if(!this.$store.state.token){
            this.$router.push('/login')
        }
    }
}
</script>