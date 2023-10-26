<template>
    <v-app>
        <v-container>
            <div>
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
                    ></v-text-field>
                    <div class="text-subtitle-1 text-medium-emphasis">Email</div>
                    <v-text-field
                        density="compact"
                        placeholder="Email address"
                        prepend-inner-icon="mdi-email-outline"
                        variant="outlined"
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
                    ></v-text-field>
                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Confirm password
                    </div>
                    <v-text-field
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'"
                        density="compact"
                        placeholder="Confirm your password"
                        prepend-inner-icon="mdi-lock-outline"
                        variant="outlined"
                        @click:append-inner="visible = !visible"
                    ></v-text-field>
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
                        to="/login"
                    >
                        Sign up 
                    </v-btn>
                </v-card>
            </div>
        </v-container>
    </v-app>
</template>
<script>
export default {
    name: 'LoginView'
}
</script>