import "./Home.scss";
import Banner from "./Banner/Banner"
import Category from "./Category/Category"
import Products from "../Products/Products";
import { useEffect,useContext} from "react";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const data = {};
const Home = () => {

    const {categories,setCategories,products,setProducts} = useContext(Context);

    useEffect(() => {
        getProducts();
        getCategories();
    },[])

    const getProducts = () => {
        fetchDataFromApi("/api/products?populate=*").then(res => {
            console.log(res);
            setProducts(res); //we got the category, we will pass it to category component
        })
      
    }
    const getCategories = () => {
        fetchDataFromApi("/api/categories?populate=*").then(res => {
            console.log(res);
            setCategories(res); //we got the category, we will pass it to category component
        })
    }


    return (
    <div>
        <Banner/>
        <div className="main-content">
            <div className="layout">
                <Category categories = {categories}/>
                <Products products = {products} setProducts = {setProducts} headingText = "Popular Products" homePage = {true} />
            </div>
        </div>
    </div>
    );
};

export default Home;


//when in filter we give any condition, products data changed, so we need to send the
//updated data