import { useStopwatch } from 'react-timer-hook';
import React, { useEffect } from 'react';

export function Stopwatch(props){
    var {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      reset,
    } = useStopwatch({ autoStart: false });
  
    React.useEffect(() => {
      // alert(props.stopwatchState)
      
        switch(props.stopwatchState){
            case "pause":
                pause();
                break;
            case "resume":
                start();
                break;
            case "start":
                reset();
                break;
            case "reset":
                reset();
                pause();
                seconds = 0;
                minutes = 0;
                hours = 0;
                days = 0;
                break;
            default:
                // alert(`State ${props.stopwatchState} does not exist`)
                break;
      }
    }, [props.stopwatchState]);
    
    return(
      <div>
        <span>{`0${minutes}`.slice(-2)}</span>:<span>{`0${seconds}`.slice(-2)}</span>
      </div>
    )
  
  }