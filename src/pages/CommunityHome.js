import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";

const CommunityHome = () =>{

    const navigate = useNavigate();
    const { community } = useParams()
    const [prompt, setPrompt] = useState("");
    const api = "https://squabblegoblin-backend.herokuapp.com"

    let getPrompt = async() =>{
        let response = await fetch(api + '/api/get-prompt',{
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"community" : community})
          
        })
        let data = await response.json()
        console.log(data)
        setPrompt(data)
        
    }


    let joinRoomAff = async() =>{
        let response = await fetch(api + '/api/join',{
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"side" : "aff","community" : community})
          
        })
        let data = await response.json()
        console.log(data)
        navigate("/rooms/" + data + "/aff") 
    }
    let joinRoomNeg = async() =>{
        let response = await fetch(api + '/api/join',{
            method: "PUT",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"side" : "neg", "community" : community})
        })
        let data = await response.json()
        console.log(data)
        navigate("/rooms/" + data + "/neg")
        
    }
    
    useEffect(() =>{
        getPrompt()
    },[])

    return (
        <div className="App">
            <div className="homePanel">
                <div className = "prompt">
                    <h1>{prompt}</h1>
                </div>
                <div className="buttons">
                    <button id = "agree" onClick={joinRoomAff}>agree</button>
                    <button id = "disagree" onClick={joinRoomNeg}>disagree</button>
                </div>
                
            
            </div>


        </div>
    );
}

export default CommunityHome;