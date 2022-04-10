/*
Auther: Isaac Perks
Date: 04/09/2022
Description:
Vue based code and routing will go here. Any client sided code will also either be written or exported here
*/

const client = require('../vue');
const Router = require('../vue-router');
const mainPage = require('./client.vue')
const "404" = require('./components/404.vue')

client.use(Router);

const Routes({
    routes: [{
        path: '/',
        name: 'hello',
        component: mainPage
        },
        {
        path: '/test',
            name: 'test',
        component: 
        },
        {
        path: '/foo',
        name: 'foo'
        },
        {
            path: '*',
            component: "404"
        }
    ]
})

const router = new Router({
    mode: "history",
    base: process.env.URL,
    routes
});

export default {
    test(values) {
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

}