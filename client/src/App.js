import Navbar from "./components/Navbar";
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import {useEffect,createContext,useReducer,useContext} from 'react'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from "./components/UserProfile";
import FollowingPosts from "./components/FollowingPosts";
import SignelPost from "./components/SignelPost";
export const userContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(userContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push("/")

    }else{
      history.push('/signin')
    }

  },[])
  return (
    <Switch>
      <Route path="/" exact>
      <Home/>
    </Route>
    <Route path="/profile" exact>
      <Profile/>
    </Route>
    <Route path="/signin">
      <Login/>
    </Route>
    <Route path="/signup">
      <Signup/>
    </Route>
    <Route path="/create">
      <CreatePost/>
    </Route>
    <Route path="/profile/:userid">
      <UserProfile/>
    </Route>
    <Route path="/myfollowingposts">
      <FollowingPosts/>
    </Route>
    <Route path="/singlepost/:postid">
      <SignelPost />
    </Route>
    </Switch>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <userContext.Provider value={{state,dispatch}}>

    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    
    </userContext.Provider>

  );
}

export default App;
