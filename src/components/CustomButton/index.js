export default Vue.component('custom-button',{
    template:`
      <button class="search__button" type="button" v-on:click="$emit('click')"><slot></slot></button>
      `
  })