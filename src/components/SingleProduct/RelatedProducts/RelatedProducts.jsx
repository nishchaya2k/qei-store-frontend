import React from "react";
import useFetch from "../../../hooks/useFetch";
import Products from "../../Products/Products";


const RelatedProducts = ({ categoryId, productId }) => {

    //we have used 2 filters,
    //1st one, products of same categories but excluding the selected item of category
    //2nd with the pagination we only want to show 4 items on the screen
    const { data } = useFetch(
        `/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`
    );

   

    return (
        <div className="related-products">
            <Products headingText="Related Products" products={data} />
        </div>
    );
};

export default RelatedProducts;