import * as THREE from "../build/three.module.js";

class App {
  constructor() {
    //html <div id>인 webgl-container를 divContainer에 할당,저장
    const divContainer = document.querySelector("#webgl-container");
    //다른 메소드에서 참조 가능하게
    this.divContainer = divContainer;

    //webGL1Renderer는 다양한 옵션 설정이 가능
    const renderer = new THREE.WebGL1Renderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupCamera() {
    const width = this.divContainer.clientWidth;
    const height = this.divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 2;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  _setupModel() {
    //geometry(형상)는 3개의 인자 값을 갖는데 각각 가로, 세로, 깊이
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //material(색상, 투명도)
    const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });

    const cube = new THREE.Mesh(geometry, material);

    this._scene.add(cube);
    this._cube = cube;
  }

  //창 크기가 변경될때 발생하는 이벤트를 통해서 호출되는 메소드
  resize() {
    const width = this.divContainer.clientWidth;
    const height = this.divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  //time은 렌더링이 시작된 이후에 경과된 시간값으로 단위는 밀리초
  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001; //second 단위로 변환
    this._cube.rotation.x = time;
    this._cube.rotation.y = time;
  }
}

window.onload = function () {
  new App();
};
