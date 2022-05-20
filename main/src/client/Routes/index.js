/*
Auther: Isaac Perks
Date: 04/09/2022
Description:
Vue based code and routing will go here. Any client sided code will also either be written or exported here

5/1: All of this code will be migrated to specific files and called here specifically

*/

//const Router = require('vue-router');
const mainPage = require('../Components/home.js');
const missing = require('../components/404.js');

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
        path: '*',
        component: missing
    }
];

const router = VueRouter.create({
    mode: "history",
    base: process.env.URL+':'+process.env.PORT,
    routes
});


export default router