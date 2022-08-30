import * as THREE from 'three';

/** 기본장면 */

export default function example() {
    //canvas 세팅
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas : canvas,
        antialias : true,
        alpha : true,
    }); // or {canvas}
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    //renderer.setClearAlpha(0.5);
    // renderer.setClearColor('#00ff00');
    // renderer.setClearAlpha(0.5);
    
    //요소 생성
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue')



    const camera = new THREE.PerspectiveCamera( // 일반카메라
        75, //시야각 field of view
        window.innerWidth / window.innerHeight, // 종횡비 aspect
        0.1, // near 앞에거리 얼마나 보일지
        1000 // far 뒤에 거리
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

    function setSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }


    //event
    window.addEventListener('resize', setSize);
}
