import {
    FlowRouter
} from 'meteor/ostrio:flow-router-extra';



import '../../ui/layout/mainLayout'
import '../../ui/pages/Students/studentList'
import '../../ui/pages/Students/addStudent'
import '../../ui/pages/Classrooms/addClass'
import '../../ui/pages/Classrooms/classList'
import '../../ui/pages/Classrooms/editClass'
import '../../ui/pages/School/AllData'


FlowRouter.route('/addStudent', {
    name: 'addStudent',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'addStudent'
        });
    },
});
FlowRouter.route('/studentList', {
    name: 'studentList',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'studentList'
        });
    },
});
FlowRouter.route('/addClass', {
    name: 'addClass',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'addClass'
        });
    },
});
FlowRouter.route('/editClass/:_id', {
    name: 'editClass',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'editClass'
        });
    },
});
FlowRouter.route('/classList', {
    name: 'classList',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'classList'
        });
    },
});
FlowRouter.route('/', {
    name: 'AllData',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'AllData'
        });
    },
});
