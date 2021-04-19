import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert); 
Vue.config.productionTip = false;

let data = {
	team: null
}
	
new Vue({
  router,
	data,
  render: (h) => h(App),
}).$mount("#app");
