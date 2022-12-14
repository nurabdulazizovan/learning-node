import './studentList.html'

import {StudentList} from '../../../api/studentList/collections'
import {StudentsImages} from "../../../api/studentImages/collections";

Template.studentList.onCreated(function () {
    this.editX = new ReactiveVar(0);
    let self = this
    this.autorun(()=> {
        self.subscribe('get.studentlist.with.image')
    });

});




Template.studentList.helpers({
    showStudents() {
        return StudentList.find({});
    },
    getImage() {
        return StudentsImages.findOne({_id: this.imageId})?.link();
    },
    editNew(){
        return   Template.instance().editX.get();
    }

}); 



Template.studentList.events({
    'click #delete'(event, template){
        event.preventDefault();

        Meteor.call('removestudent', this._id, function(error, success) { 
            if (error) { 
                console.log('error', error); 
            } 
            if (success) { 
                 console.log('insertedId: ', success)
            } 
        });
    },
    'click #edit'(event,template){
        event.preventDefault();
        template.editX.set(this);
        var x=template.editX.get();
        console.log('menmen', x)
    },
    'submit #submitStudent'(event, template) {
        event.preventDefault();
        let studentName = event.target.studentName.value;
        let studentSurname = event.target.studentSurname.value;
        let studentAge = event.target.studentAge.value;
        // let studentClass = event.target.xxx.value;
        // let studentId= event.target.studentId




        let dataStudentt = {
            studentName: studentName,
            studentSurname: studentSurname,
            studentAge:studentAge,
            // studentClass: studentClass,
            // studentId: studentId
        }
        // console.log(x)

        let idOfDataToEdit = template.editX.get()._id;
        Meteor.call('edit.student',idOfDataToEdit, dataStudentt, function(error, success) {
            if (error) {
                console.log('error nuruscum error ', error);
            }
            if (success) {
                console.log('updated: ', success)
                $('#exampleModalCenter').modal('hide')
            }
        });
        console.log(dataStudentt)

    },
});
