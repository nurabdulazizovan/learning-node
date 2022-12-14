import './login.html';
import {FlowRouter} from "meteor/ostrio:flow-router-extra";


Template.login.helpers({
    getUser() {
        return Meteor.user();
    }
});

Template.login.events({
    'submit #loginForm' (event, template) {
        event.preventDefault();

        let username = event.target.username.value;
        let password = event.target.password.value;

        Meteor.loginWithPassword(username, password, function (error) {
            if(error) {
                console.log('error', error)
            }
        });
        FlowRouter.go('/')
    },
})