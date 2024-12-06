<template>
  <canvas ref="canvasRef" class="aura"></canvas>
</template>

<style scoped>
.aura {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>

<script setup lang="ts">
interface Props {
  auraGradient: string;
  addNoise?: boolean;
  shape?: 'circle' | 'heart' | 'star';
}

const canvasRef = ref<HTMLCanvasElement | null>(null);

const props = withDefaults(defineProps<Props>(), {
  addNoise: false,
  shape: 'heart',
})

function gradientStringToObject(gradient: string) {
  const gradientString = gradient.match(/linear-gradient\((.*)\)/)?.[1].replace(/^90deg,\s*/, '') || '';
  const gradientPoints = gradientString.split('%, ').map((point) => {
    const colorPart = point.split(') ')[0] + ')';
    const positionPart = point.split(') ')[1]?.replace('%', '') || '100';
    return { color: colorPart, position: parseFloat(positionPart) / 100 };
  });

  // Ensure sorted by position (usually they are already)
  gradientPoints.sort((a, b) => a.position - b.position);

  return gradientPoints;
}

async function applyNoise(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  if (!props.addNoise) return;

  const noise = new Image();
  noise.src = '/grain.jpg';
  await new Promise((resolve) => {
    noise.onload = resolve;
  });

  const pattern = ctx.createPattern(noise, 'repeat');
  if (!pattern) return;

  ctx.globalCompositeOperation = 'multiply';
  ctx.globalAlpha = 0.25; // Added alpha transparency
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1; // Reset alpha
  ctx.globalCompositeOperation = 'source-over';
}

async function drawGradient() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const shapeType = props.shape;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradientPoints = gradientStringToObject(props.auraGradient);
  if (gradientPoints.length === 0) return;

  const backgroundColor = gradientPoints[gradientPoints.length - 1].color;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const maxSize = Math.min(canvas.width, canvas.height) / 2;

  // Draw shapes
  for (let i = gradientPoints.length - 2; i >= 0; i--) {
    const { color, position } = gradientPoints[i];
    // position is between 0 and 1, we use this to scale the shape
    // Smaller position -> smaller shape, larger position -> bigger shape
    const size = (0.2 + position) * maxSize;

    console.log('Drawing shape', color, size);

    ctx.fillStyle = color;

    if (shapeType === 'circle') {
      ctx.filter = 'blur(125px)';
      ctx.beginPath();
      drawCircle(ctx, canvas.width / 2, canvas.height / 2, size);
    } else if (shapeType === 'heart') {
      ctx.filter = 'blur(50px)';
      ctx.beginPath();
      drawHeart(ctx, canvas.width / 2, canvas.height / 2, size * 2);
    } else if (shapeType === 'star') {
      ctx.filter = 'blur(50px)';
      ctx.beginPath();
      drawStar(ctx, canvas.width / 2, canvas.height / 2, size * 1.2, 5);
    }

    ctx.closePath();
    ctx.fill();
    ctx.filter = 'none';
  }

  await applyNoise(ctx, canvas);
}

function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  ctx.arc(x, y, radius, 0, Math.PI * 2);
}

// Helper function to draw a heart
function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const topCurveHeight = size * 0.4; // Increased from 0.3 to make top rounder
  y = y - size/2;
  
  // Adjust control points for smoother curves
  const controlDistance = size * 0.6; // Increased control point distance
  
  ctx.moveTo(x, y + topCurveHeight);
  
  // Left top curve
  ctx.bezierCurveTo(
    x, y - size * 0.1, // Adjusted for rounder top
    x - controlDistance, y, 
    x - size / 2, y + topCurveHeight
  );
  
  // Left bottom curve
  ctx.bezierCurveTo(
    x - size / 2, y + (size + topCurveHeight) / 1.8,
    x, y + size * 1.1,
    x, y + size
  );
  
  // Right bottom curve
  ctx.bezierCurveTo(
    x, y + size * 1.1,
    x + size / 2, y + (size + topCurveHeight) / 1.8,
    x + size / 2, y + topCurveHeight
  );
  
  // Right top curve
  ctx.bezierCurveTo(
    x + controlDistance, y,
    x, y - size * 0.1,
    x, y + topCurveHeight
  );
}

// Helper function to draw a star
function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, outerRadius: number, points: number) {
  const innerRadius = outerRadius / 2;
  const step = Math.PI / points;
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step - Math.PI / 2;
    ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
  }
  ctx.closePath();
}

onMounted(() => {
  const gradientPoints = gradientStringToObject(props.auraGradient);
  // Set document background to the last color
  if (gradientPoints.length > 0) {
    document.body.style.background = gradientPoints[gradientPoints.length - 1].color;
  }

  drawGradient();
  window.addEventListener('resize', drawGradient);
});

watch(() => props.auraGradient, drawGradient, { deep: true });
watch(() => props.addNoise, drawGradient);
watch(() => props.shape, drawGradient);
</script>
