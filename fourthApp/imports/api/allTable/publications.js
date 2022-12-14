import {ClassList} from "../classList/collections";
import {StudentList} from "../studentList/collections";

publishComposite('get.studentlist', function () {

    return {
        find() {
            return StudentList.find({});
        },
        children: [{
            find(student) {
                return ClassList.find({_id: student.studentClass})
            }
        }]
    }
})
