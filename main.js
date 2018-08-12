window.jQuery = function(nodeOrSelector){
    let nodes = {}
    nodes.addClass = function(){}
    nodes.html = function(){}
    return nodes
}
window.$ = window.jQuery

window.jQuery.ajax = function( {url,method,body,successFn,failFn,headers}){//给参数命名
    /* let url = options.url
    let method = options.method
    let body = options.body
    let successFn = options.successFn
    let failFn = options.failFn
    let headers = options.headers */

    // ES6 析构赋值
    //let {url,method,body,successFn,failFn,headers} = options
    // 将method,body,successFn,failFn,headers 的值分别拿到这 5 个变量里面，只要名字一样，就将值拿过来

    let request = new XMLHttpRequest() 
    request.open(method,url) //配置 request
    for(let key in headers) {
        let value = headers[key]
        request.setRequestHeader(key,value)
    }//遍历用 for..in..
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            if(request.status >= 200 && request.status < 300){
                successFn.call(undefined, request.responseText)
                }else if(request.status >= 400){
                failFn.call(undefined, request) 
            }
        }
    }
    request.send(body)
}

function f1(responseText){}
function f2(responseText){}
//如果响应成功以后想要执行两个函数，该如何传参？
 //把两个函数放在一个函数里面 

myButton.addEventListener('click',(e)=>{
    window.jQuery.ajax({
            url: '/xxx',
            method:'get',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'frank':'18'
            },
            successFn: (x)=>{
                f1.call(undefined,x)
                f2.call(undefined,x)
            },
            failFn: (x)=>{
                console.log(x)
                console.log(x.status)
            } 
        })      
}) 






/* myButton.addEventListener('click',(e)=>{
    let request = new XMLHttpRequest() //声明一个XMLHttpRequest 对象
    request.open('post','/xxx') //配置 request  第一部分
    request.setRequestHeader('frank', '18');//字符串  第二部分
    request.setRequestHeader('Content-Type','x-www-from-urlencoded')// 第二部分
    request.send("偏要设置第四部分")//发送  第四部分
    request.onreadystatechange = ()=>{// 状态改变
        if(request.readyState === 4){// 等于4 说明响应下载完毕了 不管是否成功
            console.log('请求响应都完毕了')
            if(request.status >= 200 && request.status < 300){
                console.log('说明请求成功')
                console.log(typeof request.responseText)
                console.log(request.getAllResponseHeaders())
                let string = request.responseText
                //把符合 JSON 语法的字符串
                //转换成 JS 对应的值
                let object = window.JSON.parse(string)
                //JSON.parse 是浏览器提供的
                //json3.js  
                console.log(typeof object)
                console.log(object)
                console.log('object.note')
                console.log(object.note)

                }else if(request.status >= 400){
                console.log('说明请求失败')
            }
        }
    }
    
}) */