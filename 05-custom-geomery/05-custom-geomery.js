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
        camera.position.z = 2;
        this._camera = camera;
    }

    _setupLigth() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    _setupModel() {
        const rowPositions = [
            -1, -1, 0,
            1, -1, 0,
            -1, 1, 0,
            1, 1, 0
        ];

        const rowNormals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        const rawColors= [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
            1, 1, 0
        ];
        const rawUVs = [
            0, 0,
            1, 0,
            0, 1,
            1, 1
        ]
        const positions = new Float32Array(rowPositions);
        const normals = new Float32Array(rowNormals);
        const colors = new Float32Array(rawColors);
        const uvs = new Float32Array(rawUVs);
        
        const geomerty = new THREE.BufferGeometry();

        geomerty.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geomerty.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geomerty.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geomerty.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
        // 정점의 배치 순서 반시계 방향
        geomerty.setIndex([
            0, 1, 2,
            2, 1, 3
        ]);
        
     
        //geomerty.computeVertexNormals();
        const textureLoader = new THREE.TextureLoader();
        const map = textureLoader.load("");

        const material = new THREE.MeshPhongMaterial({  color:0xffffff, 
            vertexColors: true,
           // map:map
        });
        const box = new THREE.Mesh(geomerty, material);
        this._scene.add(box);

        const helper = new VertexNormalsHelper(box, 0.1, 0xffff00);
        this._scene.add(helper);
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

window.onload = function() {
    new App();
}