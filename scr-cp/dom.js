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
        dom.before(parent,node)
        dom.append(parent,node)
    },

    /* 删 */
    //删除当前节点 remove()比较新，IE可能不支持，使用removeChild()删除
    remove(node){
        node.parentNode.removeChild(node)
        return node  //删除并 返回节点，需要使用还可以用
    },
    //用于删除 节点的所有儿子
    empty(node){
        // node.innerHTML = ''  //删除之后，就没法使用 要删除的节点了
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
    attr(node,attName,attValue){ //（节点，属性名，属性值） 重载：根据参数不同的数量写代码叫 重载
        if (arguments.length === 3){
            node.setAttribute(attName,attValue)
        }else if(arguments.length === 2){
            return node.getAttribute(attName)
        }
    },
    text(node,str){  //根据参数判断要读 还是要写
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
    },
    html(node,str){     //用于读写HTML内容
        console.log(node)
        if(arguments.length === 2){
            node.innerHTML = str
        }else if(arguments.length ===1){
            return node.innerHTML
        }
    },
    style(node,str){

    }
}
/*
* innerHTML是属性 不是方法
* 什么是重载？ 根据参数数量 进行操作
* 什么是适配？ 适配不同电压、浏览器
* */