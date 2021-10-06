import * as THREE from "../node_modules/three/build/three.module.js"
// import {OrbitControls} from "../node_modules/three/examples/jsm/controls/OrbitControls.js"

let camera, scene, renderer;
let geometry,geometry2, material, mesh, mesh1;
let controls;
let board;

let upKeyDown = false;
let keyDown = false;
let leftKeyDown = false;//test
let rightKeyDown = false;

let xRot = 0;
let yRot = 0;

init();

function init() {


    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 3;

    scene = new THREE.Scene();

    board
    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    geometry2 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    
    mesh1 = new THREE.Mesh( geometry2, material )
    mesh1.translateOnAxis(new THREE.Vector3( 1, 0, 0) ,.4)

    scene.add( mesh );
    scene.add( mesh1 );


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );

    // controls = new THREE.OrbitControls( camera, renderer.domElement );


}

function animation( time ) {

    if (upKeyDown){
        xRot += .05;
    }
    if (keyDown){
        xRot -= .05;
    }
    if (rightKeyDown){
        yRot += .05;
    }
    if (leftKeyDown){
        yRot -= .05;
    }

    mesh.rotation.x = xRot;
    mesh.rotation.y = yRot;

    renderer.render( scene, camera );

}

document.addEventListener("keydown", (e)=>{
    switch (e.key){
        case "ArrowUp":
            e.preventDefault();
            upKeyDown = true;
            break;
        case "ArrowDown":
            e.preventDefault();
            keyDown = true;
            break;
        case "ArrowLeft":
            e.preventDefault();
            leftKeyDown = true;
            break;
        case "ArrowRight":
            e.preventDefault();
            rightKeyDown = true;
            break;
            
    }
})

document.addEventListener("keyup",(e)=>{
    switch (e.key){
        case "ArrowUp":
            upKeyDown = false;
            break;
        case "ArrowDown":
            keyDown = false;
            break;
        case "ArrowLeft":
            leftKeyDown = false;
            break;
        case "ArrowRight":
            rightKeyDown = false;
            break;
    }
})