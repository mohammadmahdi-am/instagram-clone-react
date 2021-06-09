import React,{useEffect,useState,useContext} from 'react'
import {userContext} from '../App'
import {useHistory} from 'react-router-dom'
function Profile() {
    const [posts, setPosts] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pic, setPic] = useState("")
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [value,setValue] = useState(1)
    const {state,dispatch} = useContext(userContext)
    const history = useHistory()
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
    }, [value])

    const updateProfilePicture = (e) => {
        const image = e.target.files[0]

        const API_ENDPOINT = "https://api.cloudinary.com/v1_1/instagramclone-ir/image/upload"
        const fileData = new FormData();
        fileData.append('file', image);
        fileData.append("upload_preset", "instaclone");
        fileData.append("cloud_name", "instagramclone-ir");

        fetch(API_ENDPOINT, {
            method: 'POST',
            body: fileData
          }).then(response => response.json())
            .then(data =>{
                console.log(data)
                console.log(data.url)
                fetch("/updateprofile",{
                    method:"POST",
                    headers : {
                        'Authorization' : 'Bearer ' + localStorage.getItem("jwt"),
                        "Content-type" : "application/json"
                    },
                    body :JSON.stringify( {
                        pic : data.url,
                        test:"hi"
                    })
                }).then(res=>res.json())
                .then(message=>{
                    console.log(message)
                    setValue(prev=>prev+1)
                })
                .catch(err=>console.log(err))
            })
            .catch(err => console.error('Error:', err));
        

    }


    
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
                    <span>update pic :   </span>
                       
                    <input  type="file"      onChange={(e)=>updateProfilePicture(e)}/>

                </div>
            </div>

            <div className="gallery">

                {posts.map((post,index)=>
                    (
                        <div className="item" onClick={()=>history.push(`/singlepost/${post._id}`)} o key={index}><img  src={post.photo} alt=""  /></div>

                    )
                )}
            </div>
        </div>
    )
}

export default Profile
