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
// Átomo com Núcleo e Eletrões
// ==========================

// Núcleo (protões + neutrões)
const nucleus = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0xff3333,
    emissive: 0x333fff,
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.2
  })
)
scene.add(nucleus)

// Eletrões (3 órbitas diferentes)
const electrons = []
const electronMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  emissive: 0x33ff99,
  emissiveIntensity: 0.6,
  metalness: 0.9,
  roughness: 0.1
})

for (let i = 0; i < 25; i++) {
  const electron = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    electronMaterial.clone()
  )
  electrons.push({
    mesh: electron,
    orbitRadius: 1.2 + i * 0.5,
    speed: 0.8 + i * 0.05,
    phase: (i * Math.PI * 2) / 10,
    tiltX: Math.random() * Math.PI * 1.9,
    tiltZ: Math.random() * Math.PI * -1.9
  })
  scene.add(electron)
}

// Órbitas visuais
const orbitMaterial = new THREE.LineBasicMaterial({
  color: 0x00000f00,
  transparent: false,
  opacity: 0.1
})

electrons.forEach(e => {
  const points = []
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * e.orbitRadius,
        0,
        Math.sin(angle) * e.orbitRadius
      )
    )
  }
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points)
  const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial)
  orbitLine.rotation.x = e.tiltX
  orbitLine.rotation.z = e.tiltZ
  scene.add(orbitLine)
})

// ==========================
// Luzes
// ==========================

const ambient = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambient)

const directional = new THREE.DirectionalLight(0xffffff, 1)
directional.position.set(5, 5, 5)
scene.add(directional)

// ==========================
// Animação
// ==========================

/** @param {number} time */
function animate(time) {
  const t = time * 0.0008

  // Rotação do núcleo
  nucleus.rotation.x = t * 0.3
  nucleus.rotation.y = t * 0.5

  // Movimento orbital dos eletrões
  electrons.forEach(e => {
    const angle = t * e.speed + e.phase
    e.mesh.position.x = Math.cos(angle) * e.orbitRadius
    e.mesh.position.z = Math.sin(angle) * e.orbitRadius
    
    // Aplicar inclinação orbital
    const pos = e.mesh.position.clone()
    e.mesh.position.y = pos.x * Math.sin(e.tiltX) + pos.z * Math.sin(e.tiltZ)
  })

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