import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'

import {userContext} from '../App'
function Login() {
   const {state,dispatch} = useContext(userContext)
    const history = useHistory()

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    
    const postData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
             setError("email is not valid")
             return
        }
        fetch("/signin",{
            method:"POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{

            console.log(data)
            if(data.error){
            setError(data.error)
            }else{

            localStorage.setItem("jwt",data.token)   
            localStorage.setItem("user",JSON.stringify(data.user))   
            dispatch({type:"USER",payload:data.user})
            setError("successfuly logged in")
            setTimeout(()=>{
                history.push("/")
            },3000)
            
            }

        })
    }
    return (
        <div className="mycard">

       
        <div class="card auth-card">
        {error && (
                <h6 style={{backgroundColor:"lightsalmon",color:"white",padding:"10px"}}>{error}</h6>
            )}
            <h2>Instagram</h2>
            <input type="text" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input type="text" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button className="btn waves-effect waves-light blue lighten-2" type="submit" name="action" onClick={postData}>
   login
  </button>
  <h5>
      <Link to="/signup">dont have an account ? </Link>
  </h5>
    
  </div>
  </div>
          
    )
}

export default Login
