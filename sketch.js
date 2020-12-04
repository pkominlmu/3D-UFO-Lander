let elevation = -450
let grassImage, skyImage, moonImage, ufoImage, trunkImage, pineImage
let earthSpin = 1, moonSpin = 1, ufoSpin = 1
let slowSpinSpeed = 0
let velocity = 9
let gravity = 1.0142
let beamRadius = 275
let alienHead = 1


function preload() {
  grassImage = loadImage('grass.png')
  trunkImage = loadImage('trunk.png')
  pineImage = loadImage('pine.png')
  skyImage = loadImage('nightsky.png')
  moonImage = loadImage('moon.png')
  ufoImage = loadImage('UFO.png')
}

function setup() {
  createCanvas(700, 600, WEBGL)
  noStroke()
}

function draw() {
  background('black');
  directionalLight(200, 200, 255, 1, 1, -1)
  pointLight(200, 200, 255, 0, elevation-30, 0)
  specularColor(0, 0, 50)
  drawSky()
  drawMoon()
  drawGround()
  drawAllTrees()
  drawUfo()
  drawAlien()
  moveUFO()
}

function drawSky() {
  push()
  ambientLight(90, 90, 140)
  texture(skyImage)
  rotateZ(earthSpin)
  translate(0, 200, 0)
  sphere(650)
  earthSpin -= 0.0003
  pop()
}

function drawMoon() {
  push()
  emissiveMaterial('white')
  texture(moonImage)
  translate(-300, -250, -50)
  ambientLight(255, 255, 255)
  specularColor(200, 200, 255)
  rotateY(moonSpin)
  sphere(50)
  moonSpin -= 0.0005
  pop()
}

function drawGround() {
  push()
  texture(grassImage)
  spotLight(255, 255, 255, 0, elevation, 0, 0, 1, 0, Math.PI/6, 3)
  specularColor(50, 200, 50)
  translate(0, 210, 0)
  rotateX(Math.PI/2)
  plane(1200, 500)  
  pop()
}

function drawTree(x, y, z) {
  push()
  translate(x, y, z)
  texture(pineImage)
  cone(-50)
  translate(0, 30, 0)
  cone(-70)
  translate(0, 40, 0)
  cone(-90)
  translate(0, 45, 0)
  cone(-100)
  translate(0, 100, 0)
  texture(trunkImage)
  cylinder(20, 80)
  pop()
}

function drawAllTrees() {
  drawTree(-300, -20, -250)
  drawTree(150, -15, -200)
  drawTree(-150, 0, -200)
  drawTree(300, -40, -250)
  drawTree(-250, 0, 150)
  drawTree(250, 25, 150)
  drawTree(0, -35, -225)
}

function drawUfo() {
  push()
  translate(0, elevation, 0)
  scale(1, 0.25, 1)
  specularMaterial('white')
  shininess(5)
  rotateY(ufoSpin)
  ellipsoid(80, 60)
  ufoSpin -= 0.3
  if(elevation >= -300) {
    ufoSpin += slowSpinSpeed
    slowSpinSpeed += 0.00175
  }
  translate(0, -60, 0)
  emissiveMaterial(50, 255, 255, 255)
  ellipsoid(40, 70)
  emissiveMaterial('white')
  translate(0, 100, 0)
  torus(50, 2)
  rotateY(radians(90))
  torus(50, 2)
  scale(1, 4, 1)
  emissiveMaterial('white')
  ellipsoid(30, 10)
  translate(0, 250, 0)
  emissiveMaterial(255, 255, 255, 10)
  cone(beamRadius, -600)
  beamRadius -= 0.11
  pop()
}

function moveUFO() {
  elevation += velocity
  velocity /= gravity
  if (elevation >= 190) {
    noLoop()
  }
  
}

function drawAlien() {
  push()
  if(elevation >= 180) {
    alienHead *= 1.035
  }
  translate(0, elevation-alienHead, 0)
  fill(100, 255, 100)
  ellipsoid(10, 12)
  translate(-3, 0, 5)
  specularMaterial('white')
  shininess(8)
  ellipsoid(5, 6)
  translate(6, 0, 0)
  specularMaterial('white')
  ellipsoid(5, 6)
  pop()
}
