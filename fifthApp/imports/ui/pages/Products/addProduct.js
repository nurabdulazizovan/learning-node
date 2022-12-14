import './addProduct.html'
import {ProductsImages} from "../../../api/productImages/collections";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {Random} from 'meteor/random'
import {Categories} from "../../../api/categories/collections";
import {Products} from "../../../api/products/collections";

Template.addProduct.onCreated(function (){
    let self =this;
    this.autorun(()=> {
        self.subscribe('get.product.with.category')
    });

})
Template.addProduct.helpers({
    showCategory() {
        return Categories.find({});
    },
    getImage() {
        return ProductsImages.findOne({_id: this.imageId})?.link();
    },

});



Template.addProduct.events({
    'submit #addProduct'(event, template){
        event.preventDefault();
        let productName = event.target.productName.value;
        let productCategory = event.target.productCategory.value;
        let productDescription = event.target.productDescription.value;
        let isFeatured= event.target.isFeatured.checked == true;
        let productPrice= event.target.productPrice.value;
        let fileSelf = event.target.productImage.files[0];
        let fileId = Random.id();


        if(fileSelf) {

            let uploadInstance = ProductsImages.insert({
                fileId: fileId,
                file: fileSelf,
            }, false);


            uploadInstance.on('start', function () {

            });
            uploadInstance.on('end', function (error, fileObj) {
                console.log('====== ', fileObj)
            });


            uploadInstance.start();

        }
        let dataProduct = {
            productName: productName,
            productCategory: productCategory,
            productDescription: productDescription,
            isFeatured: isFeatured,
            imageId: fileId,
            productPrice: productPrice
        }

        Meteor.call('add.product', dataProduct, function(error, success) {
            if (error) {
                console.log('error', error);
            }
            if (success) {
                FlowRouter.go('/')
                console.log('insertedId: ', success)

            }
        });
        console.log(dataProduct)
        // $('#submitStudent').trigger('reset')
    },

});