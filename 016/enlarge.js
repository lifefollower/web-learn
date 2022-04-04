/*
 * @Description: 放大镜的构造函数
 * @Author: Lynn
 * @Date: 2022-04-01 16:28:31
 * @LastEditors: Lynn
 * @LastEditTime: 2022-04-01 19:24:09
 */
function Enlarge(select) {
    this.ele = document.querySelector(select)
    this.show = this.ele.querySelector('.show')
    this.mask = this.ele.querySelector('.mask')
    this.list = this.ele.querySelector('.list')
    this.enlarge = this.ele.querySelector('.enlarge')
    this.show_width = this.show.offsetWidth
    this.show_height = this.show.offsetHeight
    this.mask_width = parseInt(window.getComputedStyle(this.mask).width)
    this.mask_height = parseInt(window.getComputedStyle(this.mask).height)
    this.bg_width = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
    this.bg_height = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
}
Enlarge.prototype.init = function () {
    this.setScale()
    this.overOut()
    this.overOut()
    this.changeList()
    this.move()
}
Enlarge.prototype.setScale = function () {
    this.enlarge_width = this.bg_width * this.mask_width / this.show_width
    this.enlarge_height = this.bg_height * this.mask_height / this.show_height
    this.enlarge.style.width = this.enlarge_width + 'px'
    this.enlarge.style.height = this.enlarge_height + 'px'
}
Enlarge.prototype.overOut = function () {
    this.show.addEventListener('mouseover', () => {
        this.mask.style.display = 'block'
        this.enlarge.style.display = 'block'
    })
    this.show.addEventListener('mouseout', () => {
        this.mask.style.display = 'none'
        this.enlarge.style.display = 'none'
    })
}
Enlarge.prototype.changeList = function () {
    this.list.addEventListener('click', e => {
        e = e || window.event
        const target = e.target || e.srcElement
        if (target.nodeName === 'IMG') {
            const show_url = target.dataset.show
            const enlarge_url = target.dataset.enlarge
            console.log(show_url, enlarge_url)
            this.show.firstElementChild.src = show_url
            this.enlarge.style.backgroundImage = `url(${enlarge_url})`
            for (let i = 0; i < this.list.children.length; i++) {
                this.list.children[i].classList.remove('active');
            }
            target.parentElement.classList.add('active')
        }
    })
}
Enlarge.prototype.move = function () {
    this.show.addEventListener('mousemove', e => {
        e = e || window.event
        let x = e.offsetX - this.mask_width / 2
        let y = e.offsetY - this.mask_height / 2
        if (x <= 0) x = 0
        if (y <= 0) y = 0
        if (x >= this.show_width - this.mask_width) x = this.show_width - this.mask_width
        if (y >= this.show_height - this.mask_height) y = this.show_height - this.mask_height
        this.mask.style.left = x + 'px'
        this.mask.style.top = y + 'px'
        const bgx = x * this.enlarge_width / this.mask_width
        const bgy = y * this.enlarge_height / this.mask_height
        this.enlarge.style.backgroundPosition = `-${bgx}px -${bgy}px`
    })
}