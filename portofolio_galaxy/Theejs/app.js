// ==========================
// LOADER
// ==========================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

// ==========================
// CURSOR GLOW
// ==========================
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ==========================
// SCENE SETUP
// ==========================
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('scene');

/** @type {THREE.Scene} */
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050508, 0.08);

/** @type {THREE.PerspectiveCamera} */
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

/** @type {THREE.WebGLRenderer} */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// ==========================
// BACKGROUND PARTICLES
// ==========================
const particleCount = 600;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
  particlePositions[i] = (Math.random() - 0.5) * 30;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

const particleMaterial = new THREE.PointsMaterial({
  color: 0x00fff0,
  size: 0.02,
  transparent: true,
  opacity: 0.4,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// ==========================
// NUCLEUS
// ==========================
const nucleusGroup = new THREE.Group();

// Core sphere
const nucleusCore = new THREE.Mesh(
  new THREE.SphereGeometry(0.45, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0xff2d6b,
    emissive: 0xff00aa,
    emissiveIntensity: 0.8,
    metalness: 0.95,
    roughness: 0.05
  })
);
nucleusGroup.add(nucleusCore);

// Inner glow sphere
const nucleusGlow = new THREE.Mesh(
  new THREE.SphereGeometry(0.6, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0xff00aa,
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
);
nucleusGroup.add(nucleusGlow);

// Outer pulse
const nucleusPulse = new THREE.Mesh(
  new THREE.SphereGeometry(0.75, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0x6b00ff,
    transparent: true,
    opacity: 0.06,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
);
nucleusGroup.add(nucleusPulse);

scene.add(nucleusGroup);

// ==========================
// ELECTRONS
// ==========================
const electrons = [];
const electronColors = [0x00fff0, 0x39ff14, 0x00fff0, 0x39ff14, 0x00fff0];

for (let i = 0; i < 25; i++) {
  const colorIdx = i % electronColors.length;
  const mat = new THREE.MeshStandardMaterial({
    color: electronColors[colorIdx],
    emissive: electronColors[colorIdx],
    emissiveIntensity: 0.9,
    metalness: 0.9,
    roughness: 0.05,
    transparent: true,
    opacity: 0.9
  });

  const electron = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    mat
  );

  // Trail glow
  const trailGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 8, 8),
    new THREE.MeshBasicMaterial({
      color: electronColors[colorIdx],
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  electron.add(trailGlow);

  const orbitRadius = 1.0 + i * 0.22;
  const speed = 0.6 + Math.random() * 0.4;
  const phase = (i * Math.PI * 2) / 25 + Math.random() * 0.5;
  const tiltX = Math.random() * Math.PI;
  const tiltZ = Math.random() * Math.PI;

  electrons.push({ mesh: electron, orbitRadius, speed, phase, tiltX, tiltZ });
  scene.add(electron);
}

// ==========================
// ORBIT RINGS
// ==========================
electrons.forEach((e, idx) => {
  const points = [];
  const segments = 128;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * e.orbitRadius,
      0,
      Math.sin(angle) * e.orbitRadius
    ));
  }
  const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
  const orbitMat = new THREE.LineBasicMaterial({
    color: idx % 2 === 0 ? 0x00fff0 : 0x39ff14,
    transparent: true,
    opacity: 0.04,
    blending: THREE.AdditiveBlending
  });
  const orbitLine = new THREE.Line(orbitGeo, orbitMat);
  orbitLine.rotation.x = e.tiltX;
  orbitLine.rotation.z = e.tiltZ;
  scene.add(orbitLine);
});

// ==========================
// LIGHTS
// ==========================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x00fff0, 2, 20);
pointLight1.position.set(3, 3, 3);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xff00aa, 1.5, 20);
pointLight2.position.set(-3, -2, 4);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0x6b00ff, 1, 15);
pointLight3.position.set(0, 4, -3);
scene.add(pointLight3);

// ==========================
// MOUSE INTERACTION
// ==========================
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ==========================
// HUD
// ==========================
const hudFps = document.getElementById('hudFps');
const hudTime = document.getElementById('hudTime');
let frameCount = 0;
let lastFpsTime = performance.now();

function updateHUD(time) {
  // FPS
  frameCount++;
  const now = performance.now();
  if (now - lastFpsTime >= 1000) {
    hudFps.textContent = frameCount;
    frameCount = 0;
    lastFpsTime = now;
  }

  // Time
  const seconds = Math.floor(time / 1000);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  hudTime.textContent = mm + ':' + ss;
}

// ==========================
// ANIMATION LOOP
// ==========================
function animate(time) {
  const t = time * 0.0006;

  // Camera follows mouse subtly
  camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.03;
  camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.03;
  camera.lookAt(0, 0, 0);

  // Nucleus rotation + pulse
  nucleusCore.rotation.x = t * 0.4;
  nucleusCore.rotation.y = t * 0.6;
  nucleusGlow.scale.setScalar(1 + Math.sin(t * 2) * 0.15);
  nucleusPulse.scale.setScalar(1 + Math.sin(t * 1.5) * 0.2);

  // Electron orbits
  electrons.forEach(e => {
    const angle = t * e.speed + e.phase;
    const x = Math.cos(angle) * e.orbitRadius;
    const z = Math.sin(angle) * e.orbitRadius;

    // Apply orbital tilt via rotation matrix
    const cosX = Math.cos(e.tiltX);
    const sinX = Math.sin(e.tiltX);
    const cosZ = Math.cos(e.tiltZ);
    const sinZ = Math.sin(e.tiltZ);

    e.mesh.position.x = x * cosZ - z * sinX * sinZ;
    e.mesh.position.y = z * cosX;
    e.mesh.position.z = x * sinZ + z * sinX * cosZ;
  });

  // Rotate particles slowly
  particles.rotation.y = t * 0.05;
  particles.rotation.x = t * 0.02;

  // Pulsing lights
  pointLight1.intensity = 2 + Math.sin(t * 3) * 0.5;
  pointLight2.intensity = 1.5 + Math.cos(t * 2.5) * 0.4;

  updateHUD(time);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate(0);

// ==========================
// RESIZE
// ==========================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
