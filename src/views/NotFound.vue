<template>
    <div id="nf-background">
        <h1 class="text-white text-center py-5 px-1">Hmm....We can't find that page!
            <div class="my-2">
                <button type="button" class="btn btn-outline-light" id="go-home-btn" @click="handleHomeClick">Go Home</button>
            </div>
        </h1>
    </div>
</template>

<script>import { useRouter } from "vue-router"


    export default {
    name: "NotFound",
    setup(){
        const router = useRouter();

        const handleHomeClick = () => {
            router.push('/')
        }

        return {
            handleHomeClick
        }
    }
}
</script>

<style scoped>

    #go-home-btn:hover {
        background-color: #0d6efd !important;
        color: white;
    }

    #nf-background {
        background-image: url('~@/assets/lines.jpg');
        height: 100%;
        width: auto;
        background-repeat: no-repeat;
        background-size: cover;
    }

    @media screen and (min-width: 768px){
        #nf-background {
            background-image: url('~@/assets/404-xl.jpeg');
        }
    }
</style>