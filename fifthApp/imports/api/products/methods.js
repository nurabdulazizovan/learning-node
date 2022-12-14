// import { StudentList } from "../studentList/collections";
import { Products } from "./collections";

Meteor.methods({
    'add.product': function(dataProduct) {
        let reviewsCount = 0;
        let avrReview = 0;
        let reviewSum = 0;
        dataProduct.reviewsCount = reviewsCount;
        dataProduct.avrReview = avrReview;
        dataProduct.reviewSum = reviewSum;
        return Products.insert(dataProduct)
    },
});