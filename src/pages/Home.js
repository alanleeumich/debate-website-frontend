import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();
    return(
    <div className>
        <h1>Home</h1>
        <button onClick={() => navigate("/communities/demo")}>DEMO COMMUNITY</button>
        <br/>
        <button onClick={() => navigate("/login")}>CREATE COMMUNITY</button>

    </div>
    )
}

export default Home;