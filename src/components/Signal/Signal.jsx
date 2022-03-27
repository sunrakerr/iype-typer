import { useEffect,useState ,forwardRef, useImperativeHandle} from "react";
import './Signal.css';
import {getRandomIntInclusive,pauseStartIntervalMaker} from './Signal.service';
let signal = (props,ref) => {
    const [signal,setSignal] = useState(false);
    let mainTime = 60;
    let pauseTime = 5;//value doesnt matter
    let pauseIntervals = [];
    let mainTimer;
    let pauseTimer; 

    useEffect(()=>{
        initSignal();
    },[]);

    useImperativeHandle(ref, () => ({
        startMainTimer,initSignal,stopAllTimers
    }), [])

    let setTimes = ()=>{
        mainTime = 60;
        pauseTime = 5;//value doesnt matter
    }

    let initSignal = () => {
        // setMainTime(60);
        setTimes()
        pauseIntervals = pauseStartIntervalMaker(60,10)
        props.displayMainTime(mainTime);
        stopMainTimer();
        stopPauseTimer();
        setSignal(true);
    }
    let startMainTimer = ()=>{
        setSignal(false);
        mainTimer = setInterval(countDownMainTime,1000);
    }
    let startPauseTimer = ()=>{
        setSignal(true);
        props.isLooking(true);
        let time = getRandomIntInclusive(2,3); //time till the eye is open
        // setPauseTime(time);
        pauseTime = time;
        pauseTimer = setInterval(countDownPauseTime,1000);
    }

    let countDownMainTime = ()=>{
        // console.log("Main timer: ",mainTime)
        let newTime = mainTime - 1;
        props.displayMainTime(newTime);
        if(newTime==0){
            stopAllTimers();
            props.survived();
        }else{
            // setMainTime(newTime);
            mainTime = newTime;
            
            if(pauseIntervals.includes(newTime)){
                clearInterval(mainTimer);
                startPauseTimer();
            }
        }
    }

    let stopAllTimers = ()=>{
        stopMainTimer();
        stopPauseTimer();
    }

    let stopMainTimer = ()=>{
        if(mainTimer){
            clearInterval(mainTimer)
        }
    }
    let stopPauseTimer = ()=>{
        if(pauseTimer){
            clearInterval(pauseTimer)
        }
    }

    let countDownPauseTime = ()=>{
        // console.log("Pause timer: ",pauseTime)
        let newTime = pauseTime - 1; 
        if(newTime<0){
            setSignal(false);
            props.isLooking(false);
            clearInterval(pauseTimer);
            if(mainTime>0){
                startMainTimer();
            }
        }else{
            // setPauseTime(newTime);
            pauseTime = newTime;
        }
    }

    if(signal){
        return(
            <div className="eye">
                <div className="shut">
                <span className="open"></span>
                </div>
                <div className="ball">
                </div>
            </div>
        );
    }else{
        return(
            <div className="eye">
                <div className="shut">
                <span className="closed"></span>
                </div>
                <div className="ball">
                </div>
            </div>
        );
    }
    
}

export default forwardRef(signal);