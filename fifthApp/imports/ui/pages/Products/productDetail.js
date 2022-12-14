import  './productDetail.html'
import {
    FlowRouter
} from 'meteor/ostrio:flow-router-extra';
import  '../../../api/products/collections'
import {Products} from "../../../api/products/collections";
import {ProductsImages} from "../../../api/productImages/collections";
import {Reviews} from "../../../api/reviewList/collections";
Template.productDetail.onCreated(function () {


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

        this.subscribe('get.product.with', query);
    });
    this.autorun(()=> {

        let query = {
            _id: this.detaildId.get()
        }

        this.subscribe('get.product.with.review', query);
    });


    // this.autorun(()=> {
    //     this.subscribe('get.product.with', query)
    // });

});

Template.productDetail.helpers({

    getOneProduct() {
        return Products.findOne({});
    },
    getReviews(){
        // return Reviews.find({}, { sort: { createdAt: -1 } });
        const topReviews = Reviews.find({}, { sort: { createdAt: -1}, limit: 3 });
        return topReviews
    },
    getImage() {
        return ProductsImages.findOne({_id: this.imageId})?.link();
    },
    getStars(){
            let arr = [0,0,0,0,0];
            for(let i = 0;i<this.avrReview;i++){
                arr[i] = 1;
            }
            return arr;
    },
    getSingleStar(){
        let arr = [0,0,0,0,0];
        for(let i = 0;i<this.rating;i++){
            arr[i] = 1;
        }
        return arr;
    }

});