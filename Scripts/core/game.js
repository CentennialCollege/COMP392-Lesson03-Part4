/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var Camera = THREE.Camera;
var PerspectiveCamera = THREE.PerspectiveCamera;
var OrthographicCamera = THREE.OrthographicCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var CameraHelper = THREE.CameraHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var DirectionalLight = THREE.DirectionalLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var directionalLightHelper;
var cube;
var plane;
var sphere;
var ambientLight;
var ambientColour;
var spotLight0;
var spotLight1;
var directionalLight;
var pointColour;
var pointLight;
var control;
var gui;
var stats;
var step = 0;
var invert = 1;
var phase = 0;
var target;
var stopMovingLight = false;
var planeMaterial;
var planeGeometry;
var cubeMaterial;
var cubeGeometry;
var sphereMaterial;
var sphereGeometry;
var sphereLight;
var sphereLightMaterial;
var sphereLightMesh;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    planeGeometry = new THREE.PlaneGeometry(600, 200, 20, 20);
    planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    plane = new gameObject(planeGeometry, planeMaterial, 15, -5, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    // Add a Cube to the Scene
    cubeMaterial = new LambertMaterial({ color: 0xff3333 });
    cubeGeometry = new CubeGeometry(4, 4, 4);
    cube = new gameObject(cubeGeometry, cubeMaterial, -4, 3, 0);
    scene.add(cube);
    console.log("Added Cube Primitive to the Scene");
    // Add a Sphere to the Scene
    sphereGeometry = new SphereGeometry(4, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0x7777ff });
    sphere = new gameObject(sphereGeometry, sphereMaterial, 20, 0, 2);
    scene.add(sphere);
    console.log("Add a Sphere Primitive");
    // Add an AmbientLight to the scene
    ambientColour = "#1c1c1c";
    ambientLight = new AmbientLight(ambientColour);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight0 = new SpotLight(0xffffff);
    spotLight0.position.set(-40, 60, -10);
    spotLight0.lookAt(plane.position);
    scene.add(spotLight0);
    console.log("Added Spot Light 0 to Scene");
    target = new Object3D();
    target.position = new Vector3(5, 0, 0);
    // Add a PointLight to the scene
    pointColour = "#ff5808";
    directionalLight = new DirectionalLight(pointColour);
    directionalLight.position.set(-40, 60, -10);
    directionalLight.castShadow = true;
    directionalLight.shadowCameraNear = 2;
    directionalLight.shadowCameraFar = 200;
    directionalLight.shadowCameraLeft = -50;
    directionalLight.shadowCameraRight = 50;
    directionalLight.shadowCameraTop = 50;
    directionalLight.shadowCameraBottom = -50;
    directionalLight.intensity = 0;
    directionalLight.shadowMapHeight = 1024;
    directionalLight.shadowMapWidth = 1024;
    scene.add(directionalLight);
    console.log("Added Directional Light to Scene");
    // add the camera helper object to show debug information
    directionalLightHelper = new CameraHelper(directionalLight.shadow.camera);
    // Add a small sphere simulating the pointLight
    sphereLight = new SphereGeometry(0.2);
    sphereLightMaterial = new MeshBasicMaterial({ color: 0xac6c25 });
    sphereLightMesh = new Mesh(sphereLight, sphereLightMaterial);
    sphereLightMesh.castShadow = true;
    sphereLightMesh.position = new Vector3(3, 20, 3);
    scene.add(sphereLightMesh);
    console.log("Added a Sphere Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0.03, 0.03, ambientColour, pointColour, 0.5, 0, 30, 0.1, false, true, false, "Plane");
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
// Change the Camera Aspect Ratio according to Screen Size changes
function onResize() {
    if (camera instanceof PerspectiveCamera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.addColor(controlObject, 'ambientColour').onChange(function (color) {
        ambientLight.color = new Color(color);
    });
    gui.addColor(controlObject, 'pointColour').onChange(function (color) {
        directionalLight.color = new Color(color);
    });
    gui.add(controlObject, 'intensity', 0, 5).onChange(function (intensity) {
        directionalLight.intensity = intensity;
    });
    gui.add(controlObject, 'debug').onChange(function (flag) {
        if (flag) {
            scene.add(directionalLightHelper);
        }
        else {
            scene.remove(directionalLightHelper);
        }
    });
    gui.add(controlObject, 'castShadow').onChange(function (flag) {
        directionalLight.castShadow = flag;
    });
    gui.add(controlObject, 'target', ['Plane', 'Sphere', 'Cube']).onChange(function (target) {
        console.log(target);
        switch (target) {
            case "Plane":
                directionalLight.target = plane;
                break;
            case "Sphere":
                directionalLight.target = sphere;
                break;
            case "Cube":
                directionalLight.target = cube;
                break;
        }
    });
}
// Add Stats Object to the Scene
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    //rotate the cube around its axes
    cube.rotation.x += control.rotationSpeed;
    cube.rotation.y += control.rotationSpeed;
    cube.rotation.z += control.rotationSpeed;
    //bounce the sphere up and down
    step += control.bouncingSpeed;
    sphere.position.x = 20 + (10 * (Math.cos(step)));
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));
    // move the light simulation
    sphereLightMesh.position.z = -8;
    sphereLightMesh.position.y = +(27 * (Math.sin(step / 3)));
    sphereLightMesh.position.x = 10 + (26 * (Math.cos(step / 3)));
    //move pointLight along with SphereLightMesh
    directionalLight.position.set(sphereLightMesh.position.x, sphereLightMesh.position.y, sphereLightMesh.position.z);
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -35;
    camera.position.y = 30;
    camera.position.z = 25;
    camera.lookAt(new Vector3(10, 0, 0));
    console.log("Finished setting up Initial Camera...");
}
//# sourceMappingURL=game.js.map