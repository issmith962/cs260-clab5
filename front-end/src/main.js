import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

let data = {
	playerRecords: [
		{name: "pl-1", wins: 3, losses: 0, ties: 2},
		{name: "pl-2", wins: 8, losses: 5, ties: 2},
		{name: "pl-3", wins: 9, losses: 8, ties: 3},
		{name: "pl-4", wins: 1, losses: 9, ties: 4},
		{name: "pl-5", wins: 0, losses: 3, ties: 0},
		{name: "pl-6", wins: 2, losses: 2, ties: 0},
		{name: "pl-7", wins: 5, losses: 1, ties: 1},
		{name: "pl-8", wins: 6, losses: 1, ties: 9},
		{name: "pl-9", wins: 6, losses: 1, ties: 2},
		{name: "pl-10", wins: 6, losses: 8, ties: 11},
		{name: "pl-11", wins: 11, losses: 9, ties: 1},
		{name: "pl-12", wins: 1, losses: 12, ties: 14},
		{name: "pl-13", wins: 19, losses: 31, ties: 2},
		{name: "pl-14", wins: 8, losses: 44, ties: 8},
		{name: "pl-15", wins: 2, losses: 23, ties: 2},
		{name: "pl-16", wins: 8, losses: 18, ties: 1},
		{name: "pl-17", wins: 2, losses: 28, ties: 17},
		{name: "pl-18", wins: 26, losses: 25, ties: 15},
		{name: "pl-19", wins: 36, losses: 12, ties: 32},
		{name: "pl-20", wins: 46, losses: 13, ties: 38}
	],
}
	
new Vue({
  router,
	data,
  render: (h) => h(App),
}).$mount("#app");
