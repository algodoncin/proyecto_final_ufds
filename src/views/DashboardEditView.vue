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
                    :value="notebook.visibility"
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
                            <div v-html="parseToHTML"></div>
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
            <v-dialog
            v-model="deleteConfirmation"
            transition="dialog-top-transition"
            width="500"
            persistent>
                <v-card height="250">
                    <v-card-text>
                        <v-card
                            class="mb-12"
                            color="surface-variant"
                            variant="tonal"
                        >
                            <div>
                                <v-alert
                                    type="error"
                                    title="Are you sure to delete this notebook?"
                                    text="Once you delete the notebook it cannot be restored, would you like to proceed?"
                                ></v-alert>
                            </div>
                            
                        </v-card>
                        <v-row>
                            <v-col>
                                <v-btn
                                prepend-icon="mdi-check"
                                color="green"
                                block
                                @click="deleteNotebook(currentNotebookId)"
                                >Proceed</v-btn>
                            </v-col>
                            <v-col>
                                <v-btn
                                prepend-icon="mdi-cancel"
                                color="red"
                                block
                                @click="cancelDialog()"
                                >Cancel</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog
            v-model="deleteMessage"
            transition="dialog-bottom-transition"
            width="500"
            persistent>
                <v-card>
                    <v-card-text>
                        <v-card
                            class="mb-12"
                            color="surface-variant"
                            variant="tonal"
                        >
                            <div>
                                <v-alert
                                    type="success"
                                    title="Notebook deleted"
                                    text="You will be redirected to the main menu in a few seconds."
                                ></v-alert>
                            </div>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-row class="mt-5">
                <v-col cols="3" class="mx-auto">
                    <v-btn
                    block
                    class="mb-8"
                    color="green"
                    size="large"
                    variant="tonal"
                    @click="updateNotebook(this.currentNotebookId, this.notebook)"
                    >
                        Update
                    </v-btn>
                </v-col>
                <v-col cols="3" class="mx-auto">
                    <v-btn
                    block
                    class="mb-8"
                    color="red"
                    size="large"
                    variant="tonal"
                    @click="deleteDialog()"
                    >
                        Delete
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
    
</template>

<script>
import axios from 'axios';
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
                    value: 1
                },
                {
                    type: "Followers only",
                    value: 2
                },
                {
                    type: "Public",
                    value: 3
                }
            ],
            notebook: {},
            tab: null,
            markdown: '',
            // Dialogs
            dialogFieldsError: false,
            dialogFieldsSuccess: false,
            deleteConfirmation: false,
            deleteMessage: false
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
                    // console.log(this.notebook);  
                }
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        },
        updateNotebook(notebookId, notebook){
            let title = notebook.title;
            console.log(notebook);
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
                    visibility: 1
                };
                console.log(notebook);
                // Fill object fields
                notebookToUpdate.title = notebook.title;
                notebookToUpdate.description = notebook.description;
                notebookToUpdate.content = notebook.content;
                notebookToUpdate.visibility = notebook.visibility;
                // Update notebook
                axios.put(`http://localhost:2046/api/notebook/update/${notebookId}`, notebookToUpdate,{
                    headers: {
                        Authorization: this.currentToken
                    }
                })
                .then((respuesta)=>{
                    if(respuesta.status == 200){
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
            
        },
        deleteDialog(){
            // Open dialog to verify if user is okay deleting the notebook
            this.deleteConfirmation = true;
        },
        cancelDialog(){
            this.deleteConfirmation = false;
        },
        deleteNotebook(notebookId){
            // Delete the notebook
            axios.delete(`http://localhost:2046/api/notebook/remove/${notebookId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((respuesta)=>{
                if(respuesta.status == 200){
                    this.deleteConfirmation = false;
                    this.deleteMessage = true;
                    setTimeout(()=>{
                        this.deleteMessage = false;
                        this.$router.push('/dashboard')
                    }, 3000)
                    
                }
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        }
    },
    computed:{
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