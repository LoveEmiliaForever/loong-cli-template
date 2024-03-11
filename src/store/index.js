import { createStore } from 'vuex'
import { ElNotification } from 'element-plus'

export default createStore({
    state: {
        errorReport (result) {
            if (result.response) {
                ElNotification({
                duration: 1500,
                title: '错误',
                message: result.response.data.error,
                position: 'bottom-right',
                type: 'error'
                })
            } else {
                ElNotification({
                duration: 1500,
                title: '未知错误',
                message: '出现未知错误',
                position: 'bottom-right',
                type: 'error'
                })
            }
        }
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
