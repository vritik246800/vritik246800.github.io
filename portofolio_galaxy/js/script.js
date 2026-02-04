const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let w, h, dpr;
function resize() {
  dpr = devicePixelRatio || 1;
  w = canvas.width = innerWidth * dpr;
  h = canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
addEventListener("resize", resize);

// ================= BLACK HOLE =================
class BlackHole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // size do blackH
    this.r = 90;
    this.time = 0;
    // numero de ponto na blackH
    this.disk = Array.from({ length: 2000 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: this.r + Math.random() * 360,
      s: Math.random() * 1 + 0.5,
      h: 260 + Math.random() * 60
    }));
  }

  draw(warp, gravity) {
    this.time += 0.01;

    // Halo
    const halo = ctx.createRadialGradient(this.x, this.y, this.r * 0.8, this.x, this.y, this.r * 3);
    halo.addColorStop(0, "rgba(255, 238, 180, 0.17)");
    halo.addColorStop(0.4, `rgba(255,238,180, ${warp * 0.15})`);
    halo.addColorStop(1, "transparent");
    ctx.fillStyle = halo;
    ctx.beginPath();
    // aura do blackH
    //ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
    ctx.fill();

    // Disco
    ctx.globalCompositeOperation = "lighter";
    this.disk.forEach(p => {
      p.a += gravity * 0.002;
      p.r -= gravity * 0.08;
      if (p.r < this.r * 1.4) p.r = this.r + 250;

      const x = this.x + Math.cos(p.a) * p.r;
      const y = this.y + Math.sin(p.a) * p.r * 0.35;

      const g = ctx.createRadialGradient(x, y, 0, x, y, p.s * 4);
      g.addColorStop(0, `hsla(${p.h},100%,70%,0.9)`);
      g.addColorStop(1, "transparent");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, p.s * 4, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = "source-over";

    // Núcleo
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ================= SISTEMA =================
let warp = 0, targetWarp = 0;
let gravity = 0.3, targetGravity = 0.3;
const bh = new BlackHole(innerWidth / 2, innerHeight / 2);

// ================= SCROLL =================
addEventListener("scroll", () => {
  const max = document.body.scrollHeight - innerHeight;
  const p = Math.min(scrollY / max, 1);

  targetWarp = p * 40;
  targetGravity = 0.3 + p * 6;

  document.getElementById("warpBar").style.width = `${p * 100}%`;
  document.getElementById("distance").textContent = (p * 10).toFixed(2);
});

// ================= ESTRELAS =================
const stars = Array.from({ length: 1500 }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  z: Math.random() * innerWidth
}));

// speed de estralas
function starWarpLimit(warp) {
  return 6 * (1 - Math.exp(-warp * 0.15));
}

function drawStars() {
  ctx.fillStyle = "white";
  stars.forEach(s => {
    const w = starWarpLimit(warp);
    s.z -= gravity * 2 + w * 0.25;
    if (s.z <= 0) s.z = innerWidth;

    const k = 128 / s.z;
    const x = (s.x - bh.x) * k + bh.x;
    const y = (s.y - bh.y) * k + bh.y;

    ctx.fillRect(x, y, 2, 2);
  });
}

// ================= LOOP =================
function animate() {
  ctx.fillStyle = `rgba(0,0,0,${0.15 + warp * 0.01})`;
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  gravity += (targetGravity - gravity) * 0.08;
  warp += (targetWarp - warp) * 0.08;

  drawStars();
  bh.draw(warp, gravity);

  requestAnimationFrame(animate);
}
animate();
