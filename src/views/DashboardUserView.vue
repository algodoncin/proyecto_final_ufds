<template>
    <v-app>
        <v-main>
            <v-container>
                <v-card 
                class="mt-5 mx-5"
                min-height="500px"
                color="#385F73">
                    <div>
                        <v-row>
                            <v-col cols="4" align="center" >
                                <v-avatar
                                    class="ma-5"
                                    size="200"
                                    rounded="10"
                                >
                                    <v-img :src="avatar" class="bg-white"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col 
                            cols="8"
                            >   
                                <v-row>
                                    <v-card-text>
                                        <div color="red"></div>
                                        <v-card-title>
                                            <v-row>
                                                <v-col align="center" >
                                                    <span class="pointer">{{followCounter.notebooks}}</span>
                                                    <br>
                                                    Notebooks
                                                </v-col>
                                                <v-col align="center" >
                                                    <span class="pointer">{{followCounter.followed}}</span>
                                                    <br>
                                                    Followers
                                                </v-col>
                                                <v-col align="center" >
                                                    <span class="pointer">{{followCounter.following}}</span>
                                                    <br>
                                                    Following
                                                </v-col>
                                            </v-row>
                                        </v-card-title>
                                    </v-card-text>
                                </v-row>
                                <v-row
                                class="mt-7">
                                    <v-card-text>
                                        <v-card-title align="center">@{{user.username}}</v-card-title>
                                    </v-card-text>
                                </v-row>
                                <!--  -->
                                <v-row v-if="showFollowButton">
                                    <v-col cols align="center" >
                                        <v-btn
                                            class="mb-8"
                                            color="blue"
                                            size="large"
                                            variant="tonal"
                                            @click="followUser()"
                                        >
                                            Follow
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <!--  -->
                            </v-col>
                        </v-row>
                        <v-container>
                            <h3>Notebooks this user owns:</h3>
                            <v-row class="mt-3">
                                <v-col cols="3" v-for="(notebook, i) in userNotebooks" :key="i">
                                    <v-card >
                                        <v-card-title>{{notebook.title}}</v-card-title>
                                        <v-card-subtitle>Autor: {{notebook.user.username}}</v-card-subtitle>
                                        <v-card-text>
                                            {{notebook.description}}
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn @click="readNotebookViewRedirection(notebook._id)">Read</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                        
                    </div>  
                </v-card>
                
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import axios from 'axios'

export default {
    name: 'DashboardUserView',
    data(){
        return{
            // Global variables
            currentId: this.$store.state.user.id,
            currentToken: this.$store.state.token,
            paramsUserId: this.$route.params.id,
            // Standard variables
            user: {},
            avatar: '',
            userNotebooks: [],
            followCounter: {
                followed: 0,
                following: 0,
                notebooks: 0
            },
            // Diaglos
            showFollowButton: true
        }
    },
    methods: {
        getUser(userId){
            axios.get(`http://localhost:2046/api/user/profile/${userId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((respuesta)=>{
                const url = 'http://localhost:2046/api/user/avatar/';
                this.user = respuesta.data.user;
                this.avatar = `${url}${this.user.image}`
                console.log(respuesta);
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        },
        getUserNotebooks(userId){
            axios.get(`http://localhost:2046/api/notebook/user/${userId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((respuesta)=>{
                console.log(respuesta);
                const notebooks = respuesta.data.notebooks;
                this.userNotebooks = notebooks;
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        },
        readNotebookViewRedirection(notebookId){
            this.$router.push(`/dashboard/read/${notebookId}`)
        },
        userFollowsCountInfo(userId){
            axios.get(`http://localhost:2046/api/user/counter/${userId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((respuesta)=>{
                console.log(respuesta);
                this.followCounter = {
                    followed: respuesta.data.followed,
                    following: respuesta.data.following,
                    notebooks: respuesta.data.notebooks
                }
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        },
        userFollows(){

        },
        userFollowing(){

        },
        userVerification(id){
            if(id != this.currentId){
                this.showFollowButton = true
            }else{
                this.showFollowButton = false
            }
        }
    },
    created(){
        this.getUser(this.paramsUserId)
        this.getUserNotebooks(this.paramsUserId)
        this.userFollowsCountInfo(this.paramsUserId)
        this.userVerification(this.paramsUserId)
    }
}
</script>
<style scoped>

.pointer{
    cursor: pointer;
}</style>