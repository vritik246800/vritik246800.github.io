// ==========================
// Cena, Câmara e Render
// ==========================

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("scene")

/** @type {THREE.Scene} */
const scene = new THREE.Scene()

/** @type {THREE.PerspectiveCamera} */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 5

/** @type {THREE.WebGLRenderer} */
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ==========================
// Objetos 3D
// ==========================

/** @type {THREE.Mesh} */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 1.5),
  new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    metalness: 0.6,
    roughness: 0.2
  })
)
scene.add(cube)

/** @type {THREE.Mesh} */
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.8, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    metalness: 0.3,
    roughness: 0.4
  })
)
sphere.position.x = 3
scene.add(sphere)

// ==========================
// Luzes
// ==========================

const ambient = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambient)

const directional = new THREE.DirectionalLight(0xffffff, 1)
directional.position.set(5, 5, 5)
scene.add(directional)

// ==========================
// Animação
// ==========================

/** @param {number} time */
function animate(time) {
  const t = time * 0.001

  cube.rotation.x = t
  cube.rotation.y = t

  sphere.position.y = Math.sin(t) * 1.2

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate(0)

// ==========================
// Responsivo
// ==========================

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
