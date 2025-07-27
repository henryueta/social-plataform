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
    const [fileName,setFileName] = useState<null | string>(null);
    const [isView,setIsView] = useState(false);

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
                        type={field.type} 
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
                            onView={(value)=>{
                                setFileName(value)
                            }}
                        />
                        </>
                        )
                    }
                    <div 
                    className="fieldFormContainer"
                    key={field.id}>
                        {
                        field.type === 'file'
                        &&
                        fileChange
                        &&
                        <>
                            <span className="fileNameSpan">{fileName}</span>
                        </>
                        }
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
