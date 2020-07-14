/**
 * @author  huanxi
 * @date  2020/5/16 8:03 下午
 * @email 1355473748@qq.com
 */
import {get} from './utils/http'


export let getMessageList = (params) => get('/api/message/list', params) // 获取认证跳转地址
export let addMessage = (content) => get('/api/message/add?content=' + content, [])
export let deleteMessage = (id) => get('/api/message/delete?id=' + id, [])
export let updateMessage = (id, content) => get('/api/message/update?id=' + id + "&content=" + content, []);
export let isLogin = () => get('/api/user/login', []);
export let info = () => get('/api/user/info', []);
export let logout = () => get('/api/user/logout', []);
export let login = (username, password) => get('/api/user/login?username=' + username + "&password=" + password, []);

