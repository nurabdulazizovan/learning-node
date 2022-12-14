import './applyDetail.html'
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {Applies} from "../../../api/applies/collections";
import {Joblist} from "../../../api/jobList/collections";
import {UserResumes} from "../../../api/resumes/collections";
import {Meteor} from "meteor/meteor";

Template.applyDetail.onCreated(function() {
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
        self.subscribe('get.apply.with.user', query);
    })
})

Template.applyDetail.helpers({
    getApply(){
        return Applies.findOne();
    },
    getResume(){
        return UserResumes.findOne({_id: this.resumeId})?.link()

    }
})