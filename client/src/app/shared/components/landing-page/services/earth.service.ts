import { ElementRef, Injectable, NgZone, inject, signal } from '@angular/core';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  AmbientLight,
  Group,
  Points,
  HemisphereLight,
  Mesh,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  TextureLoader,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root',
})
export class EarthService {
  private readonly ngZone = inject(NgZone);
  scene!: Scene;
  camera!: PerspectiveCamera;
  renderer!: WebGLRenderer | null;
  controls!: OrbitControls;
  earthMesh!: Group;
  starsT1!: Points;
  starsT2!: Points;
  mouseX = signal(0);
  mouseY = signal(0);
  container!: ElementRef<HTMLCanvasElement> | null;
  private frameID: number | null = null;
  readonly loader = signal(0);

  createScene(container: ElementRef<HTMLCanvasElement>) {
    this.container = container;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(
      this.container.nativeElement.offsetWidth,
      this.container.nativeElement.offsetHeight
    );
    this.container.nativeElement.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;
    this.controls.enablePan = false;
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
    this.camera.position.set(0, 0, 12);
    this.controls.target = new Vector3(-6, 0, 0);

    const light = new AmbientLight(0x404040);
    this.scene.add(light);

    const hemiLight = new HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 300, 0);
    this.scene.add(hemiLight);

    this.container.nativeElement.addEventListener(
      'mousedown',
      this.mouseDown.bind(this)
    );
    this.container.nativeElement.addEventListener(
      'mousemove',
      this.mouseMove.bind(this)
    );
    this.container.nativeElement.addEventListener(
      'mouseup',
      this.mouseUp.bind(this)
    );

    this.container.nativeElement.addEventListener(
      'touchstart',
      this.mouseDown.bind(this)
    );
    this.container.nativeElement.addEventListener(
      'touchmove',
      this.mouseMove.bind(this)
    );
    this.container.nativeElement.addEventListener(
      'touchend',
      this.mouseUp.bind(this)
    );

    window.addEventListener('resize', () => {
      this.onResize();
    });
    this.stars();
    this.loadGLTF();
  }

  loadGLTF() {
    const loader = new GLTFLoader();
    loader.load(
      'assets/earth/earth.glb',
      (gltf) => {
        this.earthMesh = gltf.scene;
        this.scene.add(this.earthMesh);
      },
      (xhr) => {
        const percentage = (xhr.loaded / xhr.total) * 100;
        this.ngZone.run(() => {
          this.loader.set(percentage);
        })
      },
      (error) => {
        console.log('An error happened');
      }
    );
  }

  mouseMove(e: MouseEvent | TouchEvent) {
    if (e instanceof MouseEvent) {
      this.mouseX.set(e.clientX);
      this.mouseY.set(e.clientY);
    } else if (e instanceof TouchEvent) {
      this.mouseX.set(e.touches[0].clientX);
      this.mouseY.set(e.touches[0].clientY);
    }
  }
  mouseUp(e: Event) {}
  mouseDown(e: Event) {}

  getCenterPoint(mesh: Mesh) {
    const middle = new Vector3();
    const geometry = mesh instanceof Mesh ? mesh.geometry : mesh;
    geometry.computeBoundingBox();
    geometry.boundingBox?.getSize(middle);
    middle.x = middle.x / 2;
    middle.y = middle.y / 2;
    middle.z = middle.z / 2;
    mesh.localToWorld(middle);
    return middle;
  }

  animateFrames() {
    if (this.earthMesh) {
      this.earthMesh.rotateX(-0.005);
      this.earthMesh.rotateY(-0.005);
    }
    if (this.starsT1 && this.starsT2) {
      this.starsT1.position.x = this.mouseX() * 0.0001;
      this.starsT1.position.y = this.mouseY() * -0.0001;
      this.starsT2.position.x = this.mouseX() * 0.0001;
      this.starsT2.position.y = this.mouseY() * -0.0001;
    }
    this.frameID = requestAnimationFrame(() => this.animateFrames());
    this.renderer?.render(this.scene, this.camera);
    this.controls.update();
  }

  onResize() {
    if (!this.container || !this.renderer) return;
    this.camera.aspect =
      this.container.nativeElement.offsetWidth /
      this.container.nativeElement.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.nativeElement.offsetWidth,
      this.container.nativeElement.offsetHeight
    );
    this.renderer.render(this.scene, this.camera);
  }

  stars() {
    const getRandomParticelPos = (particleCount: number) => {
      const arr = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        arr[i] = (Math.random() - 0.5) * 10;
      }
      return arr;
    };
    const geometrys = [new BufferGeometry(), new BufferGeometry()];
    geometrys[0].setAttribute(
      'position',
      new BufferAttribute(getRandomParticelPos(350), 3)
    );
    geometrys[1].setAttribute(
      'position',
      new BufferAttribute(getRandomParticelPos(1500), 3)
    );
    const loader = new TextureLoader();
    const materials = [
      new PointsMaterial({
        size: 0.05,
        map: loader.load('assets/stars/star.png'),
        transparent: true,
      }),
      new PointsMaterial({
        size: 0.075,
        map: loader.load('assets/stars/star1.png'),
        transparent: true,
      }),
    ];
    this.starsT1 = new Points(geometrys[0], materials[0]);
    this.starsT2 = new Points(geometrys[1], materials[1]);
    this.scene.add(this.starsT1);
    this.scene.add(this.starsT2);
  }

  destroyEarth() {
    if (this.frameID != null) {
      cancelAnimationFrame(this.frameID);
    }
    this.renderer?.dispose();
    this.renderer = null;
    this.container = null;
  }
}
