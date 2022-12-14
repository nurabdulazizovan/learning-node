import './addStudent.html'

import {StudentList} from '../../../api/studentList/collections'
import { ClassList } from '../../../api/classList/collections';
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {StudentsImages} from "../../../api/studentImages/collections";
import {Random} from 'meteor/random'

Template.addStudent.onCreated(function (){
    let self =this;
    this.autorun(()=> {
        self.subscribe('get.classlistAddStudent')
    });

})
Template.addStudent.helpers({
    showClassList() {
        return ClassList.find({});
    },
    getImage() {
        return StudentsImages.findOne({_id: this.imageId})?.link();
    }
});



Template.addStudent.events({
    'submit #submitStudent'(event, template){
        event.preventDefault();
        let studentName = event.target.studentName.value;
        let studentSurname = event.target.studentSurname.value;
        let studentAge = event.target.studentAge.value;
        let studentClass = event.target.xxx.value; 
        // let studentId= event.target.studentId

        let fileSelf = event.target.studentImage.files[0];
        let fileId = Random.id();


        if(fileSelf) {

            let uploadInstance = StudentsImages.insert({
                fileId: fileId,
                file: fileSelf,
            }, false);


            uploadInstance.on('start', function () {

            });
            uploadInstance.on('end', function (error, fileObj) {
                console.log('====== ', fileObj)
            });


            uploadInstance.start();

        }
        let dataStudent = {
            studentName: studentName,
            studentSurname: studentSurname,
            studentAge:studentAge,
            studentClass: studentClass,
            // studentId: studentId,
            imageId: fileId,
        }

        Meteor.call('addstudent', dataStudent, function(error, success) { 
            if (error) { 
                console.log('error', error); 
            } 
            if (success) {
                FlowRouter.go('/studentList')
                 console.log('insertedId: ', success)
            } 
        });
        console.log(dataStudent) 
        // $('#submitStudent').trigger('reset')
    },

});