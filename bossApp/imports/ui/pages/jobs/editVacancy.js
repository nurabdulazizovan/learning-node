import './editVacancy.html'
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {Joblist} from "../../../api/jobList/collections";
import {CompanyCategory} from "../../../api/CompanyCategory/collections";
import {Meteor} from "meteor/meteor";

Template.editVacancy.onCreated(function() {
    let self =this;
    this.detailedId = new ReactiveVar();
    this.autorun(()=> {
        FlowRouter.watchPathChange();

        let id = FlowRouter.getParam('_id');

        this.detailedId.set(id);
    });
    this.autorun(()=>{
        let query = {
            _id: this.detailedId.get()
        }
        self.subscribe('get.vacancies', query);
    })
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


Template.editVacancy.helpers({
    getOneVacancy(){
        return Joblist.findOne();
    },
    getCategory(){
        return CompanyCategory.find({});
    },
});

Template.editVacancy.events({
    'submit #editvacancyForm'(event, template) {
        event.preventDefault();


        let vacancyname = event.target.vacancyName.value;
        let companyname = event.target.companyname.value;
        let companycategory = event.target.companycategory.value;
        let location = event.target.location.value;
        let aboutcompany = event.target.aboutcompany.value;
        let aboutvacancy = event.target.aboutvacancy.value;
        let jobrecruitment = event.target.jobrecruitment.value;

        let editVacancy = {
            vacancyname: vacancyname,
            companyname: companyname,
            companycategory: companycategory,
            location: location,
            aboutcompany: aboutcompany,
            aboutvacancy: aboutvacancy,
            jobrecruitment: jobrecruitment,
        }

        Meteor.call('edit.vacancy', this._id, editVacancy, function (error, success) {
            if (error) {
                console.log('error', error);
            }
            if (success) {
                FlowRouter.go('/jobList')
                console.log('insertedId: ', success)
            }
        });
    },
})