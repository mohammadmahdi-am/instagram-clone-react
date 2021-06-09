import React,{useState,useEffect,useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {userContext} from '../App'
function UserProfile() {
    const {state,dispatch} = useContext(userContext)
    const {userid} = useParams()
    const [pics,setPics] = useState([])
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [following,setFollowing] = useState("")
    const [followers,setFollowers] = useState("")
    const [value, setvalue] = useState(0)
    const [userProfilePic, setUserProfilePic] = useState("0")
    const history = useHistory()
    const followUser = () =>{
        fetch("/follow",{
            method:"PUT",
            headers : {
                "Content-type":"application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            setvalue((prev)=>prev+1)
        })
    }
    const unfollowUser = () =>{
        fetch("/unfollow",{
            method:"PUT",
            headers : {
                "Content-type":"application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            setvalue((prev)=>prev+1)
        })
    }
    useEffect(() => {
        fetch(`/user/${userid}`,{
            method:"GET",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            setPics(data.posts)
            setUsername(data.user.name)
            setEmail(data.user.email)
            setFollowing(data.user.following)
            setFollowers(data.user.followers)
            setUserProfilePic(data.user.pic)
            console.log(data.user.followers)
        })
    }, [value])

    return (
        <div >
            <div style={{borderBottom:'1px solid black',display:"flex",justifyContent:"center",margin:"18px 0px"}}>
                <div>
                    <img src={userProfilePic} style={{width:"160px",height:"160px",borderRadius:"50%",margin:"20px"}} alt="" />
                </div>
                <div>
                    <h4>{username}</h4>
                    <h6>{email}</h6>
                   {followers.includes(state?._id) ? (<button onClick={unfollowUser}>Unfollow</button>) : (<button onClick={followUser}>Follow</button>) } 
                    <div style={{display:'flex'}}>
                        <h6 style={{margin:"10px"}}>{pics.length} posts</h6>
                        <h6 style={{margin:"10px"}}>{followers.length} followers</h6>
                        <h6 style={{margin:"10px"}}>{following.length} following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">

                {pics.map((post,index)=>
                    (
                        <div className="item" onClick={()=>history.push(`/singlepost/${post._id}`)} o key={index}><img  src={post.photo} alt=""  /></div>

                    )
                )}
            </div>
        </div>
    )
}

export default UserProfile
