import React, { useRef, useEffect } from 'react'

export function ReactCanvas (props){
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    alert('attempt callback function')
    try{
        props.callbackFunction()
    }
    catch(err){
        alert(err);
    }
  }, [])
  
  return <canvas ref={canvasRef} {...props.canvasProps}/>
//   return <canvas {...props}/>

}

