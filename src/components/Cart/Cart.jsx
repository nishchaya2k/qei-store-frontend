import {useContext} from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";

// import { loadStripe } from "@stripe/stripe-js";
// import { makePaymentRequest } from "../../utils/api";

import "./Cart.scss";
import { useNavigate } from "react-router-dom";
const Cart = ({setShowCart}) => { 

    const {cartItems,cartSubTotal} = useContext(Context);
    const navigate = useNavigate();

    //by using loadStripe we will create its instance stripePromise
    /*const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

    const handlePayment = async()=>{

        try{
            const stripe = await stripePromise;  //used the above instance
            const res = await makePaymentRequest.post("/api/orders",{  //api call using post call
                products: cartItems,    //send as a payload-> cartItems
            }); 
            //we will use stripe here becoz we need a method from it
            await stripe.redirectToCheckout({    //it will return a promise so we use await here
                sessionId:  res.data.stripeSession.id,        //in this method we got sessionId in which we send ..
            }) 
        }
        catch(error){
            console.log(error);
        }
    };*/


    const handleSideBar = () => {
        setShowCart(false);

        setTimeout(
            () => {navigate("/")
          }, 300);
        
    }

    return (
    <div className="cart-panel">
        <div className="opac-layer">kajdhjd</div>
        <div className="cart-content">
            <div className="cart-header">        
                <span className="heading">Shopping Cart</span>
                <span className="close-btn" onClick={()=>setShowCart(false)}>
                    <MdClose/>
                    <span className="text">close</span>
                </span>
            </div>
        
            {!cartItems?.length && <div className="empty-cart">
                <BsCartX/>
                <span>No products in the cart.</span>
                <button className="return-cta"  onClick={handleSideBar}>RETURN TO SHOP</button>
            </div>}
            {!!cartItems?.length &&  <>
                <CartItem/>
                <div className="cart-footer">
                    <div className="subtotal">
                        <span className="text">Subtotal:</span>
                        <span className="text total">
                            &#8377;{cartSubTotal}
                        </span>
                    </div>
                    <div className="button">
                        <button
                            className="checkout-cta"
                           
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </>}
        </div>
    </div>
    );
};

export default Cart;
 