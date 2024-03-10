import Mock from 'mockjs'

function pass (params) {
    return params
}

Mock.mock('/example', 'post', () => {
    return {}
})

Mock.mock(/\/example\?.*/, 'get', () => {
    return {}
})
