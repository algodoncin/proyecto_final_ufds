<template>
    <v-app>
        <v-container>
            <div>
                <v-img
                class="mx-auto my-6"
                max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
                ></v-img>
                <v-card
                class="mx-auto pa-12 pb-8"
                elevation="8"
                max-width="448"
                rounded="lg"
                >
                <div class="text-subtitle-1 text-medium-emphasis">Email</div>
                <v-text-field
                    density="compact"
                    placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    v-model="user.email"
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                    <a
                    class="text-caption text-decoration-none text-blue"
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                    Forgot login password?</a>
                </div>
                <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                    v-model="user.password"
                ></v-text-field>
                <v-card
                    class="mb-12"
                    color="surface-variant"
                    variant="tonal"
                >
                    <div>
                        <v-alert
                            type="error"
                            title="Incorrect credentials"
                            text="Email or password are incorrect"
                            v-if="credentialsErr"
                        ></v-alert>
                    </div>
                </v-card>
                <v-btn
                    block
                    class="mb-8"
                    color="blue"
                    size="large"
                    variant="tonal"
                    @click="login()"
                >
                    Log In
                </v-btn>
                <v-card-text class="text-center">
                    
                    <a
                    class="text-blue text-decoration-none"
                    href="/register"
                    rel="noopener noreferrer"
                    >
                    Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
                </v-card>
            </div>
        </v-container>
    </v-app>
</template>
<script>
import axios from "axios"

export default {
    name: 'LoginView',
    data(){
        return{
            user: {
                email: '',
                password: ''
            },
            visible: false,
            credentialsErr: false
        }
    },
    methods: {
        login(){
            // console.log(this.user);
            axios.post('http://localhost:2046/api/user/login', this.user)
            .then((res)=>{
                // console.log(res);
                // console.log(res.status);
                if(res.status == 200){
                    let resUser = res.data.user
                    let resToken = res.data.token;
                    let data = {
                        user: resUser,
                        token: resToken
                    }
                    // this.$store.dispatch('addLoggedUserAction', resUser);
                    // this.$store.dispatch('addUserTokenAction', resToken);

                    this.$store.dispatch('loginAction', data)

                    console.log(this.$store.state.user);
                    console.log(this.$store.state.token);

                    this.credentialsErr = false;
                    this.$router.push('/dashboard')
                }
            })
            .catch((err)=>{
                console.log(err);
                console.log(`An error ocurred ${err}`);
                if(err.response.status == 409){
                    this.credentialsErr = true;
                }else if(err.response.status == 404){
                    this.credentialsErr = true;
                }
            })
        }
    }
}
</script>