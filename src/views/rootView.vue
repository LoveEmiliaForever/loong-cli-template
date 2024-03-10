<template>
    <div id="root">
        <img src="./assets/images/webpack.jpg">
        <div>{{ settingData }}</div>
        <el-button type="primary" size="default" @click="add"></el-button>
    </div>
</template>

<style>
#root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
    name: 'rootView',
    methods: {
        add () {
            this.$store.commit({
                type: 'changeSettingData',
                data: none
            })
        }
    },
    computed: mapState(['settingData'])
}
</script>
