import { Link } from "react-router-dom"
import Form from "../components/Form"
import TitleHeader from "../components/TitleHeader"
import "../styles/auth-form.css"
import user_model from "../models/user-model"
import type { AuthStructureType } from "../types/auth-type"
import api_endpoints from "../config/api"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useHandlePath from "../hooks/useHandlePath"

const Auth = () => {

  const {type} = useParams();
  
  const auth_type:AuthStructureType[] = [

    {
      type:"register",
      header:{
        title:"Seja bem vindo",
        subtitle:"Crie sua conta"
      },
      form:{
        model:user_model,
        url:api_endpoints.auth.register,
        submitTitle:"Criar conta"
      },
      otherOption:{
        ask:'Já possui conta?',
        reply:"Faça seu login",
        redirectTo:"/auth/login"
      }

    },
    {
      type:"login",
      header:{
        title:"Bem vindo novamente",
        subtitle:"Faça seu login"
      },
      form:{
        model:{
                schema:user_model.schema.omit({
                    username:true
                }),
                form:user_model.form.filter((field)=>
                    field.registerId !== 'username'
                )
            },
        url:api_endpoints.auth.login,
        submitTitle:"Entrar"   
      },
      otherOption:{
        ask:'Não possui conta?',
        reply:"Crie sua conta",
        redirectTo:"/auth/register"
      }
    }

  ]

  const [authStructure,setAuthStructure] = useState<AuthStructureType| null>(null)
  const {onTransition} = useHandlePath();

  useEffect(()=>{

    const currentStructure = auth_type.find((structure=>structure.type === type))
    !!currentStructure
    &&
    setAuthStructure(currentStructure)

    

  },[type])

  return (
    <section className="authFormSection">
      <h1
      style={{
        fontSize:"3rem",
        border:"0.1rem solid deepskyblue",
        borderRadius:"100%",
        borderStyle:"outset",
        padding:"0.5rem"
      }}
      >
        🌊
      </h1>
      {
        !!authStructure
        &&
         <section className="formSection">
        <TitleHeader
        title={authStructure.header.title}
        subtitle={authStructure.header.subtitle}
        />
        <Form
        submitButtonTitle={authStructure.form.submitTitle}
        model={authStructure.form.model}
        submit={{
          url:authStructure.form.url
        }}
        treatment={{
          onThen() {
            onTransition("/",true)
          },
          onCatch() {
            
          },
        }}
        />
        
        <span className="authOtherOptionSpan">
            <span className="authAskSpan">
              {
                authStructure.otherOption.ask
              }
            </span>
            <Link className="authReplyRedirect"
              to={authStructure.otherOption.redirectTo}
              >
              {
                authStructure.otherOption.reply
              }
          </Link>
        </span>

      </section>
      }
     
    </section>
  )
}

export default Auth
