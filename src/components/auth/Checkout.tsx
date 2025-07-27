import { useEffect, useRef, useState } from "react"
import  code_field_list  from "../../constants/code-constant";
import useHandleAuth from "../../hooks/useHandleAuth";
import useHandlePath from "../../hooks/useHandlePath";
import "../../styles/auth/auth-checkout.css"
import TitleHeader from "../visual/TitleHeader";
import Timer from "../visual/Timer";

const Checkout = () => {

        const [codeValueList,setCodeValueList] = useState<number[] | null[]>(code_field_list);
        const [checkoutCodeValue,setCheckoutCodeValue] = useState("");
        const [enableResend,setEnableResend] = useState(false);
        const {onCheckout,currentAuthContext} = useHandleAuth({verifyAuth:true});
        const {onTransition} = useHandlePath();
        const  codeFieldRefList = useRef<HTMLInputElement[]>([]);

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

        useEffect(()=>{

            ((codeFieldRefList.current && codeFieldRefList.current.length)
            &&
            (()=>{
                codeFieldRefList.current[0].focus()
                codeFieldRefList.current.forEach((field,index)=>
                    (field.oninput = ()=>{
                        (field.value.length === 1 && index < (codeFieldRefList.current.length-1))
                        ? codeFieldRefList.current[index+1].focus()
                        : 
                        (field.value.length === 0 && index > 0)
                        &&
                        codeFieldRefList.current[index-1].focus()
                    })
                )
            })()
            )

        },[codeFieldRefList])

  return (
    <div className="checkoutContainer">
        <TitleHeader
        title={"Verifique seu email"}
        subtitle="Enviamos um código para seu email"
        />
      <div className="codeInsertContainer">
            {
                codeValueList.map((code,index)=>
                    <input 
                    id={"field_number_"+index} 
                    ref={
                        (field)=>{
                            const current_field = field as HTMLInputElement
                            codeFieldRefList.current[index] = current_field
                        }
                    }
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
            <button
            className={
                enableResend
                ? "unfilled_button"
                : "filled_button"
            }
            onClick={()=>{
                    {
                        enableResend
                        &&
                        (()=>{
                            onCheckout("get")
                            setEnableResend(false)
                        })()
                    }
            }}
            >
                <span>Reenviar 
                {
                !enableResend
                &&
                ' em '}
                {
                    !enableResend
                    &&
                    <Timer
                    onEnd={()=>{setEnableResend(true)}}
                    minutes={1}
                    />
                }
                {
                    !enableResend
                    &&
                    'minutos'
                }
                </span>
            </button>
            {/* <span>
                Não recebeu o código?
                <button
                onClick={()=>{
                    onCheckout("get")
                }}
                >
                Reenviar
                </button>
            </span> */}
        </div>
    </div>
  )
}

export default Checkout
