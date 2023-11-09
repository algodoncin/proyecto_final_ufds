<template>

    <v-app>
        <v-container>
            <h1>Edit</h1>
            <v-row>
                <v-col cols="4" class="mx-auto">
                    <h3>Title</h3>
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        v-model="notebook.title"
                    ></v-text-field>
                </v-col>
                <v-col cols="4" class="mx-auto">
                    <h3>Description</h3>
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        v-model="notebook.description"
                    ></v-text-field>
                </v-col>
                <v-col cols="4" class="mx-auto">
                    <h3>Visibility</h3>
                    <v-select
                    density="compact"
                    variant="outlined"
                    :items="visibility"
                    item-value="value"
                    item-title="type"
                    required
                    v-model="notebook.visibility"
                    ></v-select>
                </v-col>
            </v-row>
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
                        <v-textarea 
                        auto-grow
                        label="Markdown" 
                        variant="outlined"
                        v-model="markdown"
                        class="mt-1"
                        ></v-textarea>
                    </v-window-item>
                    <v-window-item value="preview">
                        <fieldset class="show">
                            <legend>Content:</legend>
                            <div v-html="test"></div>
                        </fieldset>
                    </v-window-item>
                </v-window>
                </v-card-text>
            </v-card>
            <v-card
                class="mt-5"
                color="surface-variant"
                variant="tonal"
            >
                <div>
                    <v-alert
                        type="error"
                        title="Invalid title"
                        text="Notebook must have a title with 3 or more characters"
                        v-if="dialogFieldsError"
                    ></v-alert>
                    <v-alert
                        type="success"
                        title="Notebook updated"
                        text="Your notebook was updated succesfully"
                        v-if="dialogFieldsSuccess"
                    ></v-alert>
                </div>
            </v-card>
            <v-row class="mt-5">
                    <v-col cols="3" class="mx-auto">
                        <v-btn
                        block
                        class="mb-8"
                        color="blue"
                        size="large"
                        variant="tonal"
                        @click="updateNotebook(this.currentNotebookId, this.notebook)"
                        >
                            Update
                        </v-btn>
                    </v-col>
                </v-row>
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
            // identificators
            currentId: this.$store.state.user.id,
            currentToken: this.$store.state.token,
            currentNotebookId: this.$route.params.id,
            // Variables
            visibility: [
                {
                    type: "Private",
                    value: 0
                },
                {
                    type: "Followers only",
                    value: 1
                },
                {
                    type: "Public",
                    value: 2
                }
            ],
            notebook: {},
            tab: null,
            markdown: '',
            // Dialogs
            dialogFieldsError: false,
            dialogFieldsSuccess: false
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

                    // title
                    this.notebook = res;    
                    this.markdown = this.notebook.content;
                    console.log(this.notebook);
                }
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        },
        updateNotebook(notebookId, notebook){
            let title = notebook.title;

            // Validate if title has more than 3 characters
            if(title == '' || title.length < 3){
                this.dialogFieldsError = true;
            }else{
                this.dialogFieldsError = false;

                // Move markdown to notebook variable
                this.notebook.content = this.markdown;

                // Create temporarily object to make sure all the fields are together and filled
                let notebookToUpdate = {
                    title: '',
                    description: '',
                    content: '',
                    visibility: 0
                };

                // Fill object fields
                notebookToUpdate.title = this.notebook.title;
                notebookToUpdate.description = this.notebook.description;
                notebookToUpdate.content = this.notebook.content;
                notebookToUpdate.visibility = this.notebook.visibility;

                console.log(notebookToUpdate);
                console.log(notebook, notebookId);
                // Update notebook
                axios.put(`http://localhost:2046/api/notebook/update/${notebookId}`, notebook,{
                    headers: {
                        Authorization: this.currentToken
                    }
                })
                .then((respuesta)=>{
                    if(respuesta.status == 200){
                        console.log(respuesta);
                        this.dialogFieldsSuccess = true;
                        setTimeout(()=>{
                            this.dialogFieldsSuccess = false;
                        }, 3000);
                    }
                })
                .catch((err)=>{
                    console.log(`Ocurrio un error ${err}`);
                })
            }
            
        }
    },
    computed:{
        test(){
            return marked.parse(this.markdown)
        }
    },
    created(){
        this.getCurrentNotebook(this.currentNotebookId);
    }
}

</script>

<style scoped>

    .show{
        width: 100%;
        min-height: 150px;
        overflow: auto;
        padding: 15px;
        margin-bottom: 26px;
        border: 1px solid black;
        border-radius: 5px;
        font-size: 16px;
    }
    .content{
        padding: 10px;
    }

</style>