/*
 * @Description: 运动函数
 * @Author: Lynn
 * @Date: 2022-03-30 22:22:53
 * @LastEditors: Lynn
 * @LastEditTime: 2022-03-31 00:14:09
 */
function move(ele, target,jingnan) {
    let count=0
    for (let k in target) {
        count++
        const timer = setInterval(() => {
            let current
            if (k === 'opacity') {
                current = window.getComputedStyle(ele)[k] * 100
            } else {
                current = parseInt(window.getComputedStyle(ele)[k])
            }
            let distance = (target[k] - current) / 10
            distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
            if (current === target[k]) {
                clearInterval(timer)
                count--
                if(count===0)jingnan()
            } else {
                if (k === 'opacity') {
                    ele.style[k] = (current + distance) / 100
                } else {
                    ele.style[k] = current + distance + 'px'
                }
            }
        }, 10)
    }
}