<template>
    <v-app>
        <!-- Sidebar -->
        <v-navigation-drawer permanent color="blue-lighten-4" v-if="conf">
            <v-list-item title="My Application" subtitle="Vuetify" :height="64"></v-list-item>
            <v-divider></v-divider>
            <v-list-item link title="Home" to="/dashboard/home"></v-list-item>
            <v-list-item link title="Profile" to="/dashboard/profile"></v-list-item>
            <v-list-item link title="Search" to="/dashboard/search"></v-list-item>
            <v-list-item link title="Configuration" to="/dashboard/configuration"></v-list-item>
            <v-list-item link title="Log out"></v-list-item>
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
            conf: true
        }
    }
}
</script>