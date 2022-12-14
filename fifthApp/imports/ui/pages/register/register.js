import './register.html'
import {FlowRouter} from "meteor/ostrio:flow-router-extra";

// const res = Accounts.createUser({
//     username: 'superadmin',
//     email: 'superadmin@gmail.com',
//     password: 'superadmin123',
//     profile: {
//         type: Types.admin,
//         role: Roles.superadmin,
//         fullname: 'Super Admin',
//         active: true,
//         lng: "az"
//     }
// })






Template.register.onCreated(function () {

});



Template.register.helpers({
    getUser() {
        return Meteor.user();
    }
});



Template.register.events({
    'submit #registerForm'(event, template) {
        event.preventDefault();

        let username = event.target.userName.value;
        let email = event.target.userEmail.value;
        let password = event.target.userPassword.value;
        let userFullname = event.target.userFullname.value;

        let res = Accounts.createUser({
            username: username,
            email: email,
            password: password,
            profile: {
                userFullname: userFullname
            }
        });
        FlowRouter.go('/')

        console.log('id: ', res);
    },




});