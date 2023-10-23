<template>
    <v-app>
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
                <div>
                    <v-btn icon="mdi-plus" size="x-large" class="bg-info" to="/dashboard/create"></v-btn>
                </div>
                
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