import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Default",
		component: Login,
	},
	{
		path: "/register", 
		name: "Register",
		component: () => import("../views/Register.vue"),
	},
	{
		path: "/login", 
		name: "Login",
		component: () => import("../views/Login.vue"),
	},
	{
		path: "/Roster",
		name: "Roster", 
		component: () => import("../views/Roster.vue"),
	},
	{
		path: "/player", 
		name: "Player", 
		props: true,
		component: () => import("../views/Player.vue"),
	}, 
  {
    path: "/training",
    name: "Training",
    component: () => import("../views/Training.vue"),
  },
  {
    path: "/trainingstats",
    name: "Training Stats",
    component: () => import("../views/TrainingStats.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
