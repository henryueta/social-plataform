import "../../styles/auth/auth-checkout.css"
import Checkout from "../../components/auth/Checkout";
import Contact from "../../components/visual/Contact";

const AuthCheckout = () => {
    
  return (
    
    <section className="authCheckoutPageSection">
        <Checkout/>
        <Contact/>
    </section>
  )
}

export default AuthCheckout
