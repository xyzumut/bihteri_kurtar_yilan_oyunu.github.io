const h1 = document.getElementById('puan')
const myCanvas = document.getElementById("cizimAlani");
const panel = document.getElementById('panel')
const h2 = document.getElementById('h2')
const h3 = document.getElementById('h3')
const resim = document.getElementById('resim')

const ctx = myCanvas.getContext("2d");
ctx.fillStyle = "red"

const initialState = {
    xy:[{x:0, y:0}, {x:20, y:0}, {x:40, y:0},{x:60, y:0}, {x:80, y:0}],
    yemXY:{x:undefined, y:undefined},
    aktifYon: 'sag',
    hiz : 100,
    puan: 0
}
let xy = [...initialState.xy]
let yemXY = {...initialState.yemXY}
let aktifYon = initialState.aktifYon
let hiz = initialState.hiz
let puan = initialState.puan
let temp = false

const kontrol = (e) => {
    switch (e.keyCode) {
        case 37:
            aktifYon = aktifYon!=='sag' ? 'sol' : aktifYon
            break;
        case 38:
            aktifYon = aktifYon!=='alt' ? 'ust' : aktifYon
            break;
        case 39:
            aktifYon = aktifYon!=='sol' ? 'sag' : aktifYon
            break;
        case 40:
            aktifYon = aktifYon!=='ust' ? 'alt' : aktifYon
            break;
        default:
            aktifYon = aktifYon!=='sol' ? 'sag' : aktifYon
            break;
    }
}
const sil = () => {
    xy.forEach( snake => {
        ctx.clearRect(snake.x, snake.y, 20, 20) 
    })
}
const ciz = (interval) => {
    xy.forEach( snake => {
        ctx.fillRect(snake.x, snake.y, 18, 18)
        if (snake.x === yemXY.x && snake.y === yemXY.y) {
            yem()
            xy.unshift({x:xy[0].x-20, y:xy[0].y-20})
            puanArttir()
        }
    })
    const kafa = xy[xy.length-1]
    for (let index1 = 0; index1 < xy.length; index1++) {
        if (index1 !== xy.length-1 && ((kafa.x === xy[index1].x && kafa.y === xy[index1].y) || (false))) {
            clearInterval(interval)
            sifirla()
        }
    }
}
const yem = () => {
    let temp = false
    for (;true;1) {
        yemXY.x = Math.floor(Math.random()*20)*20
        yemXY.y = Math.floor(Math.random()*20)*20
        xy.forEach( el => {
            if (el.x !== yemXY.x && el.y !== yemXY.y) {
                // yem yılan üstünde çıkmamıştır pas geç
                temp = true
            }
        } )
        if (temp) {
            ctx.fillRect(yemXY.x, yemXY.y, 18, 18)
            break
        }
    }
}
const puanArttir = () => {
    puan++
    h1.innerText='Puan: '+puan
}
const baslat = () => {
    yem()
    ciz()
    document.addEventListener('keyup', kontrol)
    const interval = setInterval(() => {
        switch (aktifYon) {
            case 'sol':
                sil()
                xy.push({x:xy[xy.length-1].x-20, y:xy[xy.length-1].y})
                if (xy[xy.length-1].x === -20) {
                    xy[xy.length-1].x = 380
                }
                xy.shift()
                ciz(interval)
                break;
            case 'ust':
                sil()
                xy.push({x:xy[xy.length-1].x, y:xy[xy.length-1].y-20})
                if (xy[xy.length-1].y === -20) {
                    xy[xy.length-1].y = 380
                }
                xy.shift()
                ciz(interval)
                break;
            case 'sag':
                sil()
                xy.push({x:xy[xy.length-1].x+20, y:xy[xy.length-1].y})
                if (xy[xy.length-1].x === 400) {
                    xy[xy.length-1].x = 0
                }
                xy.shift()
                ciz(interval)
                break;
            case 'alt':
                sil()
                xy.push({x:xy[xy.length-1].x, y:xy[xy.length-1].y+20})
                if (xy[xy.length-1].y === 400) {
                    xy[xy.length-1].y = 0
                }
                xy.shift()
                ciz(interval)
                break;
            default:
                break;
        }
    },hiz)
}
const sifirla = () => {
    const geciciPuan = puan
    xy.forEach( snake => {
        ctx.clearRect(snake.x, snake.y, 20, 20)
    } )
    ctx.clearRect(yemXY.x, yemXY.y, 20, 20)
    xy = [...initialState.xy]
    aktifYon = initialState.aktifYon
    hiz = initialState.hiz
    puan = initialState.puan
    sil()
    ciz()
    yem()
    myCanvas.style.display='none'
    h1.style.display='none'
    panel.style.display='flex'
    h2.innerText='Puanın: '+geciciPuan
    if (geciciPuan>=15) {
        h3.innerText='Bihteri Kurtardın ve Artık sonsuza kadar behlül ile dans edecekler'
        document.body.style.backgroundColor='pink'
        panel.style.backgroundColor="white"
        resim.setAttribute('src','./pic/dans.gif')
    }
    else{
        h3.innerText='Maalesef Bihteri Kurtaramadın ve O Öldü!!!!'
        document.body.style.backgroundColor='brown'
        panel.style.backgroundColor="purple"
        resim.setAttribute('src','./pic/mezar.jfif')
    }
}

alert('Bihteri Kurtarmak İçin 15 Puan Gerekiyor!!!')

baslat()

resim.addEventListener('click',() => {
    location.reload();
})