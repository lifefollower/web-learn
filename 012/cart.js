/*
 * @Description: cart.js
 * @Author: Lynn
 * @Date: 2022-03-28 16:06:05
 * @LastEditors: Lynn
 * @LastEditTime: 2022-03-28 22:07:57
 */
var content = document.querySelector('.content')
bindHtml()

console.log(list)

function bindHtml() {
    var totalPrice = 0,
        totalNum = 0,
        selectNum = 0
    list.forEach(function (item) {
        totalPrice += item.select ? item.price * item.buy_num : 0
        totalNum += item.select ? item.buy_num : 0
        selectNum += item.select ? 1 : 0
    })
    var str = ` 
     <div class="top">
    <input class="select_all" type="checkbox" ${selectNum>=list.length?'checked':''}/>全选</div>
    <ul class="center">
    `
    list.forEach(function (item) {
        str += `
        <li>
          <div class="select">
              <input data-id=${item.id} class="select_one" type="checkbox" ${item.select?'checked':''}>
          </div>
          <div class="pic">
              <img src="${item.pic}" alt="">
          </div>
          <div class="name">
              ${item.name}
          </div>
          <div class="price">
              ￥<span>${(item.price-0).toFixed(2)}</span> 
          </div>
          <div class="number">
              <button data-id=${item.id} class="sub">-</button>
              <input type="text" value="${item.buy_num}">
              <button data-id=${item.id} class="add">+</button>
          </div>
           <div class="subtotal">
              ￥<span>${(item.price*item.buy_num).toFixed(2)}</span>
          </div>
          <div class='del'>
              <button data-id=${item.id} class="del_btn">删除</button>
          </div>
      </li>`
    })
    str += `
    </ul>
    <div class="bottom">
      <p>总购买数量:${totalNum}</p>
      <p>
        <button data-price=${totalPrice} class="pay">去结算</button>
        <button class="clear">清空购物车</button>
        <button class="clear_select">删除所有已选中</button>
        <button class="list">返回列表页</button>
      </p>
      <p>总价格:￥<span>${totalPrice.toFixed(2)}</span></p>
    </div>`
    content.innerHTML = str
}

content.addEventListener('click', function (e) {
    e = e || window.event
    var target = e.target || e.srcElement
    if (target.className === 'select_all') {
        var type = target.checked
        list.forEach(function (item) {
            item.select = type
        })
        bindHtml()
    }
    if (target.className === 'select_one') {
        var id = target.dataset.id - 0
        var goods = list.find(function (item) {
            return item.id === id
        })
        goods.select = !goods.select
        bindHtml()
    }
    if (target.className === 'sub') {
        var id = target.dataset.id - 0
        var goods = list.find(function (item) {
            return item.id === id
        })
        if (goods.buy_num <= 1) return
        goods.buy_num--
        bindHtml()
    }
    if (target.className === 'add') {
        var id = target.dataset.id - 0
        var goods = list.find(function (item) {
            return item.id === id
        })
        if (goods.buy_num >= goods.number) return
        goods.buy_num++
        bindHtml()
    }
    if (target.className === 'del_btn') {
        var id = target.dataset.id - 0
        list = list.filter(function (item) {
            return item.id !== id
        })
        bindHtml()
    }
    if (target.className === 'pay') {
        var price = target.dataset.price - 0
        window.alert(`您需要支付${price.toFixed(2)}元^_^`)
    }
    if (target.className === 'clear') {
        list = []
        bindHtml()
    }
    if (target.className === 'clear_select') {
        list = list.filter(function (item) {
            return item.select === false
        })
        bindHtml()
    }
    if (target.className === 'list') {
        window.location.href = 'https://www.jd.com'
    }
})