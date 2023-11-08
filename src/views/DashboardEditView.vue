<template>

    <v-app>
        <v-container>
            <h1>Edit</h1>
        </v-container>
    </v-app>
    
</template>

<script>
export default {
    name: 'DashboardCreateView',
    data(){
        return{

        }
    },
    methods: {

    },
    created(){
        console.log(this.$route.params);
    }
}

</script>