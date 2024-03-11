<template>
    <div id="root">
        <img class="webpack" src="../assets/images/webpack.jpg" alt="一张WebPack的图标" draggable="false">
    </div>
</template>

<style>
#root {
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10vh;
}

.webpack {
    width: 30vw;
    user-select: none;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
    name: 'rootView'
}
</script>
