<template>
    <div class="app">
        <!-- <h1>-------------------------项目启动----------------------------------</h1>
        <div class="banner">
            <router-link class="route" v-for="path in routerData" :to="path.path" :key="path.path">{{path.name}}</router-link>
        </div>
        <img src="../public/img/bird.png" alt="">
        <router-view></router-view> -->
        <input type="text" v-model="msg">
        <p>msg: {{msg}}</p>
        <p>computedMsg: {{computedMsg}}</p>
        <button @click="greet">Greet</button>
    </div>

</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Index extends Vue{
    msg = 123;

    mounted(){
        this.greet();
    }

    get computedMsg(){
        return `computed ${this.msg}`
    }

    greet(){
        console.log(`greeting: ${this.msg}`);
    }
}

</script>

// export default {
//     data(){
//         return {
//             routerData: [
//                 {path: '/', name: '默认模块'},
//                 {path: '/A', name: 'A'},
//                 {path: '/B', name: 'B'},
//             ]
//         }
//     }
// }
// </script>
<style lang="less" scoped>
    .app{
        text-align: center;
        h1{
            text-align: center;
        }
        .banner{
            text-align: center;
            .route{
                margin: 0 20px;
                &:link {color: #FF0000}
                &:visited {color: #00FF00}
                &:hover {color: #FF00FF}
            }
        }
    }
</style>