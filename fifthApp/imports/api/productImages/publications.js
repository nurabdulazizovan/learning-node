import {Products} from "../products/collections";
import {ProductsImages} from "./collections";
import {Reviews} from "../reviewList/collections";




 publishComposite('get.product.with', function (query = {}) {
     return {
         find() {
             return Products.find(query);
         },
        children: [{
             find(product) {
                 console.log(product)
                 if (product.imageId) {
                    return ProductsImages.find({_id: product.imageId},query).cursor;
                }
             },

         },{
            find(product) {
                if (product._id) {
                    return Reviews.find({productId: product._id});
                }
            }
        }]
   }
})