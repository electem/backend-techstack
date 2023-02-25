import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'


import "bootstrap/dist/css/bootstrap.min.css"
import "datatables.net-bs4"
import "jszip"
import "pdfmake"
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

Vue.directive("size",{
  bind(el,binding){
    if(binding.value=="small"){
      el.style.fontSize="25px"

    }
    else if(binding.value=="big"){
      el.style.fontSize="50px"
    }
    else {
    el.style.fontSize="30px"
    }
  }
})
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
