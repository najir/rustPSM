/*
Author: Isaac Perks
Date: 05/12/2022
Decription:
Main client sided application code. This will import our routes and create a base application. Routes will dictate what's shown on page and when things are changed. This will mount and initialize
all the needed base code for the home-page and initial template.
*/

const clientRouter = require('./Routes');
const Vue = require('vue');

const app = new Vue();
app.use(clientRouter);
app.mount('#app');

