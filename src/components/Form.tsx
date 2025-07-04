import { useForm } from "react-hook-form";
import type { FormComponentProps } from "../types/form-type"
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "./Spinner";
import useHandleQuery from "../hooks/useHandleQuery";

const Form = ({model,submit,submitButtonTitle}:FormComponentProps) => {
    
    const {register,formState,handleSubmit} = useForm({
        mode:"all",
        reValidateMode:"onChange",
        resolver:zodResolver(model.schema)
    });
    const {errors} = formState
    const {onQuery,queryState} = useHandleQuery()

return (
    <form onSubmit={handleSubmit((data)=>{
        !!submit.onAction
        &&
        submit.onAction(data)

        onQuery({
                method:"post",
                url:submit.url,
                body:data,
                withCredentials:true
              })

    })}>
        {
            model.form.map((field)=>
                
               {
                let field_tag = null;
                 switch (field.tag) {
                    case "input":
                        field_tag = 
                        <input 
                        placeholder={field.title}
                        type={field.type} 
                        {...register(field.registerId)}/>
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
                        <p className="fieldWarning">
                            {
                            errors[field.registerId]?.message?.toString()
                            }
                        </p>
                    </div>
                )
               }

            )
        }
        {/* <div className="responseContainer">
            
        </div> */}
        <button>
            {
              queryState.isLoading
              &&
              <Spinner/>  
            }
            {
                submitButtonTitle
            }
        </button>
    </form>
  )
}

export default Form
