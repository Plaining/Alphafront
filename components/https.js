import axios from 'axios';

let baseURL = '/';
// if(process.env.NODE_ENV=='development'){
//     baseURL = 'http://132.232.94.151:3000/api'
// }else{
//     baseURL = '/'
// }
// baseURL es6 方法

const $http = axios.create({
    baseURL,
})

export const get = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        $http.get(url,{
            params,
        },{timeout: 10000000 * 60 * 2}).then(res=>{
            resolve(res.data);
            resolve(res.data.Astockdata.Close)
        }).catch(error=>{
            alert('internet error');
        })
    })
}

export const post = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        $http.post(url,params).then(res=>{
            resolve(res.data);
        }).catch(error=>{
            alert('internet error');
        })
    })
}