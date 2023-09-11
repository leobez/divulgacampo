import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import styles  from "./Login.module.css"


const Login = () => {
    return (
        
        <div className={styles.login}>
            
           <input type ='email' placeholder='E-mail'/>
           <input type ='password' placeholder='Senha'/>
           <button type = 'button' >Entrar</button>
           {/* <h1>Não Possui Cadastro?</h1> */}
           
           <button type = 'button' >Cadastrar</button>
        </div>
        
    )
}


export default Login