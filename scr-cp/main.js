const div = dom.create('<tr><td>hi</td></tr>')
console.log(div)

//删
let em = window.empty
console.log(em)
let rmEm = dom.empty(em)
console.log(rmEm)

//改
//改属性值
dom.attr(test,'title','Hi, I am LYS')
//读 属性值
const title = dom.attr(test,"title")
console.log(`title:${title}`)       //ES6语法
//改 文本内容
dom.text(test,"你好这里是新内容")
dom.html(test,'3')
//改 样式
dom.style(test,{border:'1px solid red',color:'red'})