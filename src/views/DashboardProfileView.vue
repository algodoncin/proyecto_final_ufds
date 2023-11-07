<template>
    <v-app>
        <v-main>
            <!-- Content --> 
            <v-container class="mx-auto">
                <v-row>
                    <v-col cols="4" class="mx-auto">
                        <h3>Username</h3>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            v-model="currentUser.username"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4" class="mx-auto">
                        <h3>Email</h3>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            v-model="currentUser.email"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4" class="mx-auto">
                        <h3>New Password</h3>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            v-model="currentUser.password"
                            type="password"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3" class="mx-auto">
                        <v-btn
                        block
                        class="mb-8"
                        color="blue"
                        size="large"
                        variant="tonal"
                        @click="updateUser()"
                        >
                            Update
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3" class="mx-auto">
                        <v-alert
                            type="success"
                            title="User registered"
                            text="User updated"
                            v-if="updateConfirmation"
                        ></v-alert>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import axios from 'axios';

export default {
    name: 'DashboardProfileView',
    data(){
        return{
            currentId: this.$store.state.user.id,
            currentToken: this.$store.state.token,
            currentUser: {
                username: '',
                email: '',
                password: ''
            },
            updateConfirmation: false,
        }
    },
    methods: {
        getUserData(id){
            axios.get(`http://localhost:2046/api/user/profile/${id}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((respuesta)=>{
                let res = respuesta;
                this.currentUser.username = res.data.user.username;
                this.currentUser.email = res.data.user.email;
            })
            .catch((err)=>{
                console.log(`An error has ocurred ${err}`);
            })
        },
        updateUser(){
            let userToUpdate = this.currentUser;
            console.log(userToUpdate);

            if(userToUpdate.password){
                axios.put(`http://localhost:2046/api/user/update/`, userToUpdate, {
                    headers: {
                        Authorization: this.currentToken
                    }
                })
                .then((respuesta)=>{
                    let res = respuesta;
                    if(res.data.code == 200){
                        this.currentUser.password = '';
                        this.updateConfirmation = true;
                        setTimeout(()=>{
                            this.updateConfirmation = false;
                        }, 3000);
                    }
                })
                .catch((err)=>{
                    console.log(`An error ocurred ${err}`);
                    this.updateConfirmation = false;
                })
            }else{
                console.log("no");
                delete userToUpdate.password;
                axios.put(`http://localhost:2046/api/user/update/`, userToUpdate, {
                    headers: {
                        Authorization: this.currentToken
                    }
                })
                .then((respuesta)=>{
                    let res = respuesta;
                    if(res.data.code == 200){
                        this.currentUser.password = '';
                        this.updateConfirmation = true;
                        setTimeout(()=>{
                            this.updateConfirmation = false;
                        }, 3000);
                    }
                })
                .catch((err)=>{
                    console.log(`An error ocurred ${err}`);
                    this.updateConfirmation = false;
                })
            }
        }
    },
    created(){
        this.getUserData(this.currentId);
    },
}
</script>
<style scoped>

</style>