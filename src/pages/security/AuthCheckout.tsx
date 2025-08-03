import "../../styles/auth/auth-checkout.css"
import Checkout from "../../components/auth/Checkout";
import Contact from "../../components/visual/Contact";
import Logo from "../../components/logo/Logo";

const AuthCheckout = () => {
    
  return (
    
    <section className="authCheckoutPageSection">
        <div className="logoContainer">
          <Logo/>
        </div>
        <Checkout/>
        <Contact/>
    </section>
  )
}

export default AuthCheckout
