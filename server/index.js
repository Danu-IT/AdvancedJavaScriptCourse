import { writeFile, readFile } from 'fs/promises'
import  express  from 'express';
import cors from 'cors';
import { get } from 'http';
import e from 'express';

const GOODS_PATH = './static/goods.json';
const BASKET_GOODS_PATH = './static/basket-goods.json'


function getGoods(path){
   return readFile(path, 'utf-8').then((file) => JSON.parse(file));
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/goods', (res, req) => {
    getGoods(GOODS_PATH).then((goods) => {
        req.send(JSON.stringify(goods));
    });
})

app.get('/basket-goods', (res, req) => {
    getGoods(BASKET_GOODS_PATH).then((basket) => {
        basket.forEach(el => {
            el.total = +el.data.price * +el.count;
        });
        req.send(JSON.stringify(basket))
    })
})

app.listen('8000', () => {
    console.log('Server is starting')
})