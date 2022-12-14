import './mainLayout.html'
import {Random} from "meteor/random";
import {UserResumes} from "../../api/resumes/collections";
import {Meteor} from "meteor/meteor";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";




Template.mainLayout.onCreated(function() {
    let self =this;
    this.autorun(()=>{
        let query = {
            userId: Meteor.userId()
        }
        self.subscribe('get.resumes',query);
    })


})
Template.mainLayout.helpers({
    getUser() {
        return Meteor.user();
    },
    getAdminstatus() {
        return Meteor.user()?.profile.registerStatus === 'admin';
    },
    getUserstatus() {
        return Meteor.user()?.profile.registerStatus === 'user';
    }
});

Template.mainLayout.events({
    'click #logoutForm' (event, template) {
        Meteor.logout();
        FlowRouter.go('/')
    },
    'submit #resumeForm'(event,template) {
        event.preventDefault()

        //if cvs,findOne()
        //return
        if(UserResumes.findOne()){
            return
        }
        let fileSelf = event.target.resume.files[0];
        let fileId = Random.id();
        let x = Meteor.user()._id;
        if (fileSelf) {

            let uploadInstance = UserResumes.insert({
                fileId: fileId,
                file: fileSelf,
                meta: {
                    userId: x
                }
            }, false);


            uploadInstance.on('start', function () {

            });
            uploadInstance.on('end', function (error, fileObj) {
                console.log('====== ', fileObj)

            });


            uploadInstance.start();
        }
        $('#exampleModal').modal('hide')
        $('#resumeForm').trigger('reset')
         FlowRouter.go('/')
    }
})