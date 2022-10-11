import { useNavigate } from "react-router-dom";
import UserProfile from '../components/UserProfile';


const CreateUser = () =>{
   
    const api = "https://squabblegoblin-backend.herokuapp.com"
    const navigate = useNavigate();
    let sendUser = async() =>{
        let username = document.getElementById("username").value
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value

        let response = await fetch(api + '/api/create-user',{
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username" : username,"email" : email,"password" : password})
            
          })
        let data = await response.json()
        console.log(data)
        if (data == "user already exists"){
            window.alert("Username already taken")
        }
        else{
            UserProfile.setUsername(username)
            UserProfile.setPassword(password)
            navigate("/user/" + username)
        }
    }
   
    return(
        <div>
            <h1>create user</h1>
            username:
            <input id = "username"  autocomplete="off" ></input>
            email:
            <input id = "email"  autocomplete="off" ></input>
            password:
            <input id = "password"  autocomplete="off"></input>
            <button onClick = {sendUser}>SUBMIT</button>
        </div>


    );
}

export default CreateUser;