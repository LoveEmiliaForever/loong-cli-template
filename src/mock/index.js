import Mock from 'mockjs'

function pass (params) {
    return params
}

Mock.mock('/example', 'post', () => {
    pass('pass')
})

Mock.mock(/\/example\?.*/, 'get', () => {
    return {}
})
