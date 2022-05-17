import { service } from "../../service";
import { GET_BASKET_ITEMS } from "../../constants";


export default Vue.component('basket-goods', {
    data(){
      return{
        basketGoods: [],
      }
    },
    props:[
      'isvisiblecart'
    ],
    template: 
    `
    <div class="basket__container">
        <div v-if="isvisiblecart" class="basket-list">
          <div class="basket__header">
            <div class="basket-title">Корзина</div>
            <div class="basket-list__close" @click="$emit('closeсart')"></div>
          </div>
          <div v-if="basketGoods.length > 0" class="basket-item">
            <div class="basket__content" v-for="item in basketGoods" :key="item.id">
              <div class="basket__item">
                <div>
                  <div class="basket__name">Name: <span class="basket__color">{{item.data.product_name}}</span></div>
                  <div class="basket__cost">Cost: <span class="basket__color">{{item.data.price}}</span></div>
                </div>
                <div class="basket-item__count">
                    <span>{{ item.count }}шт.</span>
                    <div class="basket-item__btn">
                    <button @click="$emit('addgood', item.id)">+</button>
                    <button @click="$emit('deletegood', item.id)">-</button>
                    </div>
                </div>
                <div>Total: <span class="basket__color">{{item.total}}</span></div>
              </div>
            </div>
          </div>
          <div v-else class="basket__blank">
            Корзина пуста
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