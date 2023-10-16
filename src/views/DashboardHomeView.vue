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
                <v-grid>
                    <v-row>
                        <v-col>
                            <v-card>
                                <v-card-title>NombreCuaderno</v-card-title>
                                <v-card-subtitle>NombreAutor</v-card-subtitle>
                                <v-card-text>
                                    Test text
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn>Read</v-btn>
                                    <v-btn>Write</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card>
                                <v-card-title>NombreCuaderno</v-card-title>
                                <v-card-subtitle>NombreAutor</v-card-subtitle>
                                <v-card-text>
                                    Test text
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn>Read</v-btn>
                                    <v-btn>Write</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card>
                                <v-card-title>NombreCuaderno</v-card-title>
                                <v-card-subtitle>NombreAutor</v-card-subtitle>
                                <v-card-text>
                                    Test text
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn>Read</v-btn>
                                    <v-btn>Write</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card>
                                <v-card-title>NombreCuaderno</v-card-title>
                                <v-card-subtitle>NombreAutor</v-card-subtitle>
                                <v-card-text>
                                    Test text
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn>Read</v-btn>
                                    <v-btn>Write</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-grid>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
export default {
    name: 'DashboardHomeView'
}
</script>
<style scoped>

</style>