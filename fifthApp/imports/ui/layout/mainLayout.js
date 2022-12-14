import './mainLayout.html';
import {Categories} from "../../api/categories/collections";
import {Session} from "meteor/session";


Template.mainLayout.onCreated(function (){
    this.categoryId = new  ReactiveVar();
    let self =this;
    this.autorun(()=> {
        let query = {
            productCategory: this.categoryId.get()
        }
        self.subscribe('get.product.with.category',query)
    });

})

Template.mainLayout.helpers({
    getUser() {
        return Meteor.user();
    },
    showCategory() {
        return Categories.find({});

    },
});


Template.mainLayout.events({
    'click #logoutForm' (event, template) {
        Meteor.logout();
    },
    'click .categoryClick'(event,template){
        event.preventDefault();
        template.categoryId.set(this._id);
        Session.set('categoryId',this._id)
        localStorage.setItem('categoryId',this._id)
        console.log('xxx')
    },
})