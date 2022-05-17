import './style.css';
import Search from './components/Search';
import BasketGoods from './components/BasketGoods';
import CustomButton from './components/CustomButton';
import GoodsItem from './components/GoodsItem';
import CustomError from './components/CustomError';
import {service, serviceDelete, servicePost} from './service'
import {BASE_URL, GET_GOODS_ITEMS, GET_BASKET_ITEMS} from './constants'


Vue.config.devtools = true

function init(){

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
        console.log(servicePost(GET_BASKET_ITEMS,{
          id: goodId,
        }));
      },
      deleteGood(goodId){
        serviceDelete(GET_BASKET_ITEMS, goodId)
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