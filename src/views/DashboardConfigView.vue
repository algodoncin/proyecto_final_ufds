<template>
    <v-app>
        <v-main>
            <!-- Content --> 
            <v-container class="mx-auto">
                <v-card
                class="mt-5 mx-5"
                min-height="500px"
                color="indigo lighten-1">
                <div class="mt-5">
                    <v-row>
                        <v-col cols="4" align="center">
                            
                            <button>
                                <v-avatar
                                class="ma-5"
                                size="300"
                                rounded="10"
                                >
                                    <v-img :src="avatar" class="bg-white"></v-img>
                                </v-avatar>
                            </button>
                            <!-- <v-form> -->
                                <!-- <input type="file" @change="getImg"> -->
                                <v-file-input
                                label="File input"
                                variant="filled"
                                prepend-icon="mdi-camera"
                                v-model="img"
                                @change="getImg"
                                ></v-file-input>
                            <!-- </v-form> -->
                            
                        </v-col>
                        <v-col cols="8">
                            <v-row>
                                <v-col cols="8" class="mx-auto">
                                    <h3>Username</h3>
                                    <v-text-field
                                        density="compact"
                                        variant="outlined"
                                        v-model="currentUser.username"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                            <v-col cols="8" class="mx-auto">
                                <h3>Email</h3>
                                <v-text-field
                                    density="compact"
                                    variant="outlined"
                                    v-model="currentUser.email"
                                    type="email"
                                ></v-text-field>
                            </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="8" class="mx-auto">
                                    <h3>New Password</h3>
                                    <v-text-field
                                        density="compact"
                                        variant="outlined"
                                        v-model="currentUser.password"
                                        type="password"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
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
                    <v-row v-if="updateConfirmation">
                        <v-col cols="3" class="mx-auto">
                            <v-alert
                                type="success"
                                title="User Updated"
                                text="User updated"
                            ></v-alert>
                        </v-col>
                    </v-row>
                    <v-row v-if="updateError">
                        <v-col cols="3" class="mx-auto">
                            <v-alert
                                type="error"
                                title="Existing user"
                                text="There is already a user with those credentials"
                            ></v-alert>
                        </v-col>
                    </v-row>
                    <v-row v-if="invalidUsername">
                        <v-col cols="3" class="mx-auto">
                            <v-alert
                                type="error"
                                title="Invalid Fields"
                                text="Username field must contain at least 3 characters"
                                
                            ></v-alert>
                        </v-col>
                    </v-row>
                    <v-row v-if="invalidEmail">
                        <v-col cols="3" class="mx-auto">
                            <v-alert
                                type="error"
                                title="Invalid Fields"
                                text="Enter a valid email"
                                
                            ></v-alert>
                        </v-col>
                    </v-row>   
                </div>
                     
                </v-card>
                
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import axios from 'axios';

export default {
    name: 'DashboardConfigView',
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
            updateError: false,
            invalidUsername: false,
            invalidEmail: false,
            avatar: '',
            img: ''
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
                const url = 'http://localhost:2046/api/user/avatar/';
                this.user = res.data.user;
                this.avatar = `${url}${this.user.image}`
            })
            .catch((err)=>{
                console.log(`An error has ocurred ${err}`);
            })
        },
        async updateUser(){
            let userToUpdate = this.currentUser;
            // console.log(userToUpdate);
            let usernameToUpdate = this.currentUser.username;
            if(usernameToUpdate.length < 3){
                this.invalidUsername = true;
            }
            else if(!this.validateEmail(userToUpdate.email)){
                this.invalidEmail = true;
            }
            else{
                this.invalidEmail = false;
                this.invalidUsername = false;
                if(userToUpdate.password){
                    axios.put(`http://localhost:2046/api/user/update/`, userToUpdate, {
                        headers: {
                            Authorization: this.currentToken
                        }
                    })
                    .then((respuesta)=>{
                        let res = respuesta;
                        if(res.data.code == 200){
                            this.updateError = false;
                            this.currentUser.password = '';
                            this.updateConfirmation = true;
                            console.log(this.img);
                            setTimeout(()=>{
                                this.updateConfirmation = false;
                            }, 3000);
                        }
                    })
                    .catch((err)=>{
                        if(err.response.status == 406){
                            this.updateError = true;
                        }
                        console.log(`An error ocurred ${err}`);
                        this.updateConfirmation = false;
                    })
                    
                    const fileInput = this.img[0];

                    if(fileInput){
                        const formData = new FormData();
                        formData.append('file0', fileInput)
                        // // Upload image
                        await axios.post(`http://localhost:2046/api/user/upload/`, formData,{
                            headers: {
                                Authorization: this.currentToken
                            }
                        })
                        .then((respuesta)=>{
                            console.log(respuesta);
                            this.getUserData(this.currentId);
                        })
                        .catch((err)=>{
                            if(err.response.status == 406){
                                this.updateError = true;
                            }
                            console.log(`An error ocurred ${err}`);
                            console.log(err);
                        })
                        console.log(formData);
                        console.log(fileInput);
                    }   
                    
                }else{
                    console.log("no");
                    delete userToUpdate.password;
                    axios.put(`http://localhost:2046/api/user/update/`, userToUpdate, {
                        headers: {
                            Authorization: this.currentToken
                        }
                    })
                    .then((respuesta)=>{
                        // Close error dialog
                        this.updateError = false;

                        // Define fields
                        let res = respuesta;
                        if(res.data.code == 200){

                            // Define updated user in local storage and vuex storage
                            let data = {
                                user: {
                                    id: res.data.updatedUser._id,
                                    email: res.data.updatedUser.email,
                                    username: res.data.updatedUser.username
                                },
                                token: this.currentToken
                            }
                            this.$store.dispatch('loginAction', data)
                            console.log(data);
                            console.log(this.img[0]);
                            // Adjust profile fields
                            this.currentUser.password = '';
                            this.updateConfirmation = true;
                            setTimeout(()=>{
                                this.updateConfirmation = false;
                            }, 3000);
                        }
                    })
                    .catch((err)=>{
                        if(err.response.status == 406){
                            this.updateError = true;
                        }
                        console.log(`An error ocurred ${err}`);
                        this.updateConfirmation = false;
                    })
                    const fileInput = this.img[0];

                    if(fileInput){
                        const formData = new FormData();
                        formData.append('file0', fileInput)
                        // // Upload image
                        await axios.post(`http://localhost:2046/api/user/upload/`, formData,{
                            headers: {
                                Authorization: this.currentToken
                            }
                        })
                        .then((respuesta)=>{
                            console.log(respuesta);
                            this.getUserData(this.currentId);
                        })
                        .catch((err)=>{
                            if(err.response.status == 406){
                                this.updateError = true;
                            }
                            console.log(`An error ocurred ${err}`);
                            console.log(err);
                        })
                        console.log(formData);
                        console.log(fileInput);
                    }  
                }
            }
        },
        validateEmail(email){
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
        getImg(){
            // console.log(e.target.files[0]);
            console.log(this.img[0]);
        }
    },
    created(){
        this.getUserData(this.currentId);
    },
    beforeUpdate(){
        this.getUserData(this.currentId);
    }
}
</script>
<style scoped>

</style>