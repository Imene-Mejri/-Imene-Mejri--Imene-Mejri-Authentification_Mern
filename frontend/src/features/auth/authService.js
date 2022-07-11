import axios from 'axios'
const API_URI ='/api/users/'
//Register user 
const register = async (userData)=>{
    const responce =await axios.post(API_URI,userData)
    if (responce.data){
        localStorage.setItem('user',JSON.stringify(responce.data))
    }
    return responce.data
}
//Login user 
const login = async (userData)=>{
    const responce =await axios.post(API_URI + 'login',userData)
    if (responce.data){
        localStorage.setItem('user',JSON.stringify(responce.data))
    }
    return responce.data
}
//Logout function 
const Logout =()=>{
    localStorage.removeItem('user')
}


const authService ={
   register, login,Logout
}
export default authService