import { ClassList } from "./collections";

Meteor.publish('get.classlist', function(query = {}) {
    return ClassList.find(query);
}); 

Meteor.publish('get.classlistAddStudent', function(argument) {
    return ClassList.find({},{fields: {classId: 1,clasName: 1}});
});


function sum(a,b) {
    return a+b;
}



sum(10,20)