import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';
import * as dat from 'lil-gui';

const element = {
  width: 0.5,
}

// camera
const camera = new THREE.OrthographicCamera(window.innerWidth / - ( 2 / element.width ), window.innerWidth / ( 2 / element.width ), window.innerHeight / 2, window.innerHeight / - 2,  -100000, 100000);
camera.position.set(52.39, 1000.55, 227.45);
camera.quaternion.setFromEuler(new THREE.Euler(-1.47, 0.01, 0.06));

// scene
const scene = new THREE.Scene();

// spline scene
const loader = new SplineLoader();
loader.load(
  'https://prod.spline.design/byCU0fH3aWp6yAH6/scene.splinecode',
  (splineScene) => {
    scene.add(splineScene);
  }
);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth * element.width, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

scene.background = new THREE.Color('#e0e8ff');
renderer.setClearAlpha(1);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.125;

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
  camera.left = window.innerWidth / - ( 2 / element.width );
  camera.right = window.innerWidth / ( 2 / element.width );
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / - 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * element.width, window.innerHeight);
}

function animate(time) {
  controls.update();
  renderer.render(scene, camera);
}

// Debug UI
const gui = new dat.GUI();

gui.add( element, 'width', 0.1, 1).onChange( onWindowResize ).name( 'Width (ratio)' )
