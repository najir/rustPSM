/*
Auther: Isaac Perks
Date: 04/09/2022
Description:
Vue based code and routing will go here. Any client sided code will also either be written or exported here
*/

const client = require('../vue');
const Router = require('../vue-router');

client.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'hello'
        },
        {
        path: '/test',
        name: 'test'
        },
        {
        path: '/foo',
        name: 'foo'
        }
    ]
})

export default {
    test(values) {
        return fetch('${ process.env.URL }/register')
            .then(response => response.json())
            .then(data => console.log(data));
    }

}