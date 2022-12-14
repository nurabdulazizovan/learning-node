import './register.html';
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {CompanyCategory} from "../../../api/CompanyCategory/collections";
Template.register.onCreated(function() {
    this.registerStatus = new ReactiveVar(true);
    let self =this;
    this.autorun(()=> {
        self.subscribe('get.company.with.category')
    });
})
Template.register.helpers({
    getUser() {
        return Meteor.user();
    },
    getCategory(){
        return CompanyCategory.find({});
    },
    getStatus(){
       return Template.instance().registerStatus.get();
    }
});



Template.register.events({
    'change .registerStatus'(event,template){
        let x = event.target.value == 'admin';
       let y= template.registerStatus.set(x);
        console.log(x)
        // console.log(y)
    },
    'submit #registerForm'(event, template) {
        event.preventDefault();

        let username = event.target.username.value;
        let email = event.target.email.value;
        let password = event.target.password.value;
        let registerStatus = event.target.RegisterStatus.value;
        let companyname = event.target.companyname?.value;
        let companycategory = event.target.companycategory?.value;
        let location = event.target.location?.value;
        let fullname = event.target.fullname.value;
        let aboutcompany = event.target.aboutcompany?.value;


        let res = Accounts.createUser({
            username: username,
            email: email,
            password: password,
            profile: {
                fullname:fullname,
                registerStatus: registerStatus,
                companyname: companyname,
                companycategory: companycategory,
                location:location,
                aboutcompany: aboutcompany,

            }
        });
        FlowRouter.go('/')

        console.log('id: ', res);
    },




});