import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {userContext} from '../App'
function Navbar() {
  const {state,dispatch} = useContext(userContext)
  const history = useHistory()
  const renderList = () =>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/myfollowingposts">Following Posts</Link></li>,
        <li onClick={()=>{
          localStorage.clear();
          dispatch({type:"CLEAR"});
          history.push("/signin")
          
        
        }} style={{color:'black',cursor:"pointer"}}>Log out</li>
      ]

    }else{
      return [
        <li><Link to="/signin">Sign in</Link></li>,
        <li><Link to="/signup">Sign up</Link></li>
      ]

    } 
  }  
    return (
        <nav >
        <div className="nav-wrapper white" style={{padding:"0 20px"}} >
          <Link to={state? "/" : "/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right ">
           {renderList()}
          </ul>
        </div>
      </nav>
    )
}

export default Navbar
