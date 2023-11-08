<template>

    <v-app>
        <v-container>
            <h1>Edit</h1>
            <v-card>
                <v-tabs
                v-model="tab"
                bg-color="primary"
                >
                    <v-tab value="edit">Edit</v-tab>
                    <v-tab value="preview">Preview</v-tab>
                </v-tabs>
                <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="edit">   
                        <textarea v-model="markdown"></textarea>
                    </v-window-item>
                    <v-window-item value="preview">
                        
                        <div class="info" v-html="test"></div>
                    </v-window-item>
                </v-window>
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
    
</template>

<script>
import axios from 'axios'
import { marked } from 'marked';    

export default {
    name: 'DashboardCreateView',
    data(){
        return{
            currentId: this.$store.state.user.id,
            currentToken: this.$store.state.token,
            currentNotebookId: this.$route.params.id,
            notebook: {},
            tab: null,
            rowsNumber: 0,
            markdown: ''
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
                    console.log(this.notebook);
                }
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        }
    },
    computed:{
        test(){
      return marked.parse(this.markdown)
      // console.log( marked.parse(this.markdown));
    }
    },
    created(){
        console.log(this.currentNotebookId);
        this.getCurrentNotebook(this.currentNotebookId)
    }
}

</script>

<style scoped>

    .info{
        width: 100%;
        height: 400px;
        background-color: aquamarine;
    }

</style>