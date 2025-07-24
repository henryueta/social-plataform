import { useEffect, useState } from "react"
import  code_field_list  from "../constants/code-constant";
import useHandleAuth from "../hooks/useHandleAuth";
import useHandlePath from "../hooks/useHandlePath";
import "../styles/auth-checkout.css"
import TitleHeader from "./TitleHeader";

const Checkout = () => {

        const [codeValueList,setCodeValueList] = useState<number[] | null[]>(code_field_list);
        const [checkoutCodeValue,setCheckoutCodeValue] = useState("");
        const {onCheckout,currentAuthContext} = useHandleAuth();
        const {onTransition} = useHandlePath();
    
        const setCheckoutValue = ()=>{
            let codeListFormatedValue = "";
            codeValueList.forEach((code)=>
                codeListFormatedValue +=code   
            )
            !!(codeListFormatedValue.length === 4)
            && setCheckoutCodeValue(codeListFormatedValue)
        }
    
        useEffect(()=>{
    
            !!(checkoutCodeValue.length === 4)
            && onCheckout("post",checkoutCodeValue)
            
    
        },[checkoutCodeValue])
    
        useEffect(()=>{
    
            !!(currentAuthContext.isChecked)
            &&
            onTransition("/")
    
        },[currentAuthContext.isChecked])
  return (
    <div className="checkoutContainer">
        <TitleHeader
        title={"Verifique seu email"}
        subtitle="Enviamos um código para x@gmail.com"
        />
      <div className="codeInsertContainer">
            {
                codeValueList.map((code,index)=>
                    <input  
                    key={index}
                    type="text" 
                    value={code || ""}
                    onChange={(e)=>{
                        const currentNumberValue = parseInt(e.target.value);
                        (e.target.value.trim().length < 2)
                        &&
                         setCodeValueList((prev)=>{
                            const currentListValue = [...prev]
                             currentListValue.splice(
                                index,
                                1,
                                currentNumberValue
                             )
                             return currentListValue as number[]
                        })
                         
                    }}
                    />  
                )
            }
        </div>
        <div className="confirmActionContainer">
            <button
            className="unfilled_button" 
            onClick={()=>{
                setCheckoutValue()
            }}
            >
                Confirmar
            </button>
        </div>
        <div className="resendActionContainer">
            <span>
                Não recebeu o código?
                <button
                onClick={()=>{
                    onCheckout("get")
                }}
                >
                Reenviar
                </button>
            </span>
        </div>
    </div>
  )
}

export default Checkout
