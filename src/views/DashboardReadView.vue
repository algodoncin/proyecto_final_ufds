<template>
    <div>
        <v-app>
            <v-main>
                <!-- Content --> 
                <v-container>
                    <h2>Autor: <a href="">{{ autor }}</a></h2>
                    <v-card>
                        <v-card-title>{{ notebook.title }}</v-card-title>
                        <v-card-subtitle>{{ notebook.description }}</v-card-subtitle>
                        <hr>
                        <v-card-text v-html="parseToHTML">

                        </v-card-text>
                    </v-card>
                    <div></div>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>
<script>
import axios from 'axios';
import { marked } from 'marked';    

export default {
    name: 'DashboardReadView',
    data(){
        return {
            currentId: this.$store.state.user.id,
            currentToken: this.$store.state.token,
            currentNotebookId: this.$route.params.id,
            markdown: '',
            notebook: {},
            autor: ''
        }
    },
    methods: {
        getCurrentNotebook(notebookId){
            axios.get(`http://localhost:2046/api/notebook/one/${notebookId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((respuesta)=>{
                if(respuesta.status == 200){
                    let res = respuesta.data.notebook;

                    this.notebook = res;    
                    this.markdown = this.notebook.content;
                    console.log(this.notebook);
                    this.autor = this.notebook.user.username;
                }
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        }
    },
    computed: {
        parseToHTML(){
            return marked.parse(this.markdown)
        }
    },
    created(){
        this.getCurrentNotebook(this.currentNotebookId);
    }
}
</script>