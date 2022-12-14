import  './vacancyDetail.html'
import {Joblist} from "../../../api/jobList/collections";
import {Meteor} from "meteor/meteor";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {CompanyCategory} from "../../../api/CompanyCategory/collections";


Template.vacancyDetail.onCreated(function() {
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
        self.subscribe('get.vacancies.with.companycategory', query);
    })


})
Template.vacancyDetail.helpers({
    getOneVacancy(){
        return Joblist.findOne();
    },

    getCompanyName(companycategory) {
        return CompanyCategory.findOne({_id: companycategory})?.category;
    }
});