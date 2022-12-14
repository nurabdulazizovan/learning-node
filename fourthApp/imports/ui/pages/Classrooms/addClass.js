import './addClass.html'

import {ClassList} from '../../../api/classList/collections'
import {FlowRouter} from "meteor/ostrio:flow-router-extra";

// Template.addClass.onCreated(function () {
//     let self = this
//     this.autorun(()=> {
//         self.subscribe('get.classlist')
//     });
// });




Template.addClass.helpers({
    // showTodos() {
    //     return ClassList.find({});
    // }, 

});



Template.addClass.events({
    'submit #submitClass'(event, template){
        event.preventDefault();
        let clasName = event.target.clasName.value;
        let roomName = event.target.roomName.value;
        let mertebe = event.target.Mertebe.value;
        let classId =event.target.classID.value;



        let data = {
            clasName: clasName,
            roomName: roomName,
            mertebe:mertebe,
            classId: classId
        }

       
        Meteor.call('addclass', data, function(error, success) { 
            if (error) { 
                console.log('error', error); 
            } 
            if (success) {
                FlowRouter.go('/classList')
                 console.log('insertedId: ', success)
            } 
        });
        console.log(data)
        $('#submitClass').trigger('reset')
    },
});