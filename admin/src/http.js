import Vue from "vue"
import router from "./router"

var axios = require("axios");

let backEndUrl;
switch (process.env.NODE_ENV) {
    case "development":
        backEndUrl = "http://localhost:3000/admin/api" 
        break;
    case "production":
        backEndUrl = "http://119.23.240.115:3000/admin/api" 
        break;
    default:
        backEndUrl = "http://localhost:3000/admin/api" 
        break;
}
const http = axios.create({
    baseURL: backEndUrl
})

// 设置拦截器
http.interceptors.response.use(res => {
    return res;
}, err => {
    Vue.prototype.$message({
        type: "error",
        message: err.response.data.message, 
    })
    if (err.response.data.status === 401) {
        router.push("/login");
    }
    return Promise.reject(err);
});

// 请求头上加入token 
http.interceptors.request.use(function (config) {
    config.headers.Authorization = "Bearer " + localStorage.token;
    return config;
}, function (err) {
    return Promise.reject(err);
})

export default http
// module.exports = {http}