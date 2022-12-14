import {Joblist} from "../jobList/collections";
import {Applies} from "./collections";

Meteor.methods({
    'apply': function (dataApply) {
        return Applies.insert(dataApply)
    },
    'update.apply.status'(status, applyId) {
        console.log('buraaa ', status, applyId)
        return Applies.update({_id: applyId}, {
            $set: {
                status: status
            }
        });
    }
});