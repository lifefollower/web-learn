/*
 * @Description: snake
 * @Author: Lynn
 * @Date: 2022-04-02 21:14:45
 * @LastEditors: Lynn
 * @LastEditTime: 2022-04-03 01:29:37
 */
class Snake {
    constructor(select) {
        this.map = document.querySelector(select)
        this.direction = 'right'
        this.nextDirection='right'
        this.snake = []
        this.createSnake()
        this.move()
    }
    createOne() {
        const head = this.snake[0]
        const pos ={
            left:20,
            top:20
        }
        if (head) {
            switch (this.direction) {
                case 'right':
                    pos.left = head.offsetLeft + 20
                    pos.top = head.offsetTop
                    break
                case 'left':
                    pos.left = head.offsetLeft - 20
                    pos.top = head.offsetTop
                    break
                case 'top':
                    pos.left = head.offsetLeft
                    pos.top = head.offsetTop - 20
                    break
                case 'bottom':
                    pos.left = head.offsetLeft
                    pos.top = head.offsetTop + 20
                    break
            }
        }
        const div = document.createElement('div')
        div.className = 'head'
        div.style.left = pos.left + 'px'
        div.style.top = pos.top + 'px'
        this.map.appendChild(div)
        this.snake.unshift(div)
        if (head) head.className = 'body'
    }
    createSnake() {
        for (let i = 0; i < 5; i++) {
            this.createOne()
        }
    }
    move() {
        const body = this.snake.pop()
        body.remove()
        this.createOne()
        this.nextDirection=this.direction
    }
    isEat(foodX, foodY) {
        const head = this.snake[0]
        const x = head.offsetLeft
        const y = head.offsetTop
        if (x === foodX && y === foodY){
            return true
        }else{
            return false
        }
    }
    isCollisionWall(){
        const head=this.snake[0]
        const x=head.offsetLeft
        const y=head.offsetTop
        if(x<0||y<0||x>=this.map.clientWidth||y>=this.map.clientHeight){
            return true
        }else{
            return false
        }
    }
    isCollisionSelf(){
        const head=this.snake[0]
        const x=head.offsetLeft
        const y=head.offsetTop
        for(let i=1;i<this.snake.length;i++){
            const body=this.snake[i]
            const bx=body.offsetLeft
            const by=body.offsetTop
            if(x===bx&&y===by){
                return true
                break
            }
        }
        return false
    }    
}