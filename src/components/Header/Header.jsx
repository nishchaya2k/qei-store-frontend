import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import "./Header.scss";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
import { useLocation } from "react-router-dom";

const Header = () => {

    const [scrolled,setScrolled] = useState(false);
    const [catScroll,setCatScroll] = useState(false);
    const [showCart,setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false)

    const {cartCount} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();


    const handleScroll = () => {
        const offset = window.scrollY;
        if(offset > 200)
        setScrolled(true);

        else
        setScrolled(false)
    }


    const handleCatScroll=(value)=>{
        
        if(location.pathname == "/")
        {
            window.scrollTo({
                top: value,
                behavior: "smooth",
              });
        }
    }

    useEffect(() => {           //its a hook, its a first method which run after rendering of component  
        window.addEventListener("scroll",handleScroll)
    }, [])                    //dependency array contain state whenever it updates 

    return (
        <>
            <header className={`main-header ${scrolled ? "sticky-header": ""}`}>
                <div className="header-content">
                    <ul className="left">
                        <li onClick={()=>navigate("/")}>Home</li>
                        <li onClick={() => handleCatScroll(3500)}>About</li>
                        <li onClick={() => handleCatScroll(700)}>Categories</li>
                    </ul>
                    <div className="center" onClick={()=>navigate("/")}>QISTORE.</div> {/* Quality Items Store */}
                    <div className="right">
                        <TbSearch onClick={() => setShowSearch(true)}/>
                        <AiOutlineHeart/>
                        <span className="cart-icon" onClick={() => setShowCart(true)}>
                            <CgShoppingCart/>
                            {!!cartCount && <span>{cartCount}</span>}
                        </span>
                    </div>
                </div>
            </header>
           {showCart && <Cart setShowCart = {setShowCart}/>}
           {showSearch && <Search setShowSearch = {setShowSearch}/>}
        </>
    );
};

export default Header;
