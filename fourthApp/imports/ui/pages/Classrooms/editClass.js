import './editClass.html'
import {
    FlowRouter
} from 'meteor/ostrio:flow-router-extra';
import {ClassList} from "../../../api/classList/collections";

Template.editClass.onCreated(function () {


    this.detaildId = new  ReactiveVar();


    this.autorun(()=> {
        FlowRouter.watchPathChange();

        let id = FlowRouter.getParam('_id');

        this.detaildId.set(id);
    });



    this.autorun(()=> {
        // console.log("111",this.detaildId.get())

        let query = {
            _id: this.detaildId.get()
        }

        this.subscribe('get.classlist', query);
    });


});

Template.editClass.helpers({

    getOneTodo() {
        return ClassList.findOne({});
    },

});


Template.editClass.events({
    'submit #submitClassx'(event, template) {
        event.preventDefault();
        let clasName = event.target.clasName.value;
        let roomName = event.target.roomName.value;
        let mertebe = event.target.Mertebe.value;


        let data = {
            clasName: clasName,
            roomName: roomName,
            mertebe:mertebe,
        }
        // console.log(x)
        Meteor.call('edit.class',this._id, data, function(error, success) {
            if (error) {
                console.log('error nuruscum error ', error);
            }
            if (success) {
                console.log('updated: ', success)
                FlowRouter.go('/classList')
            }

        });
        console.log(data)

    },
});