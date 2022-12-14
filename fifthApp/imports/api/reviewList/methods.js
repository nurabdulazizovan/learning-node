import {Reviews} from "./collections";
import {Products} from "../products/collections";


Meteor.methods({
    'add.review': function (dataReview) {
        let foundProduct = Products.findOne({_id: dataReview.productId});
        let newCount = foundProduct.reviewsCount + 1;
        let newSum = foundProduct.reviewSum + parseFloat(dataReview.rating);
        let newAvr = newSum / newCount;
        dataReview.createdAt=new Date();
        // dataReview.limit =3;
        Products.update({_id: dataReview.productId},
            {
                $set: {
                    reviewsCount: newCount,
                    reviewSum: newSum,
                    avrReview: newAvr,
                }
            })
        return Reviews.insert(dataReview)
    },
});