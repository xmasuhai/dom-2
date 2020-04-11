// window.jQuery() // 全局变量可去掉 window.
// jQuery()
// const api = jQuery()
// const api = window.jQuery()

/* test1 */
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
const y = jQuery('.test')
y.children().print()