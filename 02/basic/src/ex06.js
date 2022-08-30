import * as THREE from 'three';

/** 기본장면 */

export default function example() {
    //canvas 세팅
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas : canvas,
        antialias : true,
    }); // or {canvas}
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    
    //요소 생성
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( // 일반카메라
        75, //시야각 field of view
        window.innerWidth / window.innerHeight, // 종횡비 aspect
        0.1, // near 앞에거리 얼마나 보일지
        1000 // far 뒤에 거리
    );
    
    camera.position.z = 5;//3js 에서 거리는 걍 대충 추상적으로 보면됌 보통 사람이면 cm 집이면 m 등등..
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 1;
    light.position.z = 2;
    scene.add(light);


    //mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const meterial = new THREE.MeshStandardMaterial({
    //color : 0xff0000
    color : 'tomato'
    });
    const mesh = new THREE.Mesh(geometry, meterial);
    scene.add(mesh);

    //에니메이션 보정
    const clock = new THREE.Clock();


    function draw () {
        console.log();
        const delta = clock.getDelta(); //일랩스 타임이랑 같이 스면 안댐

        //각도는 radian 사용
        // 360도 sms 2파이 = 3.14*2
        // mesh.rotation.y += 0.05;
        // mesh.rotation.y += THREE.MathUtils.degToRad(1);
        mesh.rotation.y += delta;
        mesh.position.y += delta;
        if (mesh.position.y > 3) 
            mesh.position.y = 0;
        renderer.render(scene, camera);

        renderer.setAnimationLoop(draw); // 3js 통해 ar vr 을 사용할땐 내장함수 사용
        //window.requestAnimationFrame(draw);
    }

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

    draw();
}
