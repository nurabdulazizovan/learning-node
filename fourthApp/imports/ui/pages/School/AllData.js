import './AllData.html'
import {ClassList} from "../../../api/classList/collections";
import {StudentList} from "../../../api/studentList/collections";




Template.AllData.onCreated(function () {
    let self = this
    this.autorun(()=> {
        self.subscribe('get.studentlist')
    });

});



Template.AllData.helpers({
    showStudents() {
        return StudentList.find({});
    },
    getClass(_id) {
        return ClassList.findOne({_id})
    }

});