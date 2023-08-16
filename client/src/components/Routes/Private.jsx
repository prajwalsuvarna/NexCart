import {useState,useEffect} from "react"
import {useAuth} from "../../contexts/auth"
import { Outlet } from "react-router-dom"
import Spinner from "../Spinner"

export default function PrivateRoute(){
    const [auth,setAuth] = useAuth()
    const [ok,setOk] = useState(false)
    useEffect(()=>{
     const authCheck=async()=>{
         const res = await fetch(`/${import.meta.env.VITE_API_URL}/api/auth/user-auth`,{
                method:"GET",
                headers:{
                    "Authorization":`${auth?.token}`,
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            if(res.ok){
                setOk(true)
            }else{
             setOk(false)
         }
     }
     if(auth?.token){
         authCheck()
        }
    },[auth?.token])
   return !ok ? <Spinner/> : <Outlet/>
}