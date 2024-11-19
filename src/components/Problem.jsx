import React from "react";
import roadmap from "../images/roadmap.png";
import course from "../images/course.png";
import expert from "../images/expert.png";
import resume from "../images/resume.png";
function Problem(){
    React.useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
        script.type = 'module';
        document.head.appendChild(script);
    
        return () => {
          document.head.removeChild(script);
        };
      }, []);
    return(
        <div>
            <div className="block-one">
                <div className="purple tile-one">
                    <div>Generate Roadmap</div>
                    <img src={roadmap} alt="roadmap" /> 
                </div>
                <div className="grey tile-two">
                    <div>
                    <dotlottie-player
                    src="https://lottie.host/e9c4f86e-cfe3-49af-844c-fd727bda9aa3/ojj9HhBaix.json"
                    background="#dadce0"
                    speed="1"
                    style={{ width: '60px', height: '60px' }}
                    loop
                    autoplay
                ></dotlottie-player>
                    </div>
                </div>
                <div className="green tile-three">
                    <div>Curated Course</div>
                    <img src={course}></img>
                </div>
            </div>
            <div className="block-two">
                <div className="tile-four black">
                    <div>Interact <br/> with <br/>Experts</div>
                    <img src={expert}></img>
                </div>
                <div className="tile-five ">
                    <div>Upskill with <br/> Pathify</div>
                </div>
                <div className="tile-six">
                    <img src={resume} alt="roadmap" />
                    <div>Resume Screening</div>
                </div>
            </div>
        </div>
    )
}

export default Problem;