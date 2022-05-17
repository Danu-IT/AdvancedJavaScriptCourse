export default Vue.component('goods-item', {
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