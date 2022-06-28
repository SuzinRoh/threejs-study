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

        //창크기가 변경될 때마다 창 사이즈 재설정 해야함
        window.onresize = this.resize.bind(this);
        this.resize();
        
        requestAnimationFrame(this.render.bind(this));
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