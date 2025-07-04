import { Link } from "react-router-dom"
import Form from "../components/Form"
import TitleHeader from "../components/TitleHeader"
import "../styles/auth-form.css"
import user_model from "../models/user-model"
import type { AuthStructureType } from "../types/auth-type"
import api_endpoints from "../config/api"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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
        title:"Já possui conta? Faça seu login",
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
        title:"Não possui conta? Crie sua conta",
        redirectTo:"/auth/register"
      }
    }

  ]

  const [authStructure,setAuthStructure] = useState<AuthStructureType| null>(null)

  useEffect(()=>{

    const currentStructure = auth_type.find((structure=>structure.type === type))
    !!currentStructure
    &&
    setAuthStructure(currentStructure)

  },[type])

  return (
    <section className="authFormSection">
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
        />
        <Link
        to={authStructure.otherOption.redirectTo}
        >
          {
            authStructure.otherOption.title
          }
        </Link>
      </section>
      }
     
    </section>
  )
}

export default Auth
