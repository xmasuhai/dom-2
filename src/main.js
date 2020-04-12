// window.jQuery() // 全局变量可去掉 window.
// jQuery()
// const api = jQuery()
// const api = window.jQuery()

/* test1 增·改 */
// 创建内容然后同时插入到好几个元素里面
$('.inner').append('<p>Test</p>')
// 可以创建内容然后同时插入到好几个元素里面
$('<p>Test2</p>').appendTo('.inner2') //每个新的inner <div> 元素会得到新的内容
// 在页面上选择一个元素然后插在另一个元素里面，被选中的元素被插入到另外一个地方，这是移动而不是复制
$('.container').append($('h2'))
// 如果有多个目标元素，内容将被复制然后按顺序插入到每个目标里面
// 也可以在页面上选择一个元素然后插在另一个选出的元素里面
$('h2').appendTo($('.container'))
/* 
种方式选择的元素被插入到一个DOM中单一的位置的地方
（注：文档中只有一个目标元素），
它将被移动到目标中（不是克隆），并返回一组新的插入后的元素集合
如果有多个目标元素，内容将被复制然后按顺序插入到每个目标里面。
新的集合（原始元素加克隆元素）被返回
 */

/* 
.append()和.appendTo()两种方法功能相同，
主要的不同是语法——内容和目标的位置不同。
对于.append(), 选择表达式在函数的前面，参数是将要插入的内容。
对于.appendTo()刚好相反，内容在方法前面，
无论是一个选择器表达式 或创建作为标记上的标记，它都将被插入到目标容器的末尾
*/


/*
const api = jQuery('.test') // 不返回 元素们，返回 api 对象
api.addClass('red') // 遍历所有刚才获取的元素，添加 .red 样式
api.addClass('green').addClass('blue') // 链式操作
api.addClass('white')
    .addClass('green')
    .addClass('blue') // 链式骚操作
*/
/* 另一个骚操作
 ** 函数 如果用一个 对象 来调用
 ** 那么这个 函数里面的 this 就是 前面那个对象
 ** obj.fn(p1) // 函数里的 this 就是 obj 隐式调用
 ** obj.fn.call(obj, p1)
 **
 ** api.addClass('red') // this 就是 api // return api === return this
 **
 */

// 省略变量名，直接创建匿名的对象 来链式操作
// jQuery('.test').addClass('typeA').addClass('typeB').addClass('typeC')

/* 查 */
/* find */
// const x1 = jQuery('.test1').find('.child')
// console.log(x1)
/* test2 */
// const x2 = jQuery('.test').find('.child')
// console.log(x2)

/* test3 */
// const api1 = jQuery('.test')
// api1.addClass('black')
// const api2 = api1.find('.child').addClass('gray') // 影响同一个elements的引用
// api1.addClass('cyan')
// jQuery('.test').find('.child').addClass('yellow') // 简化

/* test3 */
// const api1 = jQuery('.test')
// const api2 = api1.find('.child').addClass('red').addClass('blue')
// const oldApi = api2.end().addClass('yellow')
// jQuery('.test').find('.child').addClass('red').addClass('blue').end().addClass('yellow')

// /* test4 */
// const xx = jQuery('.test').find('.child')
// xx.each((div) => {
//     console.log(div)
// })
// // xx.parent().print()

/* test5 */
// const y = jQuery('.test')
// y.children().print()

/* test6 */
// const $div = $('<div>1</div>')
// $div.appendTo(document.body)
// const $div = $('<div><span>1</span></div>')
// const $childList = $('.child')
// $('body').append($childList)
$('<div>1</div>').appendTo(document.body)

/* 两次调用 重复 浪费内存 公用属性 */
const api1 = $('.red')
const api2 = $('.blue')