import {useState,useEffect} from "react"
import {useAuth} from "../../contexts/auth"
import { Outlet } from "react-router-dom"
import Spinner from "../Spinner"

export default function AdminRoute(){
    const [auth,setAuth] = useAuth()
    const [ok,setOk] = useState(false)
    useEffect(()=>{
     const authCheck=async()=>{
        // console.log(auth?.token)
         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/admin-auth`,{
                method:"GET",
                headers:{
                    "Authorization":`${auth?.token}`,
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            console.log(res)
            console.log("checking.....")
            const body=await res.json()
            console.log(body)
            if(res.ok){
                console.log('Im set')
                setOk(true)
            }else{
                console.log('Im not set')
             setOk(false)
         }
     }
     if(auth?.token){
         authCheck()
        }
    },[auth?.token])
   return !ok ? <Spinner path=""/> : <Outlet/>
}