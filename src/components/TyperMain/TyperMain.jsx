import './TyperMain.css';
import {useState,useRef, useEffect} from 'react'
import {getNewStory} from './TyperMain.service';
import Signal from '../Signal/Signal';
import Progress from '../Progress/Progress'
let typerMain = () => {
    const [typerText,setTyperText] = useState('');
    const [typerActive,setTyperActive] = useState(false);
    const [checkedIndex,setcheckedIndex] = useState(0);
    const [lavaMode,setLavaMode] = useState(false);
    const [timer,setTimer] = useState(0);
    const [finished,setFinished] = useState(false);
    const [pulverized,setPulverized] = useState(false);
    const [correct,setCorrect] = useState(0);
    const [wrongs,setWrongs] = useState(0);
    const [helpMenu,setHelpMenu] = useState(false);
    const inpRef = useRef();
    const signalRef = useRef();
    
    useEffect(()=>{
        startStory();
    },[]);

    let startStory = () => {
        let story = getNewStory();
        setTyperText(story);
    }    

    let focusOnInput = ()=> {
        setTyperActive(true);
        inpRef.current.focus();
        // console.log("active")
        if(!typerActive){
            // console.log("Called timer")
            signalRef.current.startMainTimer();
        }
    }
    let checkIfPhone = () =>{
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };
    let handleChange = (event)=>{
        let key = event.key;
        if(key&&key.length>0&&!lavaMode){
            if(checkedIndex<typerText.length-1){
                if(typerText[checkedIndex]==key){
                    setcheckedIndex((checkedIndex)=>checkedIndex+1);
                    setCorrect(score=>score+1);
                }else{
                   //mark errors 
                   setWrongs(score=>score+1);
                }
            }else{
                addContinuation();
            }  
        }else{
            pulverize();
        }
    }
    let survived = ()=>{
        clearAllState();
        setPulverized(false);
        setFinished(true)
    }
    let pulverize = ()=>{
        signalRef.current.stopAllTimers();
        clearAllState();
        setPulverized(true);
        setFinished(true)
    }
    let replay = () => {
        startStory();
        setCorrect(0);
        setWrongs(0);
        setPulverized(false);
        setFinished(false);
    }
    let restart = () => {
        signalRef.current.stopAllTimers();
        clearAllState();
        replay()
    }
    let clearAllState = ()=>{
        signalRef.current.initSignal();
        setcheckedIndex(0);
        setTyperActive(false);
        inpRef.current.blur();
        inpRef.current.value=null;
        isLooking(false);   
    }
    let addContinuation = ()=>{
        setcheckedIndex(0);
        startStory();
    }
    let openHelp = () =>{
        if(!finished){
            restart();
        }
        setHelpMenu(true)
    }
    let closeHelp = ()=>{
        setHelpMenu(false)
    }
    // splits story to spans for each letter track
    let spanMaker = (str)=>{
        let letters = []
        for(let i=0;i<str.length;i++){
            if(i<checkedIndex){
                letters.push(<span key={i} className={"typed cursor"}>{str[i]}</span>)
            }else{
                letters.push(<span key={i}>{str[i]}</span>)
            }
            
        }
        return letters;
    }

    let isLooking = (bool)=>{
        setLavaMode(bool);
    }
    let changeMainTimer = (val)=>{
        setTimer(val);
    }
    let calcScore = ()=>{
        let score = 5*(correct-wrongs)
        return score<0?0:score;
    }
    let calcTMRatio = ()=>{
        let ratio;
        if(wrongs>0){
            ratio = correct/wrongs;
            ratio = ratio.toFixed(2)
        }else{
            ratio = null;
        }
        return ratio;
    }

    let whatToShow = ()=>{
        if(checkIfPhone()){
            return(
                <>
                <div className='top-panel-left' style={{marginTop:'20px'}}>
                        <div className="eye1">
                            <div className="shut1">
                                <span></span>
                            </div>
                            <div className="ball1">
                            </div>
                        </div>
                        <div className='right-title-text'>
                            <div className='top-panel-title'>
                                Iype 
                            </div>
                            <div>
                                It's watching you.
                            </div>
                        </div>
                    </div>
                    <div style={{margin:'40px 25px',fontSize:'18px',color:"#7e4f24",textAlign:'center'}}>
                        🙏 Sorry but this game is meant to be played on the <strong>desktop</strong>. 
                        Your fingers on the phone are pretty fast!
                    </div>
                    <div className='socials-main'>
                    <div>
                        Made with &#9829; by <a href='https://www.linkedin.com/in/shenoyaditya/' className='profile-link'>Aditya Shenoy</a>
                    </div>
                    <a href="https://www.buymeacoffee.com/shenoyaditya">
                        <div className="socials-button">
                            ☕️ Buy me a coffee!
                        </div>
                    </a>
                    
                </div>
                </>
            )
        }else{
            if(!finished){
                return (
                <div className='typer-inner-container'>
                    <div className='timer-text'>
                        {lavaMode?<span className='light-text'>{timer}</span>:<span className='dark-text'>{timer}</span>}         
                    </div>
                    <Signal ref={signalRef} isLooking={(bool)=>{isLooking(bool)}} displayMainTime={(val)=>changeMainTimer(val)} survived={survived}/>
                    <div className='typer-box-container'>
                        <Progress bgcolor={'rgb(105, 177, 244)'} progress={(checkedIndex/typerText.length)*100} height={'0.25rem'}/>
                        <div className='typer-box' onClick={focusOnInput}>
                            {spanMaker(typerText)}
                        </div>
                        <div className='start-text' onClick={focusOnInput}>
                            {!typerActive?"Tap to begin!":"Start typing. Don't get caught!"}
                        </div>
                    </div>          
                    <input type="text" className='h-inp' ref={inpRef} onKeyDown={handleChange}/> 
                </div>
                );
            }else{
                return (
                <div className='typer-inner-container'>
                    {pulverized?<div className='boo-title'>😵 Pulverized!</div>:<div className='yay-title'>😱 Survived!</div>}
                    <div className='score'>
                        Score: {calcScore()}
                    </div>
                    <div>
                        Correct: {correct}
                    </div>
                    <div>
                        Mistyped: {wrongs}
                    </div>
                    <div>
                        T/M Ratio: {calcTMRatio()?calcTMRatio():'NA'}
                    </div>
                    <div className='replay' onClick={replay}>
                        <div className="nmrf">
                            &#x21bb;
                        </div>
                        <div style={{marginTop:'10px',fontWeight:'500',color:'#7e4f24'}}>I can do better.</div>
                    </div>
                </div>
                );
            }
        }
        
    }

    return (
        <>
        {!checkIfPhone() && (<div className='__nav'>
            <div className='left-optns'>
               {(!finished)&& (<div className="nmrf" onClick={restart}>
                    &#x21bb;
                </div>)} 
                <div className="nmrf" onClick={openHelp}>
                    ?
                </div>
            </div>
        </div>)}
        <div className='typer-main-container'>
            {whatToShow()}
        </div>
        <div className={helpMenu?'pop-over':'pop-over-hide'}>
            <div className='pop-over-card'>
                <div className='top-panel'>
                    <div className='top-panel-left'>
                        <div className="eye1">
                            <div className="shut1">
                                <span></span>
                            </div>
                            <div className="ball1">
                            </div>
                        </div>
                        <div className='right-title-text'>
                            <div className='top-panel-title'>
                                Iype 
                            </div>
                            <div>
                                It's watching you.
                            </div>
                        </div>
                    </div>
                    <div className="nmrf modal-close" onClick={closeHelp}>
                        &times;
                    </div>
                </div>
                
                <div className='bold-title'>
                    How to play?
                </div>
                <div className='about-text'>
                    <p>You have <strong>60</strong> seconds. Type your brains out to score points, when the eye is shut. 
                    You get pulverized 👁 if the eye catches you typing.</p>
                    <p>
                        And yes, the text never stops regenerating, so good luck typing forever! 
                        That is until the timer runs out.
                    </p>
                </div>
                <div className='socials-main'>
                    <div>
                        Made with &#9829; by <a href='https://www.linkedin.com/in/shenoyaditya/' className='profile-link'>Aditya Shenoy</a>
                    </div>
                    <a href="https://www.buymeacoffee.com/shenoyaditya">
                        <div className="socials-button">
                            ☕️ Buy me a coffee!
                        </div>
                    </a>
                    
                </div>
            </div>
        </div>
        </>
    
    );
}



export default typerMain;