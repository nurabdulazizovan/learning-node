import './productList.html'
import {Products} from "../../../api/products/collections";
import {ProductsImages} from "../../../api/productImages/collections";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {Session} from "meteor/session";

Template.productList.onCreated(function () {
    this.reviewId = new ReactiveVar(0)
    this.detaildId = new ReactiveVar();
    let self = this

        if (localStorage.getItem('categoryId')) {
            Session.set('categoryId', localStorage.getItem('categoryId'))
        }

    this.autorun(() => {
        console.log(Session.get('categoryId'))
        let query = {
            _id: this.detaildId.get(),
            productCategory:Session.get('categoryId')
        }
        self.subscribe('get.product.with', query)
    });
    // this.autorun(() => {
    //     let query = {
    //         _id: this.detaildId.get(),
    //         productCategory:Session.get('categoryId')
    //     }
    //     self.subscribe('get.product.with.review', query)
    // })

});


Template.productList.helpers({
    showProductsFalse() {
        return Products.find({isFeatured: false});
    },
    getImage() {
        return ProductsImages.findOne({_id: this.imageId})?.link();
    },
    getUser() {
        return Meteor.user();
    },
    getOpenModal() {
        return Template.instance().reviewId.get();
    },
    getStars() {
        let arr = [0, 0, 0, 0, 0];
        for (let i = 0; i < this.avrReview; i++) {
            arr[i] = 1;
        }
        return arr;
    }
});


Template.productList.events({
    'click #addReview'(event, template) {
        event.preventDefault();
        template.reviewId.set(this);
    },
    'submit #reviewForm'(event, template) {
        event.preventDefault();
        let rating = event.target.rating.value;
        let reviewText = event.target.reviewText.value;
        let productId = template.reviewId.get()._id;
        // let productId = event.target.productId.value;
        let dataReview = {
            rating: rating,
            reviewText: reviewText,
            productId: productId
            // productId: productId
        }

        Meteor.call('add.review', dataReview, function (error, success) {
            if (error) {
                console.log('error', error);
            }
            if (success) {
                FlowRouter.go('/productList')
                console.log('insertedId: ', success)
                $('#exampleModal').modal('hide')
            }
        });
        console.log(dataReview)
        $('#reviewForm').trigger('reset')
    }
})