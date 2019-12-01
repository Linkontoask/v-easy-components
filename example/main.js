import VEasy from '@/index'
import '@/theme-chalk/src/index.less'
import Vue from 'vue'
import APP from './APP.vue'
import router from './router'

Vue.use(VEasy)

new Vue({
  router,
  render: h => h(APP)
}).$mount('#app')
