/*
Author: Isaac Perks
Date: 05/12/2022
Decription:
Main client sided application code. This will import our routes and create a base application. Routes will dictate what's shown on page and when things are changed. This will mount and initialize
all the needed base code for the home-page and initial template.
*/

import routes from '/paths/index.js'

window.addEventListener("load", function () {
    const app = Vue.createApp({});
    const router = VueRouter.createRouter({
        mode: "history",
        history: VueRouter.createWebHistory(),
        //base: process.env.URL+':'+process.env.PORT,
        routes
    });
    app.use(router);
    app.mount('#app');
})