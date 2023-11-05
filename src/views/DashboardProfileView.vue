<template>
    <v-app>
        <v-main>
            <!-- Content --> 
            <v-container>
                <v-row>
                    <v-col cols="4" class="mx-auto">
                        <h3>Username</h3>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            readonly=""
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4" class="mx-auto">
                        <h3>Email</h3>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            readonly=""
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4" class="mx-auto">
                        <h3>Password</h3>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            readonly=""
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
// import axios from 'axios';

export default {
    name: 'DashboardProfileView',
    data(){
        return{
            currentUser: {

            }
        }
    },
    methods: {
        getUserData(){
            // axios.get('')
            console.log(this.$store.state);
        }
    },
    beforeCreate(){
        this.getUserData
    },
}
</script>
<style scoped>

</style>