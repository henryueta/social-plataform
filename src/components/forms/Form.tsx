import { useForm } from "react-hook-form";
import {Fragment, useEffect, useState} from "react";
import type { FormComponentProps } from "../../types/form-type"
import { zodResolver } from "@hookform/resolvers/zod";
import Warning from "../message/Warning";
import useHandleQuery from "../../hooks/useHandleQuery";
import Load from "../ui/Load";
import { AxiosHttpClientFactory } from "../../adapters/axios-adapter";
import gallery_icon from "../../assets/icons/gallery_icon.png"
import ImageVisualizer from "../image/ImageVisualizer";
import eye_icon from "../../assets/icons/eye_icon.png"

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
    const [fileChange,setFileChange] = useState<React.ChangeEvent<HTMLInputElement> | null>(null);
    const [isView,setIsView] = useState(false);
    const [passwordFieldList,setPasswordFieldList] = useState<null | {
        register:string,
        viewValue:boolean
    }[]>(null);

    useEffect(()=>{

        reset()
        
        setPasswordFieldList(
            (()=>{
                const passwordFieldList = model.form.filter((field)=>{
                    return field.type === 'password'
                }).map((field_password)=>{
                    return {
                        register:field_password.registerId,
                        viewValue:false
                    }
                })
                return !!passwordFieldList.length
                ? passwordFieldList
                : []
            })()
            
       )

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
            passwordFieldList !== null
            &&
            model.form.map((field,field_index)=>
                
               {
                const field_error_style = 
                {
                    outline:
                    errorView
                    ?errors[field.registerId]?.message
                        ? "0.1rem solid red"
                        : "0.1rem solid gray"
                    : "none",
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
                        style = {{...field_error_style,
                            display:
                            field.type === 'file'
                            ? "none"
                            : "block"
                        }}
                        placeholder={
                            setPlacehorders
                            ? field.title
                            : ""
                        }
                        type={(field.type === 'password'
                            ? 
                            (()=>{
                                const current_index = passwordFieldList?.findIndex((field_password)=>{
                                return field_password.register === field.registerId
                                })
                                return !!(passwordFieldList[current_index])
                                &&
                                (passwordFieldList[current_index].viewValue
                                ? "text"
                                : "password"
                                )
                            })()
                            : field.type)
                        } 
                        {...register(field.registerId)}
                        onChange={(e)=>{
                            ((field.type === 'file')
                            ? (
                                (()=>{
                                    register(field.registerId).onChange(e)
                                    setFileChange(e)
                                })()
                            )
                            : null)
                            
                        }}
                        />
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
                    <Fragment key={field_index}>
                    {   
                        isView
                        &&
                        field.type === 'file'
                        &&
                        (
                        fileChange 
                        &&
                        <>
                        <ImageVisualizer
                            operations={{
                                onClose:()=>setIsView(false),
                                onDelete:()=>setFileChange(null)
                            }}
                            event={fileChange}
                            onView={()=>{
                            }}
                        />
                        </>
                        )
                    }
                    <div 
                    className="fieldFormContainer"
                    key={field.id}>
                        <label htmlFor={field.id}
                        className={
                            (field.type === 'file'
                            ? "fileFieldLabel"
                            : "")
                        } 
                        >
                            {
                                field.type === 'file'
                                &&
                                (
                                fileChange === null
                                ?
                                    <img src={gallery_icon} alt="file_field_icon" />
                                : 
                                    <button
                                    type="button"
                                    className="filled_button"
                                    onClick={()=>{
                                        setIsView((prev)=>!prev);
                                    }}
                                    >
                                        Visualizar Imagem
                                    </button>
                                )
                            }
                            {field_tag}
                          {
                            field.type === 'password'
                            &&
                            <button
                            className="password_view_button"
                            type="button"
                            onClick={()=>{
                                !!(passwordFieldList !== null)
                                &&
                                setPasswordFieldList((prev)=>{
                                    if(prev !== null){
                                        const field_index = prev.findIndex((field_password)=>{
                                            return field_password.register === field.registerId
                                    })
                                        // const current_list = prev?.splice(field_index,1,{
                                        //     register:field.registerId,
                                        //     viewValue:!(prev[field_index].viewValue)
                                        // })
                                        const current_list = prev.filter((field_password)=>
                                            field_password.register !== field.registerId
                                        )
                                        current_list.push({
                                            register:field.registerId,
                                            viewValue:!(prev[field_index].viewValue)
                                        })
                                        console.log(current_list)
                                        return current_list
                                    }
                                    return prev
                                    
                                })
                            }}>
                                <img src={
                                    eye_icon
                                } alt="eye_icon" />
                            </button>
                          }
                            
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
                    </Fragment>
                )
               }

            )
        }
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
