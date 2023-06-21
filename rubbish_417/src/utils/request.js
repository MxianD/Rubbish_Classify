import axios from "axios";
const request = axios.create({
    baseURL:'/api',//全局统一加上'http://localhost:9090'前缀(因为我在vite.config.js之中做好了配置，所以这里的baseURL直接替换为'/api')
    timeout: 5000,
})

//request拦截器
//可以自请求发送前对请求做一些处理
//比如同一加token，对请求参数同一加密
request.interceptors.request.use(config=>{
    return config
},error => {
    return Promise.reject(error);
    }
)
//response拦截器
//可以在接口相应后统一处理结果
request.interceptors.response.use(
    response=>{
        let res = response.data;
    //    如果是返回的文件
        if(response.config.responseType === 'blob'){
            return res;
        }
    //    兼容服务端返回的字符串数据
        if(typeof res === 'string'){
            res = res?JSON.parse(res):res
        }
        return res;
    },
    error => {
        console.log('err'+error)//for debug
        return Promise.reject(error)
    }
)

export default request