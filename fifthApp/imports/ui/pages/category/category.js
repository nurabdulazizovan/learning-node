import './category.html'
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {Products} from "../../../api/products/collections";

Template.category.onCreated(function () {


    this.detaildId = new  ReactiveVar();


    this.autorun(()=> {
        FlowRouter.watchPathChange();

        let id = FlowRouter.getParam('_id');

        this.detaildId.set(id);
    });



    this.autorun(()=> {

        let query = {
            _id: this.detaildId.get()
        }

        this.subscribe('get.product.with.category', query);
    });

});

Template.category.helpers({
    showProducts() {
        return Products.find({});
    },
})