/*
 * @Description: game
 * @Author: Lynn
 * @Date: 2022-04-02 22:27:57
 * @LastEditors: Lynn
 * @LastEditTime: 2022-04-03 01:30:50
 */
class Game{
    constructor(select){
        this.food=new Food(select)
        this.snake=new Snake(select)
        this.map=document.querySelector(select)
        this.btn=document.querySelector("#start")
        this.level=5
        this.timer=0
        this.score=0
    }
    start(){
        this.timer=setInterval(()=>{
            this.snake.move()
            if(this.snake.isEat(this.food.x,this.food.y)){
                this.food.changePos()
                this.snake.createOne()
                this.changeScore()
            }
            if(this.snake.isCollisionWall()){
                clearInterval(this.timer)
                this.reStart()
            }
            if(this.snake.isCollisionSelf()){
                clearInterval(this.timer)
                this.reStart()
            }
        },300-this.level*30)
    }
    reStart(){
        this.btn.setAttribute('style','display:flex')
        let child = this.map.lastElementChild;  
        while (child.className!=='food') { 
            this.map.removeChild(child); 
            child = this.map.lastElementChild; 
        }
        this.snake.direction = 'right'
        this.snake.nextDirection='right'  
    }
    changeDirect(type){
        if(type==='left'&&this.snake.nextDirection!=='right'){
            this.snake.direction=type
            this.snake.nextDirection='left'
        }else if(type==='right'&&this.snake.nextDirection!=='left'){
            this.snake.direction=type
            this.snake.nextDirection='right'
        }else if(type==='top'&&this.snake.nextDirection!=='bottom'){
            this.snake.direction=type
            this.snake.nextDirection='top'
        }else if(type==='bottom'&&this.snake.nextDirection!=='top'){
            this.snake.direction=type
            this.snake.nextDirection='bottom'
        }
    }
    changeScore(){
        this.score+=100
        if(this.score>0&&this.score%1000===0){
            this.level++
        }
    }
}