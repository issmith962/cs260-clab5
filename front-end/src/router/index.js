import Vue from "vue";
import VueRouter from "vue-router";
import Play from "../views/Play.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Default",
		component: Play,
	},
  {
    path: "/play",
    name: "Play",
    component: Play,
  },
	{
		path: "/player", 
		name: "Player", 
		props: true,
		component: () => 
			import("../views/Player.vue"), 
	}, 
  {
    path: "/leaderboard",
    name: "Leaderboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Leaderboard.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
