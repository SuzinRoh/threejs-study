import * as THREE from 'three';

/** 기본장면 */

export default function example() {
    //동적으로 생성시 
    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    //canvas 세팅
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas : canvas,
        antialias : true,
    }); // or {canvas}
    renderer.setSize(window.innerWidth, window.innerHeight);

    //요소 생성
    const scene = new THREE.Scene();
   /* const camera = new THREE.PerspectiveCamera( // 일반카메라
        75, //시야각 field of view
        window.innerWidth / window.innerHeight, // 종횡비 aspect
        0.1, // near 앞에거리 얼마나 보일지
        1000 // far 뒤에 거리
    );
   
    */
   
    //직교 카메라
    const camera = new THREE.OrthographicCamera(
       -(window.innerWidth / window.innerHeight), //left
       window.innerWidth / window.innerHeight, //rigth
        1, //top
        -1, //bottom
        0.1, //near
        1000 // far
    );

    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;//3js 에서 거리는 걍 대충 추상적으로 보면됌 보통 사람이면 cm 집이면 m 등등..
    camera.lookAt(0, 0, 0);

    camera.zoom = 0.5;
    camera.updateProjectionMatrix();

    scene.add(camera);

    //mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const meterial = new THREE.MeshBasicMaterial({
    //color : 0xff0000
    color : 'tomato'
    });
    const mesh = new THREE.Mesh(geometry, meterial);
    scene.add(mesh);

    // 그리기 랜더러가 랜더해줘야함
    renderer.render(scene, camera);
}
