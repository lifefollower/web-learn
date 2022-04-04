/*
 * @Description: 渐隐渐现
 * @Author: Lynn
 * @Date: 2022-04-01 23:47:21
 * @LastEditors: Lynn
 * @LastEditTime: 2022-04-02 13:34:38
 */
class Banner {
    constructor(select) {
        this.ele = document.querySelector(select)
        this.imgBox = this.ele.querySelector('.imgBox')
        this.pointBox = this.ele.querySelector('.pointBox')
        this.index = 0
        this.init()
    }
    init() {
        this.setPoint()
        this.autoPlay()
        this.overOut()
        this.bindEvent()
    }
    setPoint() {
        const n = this.imgBox.children.length
        for (let i = 0; i < n; i++) {
            const li = document.createElement('li')
            if (i === 0) li.classList.add('active')
            li.classList.add('point')
            li.dataset.point = i
            this.pointBox.appendChild(li)
        }
        this.pointBox.style.width = (20 + 10) * n + 'px'
    }
    changeOne(type) {
        this.imgBox.children[this.index].classList.remove('active')
        this.pointBox.children[this.index].classList.remove('active')
        if (type === true) {
            this.index++
        } else if (type === false) {
            this.index--
        } else {
            this.index = type
        }
        if (this.index >= this.imgBox.children.length) this.index = 0
        if (this.index < 0) this.index = this.imgBox.children.length - 1
        this.imgBox.children[this.index].classList.add('active')
        this.pointBox.children[this.index].classList.add('active')
    }
    autoPlay() {
        this.timer = setInterval(() => this.changeOne(true), 1500)
    }
    overOut() {
        this.ele.addEventListener('mouseover', () => clearInterval(this.timer))
        this.ele.addEventListener('mouseout', () => this.autoPlay())
    }
    bindEvent() {
        this.ele.addEventListener('click', e => {
            e = e || window.event
            const target = e.target || e.srcElement
            if (target.className === 'left') {
                this.changeOne(false)
            } else if (target.className === 'right') {
                this.changeOne(true)
            } else {
                target.className === 'point'
                this.changeOne(target.dataset.point - 0)
            }
        })
    }
}