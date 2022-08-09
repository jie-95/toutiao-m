import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 移动端适配
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  dayjs,
  render: (h) => h(App),
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
