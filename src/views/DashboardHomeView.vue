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
                                    <v-btn>Write</v-btn>
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
                            ></v-text-field>
                            <v-text-field
                            label="Description"
                            maxlength="9"
                            counter
                            color="indigo"
                            clearable
                            placeholder="Notebook description"
                            ></v-text-field>
                            <v-select
                            color="indigo"
                            label="Visibility"
                            :items="visibility"
                            item-value="value"
                            item-title="type"
                            ></v-select>
                            <v-btn
                            prepend-icon="mdi-check"
                            color="indigo"
                            block
                            >Guardar</v-btn>
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
                visibility: ''
            },
            dialogOne: false,
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
            ]
        }
    },
    methods: {
        showUserBooks(userId){
            console.log(userId);
            axios.get(`http://localhost:2046/api/notebook/user/${userId}`, {
                headers: {
                    Authorization: this.currentToken
                }
            })
            .then((respuesta)=>{
                if(respuesta.status == 200){
                    let res = respuesta.data;
                    this.notebooks = res.notebooks;
                    console.log(res);
                    console.log(this.notebooks);
                }
            })
            .catch((err)=>{
                console.log(`Ocurrio un error ${err}`);
            })
        },
        openDialog(){
            this.dialogOne = true;
        },
        createNotebook(){

        }
    },
    created(){
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