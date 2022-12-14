import {
    FlowRouter
} from 'meteor/ostrio:flow-router-extra';


import '../../ui/layout/mainLayout'
import  '../../ui/pages/Home/home'
import  '../../ui/pages/register/register'
import  '../../ui/pages/login/login'
import  '../../ui/pages/Products/addProduct'
import  '../../ui/pages/Products/productList'
import  '../../ui/pages/Products/productDetail'
// import  '../../ui/pages/category/category'

FlowRouter.triggers.enter([trackRouteEntry], {
    only: ['addProduct']
});


FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'home'
        });
    },
});
FlowRouter.route('/register', {
    name: 'register',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'register'
        });
    },
});
FlowRouter.route('/addProduct', {
    name: 'addProduct',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'addProduct'
        });
    },
});
FlowRouter.route('/productDetail/:_id', {
    name: 'productDetail',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'productDetail'
        });
    },
});
// FlowRouter.route('/category/:_id', {
//     name: 'category',
//     action() {
//         BlazeLayout.render('mainLayout', {
//             main: 'category'
//         });
//     },
// });
FlowRouter.route('/productList', {
    name: 'productList',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'productList'
        });
    },
});
FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'login'
        });
    },
});



function trackRouteEntry(context, redirect) {
    if (!Meteor.userId()) {
        redirect('/register');
    }
}