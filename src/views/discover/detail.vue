<template>
    <div>detail{{ id }}</div>
</template>
<script>

export default {
    name:'detail',
    data(){
        return{
            id:""    
        }
    },
    created(){
       console.log(this.$route.params)
       this.id = this.$route.params 
    }
}
</script>