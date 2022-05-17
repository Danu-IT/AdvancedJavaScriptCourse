export default Vue.component('custom-error', {
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