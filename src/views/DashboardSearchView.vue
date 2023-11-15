<template>
    <v-app>
        <!-- Navbar -->
        <v-app-bar color="blue-lighten-4" prominent>
            <v-text-field label="Search books" class="mt-5 ml-4" v-model="searchInput"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn variant="text" icon="mdi-magnify" @click="searchNotebooks(searchInput)"></v-btn>
            <!-- <v-btn variant="text" icon="mdi-filter"></v-btn>
            <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
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

                    if(this.notebooks.length == 0){
                        console.log('sexo');
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
        
    },
    created(){

    }
}
</script>