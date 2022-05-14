const BASE_URL = 'http://localhost:8000'
const GET_GOODS_ITEMS = `${BASE_URL}/goods`;
const GET_BASKET_ITEMS = `${BASE_URL}/basket-goods`;

Vue.config.devtools = true

function service(url){
  return fetch(url)
  .then((data) => data.json());
}

function init(){

  const basketGoods = Vue.component('basket-goods', {
    data(){
      return{
        basketGoods: [],
      }
    },
    props:[
      'isvisiblecart'
    ],
    template: 
    `<div class="basket__container">
        <div v-if="isvisiblecart" class="basket-list">
          <img @click="$emit('closeсart')" class="basket-list__close" src="img/Vector.svg" alt="">
          <div class="basket-title">basket cart</div>
          <div class="basket-item">
            <div class="basket__content" v-for="item in basketGoods" :key="item.id">
              <div class="basket__item">
                <div>
                  <div class="basket__name">Name: <span class="basket__color">{{item.data.product_name}}</span></div>
                  <div class="basket__cost">Cost: <span class="basket__color">{{item.count}}</span></div>
                </div>
                <div>Total: <span class="basket__color">{{item.total}}</span></div>
              </div>
            </div>
          </div>
        </div>
    </div>
    `,
    methods: {
        fetchBasketGoods() {
          service(GET_BASKET_ITEMS).then((data) => {
            this.basketGoods = [...data];
            console.log(this.basketGoods);
        })
      },
    },
    mounted(){
      this.fetchBasketGoods();
    }
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

  const customInput = Vue.component('custom-input', {
    props: [
      'value'
    ],
    template: 
    `
    <input class="goods__search" type="text" :value="value" @input="$emit('input', $event.target.value)">
    `
  })

  const customSearch = Vue.component('custom-search', {
    template: 
    `
    <div>
      <slot></slot>
    </div>
    `
  })

  const customError = Vue.component('custom-error', {
    props:[
        'isvisibleerror'
    ],
    template:
    `
    <div class="goodsError" v-if="isvisibleerror">
      <h1>Данные не получены</h1>
    </div>
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
      isVisibleError: false,
    },
    methods: {
      fetchGoods() {
          service(GET_GOODS_ITEMS).then((data) => {
            this.list = data;
            this.filteredItems = data;
        }).catch((data) => {
          console.log(data)
          this.isVisibleError = true;
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