import {Products} from "../products/collections";
import {Reviews} from "./collections";

publishComposite('get.product.with.review', function (query={}) {

    return {
        find() {
            return Products.find(query);
        },
        children: [{
            find(product) {
                if (product._id) {
                    return Reviews.find({productId: product._id});
                }
            }
        }]

    }
})