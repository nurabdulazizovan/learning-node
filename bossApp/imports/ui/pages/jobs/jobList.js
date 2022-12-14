import './jobList.html'
import {CompanyCategory} from "../../../api/CompanyCategory/collections";
import {Joblist} from "../../../api/jobList/collections";
import {Session} from "meteor/session";
import {Meteor} from "meteor/meteor";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";



Template.jobList.onCreated(function() {
    let self =this;
    this.queryId = new ReactiveVar();
    this.autorun(()=>{
        let query = {
            _id: this.queryId.get(),
        }
        self.subscribe('get.vacancies.with.user', {userid: Meteor.userId()});
    })
    this.autorun(()=>{
        if (Meteor.user()?.profile.registerStatus === 'user') {
            console.log('ifin icine girdi',Meteor.user()?.profile.registerStatus)
            FlowRouter.go('/');
        }
    })
})
Template.jobList.helpers({
    getVacancies(){
        return Joblist.find({});
    },
    getAdminstatus() {
        return Meteor.user()?.profile.registerStatus === 'admin';
    },

});

Template.jobList.events({
    'click #delete'(event,template){
        event.preventDefault();

        Meteor.call('remove.vacancy', this._id, function(error, success) {
            if (error) {
                console.log('error', error);
            }
            if (success) {
                console.log('insertedId: ', success)
            }
        });
    },
    'click #edit'(event,template){

    }
})