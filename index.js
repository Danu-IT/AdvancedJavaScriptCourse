const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`;
const GET_BASKET_ITEMS = `${BASE_URL}getBasket.json`;

function service(url){
  return fetch(url)
  .then((data) => data.json());
}

function init(){

  const basketGoods = Vue.component('basket-goods', {
    props:[
      'isvisiblecart'
    ],
    template: 
    `<div v-if="isvisiblecart" class="basket-list">
      <img @click="$emit('closeсart')" class="basket-list__close" src="img/Vector.svg" alt="">
      <div class="basket-item">
        <h3 class="goods-title">basket cart</h3>
        <p class="goods-price"></p>
      </div>
    </div>`
  })

  const goodsItem = Vue.component('goods-item', {
    props:[
      'item'
    ],
    template: `
    <div class="goods-item">
      <h3 class="goods-title">{{ item.product_name }}</h3>
      <p class="goods-price">{{ item.price }}</p>
    </div>`
  })

  const customButton = Vue.component('custom-button',{
    template:`
      <button type="button" v-on:click="$emit('click')"><slot></slot></button>
      `
  })

  const app = new Vue({
    el: '#root',
    data: {
      list: [],
      filteredItems: [],
      search: '',
      isVisibleCart: false,
      plug: false,
    },
    methods: {
      fetchGoods() {
          service(GET_GOODS_ITEMS).then((data) => {
            this.list = data;
            this.filteredItems = data;
        })
      },
      filterItems(){
        this.filteredItems = this.list.filter(({ product_name }) => {
          this.plug = false;
          return product_name.match(new RegExp(this.search, 'giu'));
        });
        if(this.filteredItems.length == 0){
          this.plug = true;
        }
      },
      basketShow(){
        this.isVisibleCart = !this.isVisibleCart;
      }
    },
    computed: {
      calculatePrise(){
        return this.filteredItems.reduce((prev, { price }) => {
          return prev + price;
        }, 0);
      },
    },
    mounted() {
      this.fetchGoods();
    }
  })
}
window.onload = init