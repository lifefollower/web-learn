/*
 * @Description: JS
 * @Author: Lynn
 * @Date: 2022-03-30 21:51:01
 * @LastEditors: Lynn
 * @LastEditTime: 2022-03-31 00:13:12
 */

const imgBox=document.querySelector('.imgBox')
const pointBox=document.querySelector('.pointBox')
const banner=document.querySelector('.banner')
const banner_width=banner.clientWidth
let timer=0,index=1,flag=true
setPoint()
/* 创建焦点 */
function setPoint(){
    const pointNum=imgBox.children.length
    for(var i=0;i<pointNum;i++){
        const li=document.createElement('li')
        li.classList.add('point-item')
        li.dataset.point=i
        if(i===0)li.classList.add('active')
        pointBox.appendChild(li)
    }
    pointBox.style.width=(20+10)*pointNum+'px'
}
/* 复制元素 */
copyEle()
function copyEle(){
    const first=imgBox.firstElementChild.cloneNode(true)
    const last=imgBox.lastElementChild.cloneNode(true)
    imgBox.appendChild(first)
    imgBox.insertBefore(last,imgBox.firstElementChild)
    imgBox.style.width=imgBox.children.length*100+'%'
    imgBox.style.left=-banner_width+'px'
}
/* 自动轮播 */
autoPlay()
function autoPlay(){
    timer=setInterval(()=>{
        index++
        move(imgBox,{left:-banner_width*index},moveEnd)
    },2000)
}
/* 运动结束 */
function moveEnd(){
    if(index===imgBox.children.length-1){
        index=1
        imgBox.style.left=-banner_width*index+'px'
    }
    if(index===0){
        index=imgBox.children.length-2
        imgBox.style.left=-banner_width*index+'px'
    }
    for(let i=0;i<pointBox.children.length;i++){
        pointBox.children[i].classList.remove('active')
    }
    pointBox.children[index-1].classList.add('active')
    flag=true
}
/* 移入移出 */
overOut()
function overOut(){
    banner.addEventListener('mouseover',()=>clearInterval(timer))
    banner.addEventListener('mouseout',()=>autoPlay())
}
/* 点击切换 */
change()
function change(){
    banner.addEventListener('click',e=>{
        e=e||window.event
        const target=e.target||e.srcElement
        if(target.className==='left'){
            if(!flag)return
            flag=false
            index--
            move(imgBox,{left:-banner_width*index},moveEnd)
        }
        if(target.className==='right'){
            if(flag===false)return
            index++
            move(imgBox,{left:-banner_width*index},moveEnd)
            flag=false
        }
        if(target.className==='point-item'){
            if(!flag)return
            flag=false
            index=target.dataset.point-0+1
            move(imgBox,{left:-banner_width*index},moveEnd)
        }
    })
}
/* 切换页面 */
changeTab()
function changeTab(){
    document.addEventListener('visibilitychange',()=>{
        if(document.visibilityState==='hidden'){
            clearInterval(timer)
        }else if(document.visibilityState==='visible'){
            autoPlay()
        }
    })
}