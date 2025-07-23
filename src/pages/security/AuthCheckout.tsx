import { useEffect, useState } from "react"
import  code_field_list  from "../../constants/code-constant";
import useHandleAuth from "../../hooks/useHandleAuth";

const AuthCheckout = () => {

    const [codeValueList,setCodeValueList] = useState<number[]>(code_field_list);
    const [checkoutCodeValue,setCheckoutCodeValue] = useState("");
    const {onCheckout} = useHandleAuth();

    const setCheckoutValue = ()=>{
        let codeListFormatedValue = "";
        codeValueList.forEach((code)=>
            codeListFormatedValue +=code.toString()   
        )
        !!(codeListFormatedValue.length === 4)
        && setCheckoutCodeValue(codeListFormatedValue)
    }

    useEffect(()=>{

        !!(checkoutCodeValue.length === 4)
        ? onCheckout("post",checkoutCodeValue)
        : alert("nao")

    },[checkoutCodeValue])

  return (
    <section className="authCheckoutPageSection">
        <div className="codeInsertContainer">
            {
                codeValueList.map((code,index)=>
                    <input  
                    key={index}
                    type="number" 
                    value={code}
                    onChange={(e)=>{
                        const currentNumberValue = parseInt(e.target.value)
                        
                         setCodeValueList((prev)=>{
                            const currentListValue = [...prev]
                             currentListValue.splice(
                                index,
                                1,
                                currentNumberValue
                             )
                             return currentListValue
                        })
                         
                    }}
                    />  
                )
            }
        </div>
        <div className="resendActionContainer">
            <button
            onClick={()=>{
                onCheckout("get")
            }}
            >
                Reenviar código
            </button>
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
    </section>
  )
}

export default AuthCheckout
