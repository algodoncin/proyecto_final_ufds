<template>
    <v-app>
        <v-container>
            <form @submit="register">
                <v-img
                class="mx-auto my-6"
                max-width="228"
                ></v-img>
                <v-card
                class="mx-auto pa-12 pb-8"
                elevation="8"
                max-width="448"
                rounded="lg"
                >   <div class="text-subtitle-1 text-medium-emphasis">Username</div>
                    <v-text-field
                        density="compact"
                        placeholder="Username"
                        prepend-inner-icon="mdi-account-outline"
                        variant="outlined"
                        v-model="registerUser.username"
                        min="3"
                        counter
                    ></v-text-field>
                    <div class="text-subtitle-1 text-medium-emphasis">Email</div>
                    <v-text-field
                        density="compact"
                        placeholder="Email address"
                        prepend-inner-icon="mdi-email-outline"
                        variant="outlined"
                        v-model="registerUser.email"
                        autocomplete="email"
                    ></v-text-field>
                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Password
                    </div>
                    <v-text-field
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'"
                        density="compact"
                        placeholder="Enter your password"
                        prepend-inner-icon="mdi-lock-outline"
                        variant="outlined"
                        @click:append-inner="visible = !visible"
                        v-model="registerUser.password"
                    ></v-text-field>
                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Confirm password
                    </div>
                    <v-text-field
                        :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible1 ? 'text' : 'password'"
                        density="compact"
                        placeholder="Confirm your password"
                        prepend-inner-icon="mdi-lock-outline"
                        variant="outlined"
                        @click:append-inner="visible1 = !visible1"
                        v-model="passwordVerification"
                    ></v-text-field>
                    <v-alert
                        type="error"
                        title="Passwords not matching"
                        text="The passwords have to match."
                        v-if="passwordMatch"
                    ></v-alert>
                    <v-alert
                        type="error"
                        title="Existing user"
                        text="There is already a user with any those credentials"
                        v-if="existingCredentials"
                    ></v-alert>
                    <v-alert
                        type="error"
                        title="Missing data"
                        text="You must fill all the fields to register"
                        v-if="missingData"
                    ></v-alert>
                    <v-alert
                        type="error"
                        title="Invalid Fields"
                        text="Username field must contain at least 3 characters, email field must contain a valid email"
                        v-if="invalidFields"
                    ></v-alert>
                    <v-dialog
                    v-model="registerConfirmation">
                        <v-alert
                            type="success"
                            title="User registered"
                            text="You have been registered, you will be redirected to the login page in a few seconds"
                            v-if="registerConfirmation"
                        ></v-alert>
                    </v-dialog>
                    <v-card
                        class="mb-12"
                        color="surface-variant"
                        variant="tonal"
                    >
                    </v-card>
                    <v-btn
                        block
                        class="mb-8"
                        color="success"
                        size="large"
                        variant="tonal"
                        @click="register"
                    >
                        Sign up 
                    </v-btn>
                    <v-card-text class="text-center">
                    <a
                    class="text-green text-decoration-none"
                    href="/login"
                    rel="noopener noreferrer"
                    >
                    <v-icon icon="mdi-chevron-left"></v-icon>Go back to login
                    </a>
                </v-card-text>
                </v-card>
            </form>
        </v-container>
    </v-app>
</template>
<script>
import axios from "axios"

export default {
    name: 'LoginView',
    data(){
        return{
            registerUser: {
                username: '',
                email: '',
                password: '',
            },
            passwordVerification: '',
            passwordMatch: false,
            visible: false,
            visible1: false,
            existingCredentials: false,
            registerConfirmation: false,
            missingData: false,
            invalidFields: false
        }
    },
    methods: {
        register(){
            const password1 = this.registerUser.password;
            const password2 = this.passwordVerification;
            
            if(password1 == password2){
                axios.post('http://localhost:2046/api/user/register', this.registerUser)
                .then((res)=>{
                    console.log(res.status);
                    this.registerConfirmation = true;
                    this.registerUser = {};
                    this.passwordVerification = ''; 
                    this.existingCredentials = false;
                    this.missingData = false;
                    this.invalidFields= false;
                    setTimeout(()=>{
                        this.registerConfirmation = false;
                        this.$router.push('/login')
                    }, 4000);
                })
                .catch((err)=>{
                    if(err.response.status == 409){
                        this.invalidFields= false;
                        this.missingData = false;
                        this.existingCredentials = true;
                    }else if(err.response.status == 412){
                        this.missingData = true;
                    }else if(err.response.status == 400){
                        this.invalidFields = true;
                    }
                })
                
                this.passwordMatch = false;
                
            }else{
                this.passwordMatch = true
            }

        }
    },
}

</script>