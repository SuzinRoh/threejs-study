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

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLigth();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();
        
        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

    _setupCamera() {
        // const camera = new THREE.PerspectiveCamera(
        //     75,
        //     window.innerWidth / window.innerHeight,
        //     1,
        //     50
        // );

        const aspect = window.innerWidth / window.innerHeight;
        const camera = new THREE.OrthographicCamera(
            -2*aspect, 2*aspect,
            2, -2,
            0.1, 100
        );

        camera.zoom = 1;

        camera.position.set(20, 7, 14);
        camera.lookAt(1, 12, 0);

        this._camera = camera;
    }

    _setupModel() {
      const groundGrometry = new THREE.PlaneGeometry(10, 10);
      const gorundMaterial = new THREE.MeshStandardMaterial({
          color: "#2c3e50",
          roughness: 0.5,
          metalness: 0.5,
          side: THREE.DoubleSide
      });
      const ground = new THREE.Mesh(groundGrometry, gorundMaterial);
      ground.rotation.x = THREE.Math.degToRad(-90);
      this._scene.add(ground);

      const bigShereGeometry = new THREE.SphereGeometry(1.5, 64, 64, 0, Math.PI);
      const bigShereMaterial = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          roughness: 0.1,
          metalness: 0.2,
      })
      const bigShere = new THREE.Mesh(bigShereGeometry, bigShereMaterial);
      bigShere.rotation.x = THREE.Math.degToRad(-90);
      this._scene.add(bigShere);

      const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
      const torusMaterial = new THREE.MeshStandardMaterial({
           color: "#9b59b6",
           roughness: 0.5,
           metalness: 0.9,
      });
      
      for(let i=0; i<8; i++) {
          const torusPivot = new THREE.Object3D();
          const torus = new THREE.Mesh(torusGeometry,torusMaterial);
          torusPivot.rotation.y = THREE.Math.degToRad(45 * i);
          torus.position.set(3, 0.5, 0);
          torusPivot.add(torus);
          this._scene.add(torusPivot);
      }

      const smallSphereGometry = new THREE.SphereGeometry(0.3, 32, 32);
      const smallSphereMaterial = new THREE.MeshStandardMaterial({
          color: "#e74c3c",
          roughness: 0.2,
          metalness: 0.5,
      });
      const smallSpherePivot = new THREE.Object3D();
      const smallSphere = new THREE.Mesh(smallSphereGometry, smallSphereMaterial);
      smallSpherePivot.add(smallSphere);
      smallSpherePivot.name = "smallSpherePivot";
      smallSpherePivot.position.set(3, 0.5, 0);
      this._scene.add(smallSpherePivot);
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }
    _setupLigth() {
        const ligth = new THREE.HemisphereLight("#ffc4d9","#5e7cff", 1);

        this._scene.add(ligth);
        this._light = ligth;
    }

    update(time) {
        time *= 0.001;

        const smallSpherePivot = this._scene.getObjectByName("smallSpherePivot");
        if(smallSpherePivot) {
            smallSpherePivot.rotation.y = THREE.Math.degToRad(time*50);

            // if(this._light.target) {
            //     const smallSphere = smallSpherePivot.children[0];
            //     smallSphere.getWorldPosition(this._light.position);

            //     if(this._lightHelper) this._lightHelper.update();
            // }
        }
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }
}

window.onload = function() {
    new App();
}