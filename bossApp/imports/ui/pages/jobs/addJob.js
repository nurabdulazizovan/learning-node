import  './addJob.html'
import {CompanyCategory} from "../../../api/CompanyCategory/collections";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {Meteor} from "meteor/meteor";

Template.addJob.onCreated(function() {
    let self =this;
    this.userId =new ReactiveVar();
    this.autorun(()=> {
        self.subscribe('get.company.with.category')
    });
    this.autorun(()=>{
        if (Meteor.user()?.profile.registerStatus === 'user') {
            console.log('ifin icine girdi',Meteor.user()?.profile.registerStatus)
            FlowRouter.go('/');
        }
    })
})
Template.addJob.helpers({
    getCategory(){
        return CompanyCategory.find({});
    },
});


Template.addJob.events({
    'submit #vacancyForm'(event, template) {
        event.preventDefault();
        let x = Meteor.user()._id;


        let vacancyname = event.target.vacancyName.value;
        let companyname = event.target.companyname.value;
        let companycategory = event.target.companycategory.value;
        let location = event.target.location.value;
        let aboutcompany = event.target.aboutcompany.value;
        let aboutvacancy = event.target.aboutvacancy.value;
        let jobrecruitment = event.target.jobrecruitment.value;
        let userid = x;

        // let y = Template.userId.set(x)
        console.log('bizim id', x)
        let dataVacancy = {
            vacancyname: vacancyname,
            companyname: companyname,
            companycategory: companycategory,
            location: location,
            aboutcompany: aboutcompany,
            aboutvacancy: aboutvacancy,
            jobrecruitment:jobrecruitment,
            userid: userid
        }

        Meteor.call('add.vacancy', dataVacancy, function(error, success) {
            if (error) {
                console.log('error', error);
            }
            if (success) {
                FlowRouter.go('/')
                console.log('insertedId: ', success)
            }
        });

    },
})