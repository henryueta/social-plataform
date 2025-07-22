import { useForm } from "react-hook-form";
import {useEffect} from "react";
import type { FormComponentProps } from "../types/form-type"
import { zodResolver } from "@hookform/resolvers/zod";
import Warning from "./Warning";
import useHandleQuery from "../hooks/useHandleQuery";
import Load from "./Load";
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";

const Form = (
    {model,
    submit,
    method,
    submitButtonTitle,
    errorView,
    treatment,
    defaultValues,
    setPlacehorders,
    cancelButton
    }:FormComponentProps) => {
    
    const {register,formState,handleSubmit,reset} = useForm({
        mode:"all",
        reValidateMode:"onChange",
        resolver:zodResolver(model.schema)
    });
    const {errors} = formState
    const {onQuery,queryState} = useHandleQuery()
    
    console.log(errors)

    useEffect(()=>{

        reset()

    },[model])

return (
    <form onSubmit={handleSubmit((data)=>{
        !!submit.onAction
        &&
        submit.onAction(data);
        
        onQuery({
                method:method,
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
                    errorView
                    ?errors[field.registerId]?.message
                        ? "0.1rem solid red"
                        : "0.1rem solid gray"
                    : "0.1rem solid gray",
                    border:
                    errorView
                    ?errors[field.registerId]?.message
                        ? "0.1rem solid red"
                        : "none"
                    : "0.1rem solid gray"
                }

                let field_tag = null;
                 switch (field.tag) {
                    case "input":
                        field_tag = 
                        <input 
                        id={field.id}
                        defaultValue={
                            !!defaultValues
                            ? defaultValues.find((val)=>
                                val.id === field.registerId
                            )?.value
                            : ""
                        }
                        style = {field_error_style}
                        placeholder={
                            setPlacehorders
                            ? field.title
                            : ""
                        }
                        type={field.type} 
                        {...register(field.registerId)}/>
                    break;
                    case "textarea":
                        field_tag = 
                        <textarea 
                        defaultValue={
                            !!defaultValues
                            ? defaultValues.find((val)=>
                                val.id === field.registerId
                            )?.value
                            : ""
                        }
                        id={field.id}
                        style={field_error_style}
                        placeholder={
                            setPlacehorders
                            ? field.title
                            : ""
                        }
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
        <div className="formActionsContainer">
        {
        !!cancelButton
        &&
            <button
                className="filled_button"
                onClick={()=>{
                cancelButton.onCancel()
                }}
                >Cancelar
            </button>
        }
            <button className="unfilled_button">
            {
                queryState.isLoading !== null
                &&
              <Load isLoading={queryState.isLoading}/>
            }
            {
                submitButtonTitle
            }
            </button>
        </div>
    </form>
  )
}

export default Form
