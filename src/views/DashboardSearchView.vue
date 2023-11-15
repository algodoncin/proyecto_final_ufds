<template>
    <v-app>
        <!-- Navbar -->
        <v-app-bar color="blue-lighten-4" prominent>
            <v-text-field label="Search books" class="mt-5 ml-4" v-model="searchInput"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn variant="text" icon="mdi-magnify" @click="searchNotebooks(searchInput)"></v-btn>
        </v-app-bar>
        <v-main>
            <v-container>
                <h2 v-if="ifNoNotebooks">No results</h2>
                <h2 v-if="ifNotebooks">Results with "{{ searchInput }}":</h2>
                <v-row class="mt-3">
                        <v-col cols="3" v-for="(notebook, i) in notebooks" :key="i">
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
        </v-main>
    </v-app>
</template>
<script>
import axios from 'axios';

export default {
    name: 'DashboardSearchView',
    data(){
        return{
            // Global variables
            currentId: this.$store.state.user.id,
            currentToken: this.$store.state.token,
            // Standard variables
            searchInput: '',
            notebooks: [],
            // Diaglos
            ifNotebooks: false,
            ifNoNotebooks: true
        }
    },
    methods:{
        searchNotebooks(searchInput){
            const input = searchInput;
            axios.get(`http://localhost:2046/api/notebook/search/${input}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((respuesta)=>{
                if(respuesta.status == 200){
                    this.ifNoNotebooks = false;
                    this.ifNotebooks = true;

                    let res = respuesta.data;
                    this.notebooks = res.notebooks;
                    
                    // Notebooks visibility
                    // console.log(this.notebooks);

                    for(let i = 0; i<this.notebooks.length; i++){
                        let isFriend = false;

                        if(this.notebooks[i].user._id != this.currentId){

                            console.log("es diferente");

                            if(this.notebooks[i].visibility == 1){
                                this.notebooks.splice(i, 1)
                            }
                            else if(this.notebooks[i].visibility == 2)
                            {
                                axios.get(`http://localhost:2046/api/follow/following/${this.notebooks[i].user._id}`, {
                                headers: {
                                    Authorization: this.currentToken
                                }
                                })
                                .then((res)=>{
                                    console.log(res);
                                    console.log(isFriend);

                                    let notebookOwnerFollowers = res.data.followed_by;
                                    if(notebookOwnerFollowers.length != 0){
                                        for(let j = 0; j < notebookOwnerFollowers.length; j++){
                                            // Verify if logged user is friend with notebook owner
                                            if(notebookOwnerFollowers[j] == this.currentId){
                                                isFriend == true;
                                            }
                                        }
                                        console.log(isFriend);
                                        if(!isFriend){
                                            this.notebooks.splice(i, 1)
                                        }
                                    }else{
                                        this.notebooks.splice(i, 1)
                                    }
                                })
                                .catch((err)=>{
                                    console.log(`An error ocurred`);
                                    console.log(err);
                                })
                            }

                            
                        }
                    }

                    if(this.notebooks.length == 0){
                        console.log('No notebooks were found');
                    }
                }
            })
            .catch((err)=>{
                if(err.response.status == 404){
                    this.notebooks = [];
                    this.ifNotebooks = false;
                    this.ifNoNotebooks = true;
                }
                console.log(`Ocurrio un error ${err}`);
                console.log(err);
            })
        },
        readNotebookViewRedirection(notebookId){
            this.$router.push(`/dashboard/read/${notebookId}`)
        },
        // noteBooksVisibility(){
        //     let currentId = this.currentId;

        //     // Consults DB to make sure if I follow any of the notebooks owners
        //     axios.get(`http://localhost:2046/api/follow/following/${currentId}`, {
        //         headers: {
        //             Authorization: this.currentToken
        //         }
        //     })
        //     .then((res)=>{
        //         if(res.status == 200){
        //             // let currentUserFollows = res.data.following
        //             let notebookOwner = '';
        //             for(let i = 0; i < this.notebooks.length; i++){
        //                 notebookOwner = this.notebooks[i].user._id
        //                 if(currentId != notebookOwner){
        //                     console.log(this.notebooks[i]);
        //                     if(this.notebooks[i].visibility == 1){
        //                         this.notebooks.splice(i, 1)
        //                     }
        //                     // else if(this.notebooks[i].visibility == 2){
                                
        //                     // }
        //                 }
        //             }
        //         }
        //     })
        //     .catch((err)=>{
        //         console.log(`An error ocurred`);
        //         console.log(err);
        //     })

            
        // }
    },
    created(){

    }
}
</script>