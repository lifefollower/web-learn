/*
 * @Description: 随机数
 * @Author: Lynn
 * @Date: 2022-04-02 21:04:49
 * @LastEditors: Lynn
 * @LastEditTime: 2022-04-02 21:09:45
 */
const randomNum=(a=255,b=0)=>Math.floor(Math.random()*(Math.abs(a-b+1)))+Math.min(a,b)