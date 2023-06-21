<template>
    <div  style="display: flex;height: 90vh; flex-direction: column;">
        <div class="search"></div>
        <div class="history_record"></div>
        <div class="end"></div>
    </div>
</template>

<script>
export default {
    name: "History",
    component: {},
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style scoped>
.search{
    flex:4;
    background-color: black;
}
.history_record{
    flex: 8;
    background-color:rebeccapurple;
}
.end{
    flex: 1;
    background-color: antiquewhite;
}
</style>