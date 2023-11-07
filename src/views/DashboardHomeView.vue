<template>
    <v-app>
        <v-main>
            <!-- Content --> 
            <v-container>
                    <v-row class="mt-3">
                        <v-col cols="3">
                            <v-card >
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
                <div>
                    <v-btn icon="mdi-plus" size="x-large" class="bg-info add-button" to="/dashboard/create" vertical="bottom" horizontal="end"></v-btn>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
export default {
    name: 'DashboardHomeView',
    data(){
        return{
            user: {
                id: this.$store.state.user.id,
                email: this.$store.state.user.email,
                username: this.$store.state.user.username
            }
        }
    },
    methods: {
        showUserBooks(userId){
            console.log(userId);
        }
    },
    created(){
        this.showUserBooks(this.user.id);
    }
}
</script>
<style scoped>
.add-button{
    position: fixed;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    margin: 10px;
}
</style>