import {
    FlowRouter
} from 'meteor/ostrio:flow-router-extra';


import '../../ui/layout/mainLayout'
import  '../../ui/pages/register/register'
import  '../../ui/pages/login/login'
import  '../../ui/pages/home/home'
import '../../ui/pages/jobs/addJob'
import '../../ui/pages/jobs/jobList'
import  '../../ui/pages/jobs/vacancyDetail'
import '../../ui/pages/jobs/editVacancy'
import '../../ui/pages/apply/applyListAdmin'
import '../../ui/pages/apply/applyDetail'
import {Meteor} from "meteor/meteor";


FlowRouter.triggers.enter([trackRouteEntry], {
    only: ['addJob', 'applyDetail', 'applyListAdmin', 'editVacancy', 'jobList']
});
FlowRouter.triggers.enter([trackRouteEntry1], {
    only: ['register', 'login']
});
// FlowRouter.triggers.enter([trackRouteEntry2], {
//     only: ['addJob', 'applyDetail',  'editVacancy', 'jobList']
// });


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
FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'login'
        });
    },
});
FlowRouter.route('/addJob', {
    name: 'addJob',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'addJob'
        });
    },
});

FlowRouter.route('/jobList', {
    name: 'jobList',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'jobList'
        });
    },
});
FlowRouter.route('/vacancyDetail/:_id', {
    name: 'vacancyDetail',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'vacancyDetail'
        });
    },
});
FlowRouter.route('/editVacancy/:_id', {
    name: 'editVacancy',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'editVacancy'
        });
    },
});
FlowRouter.route('/applyListAdmin', {
    name: 'applyListAdmin',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'applyListAdmin'
        });
    },
});
FlowRouter.route('/applyDetail/:_id', {
    name: 'applyDetail',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'applyDetail'
        });
    },
});
function trackRouteEntry(context, redirect) {
    if (!Meteor.userId()) {
        redirect('/register');
    }
}
function trackRouteEntry1(context, redirect) {
    if (Meteor.userId()) {
        redirect('/');
    }
}
// function trackRouteEntry2(context, redirect) {
//     console.log('dfsdfsdf',Meteor.users.findOne({_id: Meteor.userId()}))
//     if (Meteor.user()?.profile.registerStatus === 'user') {
//         console.log('ifin icine girdi',Meteor.user()?.profile.registerStatus)
//         redirect('/');
//     }
// }