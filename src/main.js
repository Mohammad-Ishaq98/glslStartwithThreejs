import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//orbit
const orbit = new OrbitControls( camera, renderer.domElement );
camera.position.z = 12;
orbit.update();

//uniforms for GLSL
const uniforms = {
	u_time : { type : 'f', value : 0.0 },
	u_resolution : { type : 'v2', value : new THREE.Vector2( window.innerWidth, window.innerHeight ).multiplyScalar( window.devicePixelRatio )
	}
};

// geometry by GLSL
const geometry = new THREE.PlaneGeometry( 10, 10, 30, 30 );
const material = new THREE.ShaderMaterial( {
	vertexShader : document.getElementById('vertexShader').textContent,
	fragmentShader : document.getElementById('fragmentShader').textContent,
	wireframe : false,
	uniforms
} );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// clock

const clock = new THREE.Clock();

function animate() {
	uniforms.u_time.value = clock.getElapsedTime();
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

animate();