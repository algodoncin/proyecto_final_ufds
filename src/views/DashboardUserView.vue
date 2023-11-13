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
                                                    <span class="pointer" @click="followedBy()">{{followCounter.followed}}</span>
                                                    <br>
                                                    Followers
                                                </v-col>
                                                <v-col align="center" >
                                                    <span class="pointer" @click="following()">{{followCounter.following}}</span>
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
                                <v-col align="center" class="fill-height my-auto" v-if="ifNotebooks">
                                    <h2>No notebooks were found</h2>
                                </v-col>
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
                <!-- Follows Dialogs -->
                    <v-dialog
                    v-model="followingDialog"
                    transition="dialog-top-transition"
                    max-width="500"
                    max-height="400px">
                        <v-card :title="dialogTitle" :subtitle="dialogSubtitle">
                            <v-card-text >
                                <v-row v-for="(follow, i) in follows" :key="i">
                                    <v-col cols="4" align="center">
                                        <img :src="`http://localhost:2046/api/user/avatar/${follow.followed.image}`" alt="" :width="50" rounded="10">
                                    </v-col>
                                    <v-col cols="4" align="center" class="fill-height my-auto">
                                        <span @click="followRedirection(follow.followed._id)">{{follow.followed.username}}</span>
                                    </v-col>
                                    <v-col cols="4" align="center" class="fill-height my-auto">
                                        <v-btn
                                            color="blue"
                                            size="large"
                                            variant="tonal"
                                        >
                                            Follow
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <v-dialog
                    v-model="followersDialog"
                    transition="dialog-top-transition"
                    max-width="500"
                    max-height="400px">
                        <v-card :title="dialogTitle" :subtitle="dialogSubtitle">
                            <v-card-text >
                                <v-row v-for="(follow, i) in follows" :key="i">
                                    <v-col cols="4" align="center">
                                        <img :src="`http://localhost:2046/api/user/avatar/${follow.user.image}`" alt="" :width="50" rounded="10">
                                    </v-col>
                                    <v-col cols="4" align="center" class="fill-height my-auto">
                                        <span @click="followRedirection(follow.user._id)">{{follow.user.username}}</span>
                                    </v-col>
                                    <v-col cols="4" align="center" class="fill-height my-auto">
                                        <v-btn
                                            color="blue"
                                            size="large"
                                            variant="tonal"
                                        >
                                            Follow
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
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
            ifNotebooks: false,
            // Follows variables
            dialogTitle: '',
            dialogSubtitle: '',
            follows: [],
            followsAvatar: '',
            // Diaglos
            showFollowButton: true,
            followingDialog: false,
            followersDialog: false,
            isFollowed: false,
            isFollowing: false
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
                this.ifNotebooks = false;
                console.log(respuesta);
                const notebooks = respuesta.data.notebooks;
                this.userNotebooks = notebooks;
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
                if(err.response.status == 404){
                    this.userNotebooks = [];
                    this.ifNotebooks = true;
                }
            })
        },
        readNotebookViewRedirection(notebookId){
            this.$route.push(`/dashboard/read/${notebookId}`)
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
        following(){
            // Define dialog title and subtitle
            this.dialogTitle = "Following";
            this.dialogSubtitle = "Users followed by username"
            let parameterUser = this.$route.params.id;
            // Get data
            axios.get(`http://localhost:2046/api/follow/following/${parameterUser}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((response)=>{
                console.log(response);
                // Fill local variable with users list
                this.follows = response.data.response;
                console.log(this.follows);

                // Open dialog
                this.followingDialog = true;
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
            
        },
        followedBy(){
            this.dialogTitle = "Followed by";
            this.dialogSubtitle = "Users who follows username"
            let parameterUser = this.$route.params.id;
            // Get data
            axios.get(`http://localhost:2046/api/follow/followers/${parameterUser}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((response)=>{
                console.log(response);
                // Fill local variable with users list
                this.follows = response.data.response;
                console.log(this.follows);

                // Open dialog
                this.followersDialog = true;
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        },
        getFollowAvatar(follow){
            const avatar = `http://localhost:2046/api/user/avatar/${follow.followed.image}`;

            return avatar
        },
        userVerification(id){
            if(id != this.currentId){
                this.showFollowButton = true
            }else{
                this.showFollowButton = false
            }
        },
        followRedirection(userId){
            this.paramsUserId = userId;
            this.$router.push(`/dashboard/user/${userId}`)
            
            this.followingDialog = false;
            this.followersDialog = false;
        }
    },
    created(){
        this.getUser(this.paramsUserId)
        this.getUserNotebooks(this.paramsUserId)
        this.userFollowsCountInfo(this.paramsUserId)
        this.userVerification(this.paramsUserId)
    },
    updated(){
        this.getUser(this.paramsUserId)
        this.getUserNotebooks(this.paramsUserId)
        this.userFollowsCountInfo(this.paramsUserId)
        this.userVerification(this.paramsUserId)
    }
    // watch: {
        
    // }
}
</script>
<style scoped>

.pointer{
    cursor: pointer;
}</style>