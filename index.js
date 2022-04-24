const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const GET_BASKET_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';

function service(url, callback){
  let promise = fetch(url).then((data) => {
    return data.json();
  }).then((data) => {
    callback(data);
  })
}

class GoodsItem {
  constructor({product_name = '', price = 0}){
    this.product_name = product_name;
    this.price = price;
  }

  render(){
    return `
    <div class="goods-item">
      <h3 class="goods-title">${this.product_name}</h3>
      <p class="goods-price">${this.price}₽</p>
    </div>
  `;
  }
}

class GoodsList {
  list = [];
  filteredItems = [];

  fetchGoods(callback) {
    service(GET_GOODS_ITEMS, (data) => {
      this.list = data;
      this.filteredItems = data;
      callback();
    });
  }

  render(){
    let goodsList = this.filteredItems.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    }).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
  }

  calculatePrise(){
    let sumItem = this.list.reduce((prev, { price }) => {
      return prev + price;
    }, 0);
    console.log(sumItem);
  }

  filterItems(value){
    this.filteredItems = this.list.filter(({ product_name }) => {
      return product_name.match( new RegExp(value, 'giu'));
    });
  }
}

class GoodBasket {
  list = [];

  fetchGoods(callback) {
    service(GET_BASKET_ITEMS, (data) => {
      this.list = data.contents;
      callback();
    });
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods(() => {
  goodsList.render();
  goodsList.calculatePrise();
});

const goodsBasket = new GoodBasket(); 
goodsBasket.fetchGoods(() => {
  console.log(goodsBasket.list);
})

document.querySelector('.search__button').addEventListener('click', () => {
  const value = document.querySelector('.goods__search').value;
  goodsList.filterItems(value);
  goodsList.render();
})