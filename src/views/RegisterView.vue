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
                        v-model="user.username"
                    ></v-text-field>
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
                        v-model="user.passwordVerification"
                    ></v-text-field>
                    <v-alert
                        type="error"
                        title="Passwords not matching"
                        text="The passwords have to match."
                        v-if="passwordMatch"
                    ></v-alert>
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
                </v-card>
            </form>
        </v-container>
    </v-app>
</template>
<script>
export default {
    name: 'LoginView',
    data(){
        return{
            user: {
                username: '',
                email: '',
                password: '',
                passwordVerification: ''
            },
            passwordMatch: false,
            visible: false,
            visible1: false,
        }
    },
    methods: {
        register(){
            const password1 = this.user.password;
            const password2 = this.user.passwordVerification;

            if(password1 == password2){
                console.log(this.user.username, this.user.email, this.user.password);
                this.user = {};
                this.passwordMatch = false;
            }else{
                this.passwordMatch = true
            }

        }
    },
}

</script>