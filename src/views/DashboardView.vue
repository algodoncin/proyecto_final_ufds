<template>
    <v-app>
        <!-- Sidebar -->
        <div>
            <v-navigation-drawer color="blue-lighten-4">
                <v-list-item title="My Application" subtitle="Vuetify" :height="64"></v-list-item>
                <v-divider></v-divider>
                <v-list-item link title="Profile" ></v-list-item>
                <v-list-item link title="Configuration"></v-list-item>
                <v-list-item link title="Log out"></v-list-item>
            </v-navigation-drawer>
        </div>
        <!-- Navbar -->
        <div>
            <v-app-bar color="blue-lighten-4" prominent>
                <v-text-field label="Search books" class="mt-5 ml-4"></v-text-field>
                <v-spacer></v-spacer>

                <v-btn variant="text" icon="mdi-magnify"></v-btn>
                <v-btn variant="text" icon="mdi-filter"></v-btn>
                <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
            </v-app-bar>
        </div>
    </v-app>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>