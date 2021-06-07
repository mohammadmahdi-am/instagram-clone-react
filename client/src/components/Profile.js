import React,{useEffect,useState,useContext} from 'react'
import {userContext} from '../App'
function Profile() {
    const [posts, setPosts] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pic, setPic] = useState("")
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const {state,dispatch} = useContext(userContext)
    useEffect(() => {
        fetch("/myposts",{
            method:"GET",
            headers:{
                'Authorization' : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(data=>{
            setName(data.user.name)
            setPosts(data.myposts)
            setEmail(data.user.email)
            setFollowers(data.user.followers)
            setFollowing(data.user.following)
            setPic(data.user.pic)

        })
    }, [])
    return (
        <div >
            <div style={{borderBottom:'1px solid black',display:"flex",justifyContent:"center",margin:"18px 0px"}}>
                <div>
                    <img src={pic} style={{width:"160px",height:"160px",borderRadius:"50%",margin:"20px"}} alt="" />
                </div>
                <div>
                    <h4>{name}</h4>
                    <span>{email}</span>
                    <div style={{display:'flex'}}>
                        <h6 style={{margin:"10px"}}>{posts.length} posts</h6>
                        <h6 style={{margin:"10px"}}>{followers.length} followers</h6>
                        <h6 style={{margin:"10px"}}>{following.length} following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">

                {posts.map((post,index)=>
                    (
                        <div className="item" key={index}><img  src={post.photo} alt="" /></div>

                    )
                )}
            </div>
        </div>
    )
}

export default Profile
