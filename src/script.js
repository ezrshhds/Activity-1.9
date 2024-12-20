import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

const loadingManager = new THREE.LoadingManager()
    loadingManager.onStart = () =>
    {
        console.log('loading started')
    }
    loadingManager.onLoad = () =>
    {
        console.log('loading finished')
    }
    loadingManager.onProgress = () =>
    {
        console.log('loading progressing')
    }
    loadingManager.onError = () =>
    {
        console.log('loading error')
    }
const textureLoader = new THREE.TextureLoader(loadingManager)

const realm1 = textureLoader.load('/realm1.png');
const realm2 = textureLoader.load('/realm2.png');
const realm3 = textureLoader.load('/realm3.png');
const realm4 = textureLoader.load('/realm4.png');
const realm5 = textureLoader.load('/realm5.png');
const realm6 = textureLoader.load('/realm6.png');
const CanvasBG = textureLoader.load('/bg.png')

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
scene.background = CanvasBG; 

// Cube geometry and material
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = [
    new THREE.MeshBasicMaterial({ map: realm1 }),
    new THREE.MeshBasicMaterial({ map: realm2 }),
    new THREE.MeshBasicMaterial({ map: realm3 }),
    new THREE.MeshBasicMaterial({ map: realm4 }),
    new THREE.MeshBasicMaterial({ map: realm5 }),
    new THREE.MeshBasicMaterial({ map: realm6 }),
];
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Window size update
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Fullscreen functionality
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;  // Smooth damping
controls.enableZoom = true;     // Enable zooming

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Mouse control
let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;

window.addEventListener('mousedown', () => {
    isMouseDown = true;
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

window.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        mouseX = (event.clientX / sizes.width) * 2 - 1;
        mouseY = (event.clientY / sizes.height) * 2 - 1; // Reverse y-axis
    }
});

// Create clock for time-based animations
const clock = new THREE.Clock();

// Animation loop
const tick = () => {
    // Get elapsed time
    const elapsedTime = clock.getElapsedTime();

    // Cube rotation based on mouse position
    mesh.rotation.y += mouseX * Math.PI; // Horizontal mouse movement
    mesh.rotation.x += mouseY * Math.PI; // Vertical mouse movement

    // Render
    renderer.render(scene, camera);

    // Call next frame
    window.requestAnimationFrame(tick);
};

tick();
