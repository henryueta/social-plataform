import { useForm } from "react-hook-form";
import {useEffect} from "react";
import type { FormComponentProps } from "../types/form-type"
import { zodResolver } from "@hookform/resolvers/zod";
import Warning from "./Warning";
import useHandleQuery from "../hooks/useHandleQuery";
import Load from "./Load";
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";

const Form = ({model,submit,submitButtonTitle,errorView,treatment}:FormComponentProps) => {
    
    const {register,formState,handleSubmit,reset} = useForm({
        mode:"all",
        reValidateMode:"onChange",
        resolver:zodResolver(model.schema)
    });
    const {errors} = formState
    const {onQuery,queryState} = useHandleQuery()
    
    useEffect(()=>{

        reset()

    },[model])

return (
    <form onSubmit={handleSubmit((data)=>{
        !!submit.onAction
        &&
        submit.onAction(data);
        
        onQuery({
                method:"post",
                url:submit.url,
                body:data,
                cancelToken:AxiosHttpClientFactory.createCancelToken(),
                withCredentials:true
              },
            {
              onThen(result) {
                !!treatment
                &&
                  !!treatment.onThen
                  &&
                  treatment.onThen(result)
              },  
              onCatch(error) {
                !!treatment
                &&
                  !!treatment.onCatch
                  &&
                  treatment.onCatch(error)
              },
              onFinally(){
                !!treatment
                &&
                !!treatment.onFinally
                &&
                treatment.onFinally()
              }
            })
    })}>
        {
            model.form.map((field)=>
                
               {
                const field_error_style = 
                {
                    outline:
                    errors[field.registerId]?.message
                    ? "0.1rem solid red"
                    : "0.1rem solid gray",
                    border:
                    errors[field.registerId]?.message
                    ? "0.1rem solid red"
                    : "none"
                }
                let field_tag = null;
                 switch (field.tag) {
                    case "input":
                        field_tag = 
                        <input 
                        id={field.id}
                        style = {field_error_style}
                        placeholder={field.title}
                        type={field.type} 
                        {...register(field.registerId)}/>
                    break;
                    case "textarea":
                        field_tag = 
                        <textarea 
                        id={field.id}
                        style={field_error_style}
                        placeholder={field.title}
                        {...register(field.registerId)}
                        />
                    break;
                    default:
                        field_tag =  <></>
                    break;
                }
                return (
                    <div 
                    className="fieldFormContainer"
                    key={field.id}>
                        <label htmlFor={field.id}>
                            {field_tag}
                        </label>
                          {
                            !!errorView
                            &&
                            <Warning
                             message={
                            errors[field.registerId]?.message?.toString() || ""
                            }
                            />
                          }
                    </div>
                )
               }

            )
        }
        <div className="responseContainer">
            {
                
            }
        </div>
        <button>
            {
                queryState.isLoading !== null
                &&
              <Load isLoading={queryState.isLoading}/>
            }
            {
                submitButtonTitle
            }
        </button>
    </form>
  )
}

export default Form
