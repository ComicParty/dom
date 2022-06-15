window.dom ={
    /* 增 */
    //create的思路 〉(都是在js中创建和写，并没有添加到真实HTML页面中)创建一个容器，把 html内容写进去，再返回 html内容。
    create(str){
        const container = document.createElement("template")
        // template有两个特性：
        // 1.它是新元素专门用来 放标签的，不会在网页上面显示
        // 2.template里面的元素 无法直接通过 container.children[0] 来获取，应用container.content.firstChild

        container.innerHTML = str.trim() //也是因为container.content.firstChild不够智能，在str ='         <p></p>'的情况下，得到的会是文本节点 空格
        return container.content.firstChild //意味着str='<p></p> <p></p>'第二个p是得不到的
    },
    //dom没有直接在一个节点的 后面插入节点的方法（ChildNode.after() 是后来提供，且兼容不好）
    after(newNode,existingNode){
        existingNode.parentNode.insertBefore(newNode,existingNode.nextSibling) // 在已经存在的节点(existing)的 后面的节点(existing.nextSibling) 前面插入（insertBefore） 新节点(newNode)
    },
    //在一个节点前面插入 新的节点
    before(newNode,existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode)
    },
    //给 节点加 儿子
    append(parent,node){
        parent.appendChild(node)
    },
    //给一个节点加父节点
    wrap(node,parent){
        dom.before(parent,node)//把父节点放在 existingNode的前面
        dom.append(parent,node)//父节点 使用 appendChild 把existingNode放进 父节点里面。
    },
    /* 删 */
    //删除当前节点 remove()比较新，IE可能不支持，使用removeChild()删除
    remove(node){
        node.parentNode.removeChild(node)
        return node  //删除并 返回节点，需要使用还可以用
    },
    //用于删除 节点的所有儿子
    empty(node){
        // node.innerHTML = ''  //直接干掉
        const {childNodes} = node   //ES6语法
        //const childNodes = node.childNodes
        const arr = []
        //当对节点进行增、删 操作时 childNodes.length  是一直在改变的，so在for循环时，不可以用它
        let x =node.firstChild
        while (x){
            arr.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return arr
    },
    // 改
    attr(existingNode,attrName,attrValue){//（节点，属性名，属性值） 重载：根据参数不同的数量写代码叫 重载
        if (arguments.length ===3 ){
            existingNode.setAttribute(attrName,attrValue)
        }else if(arguments.length === 2){
            return existingNode.getAttribute(attrName)
        }
    },
    text(node,str){  //根据参数判断要读 还是要写 文本内容
        if(arguments.length === 2){
            if('innerText' in node){   //这种写法叫 适配  //电源适配器 根据不同的电压（110、220），转换成自己需要的
                node.innerText = str  //IE
            }else{
                node.textContent = str  //Firefox /Chrome
            }
        }else if(arguments.length === 1){
            if('innerText' in node){
                return node.innerText
            }else{
                return node.textContent
            }
        }
    }, //重载-适用 接受的参数；适配-用于目标对象 如浏览器等等；两种不同的对象，两个的本质是一样的
    html(node,str){     //用于读、写HTML内容
        console.log(node)
        if(arguments.length === 2){
            node.innerHTML = str
        }else if(arguments.length ===1){
            return node.innerHTML
        }
    },
    style(node,name,value){
        // for (let objKey in obj) {  //for...in...循环 对象
        //     //key: border/ color/ background...
        //     //node.style.border = ...
        //     //node.style.color = ...
        //     node.style[objKey] = obj[objKey]
        // }
        if(arguments.length === 3){
            node.style[name] = value
        }else if(arguments.length === 2) {
            if (typeof name === "string") {
                return node.style[name]
            } else if (name instanceof Object) {
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class:{ //class对象 existing.class.add(existing,className)
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className) {
            node.classList.remove(className)
        },
        has(node,className){
            return node.classList.contains(className)
        }
    },
    //事件
    //添加监听事件
    on(node,eventName,fn){ //fn事件处理函数
        node.addEventListener(eventName,fn)
    },
    //移除监听事件
    off(node,eventName,fn){
        node.removeEventListener.off(node,)
    },
    find(selector,scope){ //在指定范围内查找 标签
        return (scope || document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter((n) => n != node)
    },
    next(node){
        let x = node.nextSibling  //node节点里面 有文本节点
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while(x && x.nodeType === 3){  //x存在，且x不为文本节点
            x = x.previousSibling
        }
        return x
    },
    each(nodeList,fn){  //用于遍历 所有节点 ,可以传入函数 操作
        for(let i= 0;i< nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        const list = dom.children(node.parentNode)
        let i
        for(i= 0 ;i<list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }
}
/*
* innerHTML是属性 不是方法
* 什么是重载？ 根据参数数量 进行操作——别人给我我
* 什么是适配？ 适配不同电压、浏览器——我要面对的
* */

