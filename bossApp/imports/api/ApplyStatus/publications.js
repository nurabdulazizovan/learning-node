import {ApplyStatus} from "./collections";



Meteor.publish('get.status', function() {
    return ApplyStatus.find({},{fields: { statusId: 1, status: 1}});
});
