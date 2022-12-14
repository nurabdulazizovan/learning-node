import { ClassList } from "./collections";
import {StudentList} from "../studentList/collections";

Meteor.methods({ 
    'addclass': function(data) { 
         return ClassList.insert(data)
    } ,
    'removeclass':function(_id){
        return ClassList.remove(_id)
    },
    'edit.class': function (_id,data) {
        return ClassList.update(
            {_id},
            {
                $set: {
                    clasName: data.clasName,
                    roomName: data.roomName,
                    mertebe: data.mertebe,
                }
            },

        )

    }
}); 