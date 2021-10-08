import React,{ useRef, useState, useEffect }  from 'react';
import { Link } from "react-router-dom";
import { VRCanvas } from '@react-three/xr'
import { Canvas,extend,useFrame, useThree } from '@react-three/fiber'



function Box(props) {
    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }
  
function CameraControls(props) {
    const ref = useRef()
    const set = useThree(state => state.set)
    // Make the camera known to the system
    useEffect(() => void set({ camera: ref.current }), [])
    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld())
    return <perspectiveCamera ref={ref} {...props} />
}

export function VRPage(props){
    const [upKeyDown, setUpKeyDown] = useState(false);
    const [rightKeyDown, setRightKeyDown] = useState(false);
    const [downKeyDown, setDownKeyDown] = useState(false);
    const [leftKeyDown, setleftKeyDown] = useState(false);
    const [camX, setCamX] = useState(0);
    const [camY, setCamY] = useState(0);
    const [camZ, setCamZ] = useState(10);


    useEffect(() => { // load once
        // Update the document title using the browser API
        addCanvasEvents();
      }, []);

    useEffect(() => {
        if(upKeyDown){
            setCamZ(camZ-.001);
        }
        else if(downKeyDown){
            setCamZ(camZ+.001);
        };
        if(rightKeyDown){
            setCamX(camX+.001);
        }
        else if(leftKeyDown){
            setCamX(camX-.001);
        };
    }); // update

    function addCanvasEvents(){
        document.addEventListener("keydown", (e)=>{
            switch (e.key){
                case "ArrowUp":
                    e.preventDefault();
                    setUpKeyDown(true);
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    setDownKeyDown(true);
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    setleftKeyDown(true);
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    setRightKeyDown(true);
                    break;    
            }
        })
        
        document.addEventListener("keyup",(e)=>{
            switch (e.key){
                case "ArrowUp":
                    setUpKeyDown(false);
                    break;
                case "ArrowDown":
                    setDownKeyDown(false);
                    break;
                case "ArrowLeft":
                    setleftKeyDown(false);
                    break;
                case "ArrowRight":
                    setRightKeyDown(false);
                    break;
            }
        })
    }
    return (
    <div className="VRApp" >
         <VRCanvas>
         {/* <Camera position={[camX,camY,camZ]} /> */}
         <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} /> {/* All your regular react-three-fiber elements go here */}
        </VRCanvas>
    </div>
    )
  }