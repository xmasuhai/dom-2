window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    /* 创建节点的函数 */
    function createElement(string) {
        const container = document.createElement("template")
        container.innerHTML = string.trim()
        return container.content.firstChild
    }
    /* 内部操作的对象elements 负责接受存储 selectorOrArrayOrTemplate 的不同形式 即重载 */
    let elements
    /* 字符串形式 1.创建标签，以左箭头开始 代表标签名的字符串 2. 选择器语法来查找标签（元素） 以包含各种选择器符号或开头（# . > [] ）  */
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            // 创建 div 以传入的标签字符串 作为数组的第一项 赋值给 elements
            elements = [createElement(selectorOrArrayOrTemplate)]
        } else {
            // 查找 div， 以选到的节点赋值给 elements
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        /* 以数组形式 遍历存储 选出符合条件的节点 在接口中 返回 jQuery(array) */
        elements = selectorOrArrayOrTemplate
    }
    /* 创建一个对象 这个对象的 __proto__ 为括号里面的东西 */
    const api = Object.create(jQuery.prototype)
    /* 相当于 */
    // const api = {__proto__: jQuery.prototype}

    /* 返回 api 非共用属性 */
    // return {
    //     elements: elements, // 非共用属性 操作的elements 是不同的
    //     oldApi: selectorOrArrayOrTemplate.oldApi,
    //     /* 不推荐的写法 */
    //     __proto__ = jQuery.prototype
    // }
    api.elements = elements
    api.oldApi = selectorOrArrayOrTemplate.oldApi
    return api
}

/*  用来操作elements */
jQuery.prototype = {
    constructor: jQuery,
    jquery: true, // 共用属性
    /* 读取下标 */
    get(index) {
        return elements[index]
    },
    /* 将匹配的元素插入到目标元素的最后面（内部插入） */
    appendTo(node) {
        /* 符合的元素们会被插入到由参数指定的目标的末尾 */
        if (node instanceof Element) {
            // 遍历 elements，对每个 el 进行 node.appendChild 操作
            this.each(el => node.appendChild(el))
        } else if (node.jquery === true) {
            // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
            this.each(el => node.get(0).appendChild(el))
        }
    },
    /* 在每个匹配元素里面的末尾处插入参数内容 */
    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children)
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i])
            }
        } else if (children.jquery === true) {
            children.each(node => this.get(0).appendChild(node))
        }
    },
    find(selector) {
        let arr = []
        this.each(n => {
            array.push(...n.querySelectorAll(selector))
        })
        arr.oldApi = this
        return jQuery(arr)
    },
    parent() {
        const array = []
        this.each(n => {
            if (array.indexOf(n.parentNode) === -1) {
                array.push(n.parentNode)
            }
        })
        return jQuery(array)
    },
    children() {
        const array = []
        this.each(n => {
            array.push(...n.children)
        })
        return jQuery(array)
    },
    addClass(className) {
        this.each(n => n.classList.add(className))
        return this
    },
    end() {
        return this.oldApi
    },
    each(fn) {
        for (let i = 0; i < elements.length; i++) {
            fn.call(null, elements[i], i)
        }
        return this
    },
    print() {
        console.log(elements)
    }
}