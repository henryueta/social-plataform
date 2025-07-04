import Form from "../components/Form"
import user_model from "../models/user-model"
import { Link } from "react-router-dom"
import "../styles/auth-form.css"
import TitleHeader from "../components/TitleHeader"
import { AxiosHttpClientFactory } from "../adapters/axios-adapter"

const user_model_login = {
    schema:user_model.schema.omit({
        username:true
    }),
    form:user_model.form.filter((field)=>
        field.registerId !== 'username'
    )
} 

const Login = () => {

  return (
    <section className="authFormSection">
      <section className="formSection">
        <TitleHeader
        title="Bem vindo novamente"
        subtitle="Faça seu login"
        />
        <Form
        submitButtonTitle="Entrar"
          model={user_model_login}
          onSubmit={(data)=>{
           (async()=>{

            const loginResponse =await AxiosHttpClientFactory.request({
              method:"post",
              url:"http://localhost:3530/auth/login",
              body:data,
              withCredentials:true
            })

            console.log(loginResponse)

           })()
                
          }}
        />  
        <Link
        to={"/register"}
        >
          Não possui conta? Crie sua conta
        </Link>
      </section>
    </section>
  )
}

export default Login
