
import {cookies} from '../cookie'
import Axios from 'axios';
import {
   
    withRouter
  } from "react-router-dom";

const config = { headers: { Authorization: `Token ${cookies.get('token')}`} , xsrfCookieName:'csrftoken', xsrfHeaderName:'X-CSRFToken' } 

export const login =  async (content) => {
     await Axios.post('http://127.0.0.1:8000/auth/token/login/', content).then(
      (response) => {
        console.log(response)
        console.log(response.data)
        //document.cookie = 'token='+ (response.data.token).toString()

        
        cookies.set('token', response.data.token, { path: '/' });
        console.log(cookies.get('token')); // Pacman
        window.location = "/";
        //history.push("/")
      }
    ).catch((error) => {
      console.log(error)
    })
  }


 export const logout =  async () => {
     await Axios.post('http://127.0.0.1:8000/auth/token/logout/', {}, config).then(
      (response) => {
        console.log(response)
        console.log(response.data)
        //document.cookie = 'token='+ (response.data.token).toString()

        cookies.set('token', "", { path: '/' });
        console.log(cookies.get('token')); // Pacman

        //history.push("/")
        window.location = "/";
      }
    ).catch((error) => {
      console.log(error)
    })
  }

export const logoutWrapper = withRouter(({history}) => {
  console.log('로그아웃...')
    logout();
    history.push("/")
})