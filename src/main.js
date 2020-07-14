import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import * as service from './common/apis'
import router from './router'
Vue.use(Vant);
Vue.config.productionTip = false

Vue.prototype.service = service
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
