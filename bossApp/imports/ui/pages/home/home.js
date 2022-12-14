import './home.html'
import {Meteor} from "meteor/meteor";
import {Joblist} from "../../../api/jobList/collections";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {UserResumes} from "../../../api/resumes/collections";
import {ApplyStatus} from "../../../api/ApplyStatus/collections";
import {Applies} from "../../../api/applies/collections";

Template.home.onCreated(function() {
    let self =this;
    this.autorun(()=>{
        self.subscribe('get.vacancies');
    });
    // this.autorun(()=>{
    //     let query = {
    //         userId: Meteor.userId()
    //     }
    //     self.subscribe('get.resumes',query);
    // })
})
Template.home.helpers({
    getVacancies(){
        return Joblist.find({});
    },
    getUserstatus() {
        return Meteor.user()?.profile.registerStatus === 'user';
    },
    getAdminstatus() {
        return Meteor.user()?.profile.registerStatus === 'admin';
    },
    applyExists() {
        let foundApply = Applies.findOne({vacancyId: this._id, userId: Meteor.userId()});

        if (foundApply) {
            return false;
        } else {
            return true;
        }

    }

});


Template.home.events({
    'submit #applyForm'(event,template){
        event.preventDefault()
        let userId = Meteor.userId();
        let vacancyId = this._id;
        let resumeId = UserResumes.findOne({userId: Meteor.userId()})._id;
        console.log(resumeId, 'resume id')

        let dataApply = {
            userId: userId,
            vacancyId: vacancyId,
            vacancyCreated: this.userid,
            resumeId: resumeId,
        }
        console.log(dataApply.applyStatus, 'apply')
        Meteor.call('apply', dataApply, function(error, success) {
            if (error) {
                console.log('error', error);
            }
            if (success) {
                FlowRouter.go('/')
                console.log('insertedId: ', success)
            }
        });
        // console.log(dataApply.vacancyCreated, 'dddd')
    },
})