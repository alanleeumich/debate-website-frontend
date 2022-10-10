import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import App from '../App';
import { useNavigate } from "react-router-dom";
import Waiting from '../components/Waiting';

function Message(props){
    return <li><div className='message'>{props.content}</div></li>
}

const Room = () =>{

    const api = "squabblegoblin-backend.herokuapp.com"
    const { roomName } = useParams()
    const { side } = useParams()
    const { community } = useParams()
    const [roomFull, setRoomFull] = useState(false)

    const chatSocket = useRef(null);

    const [messages, setNewMessage] = useState([]);



    const navigate = useNavigate();
    useEffect(() =>{
        if (roomFull){
        const messageField = document.getElementsByClassName("messageField")[0];
        messageField.scrollTo(0,messageField.scrollHeight + 1000);
        }
    },[messages])

    useEffect(() => {
        chatSocket.current = new WebSocket(
            'wss://'
            + api
            + '/ws/chat/'
            + roomName
            + '/'
        )
        

        chatSocket.current.onmessage = function(e) {
            console.log("message recieved")
            let data = JSON.parse(e.data)
            if (data["type"] == "server"){
                
                if (data["message"]["content"] == "room_full_status" && data["message"]["status"]){
                    setRoomFull(true)
                }
                else if (data["message"]["content"] == "DISCONNECT"){
                    navigate("/")
                }
            }
            else{
                setNewMessage( messages => [...messages,data["message"]])
                

                
                console.log(messages)
            }
        }
        chatSocket.current.onclose = function(e) {
            console.log('Chat socket closed unexpectedly')
            navigate("/communities/"  + community)
        }
    }, []);

    let sendMessage = () => {
        const messageInputDom = document.querySelector('#chat-message-input');
        const message = messageInputDom.value;
        if (message == ""){
            return
        }
        
        chatSocket.current.send(JSON.stringify({
            'message': message
        }));
        messageInputDom.value = '';
    };

    document.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("submit").click();
        }
      });

    if (roomFull){
    return (
        
        <div className="App">
            
            <div className = "messagePanel">
                <div className='sideCover'></div>
                <div className='middle'>
                    <h1>{roomName} : {side}</h1>
                    <div className='messageField'>
                        <ul>
                            {messages.map((message, index) => <Message key = {index} content = {message}/>)}
                        </ul>
                    </div>
                    <div className= 'typeField'>
                        <input id="chat-message-input" type="text" size="100"></input>
                        <button id = "submit" onClick={sendMessage}>SUBMIT</button>
                    </div>
                    
                </div>
                <div className='sideCover'></div>
            </div>
           
        </div>
    )    
    }
    else{
        return (
        <div className="App"> 
            <Waiting/>
        </div>)
    }
}   

export default Room;