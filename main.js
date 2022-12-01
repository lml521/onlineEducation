import App from './App'
import Vue from 'vue'

// 引入vuex
import store from "@/store/index.js"

// 引入 mixins
import mixins from '@/common/mixins/minxins.js'
Vue.mixin(mixins)

// #ifndef VUE3
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif