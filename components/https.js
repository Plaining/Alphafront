import axios from 'axios';

let baseURL = '/';
// baseURL = 'http://smallcookie.cn:8000/stock'
// if(process.env.NODE_ENV=='development'){
//     baseURL = 'http://223.104.212.22:8000/api'
// }else{
//     baseURL = '/'
// }
//baseURL es6 方法

const $http = axios.create({
    baseURL,
})

export const get = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        $http.get(url,{
            params,
        },{timeout: 10000000000 * 60 * 2}).then(res=>{
             resolve(res.data);
        }).catch(error=>{
            handleError(error);
            alert(error.response);
        })
    })
}

export const post = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        $http.post(url,params,{timeout: 10000000 * 60 * 2}).then(res=>{
            resolve(res.data);
        }).catch(error=>{
            alert('internet error');
        })
    })
}