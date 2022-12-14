import './applyListAdmin.html'
import {Meteor} from "meteor/meteor";
import {Applies} from "../../../api/applies/collections";
import {ApplyStatus} from "../../../api/ApplyStatus/collections";
import {Joblist} from "../../../api/jobList/collections";
import {CompanyCategory} from "../../../api/CompanyCategory/collections";

Template.applyListAdmin.onCreated(function () {
    this.statusVal = new ReactiveVar(null);
    let self = this
    this.queryId = new ReactiveVar();
    this.getStatusId = new ReactiveVar();
    this.autorun(() => {

        let query = {}
        if (Meteor.user()?.profile.registerStatus === 'admin') {
            query.vacancyCreated = Meteor.userId();
            self.subscribe('get.apply.with.admin', query);
        } else {
            query.userId = Meteor.userId();
            self.subscribe('get.apply.with.appliers', query);
        }

    })
})

Template.applyListAdmin.helpers({
    getVacancyApply() {
        return Applies.find()
    },
    getVacancy(){
        return Joblist.findOne({_id: this.vacancyId})?.vacancyname;
    },
    getAdmin() {
        return Meteor.user()?.profile.registerStatus === 'admin';
    },
    getUsers(){
        let x =Meteor.users.findOne({_id: this.userId})?.profile.fullname;
        return x;

    },

})


Template.applyListAdmin.events({
    'click #btnStatus'(event, template) {
        event.preventDefault();
        template.getStatusId.set(this);
    },
    'submit #submitStatus'(event, template) {
        event.preventDefault();
        let status = $('#applyStatus').val();
        let applyId = template.getStatusId.get()._id;
        console.log('ddd', applyId)
        // let applyId = Applies.findOne({vacancyId})._id

        // console.log('Id: ', applyId)
        // console.log('status: ', status)

        Meteor.call('update.apply.status', status, applyId, function (error, success) {
            if (error) {
                console.log('Error: ', error);
            }
            if (success) {
                console.log('Success: ', success);
                $('#exampleModal1').modal('hide');
                $('#submitStatus').trigger('reset');
            }
        });
    }
})