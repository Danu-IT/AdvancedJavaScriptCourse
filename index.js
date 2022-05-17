const BASE_URL = 'http://localhost:8000'
const GET_GOODS_ITEMS = `${BASE_URL}/goods`;
const GET_BASKET_ITEMS = `${BASE_URL}/basket-goods`;

Vue.config.devtools = true

function service(url){
  return fetch(url)
  .then((data) => data.json());
}

function servicePost(url, body){
  return fetch(url, {
    method: 'POST',
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
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
                  <div class="basket__cost">Cost: <span class="basket__color">{{item.data.price}}</span></div>
                </div>
                <div class="basket-item__count">
                    <span>{{ item.count }}шт.</span>
                    <div class="basket-item__btn">
                    <button>+</button>
                    <button>-</button>
                    </div>
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
        })
      },
    },
    mounted(){
      this.fetchBasketGoods();
    }
  })

  const customButton = Vue.component('custom-button',{
    template:`
      <button class="search__button" type="button" v-on:click="$emit('click')"><slot></slot></button>
      `
  })

  const goodsItem = Vue.component('goods-item', {
    props:[
      'item'
    ],
    template: `
    <div class="goods-item">
      <h3 class="goods-title">{{ item.product_name }}</h3>
      <p class="goods-price">cost: {{ item.price }}</p>
      <custom-button @click="$emit('addgood', item.id)" style="color: black; border: 1px solid black; padding: 10px; margin-bottom: 10px">Добавить</custom-button>
    </div>`
  })

  const customSearch = Vue.component('custom-search', {
    props:[
      'value'
    ],
    template: 
    `
    <div>
        <input class="goods__search" :value="value" @input="$emit('input', $event.target.value)"></input>
        <custom-button type="button" v-on:click="$emit('searchclick')">Искать</custom-button>
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
      },
      searchMe(data){
        this.search = data;
      },
      addGood(goodId){
        servicePost(GET_BASKET_ITEMS,{
          id: goodId,
        })
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