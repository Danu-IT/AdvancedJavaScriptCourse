export default Vue.component('custom-search', {
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