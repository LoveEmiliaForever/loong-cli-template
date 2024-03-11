<template>
    <div id="basic-frame">
        <header>
            Loong-Cli 前端脚手架
        </header>
        <main id="context">
            <slot></slot>
        </main>
        <footer>
            <div>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href="https://github.com/LoveEmiliaForever" target="_blank">作者：GitHub:LoveEmiliaForever</a></div>
            <div><a href="https://github.com/LoveEmiliaForever/loong-cli-template" target="_blank">模板：LoveEmiliaForever/loong-cli-template</a></div>
            <div><a href="https://github.com/LoveEmiliaForever/loong-cli" target="_blank">项目：LoveEmiliaForever/loong-cli</a></div>
        </footer>
    </div>
</template>

<style>
#basic-frame {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

#basic-frame header{
    height: 20vh;
    line-height: 20vh;
    font-size: 2.5vw;
    font-weight: 900;
    user-select: none;
}

#basic-frame footer{
    width: 70vw;
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: rgb(13 84 112);
    user-select: none;
}

#basic-frame a:link, #basic-frame a:visited {
    text-decoration: underline;
    color: rgb(51, 125, 148);
}

#basic-frame a:hover {
    text-decoration: none;
    color: rgb(36, 166, 206);
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
