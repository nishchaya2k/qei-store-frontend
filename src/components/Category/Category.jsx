import Products from "../Products/Products";
import "./Category.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch"


//when we navigate from the Home/Category/Category.jsx we render this component


const Category = () => {

    const { id } = useParams();

    //how we fetch data correspond to id, read the strapi documentation
    const { data } = useFetch(`/api/products?populate=*&[filters][categories][id]=${id}`) //api/products means we have call products api, =* means we also get categories and images

    return (
        <div className="category-main-content">
            <div className="layout">
                <div className="category-title">
                    {
                        data?.data?.[0]?.attributes?.categories?.data?.[0]
                            ?.attributes?.title
                    }
                </div>
                <Products innerPage={true} products={data} />
            </div>
        </div>
    );
};

export default Category;
