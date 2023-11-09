<template>
    <v-app>
        <v-main>
            <!-- Content --> 
            <v-container>
                    <v-row class="mt-3">
                        <v-col cols="3" v-for="(notebook, i) in notebooks" :key="i">
                            <v-card >
                                <v-card-title>{{notebook.title}}</v-card-title>
                                <v-card-subtitle>Autor: {{notebook.user.username}}</v-card-subtitle>
                                <v-card-text>
                                    {{notebook.description}}
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn>Read</v-btn>
                                    <v-btn @click="editNotebookViewRedirection(notebook._id)">Edit</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                <div>
                    <v-btn icon="mdi-plus" size="x-large" class="bg-info add-button" @click="openDialog()" vertical="bottom" horizontal="end"></v-btn>
                </div>
                <!-- Dialog to create notebook -->
                <v-dialog
                v-model="dialogOne"
                transition="dialog-top-transition"
                width="500">
                    <v-card title="Notebook" subtitle="Create Notebook">
                        <v-card-text>
                            <v-text-field
                            label="Title"
                            maxlength="50"
                            counter
                            color="indigo"
                            clearable
                            placeholder="Notebook title"
                            required
                            v-model="notebook.title"
                            ></v-text-field>
                            <v-text-field
                            label="Description"
                            maxlength="100"
                            counter
                            color="indigo"
                            clearable
                            required
                            placeholder="Notebook description"
                            v-model="notebook.description"
                            ></v-text-field>
                            <v-select
                            color="indigo"
                            label="Visibility"
                            :items="visibility"
                            item-value="value"
                            item-title="type"
                            required
                            v-model="notebook.visibility"
                            ></v-select>
                            <v-card
                                class="mb-12"
                                color="surface-variant"
                                variant="tonal"
                            >
                                <div>
                                    <v-alert
                                        type="error"
                                        title="Invalid title"
                                        text="Notebook must have a title with 3 or more characters"
                                        v-if="dialogFields"
                                    ></v-alert>
                                </div>
                            </v-card>
                            <v-btn
                            prepend-icon="mdi-check"
                            color="indigo"
                            block
                            @click="createNotebook(currentId, this.notebook)"
                            >Save</v-btn>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import axios from 'axios';

export default {
    name: 'DashboardHomeView',
    data(){
        return{
            currentId: this.$store.state.user.id,
            currentToken: this.$store.state.token,
            notebooks: [],
            notebook: {
                title: '',
                description: '',
                visibility: 2
            },
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
            // Booleans
            dialogOne: false,
            dialogFields: false
        }
    },
    methods: {
        showUserBooks(userId){
            // console.log(userId);
            axios.get(`http://localhost:2046/api/notebook/user/${userId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((respuesta)=>{
                if(respuesta.status == 200){
                    let res = respuesta.data;
                    this.notebooks = res.notebooks;
                }
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        },
        openDialog(){
            this.dialogOne = true;
        },
        createNotebook(userId, notebookToSave){
            let title = notebookToSave.title;

            if(title == '' || title.length < 3){
                this.dialogFields = true;
            }else{
                axios.post("http://localhost:2046/api/notebook/save", notebookToSave, {
                    headers: {
                        Authorization: this.currentToken
                    }
                })
                .then((respuesta)=>{
                    this.dialogFields = false;
                    // console.log(userId);
                    // console.log(notebookToSave);
                    // console.log(respuesta);
                    let createdNotebook = respuesta.data.response;
                    this.$router.push(`/dashboard/edit/${createdNotebook._id}`)
                })
                .catch((err)=>{
                    console.log(`Ocurrio un error ${err}`);
                })
                
            }
        },
        editNotebookViewRedirection(notebookId){
            this.$router.push(`/dashboard/edit/${notebookId}`)
        }
    },
    created(){
        this.showUserBooks(this.currentId);
    },
    updated(){
        this.showUserBooks(this.currentId);
    }
}
</script>
<style scoped>
.add-button{
    position: fixed;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    margin: 10px;
}
</style>