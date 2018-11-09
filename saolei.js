class Item {
    constructor(x,y){
        this.x = x
        this.y = y
        this.islei = undefined
        this.zhouwei = undefined
        this.show = false
    }
}

class Game {
    constructor (size, level) {
        this.size = size
        this.level = level
    }

    setqipan (num) {
        let qipan = []
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                qipan.push(new Item(i, j))
            }
        }
        this.game = qipan
    }
    setLei (num) {
        if(num > this.game.length) {
            throw '雷数溢出'
        }
        let temp = [...this.game]
        for (let i = 0; i < num; i++) {
            let suiji = Math.floor(Math.random() * (temp.length - i))
            temp[suiji].islei = true
            temp = temp.slice(0, suiji).concat(temp.slice(suiji + 1))
        }
    }
    findzhouwei (item) {
        let arr = []
        this.game.forEach(e => {
            if (Math.abs(e.x - item.x) <= 1 && Math.abs(e.y - item.y) <= 1 && e != item) {
                arr.push(e)
            }
        })
        return arr
    }
    setzhouwei () {
        this.game.forEach(e => {
            this.game.forEach(e2 => {
                if (Math.abs(e2.x - e.x) <= 1 && Math.abs(e2.y - e.y) <= 1 && e2 != e && e2.islei) {
                    if (e.zhouwei) {
                        e.zhouwei++
                    } else {
                        e.zhouwei = 1
                    }
                }
            })
        })
    }
    clickitem (item) {
        item.show = true
        if (item.islei) {
            this.game.forEach(e => e.show = e.islei ? true : e.show)
        } else if (item.zhouwei) {
            item.show = true
        } else {
            let zhouwei = this.findzhouwei(item)
            zhouwei.forEach(e => !e.show && this.clickitem(e))
        }
    }
    click (x, y) {
        let item = this.game.filter(e => e.x == x && e.y == y)[0]
        if (!item) {
            throw '该点不存在'
        }
        this.clickitem(item)
        this.show()
    }
    show () {
        let str = '\n'
        this.game.forEach((e,i) => {
            if (!e.show) {
                str += ('0' + ',')
            } else {
                str += ((e.islei ? '+' : (e.zhouwei ? e.zhouwei : '-') )+ ',')
            }
            if ((i+1) % this.size == 0 && i != 1) {
                str += '\n'
            }
        })
        console.log(str)
    }
    showall () {
        let str = '\n'
        this.game.forEach((e,i) => {
            str += ((e.islei ? '+' : (e.zhouwei ? e.zhouwei : '-') )+ ',')
            if ((i+1) % this.size == 0 && i != 1) {
                str += '\n'
            }
        })
        console.log(str)
    }
    init () {
        this.setqipan(this.size)
        this.setLei(this.level)
        this.setzhouwei()
        this.show()
    }
}

game = new Game(8, 10)
game.init()
game.showall()
game.click(0,3)
