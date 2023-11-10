<template>
    <div>
        <v-app>
            <v-main>
                <!-- Content --> 
                <v-container>
                    <h2>Autor: <span @click="notebookAutorRedirection(autorId)">{{ autor }}</span></h2>
                    <v-card>
                        <v-card-title>{{ notebook.title }}</v-card-title>
                        <v-card-subtitle>{{ notebook.description }}</v-card-subtitle>
                        <hr>
                        <v-card-text v-html="parseToHTML" class="content">

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
            autor: '',
            autorId:''
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
                    this.autorId = this.notebook.user._id;
                }
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        },
        notebookAutorRedirection(userId){
            this.$router.push(`/dashboard/user/${userId}`)
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
<style scoped>

a {
  text-decoration: none;
}

</style>