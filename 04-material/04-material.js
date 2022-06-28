import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { LineBasicMaterial } from 'three';
import { Texture } from 'three';
import { VertexNormalsHelper} from 'VertexNormalsHelper';

class App {
    constructor() {
        // _name -> privete object 외부에서 호출하면 안됌
        const divContainer = document.querySelector('#webgl-container');
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });/**antialias 계단현상제거 */
        renderer.setPixelRatio(window.devicePixelRatio);//
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLigth();
        this._setupModel();
        this._setupControls();
        
        //창크기가 변경될 때마다 창 사이즈 재설정 해야함
        window.onresize = this.resize.bind(this);
        this.resize();
        
        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 3;
        this._camera = camera;
        this._scene.add(camera);
    }

    _setupLigth() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        this._scene.add(ambientLight);

        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._camera.add(light);
       
    }

    _setupModel() {
    //    const material = new THREE.MeshBasicMaterial({
    //         visible: true,
    //         transparent: false,
    //         opacity:1,
    //         depthTest:true,
    //         depthWrite:true,
    //         side: THREE.DoubleSide,
    //         color: "#21e2d8",
    //        wireframe: false
    //    })

    //   const material = new THREE.MeshLambertMaterial({
    //         side: THREE.DoubleSide,
    //         color: "#d25393",
    //         emissive: 0x555500,
    //         wireframe: false
    //   });

//     const material = new THREE.MeshPhongMaterial({
//         side: THREE.DoubleSide,
//         color: "#d25393",
//         specular:"##01b5a9",
//         shininess: 1000,
//         flatShading: true,
//         emissive: 0x555500,
//         wireframe: false
//   });
        const textureLoader = new THREE.TextureLoader();
        const map = textureLoader.load("../image/glass/drive-download-20220628T024507Z-001/Glass_Window_002_basecolor.jpg");
        const mapNormal = textureLoader.load("../image/glass/drive-download-20220628T024507Z-001/Glass_Window_002_normal.jpg");
        const mapHeigth = textureLoader.load("../image/glass/drive-download-20220628T024507Z-001/Glass_Window_002_height.png");
        const mapAo = textureLoader.load("../image/glass/drive-download-20220628T024507Z-001/Glass_Window_002_ambientOcclusion.jpg");
        const mapRoughness = textureLoader.load("../image/glass/drive-download-20220628T024507Z-001/Glass_Window_002_roughness.jpg");
        const mapMetalic = textureLoader.load("../image/glass/drive-download-20220628T024507Z-001/Glass_Window_002_metallic.jpg");
        const mapAlpha = textureLoader.load("../image/glass/drive-download-20220628T024507Z-001/Glass_Window_002_opacity.jpg");
        //const mapLight

        const material = new THREE.MeshStandardMaterial({
            map: map,
            normalMap : mapNormal,
            displacementMap : mapHeigth,
            displacementScale: 0.2,
            displacementBias: -0.15,
            aoMap: mapAo,
            aoMapIntensity:10,
            roughnessMap: mapRoughness,
            roughness: 1,
            metalnessMap: mapMetalic,
            metalness: 0.3,
            alphaMap: mapAlpha, 
            transparent: true,
            side: THREE.DoubleSide


        });
       const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 256, 256, 256), material);
       box.position.set(-1, 0, 0);
       box.geometry.attributes.uv2 = box.geometry.attributes.uv;
       this._scene.add(box);

    //    const boxHelper = new VertexNormalsHelper(box, 0.1, 0xffff00);
    //    this._scene.add(boxHelper);

       const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 512, 512), material);
       sphere.position.set(1,0,0);
       sphere.geometry.attributes.uv2 = sphere.geometry.attributes.uv;
       this._scene.add(sphere);

    //    const sphereHelper = new VertexNormalsHelper(sphere, 0.1, 0xffff00);
    //    this._scene.add(sphereHelper);
      }
    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.001;
    }
}

window.onload = function() {
    new App();
}