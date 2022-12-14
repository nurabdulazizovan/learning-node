import { StudentList } from "./collections";
import {StudentsImages} from "../studentImages/collections";



// Meteor.publish('get.studentlist', function() {
//     return StudentList.find();
// });


publishComposite('get.studentlist.with.image', function (query = {}) {

    return {
        find() {
            return StudentList.find(query);
        },
        children: [{
            find(student) {
                if(student.imageId) {
                    return StudentsImages.find({_id: student.imageId}).cursor;
                }
            }
        }]
    }
});
// publishComposite('get.students', function (query = {}) {
//
//     return {
//         find() {
//             return StudentList.find(query);
//         },
//         children: [{
//             find(student) {
//                 if(student.imageId) {
//                     return StudentsImages.find({_id: student.imageId}).cursor;
//                 }
//             }
//         }]
//     }
//
// });







