import {Products} from "./collections";
import {Categories} from "../categories/collections";
import {Reviews} from "../reviewList/collections";


// Meteor.publish('get.product.detail', function() {
//     return Products.find();
// });

Meteor.publish('get.product.with.category', function() {
    return Categories.find({},{fields: { categoryId: 1, text: 1}});
});



// publishComposite('get.product.with.category', function (query = {}) {
//
//     return {
//         find() {
//             return Products.find(query);
//         },
//         children: [{
//             find(category) {
//                 if (category.categoryId) {
//                     return Categories.find({_id: category.categoryId}).cursor;
//                 }
//             }
//         }]
//     }
// })