window.jQuery = function (selectorOrArray) {
    // this.console.log('我是jQuery')
    // 核心代码 接受一个选择器；
    // 根据选择器得到 一些元素；
    // 返回一个对象 这个对象 上有个方法 可以操作 这些元素

    /* 重载判断
     ** selectorOrArray不仅接受选择器 还有数组
     */
    let elements // 作用域的提升  用const声明的的时候必须直接赋值且不能再改
    if (typeof selectorOrArray === 'string') {
        // const elements = document.querySelectorAll(selectorOrArray)
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        // const elements = selectorOrArray // 作用域的提升
        elements = selectorOrArray
    }
    // 用const防止引用被修改
    // return elements // 不返回此对象
    // 而是返回一个 API 可以操作 elements
    /*
    const api_test = {
            //ES6
            doSth() {
                console.log(elements) // 闭包：函数访问外部 变量
            },
            // ES5
            "doOther": function () {
                console.log(elements)
            }
        }
    */
    /*
    const api = {
        addClass(className) {
            // 遍历所有刚才获取的elements 元素，添加 .className 样式
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this // api
        }
    }
        return api // 这里的 this 是 window // window.jQuery
        // api 的名字其实没有必要 直接返回对象
     */
    // api 的名字没有必要 直接返回对象本身
    // api 对象通常可以在外部的环境中 创建
    // JQ的核心思想
    // 提供一个函数 这个函数接收一个CSS选择器
    // 通过选择器，获取到一些元素 但并不返回元素
    // 而是返回一个对象 这个对象里包含一些方法（函数）
    // 这些方法（函数）去操作获取到的元素
    // 即用闭包维持 函数外的变量 防止被回收机制删除
    // 创建的JQ对象 api 作为返回值 从前面传递到后面 来链式调用
    // 调用后 才知道 this 的具体指向
    // 直接创建匿名的对象 进行链式操作 声明一个对象紧接再调用它 且只用到一次 省略变量名
    // 省略中间过程 留下最简练代码
    return {
        find(selector) {
            let arr = []
            for (let i = 0; i < elements.length; i++) {
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                arr = arr.concat(elements2)
            }
            // elements = arr // 当在改变elements的时候，会影响之前所有保留api对象的引用
            // return this // 返回的是数组 无法进行链式调用
            // return newApi // 不能用原来的api对象 需要更新 api引用
            //
            // const newApi = jQuery(arr) //不能用原来的api对象，需要用jQuery构造一个新的api
            // return newApi
            arr.oldApi = this // this是旧的api // oldApi是否只放到数组上 而未放到api上
            return jQuery(arr)
        },
        each(fn) { // 遍历当前所有元素 即forEach()方法
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this // this就是这个被省略掉的、匿名的api
        },
        print() {
            console.log(elements) // elements就是对应的元素们
        },
        parent() {
            const array = []
            /* this 就是当前这个被省略掉的api */
            this.each((node) => {
                /* 不重复同样的节点 */
                // if (array.indexOf(node.parentNode) >= 0) // 第0个 或 第一个 有就不push
                if (array.indexOf(node.parentNode) === -1) { // 第0个 或 第一个 有就不push
                    array.push(node.parentNode) // 没有才push
                }
            })
            return jQuery(array)
        },
        children() {
            const array = []
            /* this 就是当前这个被省略掉的api */
            this.each((node) => { // 遍历 每次 对于每个元素 获取子节点 把不同的放入数组
                // array.push(node.children) // 没有把数组摊平 有不同结构
                array.push(...node.children) // 展开操作符... 拆开所有元素 并且合并为一个数组
                // 等价于 array.push(node.children[0], node.children[1],...[2]...)
            })
            return jQuery(array)
        },
        addClass(className) {
            /* 遍历所有刚才获取的elements 元素，添加 .className 样式 */
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this
        },
        oldApi: selectorOrArray.oldApi, // 将oldApi属性加到selectorOrArray上
        end() {
            return this.oldApi // this是新的api2
        }
    }
}

window.jQuery2 = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    return {
        addClass(className) {
            this.each((node) => {
                node.classList.add(className)
            })
            return this
        },
        find(selector) {
            let arr = []
            this.each((node) => {
                const elements2 = Array.from(node.querySelectorAll(selector))
                arr = arr.concat(elements2)
            })
            arr.oldApi = this // this是旧的api // oldApi是否只放到数组上 而未放到api上
            return jQuery(arr)
        },
        each(fn) {
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this
        }
    }
}

window.jQuery3 = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    return {
        addClass(className) {
            this.each(n => n.classList.add(className))
        },
        find(selector) {
            let array = []
            this.each(n => {
                array.push(...n.querySelectorAll(selector))
            })
            return jQuery(array)
        },
        each(fn) {
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
        }
    }
}

window.$ = window.jQuery3

$('#test').find('.child').addClass('red') // 请确保这句话成功执行