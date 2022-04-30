const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`;
const GET_BASKET_ITEMS = `${BASE_URL}getBasket.json`;

function service(url){
  return fetch(url)
  .then((data) => data.json());
}

function init(){
  const app = new Vue({
    el: '#root',
    data: {
      list: [],
      filteredItems: [],
      search: '',
      isVisibleCart: true,
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
          return product_name.match(new RegExp(this.search, 'giu'));
        });
      },
      basketShow(el){
        this.isVisibleCart == true ? this.isVisibleCart = false : this.isVisibleCart = true;
      }
    },
    computed: {
      calculatePrise(){
        return this.filteredItems.reduce((prev, { price }) => {
          return prev + price;
        }, 0);
      }
    },
    mounted() {
      this.fetchGoods();
    }
  })
}
window.onload = init