import { useState } from "react";
import { useEffect } from "react";

function Waiting() {

    const [periods, setPeriods] = useState("");
    useEffect(() => {
        setTimeout(() => {
            if (periods.length > 2){
                setPeriods("");
            }
            else{
                setPeriods((periods) => periods + ".");
            }
            
        }, 800);
      });


    return(
    <div className="App">
        <div className="waitingBack">
        </div>
        <div className="waitingPanel">
            <h1>Waiting{periods}</h1>

        </div>
        
    </div>
    )
}

export default Waiting;