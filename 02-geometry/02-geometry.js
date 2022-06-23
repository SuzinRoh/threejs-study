import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { LineBasicMaterial } from 'three';

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
        this._setpuControls();

        //창크기가 변경될 때마다 창 사이즈 재설정 해야함
        window.onresize = this.resize.bind(this);
        this.resize();
        
        requestAnimationFrame(this.render.bind(this));
    }

    _setpuControls() {
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
        camera.position.z = 15;
        this._camera = camera;
    }

    _setupLigth() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }
    // _setupModel() {
    //     const shape = new THREE.Shape();
    //     shape.moveTo(1, 1);
    //     shape.lineTo(1,-1);
    //     shape.lineTo(-1,-1);
    //     shape.lineTo(-1,1);
    //     shape.closePath();

    //     const geometry = new THREE.BufferGeometry();
    //     const points = shape.getPoints();
    //     geometry.setFromPoints(points);

    //     const meterial = new THREE.LineBasicMaterial({color: 0xffff00});
    //     const line = new THREE.Line(geometry, meterial);

    //     this._scene.add(line);
    // }

    // _setupModel() {
    //     class CustomSinCurve extends THREE.Curve {
    //         constructor(scale) {
    //             super();
    //             this.scale = scale;
    //         }
    //         getPoint(t) {
    //             const tx = t * 3 - 1.5;
    //             const ty = Math.sin(2 * Math.PI * t);
    //             const tz = 0;
    //             return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    //         }
    //     }
    //     const path = new CustomSinCurve(4);

    //     const geometry = new THREE.BufferGeometry();
    //     const points = path.getPoints(30);
    //     geometry.setFromPoints(points);

    //     const material = new THREE.LineBasicMaterial({color: 0xffff00});
    //     const line = new THREE.Line(geometry, material);

    //     this._scene.add(line);
    // }

    //tube
    // _setupModel() {
    //     class CustomSinCurve extends THREE.Curve {
    //         constructor(scale) {
    //             super();
    //             this.scale = scale;
    //         }
    //         getPoint(t) {
    //             const tx = t * 3 - 1.5;
    //             const ty = Math.sin(2 * Math.PI * t);
    //             const tz = 0;
    //             return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    //         }
    //     }
    //     const path = new CustomSinCurve(4);
    //     const geometry = new THREE.TubeGeometry(path, 5, 2, 2,true);

    //     const fillMaterial = new THREE.MeshPhongMaterial({color:0x515151});
    //     const cube = new THREE.Mesh(geometry, fillMaterial);

    //     const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
    //     const line = new THREE.LineSegments(
    //         new THREE.WireframeGeometry(geometry)
    //         , lineMaterial
    //     )

    //     const group = new THREE.Group();
    //     group.add(cube);
    //     group.add(line);

    //     this._scene.add(group);
    //     this._cube = group;
    // }
    _setupModel() {
        const points = [];
        for (let i = 0; i < 10; i++) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
        }

        const geometry = new THREE.LatheGeometry(points);
        
        const fillMaterial = new THREE.MeshPhongMaterial({color: 0x515151});
        const cube = new THREE.Mesh(geometry, fillMaterial);

        const lineMaterial = new LineBasicMaterial({color: 0x515151});
        const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

        const group = new THREE.Group();
        group.add(cube);
        group.add(line);

        this._scene.add(group);
        this._cube = group;
    }

    // _setupModel() {
    //     const shape = new THREE.Shape();
    //     const x = -2., y = -5;
    //     shape.moveTo(x +2.5,y +2.5 );
    //     shape.bezierCurveTo(x +2.5, y+2.5,x+2,y,x,y);
    //     shape.bezierCurveTo(x-3,y,x-3,y+3.5,x-3,y+3.5);
    //     shape.bezierCurveTo(x-3,y+5.5,x-1.5,y+7.7,x+2.5,y+9.5);
    //     shape.bezierCurveTo(x+6,y+7.7,x+8,y+4.5,x+8,y+3.5);
    //     shape.bezierCurveTo(x+8,y+3.5,x+8,y,x+5,y)
    //     shape.bezierCurveTo(x+3.5,y,x+2.5,y+2.5,x+2.5,y+2.5);



    //     const geometry = new THREE.ShapeGeometry(shape);
    //     const fillMaterial = new THREE.MeshPhongMaterial({color:0x515151});
    //     const cube = new THREE.Mesh(geometry, fillMaterial);

    //     const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
    //     const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), lineMaterial);

    //     const group = new THREE.Group();
    //     group.add(cube);
    //     group.add(line);

    //     this._scene.add(group);
    //     this._cube = group;
    // }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
       // this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    // update(time) {
    //     time *= 0.001;
    //     this._cube.rotation.x = time;
    //     this._cube.rotation.y = time;
    // }
}

window.onload = function() {
    new App();
}