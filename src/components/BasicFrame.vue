<template>
    <div id="BasicFrame">
        <header>
            Loong-Cli 模板工具
        </header>
        <main id="context">
            <slot></slot>
        </main>
        <footer>
            <div>作者：<a href="https://github.com/LoveEmiliaForever" target="_blank">GitHub:LoveEmiliaForever</a></div>
            <div>项目仓库：<a href="https://github.com/LoveEmiliaForever/loong-cli" target="_blank">LoveEmiliaForever/loong-cli</a></div>
            <div>模板仓库：<a href="https://github.com/LoveEmiliaForever/loong-cli-template" target="_blank">LoveEmiliaForever/loong-cli-template</a></div>
        </footer>
    </div>
</template>

<style>
#BasicFrame {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
#BasicFrame header{
    height: 10vh;
}
#BasicFrame footer{
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
/* 隐藏 IE、Edge 和 Firefox 的滚动条 */
#context{
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
/* 隐藏 Chrome、Safari 和 Opera 的滚动条 */
#context::-webkit-scrollbar{
    display: none;
}
</style>

<script>
export default {
    name: 'BasicFrame'
}
</script>
