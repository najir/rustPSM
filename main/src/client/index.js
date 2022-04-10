/*
Auther: Isaac Perks
Date: 04/09/2022
Description:
Vue based code and routing will go here. Any client sided code will also either be written or exported here
*/

const client = require('../vue');
const Router = require('../vue-router');
const mainPage = require('./client.vue');
const missing = require('./components/404.vue');

client.use(Router);

const routes = [
    {
        path: '/',
        name: 'hello',
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

const router = new Router({
    mode: "history",
    base: process.env.URL,
    routes
});

function steamPostData(values) {
    if (checkSteamId(values)) {
        return fetch('${ process.env.URL }/register', {
            method: 'POST',
            body: values
        })
            .then(response => response.json())
            .then(data => console.log(data)
                .catch(error => {
                    console.error('Error:', error);
                }));
    }
    else {
        return "There was an error in your steamID entry"
    }
}

function checkSteamId(steamId) {



}