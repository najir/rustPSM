/*
Auther: Isaac Perks
Date: 04/09/2022
Description:
Vue based code and routing will go here. Any client sided code will also either be written or exported here

5/1: All of this code will be migrated to specific files and called here specifically

*/

//const Router = require('vue-router');
//import VueRouter from 'vue-router'
import mainPage from '/static/home.js'
import missing from '/static/404.js'

const routes = [
    {
        path: '/',
        name: 'home',
        component: mainPage
    },
    {
        path: '/about',
        name: 'about',
    },
    {
        path: '/foo',
        name: 'foo'
    },
    {
        path: '/:pathmatch(.*)*',
        name: 'not-found',
        component: missing
    }
];

//const router = new VueRouter({
//    mode: "history",
    //base: process.env.URL+':'+process.env.PORT,
//    routes
//});


export default routes