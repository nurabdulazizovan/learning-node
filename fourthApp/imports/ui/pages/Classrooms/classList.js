import './classList.html'


import {ClassList} from '../../../api/classList/collections'

Template.classList.onCreated(function () {
    let self = this
    this.autorun(()=> {
        self.subscribe('get.classlist')
    });
});




Template.classList.helpers({
    showTodos() {
        return ClassList.find({});
    },

});

 

Template.classList.events({
    'click #delete'(event, template){
        event.preventDefault();

        Meteor.call('removeclass', this._id, function(error, success) { 
            if (error) { 
                console.log('error', error); 
            } 
            if (success) { 
                 console.log('insertedId: ', success)
            } 
        });
    }
});