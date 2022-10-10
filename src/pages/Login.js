
import { useNavigate } from "react-router-dom";
import UserProfile from '../components/UserProfile';


const Login = () =>{
   
    const api = "https://squabblegoblin-backend.herokuapp.com"
    const navigate = useNavigate();
    let sendUser = async() =>{
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value

        let response = await fetch(api + '/api/login',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username" : username,"password" : password}),
            credentials: 'include'
            
          })
        let data = await response.json()
        
        console.log(data)
        if (data == "successful login"){
            UserProfile.setUsername(username)
            UserProfile.setPassword(password)
            navigate("/user/" + username)

        }
    }
   
    return(
        <div>
            <h1>login</h1>
            username:
            <input id = "username"  autocomplete="off" ></input>
            password:
            <input id = "password"  autocomplete="off"></input>
            <button onClick = {sendUser}>SUBMIT</button>
        </div>


    );
}

export default Login;