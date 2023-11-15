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
                                <!-- Follow and unfollow buttons -->
                                <v-row v-if="showFollowButton">
                                    <v-col cols align="center" >
                                        <v-btn
                                            color="green"
                                            size="large"
                                            variant="tonal"
                                            v-if="unfollowBtn"
                                            @click="followUser(), this.getUserNotebooks(this.paramsUserId),noteBooksVisibility(this.currentId, this.paramsUserId)"
                                        >
                                            Follow
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-row v-if="showFollowButton">
                                    <v-col cols align="center" >
                                        <v-btn
                                            color="red"
                                            size="large"
                                            variant="tonal"
                                            v-if="followBtn"
                                            @click="unfollowUser(), this.getUserNotebooks(this.paramsUserId),noteBooksVisibility(this.currentId, this.paramsUserId)"
                                        >
                                            Unfollow
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <!--  -->
                            </v-col>
                        </v-row>
                        <!-- Notebooks container -->
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
                                    <v-col cols="6" align="center">
                                        <img :src="`http://localhost:2046/api/user/avatar/${follow.followed.image}`" alt="" :width="50" rounded="10">
                                    </v-col>
                                    <v-col cols="6" align="center" class="fill-height my-auto">
                                        <span class="pointer" @click="followRedirection(follow.followed._id)">@{{follow.followed.username}}</span>
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
                                    <v-col cols="6" align="center">
                                        <img :src="`http://localhost:2046/api/user/avatar/${follow.user.image}`" alt="" :width="50" rounded="10">
                                    </v-col>
                                    <v-col cols="6" align="center" class="fill-height my-auto">
                                        <span class="pointer" @click="followRedirection(follow.user._id)">@{{follow.user.username}}</span>
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
            currentUserRole: this.$store.state.user.role,
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
            currentUserFollows: [],
            // Diaglos
            showFollowButton: true,
            followingDialog: false,
            followersDialog: false,
            followBtn: false,
            unfollowBtn: false,
            isFriend: false,
            showDialogFollow: true
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
            this.$router.push(`/dashboard/read/${notebookId}`)
        },
        userFollowsCountInfo(userId){
            axios.get(`http://localhost:2046/api/user/counter/${userId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((respuesta)=>{
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
                // Fill local variable with users list
                this.follows = response.data.response;

                
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
                // Fill local variable with users list
                this.follows = response.data.response;

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
        },
        followVerification(loggedUser, onScreenUser){
            axios.get(`http://localhost:2046/api/follow/followers/${onScreenUser}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((res)=>{
                if(res.status == 200){
                    this.followBtn = false;
                    this.unfollowBtn = true;
                    let followersList = res.data.followed_by;
                    for(let i = 0; i<followersList.length; i++){
                        if(loggedUser === followersList[i]){
                            this.unfollowBtn = false; 
                            this.followBtn = true;
                            break;
                        }
                    }
                }
            })
            .catch((err)=>{
                console.log(`An error ocurred`);
                console.log(err);
            })
        },
        noteBooksVisibility(loggedUser, onScreenUser){
            axios.get(`http://localhost:2046/api/follow/followers/${onScreenUser}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((res)=>{
                if(res.status == 200){
                    // If para que solo se ejecute en usuarios no admin (el admin puede ver todo)
                    if(this.currentUserRole != "role_admin"){
                        // If para que solo se ejcute en perfiles diferentes al de usuarios loggeados
                        if(loggedUser != onScreenUser){

                            // For para verificar si somos seguidores
                            let followersList = res.data.followed_by;
                            for(let i = 0; i<followersList.length; i++){
                                if(loggedUser === followersList[i]){
                                    this.isFriend = true;
                                }
                            }
                            // For para eliminar los notebooks privados
                            let notebook = {};
                            for(let i = 0; i< this.userNotebooks.length; i++){
                                notebook = this.userNotebooks[i];
                                if(notebook.visibility == 1){
                                    this.userNotebooks.splice(i, 1)
                                }
                            }
                            // For para verificar si se es seguidor o no
                            notebook = {};
                            if(!this.isFriend){
                                for(let i = 0; i< this.userNotebooks.length; i++){
                                    notebook = this.userNotebooks[i];
                                    if(notebook.visibility == 2){
                                        this.userNotebooks.splice(i, 1)
                                    }
                                }
                            }
                        }
                    }
                    
                    
                }
            })
            .catch((err)=>{
                console.log(`An error ocurred`);
                console.log(err);
            })
        },
        async followUser(){
            let userToFollow = {"followed": this.paramsUserId}

            await axios.post(`http://localhost:2046/api/follow/save`, userToFollow, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((res)=>{
                if(res.status == 200){
                    this.userFollowsCountInfo(this.paramsUserId)
                    this.unfollowBtn = false;
                    this.followBtn = true;
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        unfollowUser(){
            axios.delete(`http://localhost:2046/api/follow/unfollow/${this.paramsUserId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((res)=>{
                if(res.status == 200){
                    this.userFollowsCountInfo(this.paramsUserId)
                    this.unfollowBtn = true;
                    this.followBtn = false;
                    this.isFriend = false
                }
            })
            .catch((err)=>{
                console.log("An error ocurred");
                console.log(err);
            })
        },
        // Follow and unfollow buttons on user profile
        dialogFollowButtons(user){
            if(user.id != this.currentId){
                this.showDialogFollow = true;
            }else{
                this.showDialogFollow = false;
            }
        },
        loggedUserFollows(){
            axios.get(`http://localhost:2046/api/follow/followers/${this.currentId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((response)=>{
                this.currentUserFollows = response.data.following
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        }
    },
    created(){
        this.getUser(this.paramsUserId);
        this.getUserNotebooks(this.paramsUserId);
        this.userFollowsCountInfo(this.paramsUserId);
        this.userVerification(this.paramsUserId);
        this.followVerification(this.currentId, this.paramsUserId);
        this.noteBooksVisibility(this.currentId, this.paramsUserId);
        this.loggedUserFollows();
    },
    beforeUpdate(){
        this.paramsUserId = this.$route.params.id;
        this.getUser(this.paramsUserId);
        this.getUserNotebooks(this.paramsUserId);
        this.userFollowsCountInfo(this.paramsUserId);
        this.userVerification(this.paramsUserId);
        this.followVerification(this.currentId, this.paramsUserId);
        this.noteBooksVisibility(this.currentId, this.paramsUserId);
        this.loggedUserFollows();
    }
}
</script>
<style scoped>

.pointer{
    cursor: pointer;
}</style>