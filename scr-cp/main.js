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
dom.style(test, {border: '1px solid red', color: 'blue'})
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid black')

dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')
console.log(dom.class.has(test,'blue'))

const fn = ()=>{
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)


const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])

console.log(dom.parent(test))

const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n)=> dom.style(n, 'color', 'red'))

console.log(dom.index(s2))