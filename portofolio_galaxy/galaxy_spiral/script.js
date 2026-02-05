const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d', { alpha: false });
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Parâmetros
const params = {
  count: 1000,
  branches: 5,
  radius: 5,
  spin: 1,
  randomness: 0.2,
  power: 3,
  colorInside: '#ff6030',
  colorOutside: '#1a9fff',
  size: 1.5
};

// Câmera 3D
let camera = {
  x: 0,
  y: 0,
  z: 8,
  rotX: -0.3,
  rotY: 0
};

let particles = [];
let isDragging = false;
let lastX = 0, lastY = 0;
let autoRotate = true;
let autoRotateSpeed = 0.001;

// Gerar galáxia
function generateGalaxy() {
  particles = [];
  
  const colorIn = hexToRgb(params.colorInside);
  const colorOut = hexToRgb(params.colorOutside);

  for (let i = 0; i < params.count; i++) {
    const branchAngle = (i % params.branches) / params.branches * Math.PI * 2;
    const radius = Math.pow(Math.random(), params.power) * params.radius;
    const spinAngle = radius * params.spin;

    // Interpolação de cor
    const mixRatio = radius / params.radius;
    const r = colorIn.r + (colorOut.r - colorIn.r) * mixRatio;
    const g = colorIn.g + (colorOut.g - colorIn.g) * mixRatio;
    const b = colorIn.b + (colorOut.b - colorIn.b) * mixRatio;

    // Randomização
    const randX = Math.pow(Math.random(), params.power) * 
                  (Math.random() < 0.5 ? 1 : -1) * 
                  radius * params.randomness;
    const randY = Math.pow(Math.random(), params.power) * 
                  (Math.random() < 0.5 ? 1 : -1) * 
                  radius * params.randomness;
    const randZ = Math.pow(Math.random(), params.power) * 
                  (Math.random() < 0.5 ? 1 : -1) * 
                  radius * params.randomness;

    particles.push({
      x: Math.cos(branchAngle + spinAngle) * radius + randX,
      y: randY,
      z: Math.sin(branchAngle + spinAngle) * radius + randZ,
      r, g, b,
      size: params.size * (1 - radius / params.radius * 0.3)
    });
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

// Projeção 3D -> 2D
function project(x, y, z) {
  const cosX = Math.cos(camera.rotX);
  const sinX = Math.sin(camera.rotX);
  const cosY = Math.cos(camera.rotY);
  const sinY = Math.sin(camera.rotY);

  // Rotação Y
  let x1 = x * cosY - z * sinY;
  let z1 = x * sinY + z * cosY;
  
  // Rotação X
  let y1 = y * cosX - z1 * sinX;
  let z2 = y * sinX + z1 * cosX;

  // Translação
  z2 += camera.z;
  y1 += camera.y;
  x1 += camera.x;

  // Perspectiva
  const scale = 350 / (z2 + 350);
  
  return {
    x: w / 2 + x1 * scale * 90,
    y: h / 2 - y1 * scale * 90,
    scale: scale,
    z: z2
  };
}

// Render limpo sem grain
function render() {
  // Clear completo em vez de fade - elimina grain
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, w, h);

  // Ordenar por profundidade
  const projected = particles.map(p => ({
    ...p,
    proj: project(p.x, p.y, p.z)
  })).sort((a, b) => b.proj.z - a.proj.z);

  ctx.globalCompositeOperation = 'lighter';

  projected.forEach(p => {
    const { x, y, scale } = p.proj;
    
    if (x < -100 || x > w + 100 || y < -100 || y > h + 100) return;

    const size = p.size * scale * 2.5;
    const alpha = Math.min(0.9, scale * 0.7);

    // Partícula mais suave com glow
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 1.2);
    gradient.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`);
    gradient.addColorStop(0.3, `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha * 0.6})`);
    gradient.addColorStop(0.7, `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha * 0.2})`);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size * 1.2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalCompositeOperation = 'source-over';
}

// Auto-rotação suave
function animate() {
  if (autoRotate) {
    camera.rotY += autoRotateSpeed;
  }
  
  render();
  requestAnimationFrame(animate);
}

// Controles
canvas.addEventListener('mousedown', e => {
  isDragging = true;
  autoRotate = false;
  lastX = e.clientX;
  lastY = e.clientY;
});

canvas.addEventListener('mousemove', e => {
  if (isDragging) {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    
    camera.rotY += dx * 0.005;
    camera.rotX -= dy * 0.005;
    
    camera.rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotX));
    
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
  // Reativa auto-rotação após 2s de inatividade
  setTimeout(() => {
    if (!isDragging) autoRotate = true;
  }, 2000);
});

canvas.addEventListener('mouseleave', () => {
  isDragging = false;
});

canvas.addEventListener('wheel', e => {
  e.preventDefault();
  autoRotate = false;
  camera.z += e.deltaY * 0.01;
  camera.z = Math.max(3, Math.min(20, camera.z));
  
  // Reativa auto-rotação
  setTimeout(() => {
    if (!isDragging) autoRotate = true;
  }, 2000);
}, { passive: false });

// Touch
canvas.addEventListener('touchstart', e => {
  isDragging = true;
  autoRotate = false;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', e => {
  if (isDragging) {
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    
    camera.rotY += dx * 0.005;
    camera.rotX -= dy * 0.005;
    
    camera.rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotX));
    
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  }
});

canvas.addEventListener('touchend', () => {
  isDragging = false;
  setTimeout(() => {
    if (!isDragging) autoRotate = true;
  }, 2000);
});

// UI Controls
function setupControls() {
  const inputs = {
    count: document.getElementById('count'),
    branches: document.getElementById('branches'),
    radius: document.getElementById('radius'),
    spin: document.getElementById('spin'),
    randomness: document.getElementById('randomness'),
    power: document.getElementById('power'),
    colorInside: document.getElementById('colorInside'),
    colorOutside: document.getElementById('colorOutside')
  };

  const values = {
    count: document.getElementById('countVal'),
    branches: document.getElementById('branchesVal'),
    radius: document.getElementById('radiusVal'),
    spin: document.getElementById('spinVal'),
    randomness: document.getElementById('randomnessVal'),
    power: document.getElementById('powerVal')
  };

  Object.keys(inputs).forEach(key => {
    if (key === 'colorInside' || key === 'colorOutside') {
      inputs[key].addEventListener('input', e => {
        params[key] = e.target.value;
        generateGalaxy();
      });
    } else {
      inputs[key].addEventListener('input', e => {
        params[key] = parseFloat(e.target.value);
        if (values[key]) {
          values[key].textContent = params[key];
        }
      });

      inputs[key].addEventListener('change', generateGalaxy);
    }
  });
}

setupControls();
generateGalaxy();
animate();