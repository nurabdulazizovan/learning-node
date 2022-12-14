// import { StudentList } from "../studentList/collections";
import { StudentList } from "./collections";

Meteor.methods({ 
    'addstudent': function(dataStudent) { 
         return StudentList.insert(dataStudent)
    },
    'removestudent':function(_id){
        return StudentList.remove(_id);
    },
    'edit.student': function (_id,dataStudentt) {
        return StudentList.update(
            {_id},
            {
                $set: {
                    studentName: dataStudentt.studentName,
                    studentSurname: dataStudentt.studentSurname,
                    studentAge:dataStudentt.studentAge,
                    // studentClass: dataStudent.studentClass,
                    // studentId: dataStudentt.studentId
                }
            },

        )

    }
    
});