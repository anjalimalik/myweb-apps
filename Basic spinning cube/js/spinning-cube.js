"use strict";

var scene, camera, renderer;
var cube;
var w  = window.innerWidth;
var h = window.innerHeight;

init();
render();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, w/h, 0.01, 10);  // using a perspective camera
    camera.position.set(5, 5, 5); // move the camera
    camera.lookAt(scene.position); // orientate to look at the center of the scene

    renderer = new THREE.WebGLRenderer({ antialias: true }); // making WebGL
    renderer.setSize(w, h);

    initCube();
    document.body.appendChild(renderer.domElement); // appending renderer into the DOM
}

function render() {
  requestAnimationFrame(render); //efficient way to call function periodically
  cubing();
  renderer.render(scene, camera);
}

function initCube() {
    var geometry = new THREE.CubeGeometry(2, 2, 2); // set cube geometry 
    //var material = new THREE.MeshBasicMaterial({ color: 0xffacac  }, { aoMapIntensity: 0.5}, { wireframe: true }); // material of the cube
    var material = new THREE.MeshNormalMaterial();
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube); // add to the scene
}

function cubing(){
    cube.rotation.x -= 0.02;
    cube.rotation.y -= 0.02;
    cube.rotation.z -= 0.02;
}
