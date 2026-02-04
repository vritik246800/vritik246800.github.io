const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// ===================
// PARÂMETROS
// ===================
const params = {
  count: 1000,
  branches: 5,
  radius: 5,
  spin: 1,
  randomness: 0.2,
  power: 3,
  colorInside: '#ff4040',
  colorOutside: '#8400ff',
  size: 1.5
};

// ===================
// CÂMERA
// ===================
let camera = {
  x: 0,
  y: 3,
  z: 8,
  rotX: -0.3,
  rotY: 0
};

// ===================
let particles = [];
let oldParticles = [];

// ===================
// UTIL
// ===================
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: parseInt(r[1], 16),
    g: parseInt(r[2], 16),
    b: parseInt(r[3], 16)
  };
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

// ===================
// GERAR GALÁXIA
// ===================
function generateGalaxy() {
  // marcar partículas antigas para retração
  oldParticles = particles.map(p => ({ ...p, direction: -1 }));

  particles = [];
  const colorIn = hexToRgb(params.colorInside);
  const colorOut = hexToRgb(params.colorOutside);

  for (let i = 0; i < params.count; i++) {
    const branchAngle = (i % params.branches) / params.branches * Math.PI * 2;
    const radius = Math.pow(Math.random(), params.power) * params.radius;
    const spinAngle = radius * params.spin;

    const mix = radius / params.radius;
    const r = colorIn.r + (colorOut.r - colorIn.r) * mix;
    const g = colorIn.g + (colorOut.g - colorIn.g) * mix;
    const b = colorIn.b + (colorOut.b - colorIn.b) * mix;

    const rand = () =>
      Math.pow(Math.random(), params.power) *
      (Math.random() < 0.5 ? -1 : 1) *
      radius * params.randomness;

    particles.push({
      x: 0, y: 0, z: 0,

      xTarget: Math.cos(branchAngle + spinAngle) * radius + rand(),
      yTarget: rand(),
      zTarget: Math.sin(branchAngle + spinAngle) * radius + rand(),

      r, g, b,
      size: params.size,
      progress: 0,
      direction: 1
    });
  }
}

// ===================
// PROJEÇÃO 3D
// ===================
function project(x, y, z) {
  const cosX = Math.cos(camera.rotX);
  const sinX = Math.sin(camera.rotX);
  const cosY = Math.cos(camera.rotY);
  const sinY = Math.sin(camera.rotY);

  let x1 = x * cosY - z * sinY;
  let z1 = x * sinY + z * cosY;
  let y1 = y * cosX - z1 * sinX;
  let z2 = y * sinX + z1 * cosX;

  z2 += camera.z;
  y1 += camera.y-2;

  const scale = 400 / (z2 + 400);

  return {
    x: w / 2 + x1 * scale * 100,
    y: h / 2 - y1 * scale * 100,
    scale,
    z: z2
  };
}

// ===================
// RENDER
// ===================
function renderParticles(list) {
  list.forEach(p => {
    p.progress += 0.03 * p.direction;
    p.progress = Math.max(0, Math.min(1, p.progress));

    const t = smoothstep(p.progress);

    p.x = p.xTarget * t;
    p.y = p.yTarget * t;
    p.z = p.zTarget * t;
  });

  const projected = list
    .map(p => ({ ...p, proj: project(p.x, p.y, p.z) }))
    .sort((a, b) => b.proj.z - a.proj.z);

  ctx.globalCompositeOperation = 'lighter';

  projected.forEach(p => {
    const { x, y, scale } = p.proj;
    if (x < -50 || x > w + 50 || y < -50 || y > h + 50) return;

    const size = p.size * scale * 3;
    const alpha = Math.min(1, scale * 0.8);

    const g = ctx.createRadialGradient(x, y, 0, x, y, size);
    g.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${alpha})`);
    g.addColorStop(1, 'transparent');

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalCompositeOperation = 'source-over';
}

function render() {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, 0, w, h);

  renderParticles(oldParticles);
  renderParticles(particles);

  // 🧭 Indicador de centro
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.strokeStyle = 'rgba(125,249,255,0.6)';
  ctx.beginPath();
  ctx.moveTo(-10, 0); ctx.lineTo(10, 0);
  ctx.moveTo(0, -10); ctx.lineTo(0, 10);
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function animate() {
  render();
  requestAnimationFrame(animate);
}

// ===================
// DRAG MANUAL
// ===================
let isDragging = false;
let lastX = 0, lastY = 0;

canvas.addEventListener('mousedown', e => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

canvas.addEventListener('mousemove', e => {
  if (!isDragging) return;

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  camera.rotY += dx * 0.005;
  camera.rotX -= dy * 0.005;

  camera.rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotX));

  lastX = e.clientX;
  lastY = e.clientY;
});

['mouseup', 'mouseleave'].forEach(e =>
  canvas.addEventListener(e, () => isDragging = false)
);

// ===================
canvas.addEventListener('wheel', e => {
  e.preventDefault();
  camera.z += e.deltaY * 0.01;
  camera.z = Math.max(3, Math.min(20, camera.z));
}, { passive: false });

// ===================
// UI
// ===================
function setupControls() {
  const ids = ['count','branches','radius','spin','randomness','power'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    const val = document.getElementById(id + 'Val');
    el.addEventListener('input', e => {
      params[id] = parseFloat(e.target.value);
      if (val) val.textContent = params[id];
    });
    el.addEventListener('change', generateGalaxy);
  });

  ['colorInside','colorOutside'].forEach(id => {
    document.getElementById(id).addEventListener('input', e => {
      params[id] = e.target.value;
      generateGalaxy();
    });
  });
}

setupControls();
generateGalaxy();
animate();
