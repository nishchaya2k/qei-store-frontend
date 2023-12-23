import "./Products.scss";
import Product from "./Product/Product";
import Sort from "./Sort.jsx"
import useFetch from "../../hooks/useFetch.js";
import Select from "react-select";
import { useState } from "react";
import { fetchDataFromApi } from "../../utils/api";

const filters = {};

const sortbyData = [
    { value: "title:asc", label: "Price(a-z)" }, //after clicking on the label we send value on the endpoint
    { value: "price", label: "Price(lowest)" },
    { value: "price:desc", label: "Price(highest)" },
    // { value: "vote_average.asc", label: "Rating Ascending" },
];


const Products = ({ products,setProducts, innerPage, headingText,homePage}) => {

    const [sortby, setSortby] = useState(null);
    
    const fetchSortedData = () => {
        fetchDataFromApi(`/api/products?populate=*&sort[0]=${filters.sort_by}`).then((res) => (
            setProducts(res),
            console.log(res)
        ))
        // console.log(products);
    }
    
    const defaultData = () => {
        fetchDataFromApi("/api/products?populate=*").then((res) => (
            setProducts(res),
            console.log(res)
        ))
    }


    const onChange = (selectedItems, action) => {
        setSortby(selectedItems);
        if (action.action !== "clear") {
            filters.sort_by = selectedItems.value; //filters is object declared on the top & sort_by(array declared & initialize here) is a key
            fetchSortedData();
        } else {
            delete filters.sort_by;
            defaultData();
        }
    }
    return (
        <div className="products-container">
            {/* heading */}
            {!innerPage && 
                <div className={`${homePage ? "top-heading" : ""}`}>   {/* we used this becoz of dropdown, so it will active for homepage only */}
                    <div className="sec-heading">{headingText}</div>
                    {homePage && <div>
                        <Select
                                name="sortby"
                                value={sortby}
                                options={sortbyData}
                                onChange={onChange}
                                isClearable={true}
                                placeholder="Sort by"
                                className="react-select-container sortbyDD"
                                classNamePrefix="react-select"
                        />
                    </div>}
                </div>
            }
            {/* products */}
            <div className={`products ${innerPage ? "innerPage" : ""}`}>
                {products?.data?.map((item) => (
                    <Product
                        key={item.id}
                        id={item.id}
                        data={item.attributes}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;