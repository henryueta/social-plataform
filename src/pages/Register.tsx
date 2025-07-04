import  Form  from "../components/Form";
import user_model from "../models/user-model";
import { AxiosHttpClientFactory } from "../adapters/axios-adapter";
import { Link } from "react-router-dom";
import TitleHeader from "../components/TitleHeader";
import "../styles/auth-form.css"


const Register = () => {

  return (
    <section className="authFormSection">
      <section className="formSection">
        <TitleHeader
        title="Bem vindo novamente"
        subtitle="Faça seu login"
        />
        <Form
        submitButtonTitle="Criar conta"
        model={user_model}
        onSubmit={(data)=>{
              AxiosHttpClientFactory.request({
                method:"post",
                url:"http://localhost:3530/auth/register",
                body:data,
                withCredentials:true
              })
              
        }}
        />
        <Link
        to={"/login"}
        >
          Já possui conta? Faça seu login
        </Link>
      </section>
    </section>
  )
}

export default Register
