<template>
    <BasicFrame>
        <RouterView></RouterView>
    </BasicFrame>
</template>

<style>
* {
    margin: 0;
    padding: 0;
}
</style>

<script>
import BasicFrame from './components/BasicFrame.vue'

export default {
    name: 'App',
    components: {
        BasicFrame
    }
}
</script>
