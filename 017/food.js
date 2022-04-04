/*
 * @Description: food
 * @Author: Lynn
 * @Date: 2022-04-02 20:43:15
 * @LastEditors: Lynn
 * @LastEditTime: 2022-04-02 21:14:34
 */
class Food{
    constructor(select){
        this.map=document.querySelector(select)
        this.food=document.createElement('div')
        this.food.className='food'
        this.map.appendChild(this.food)

        this.x=0
        this.y=0

        this.changePos()
    }
    changePos(){
        const map_w=this.map.clientWidth
        const map_h=this.map.clientHeight
        const row_num=map_w/20-1
        const col_num=map_h/20-1
        const pos_x=randomNum(row_num)
        const pos_y=randomNum(col_num)
        this.x=pos_x*20
        this.y=pos_y*20
        this.food.style.left=this.x+'px'
        this.food.style.top=this.y+'px'
    }       
}