<template>

    <v-app>
        <v-container>
            <h1>Edit</h1>
        </v-container>
    </v-app>
    
</template>

<script>
import axios from 'axios'

export default {
    name: 'DashboardCreateView',
    data(){
        return{
            currentId: this.$store.state.user.id,
            currentToken: this.$store.state.token,
            currentNotebookId: this.$route.params.id,
            notebook: {}
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
    beforeCreate(){
        
    },
    created(){
        console.log(this.currentNotebookId);
        this.getCurrentNotebook(this.currentNotebookId)
    }
}

</script>