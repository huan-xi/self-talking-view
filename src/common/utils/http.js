/**
 * Created by huanxi
 */
import axios from 'axios'

axios.defaults.timeout = 50000
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 此处是增加的代码，设置请求头的类型


export function get (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

