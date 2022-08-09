import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';
import * as dat from 'lil-gui';

const element = {
  horizontal_ratio: 0.5,
  vertical_integer: 2,
}

// camera
const camera = new THREE.OrthographicCamera(window.innerWidth / - ( element.vertical_integer / element.horizontal_ratio ), window.innerWidth / ( element.vertical_integer / element.horizontal_ratio ), window.innerHeight / element.vertical_integer, window.innerHeight / - element.vertical_integer,  -100000, 100000);
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
renderer.setSize(window.innerWidth * element.horizontal_ratio, window.innerHeight);
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
  camera.left = window.innerWidth / - ( element.vertical_integer / element.horizontal_ratio );
  camera.right = window.innerWidth / ( element.vertical_integer / element.horizontal_ratio );
  camera.top = window.innerHeight / element.vertical_integer;
  camera.bottom = window.innerHeight / - element.vertical_integer;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * element.horizontal_ratio, window.innerHeight);
}

function animate(time) {
  controls.update();
  renderer.render(scene, camera);
}

// Debug UI
const gui = new dat.GUI();

gui.add( element, 'horizontal_ratio', 0.1, 1).onChange( onWindowResize ).name( 'Horizontal ratio' )
gui.add( element, 'vertical_integer', 0, 5).onChange( onWindowResize ).name( 'Vertical integer' )
