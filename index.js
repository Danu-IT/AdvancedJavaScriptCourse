const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

class GoodsItem {
  constructor({title = '', price = 0}){
    this.title = title;
    this.price = price;
  }
  render(){
    return `
    <div class="goods-item">
      <h3 class="goods-title">${this.title}</h3>
      <p class="goods-price">${this.price}₽</p>
    </div>
  `;
  }
}

class GoodsList {
  list = [];
  fetchGoods(){
    this.list = goods;
  }
  render(){
    let goodsList = this.list.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render()
    }).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
  }
  sum(){
    let sumItem = this.list.reduce((prev, el) => {
      return prev + el.price;
    }, 0)
    console.log(sumItem)
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();
goodsList.sum();