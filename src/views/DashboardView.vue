<template>
    <v-app>
        <!-- Navbar -->
        <v-app-bar color="blue-lighten-4" prominent>
            <v-text-field label="Search books" class="mt-5 ml-4"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn variant="text" icon="mdi-magnify"></v-btn>
            <v-btn variant="text" icon="mdi-filter"></v-btn>
            <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
        </v-app-bar>
        <v-main>
            <!-- Content --> 
            <v-container>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iusto repudiandae veniam vero eaque quae quod illum dolorem ex maiores sunt debitis, aspernatur animi nisi, reprehenderit voluptate natus blanditiis eos!</h1>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
export default {
    name: 'DashboardView'
}
</script>
<style scoped>

</style>