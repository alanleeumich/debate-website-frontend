import { useParams } from 'react-router-dom'
import UserProfile from '../components/UserProfile';
import { useState } from "react";
import { useEffect } from "react";
const User = () =>{
   
    const api = "https://squabblegoblin-backend.herokuapp.com"
    const {username} = useParams()
    const [data, setData] = useState(null);
    const [communityNames, setCommunityNames] = useState([])
    let getUser = async() =>{
       

        let response = await fetch(api + '/api/get-user',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {"auth":
                    {
                        "username": UserProfile.getUsername(),
                        "password": UserProfile.getPassword()
                    },
                }),
            credentials: 'include'
            
          })
        let data1 = await response.json()
        setData(JSON.parse(data1))
        
        //console.log(communities)
    }



    let addPrompt = async(community, promptContent) =>{
       

        let response = await fetch(api + '/api/add-prompt',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {"auth":
                    {
                        "username": UserProfile.getUsername(),
                        "password": UserProfile.getPassword()
                    },
                "community": community,
                "prompt": promptContent
                }),
            
            
          })
        let data = await response.json()
        console.log(data)
        getUser()
    }

    let deletePrompt = async(community, promptId) =>{
       

        let response = await fetch(api + '/api/delete-prompt',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {"auth":
                    {
                        "username": UserProfile.getUsername(),
                        "password": UserProfile.getPassword()
                    },
                "community": community,
                "promptId": promptId
                }),
            
            
          })
        let data = await response.json()
        console.log(data)
        getUser()
    }

    let makeCommunity = async(communityName, firstPrompt) =>{
       

      let response = await fetch(api + '/api/make-community',{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
              {"auth":
                  {
                      "username": UserProfile.getUsername(),
                      "password": UserProfile.getPassword()
                  },
              "community": 
                {
                  "name" :communityName,
                  "prompts": [firstPrompt]
                }
              }),
          
          
        })
      let data = await response.json()
      console.log(data)
      getUser()
  }

    


    useEffect(() =>{
        getUser()
    },[])
    
    useEffect(() =>{
      if (data != null){
        setCommunityNames(Object.keys(data))
      }
    },[data])
    
    function Prompt(props){
      return (
            <>
            {props.content} 
            <button onClick={() => deletePrompt(props.promptCommunity,props.id)}>DELETE</button>
            <br/>
            </>)
    }

    function Community(props) {
        
        return (
            <>
            <h2>{ props.name }</h2>
            <ul>
              {data[props.name].map((prompt) => <Prompt content={prompt["content"]} id = {prompt["id"]} promptCommunity = {props.name}/>)}
            </ul>
            Create new prompt:<input id = {props.name + "-INPUT"}></input>
            <button onClick = {()=> {addPrompt(props.name,document.getElementById(props.name + "-INPUT").value);
                                    document.getElementById(props.name + "-INPUT").value = "";
                                    
                                }}>POST</button>

            </>
        );
    }

    function CommunityComponents() {
        
        
        return (
          <>
            <h1>Communities</h1>
            <ul>
              {communityNames.map((community) => <Community name={community} />)}
            </ul>
          </>
        );
      }
    
    //addPrompt()
    //deletePrompt()

    
    return(
        <div>
            {username}
            <CommunityComponents/>

            <h2>Make New Community</h2>
            Community Name: <input id = "newCommunityName"></input><br/>
            Prompt: <input id = "newCommunityPrompt"></input>
            <br/>
            <button onClick={() =>{makeCommunity(document.getElementById("newCommunityName").value,
                                                document.getElementById("newCommunityPrompt").value
                                    );
                                    document.getElementById("newCommunityName").value = "";
                                    document.getElementById("newCommunityPrompt").value = "";
                                    }}>CREATE</button>
        </div>


    );
}

export default User;