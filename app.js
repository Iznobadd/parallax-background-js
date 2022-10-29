const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 720;

let gameSpeed = 3;
const showGameSpeed = document.getElementById('showGameSpeed');
const slider = document.getElementById('slider');

slider.value = gameSpeed;
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener('change', (e) => {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
});

const backgroundLayer1 = new Image();
backgroundLayer1.src = ('./img/layer-1.png');
const backgroundLayer2 = new Image();
backgroundLayer2.src = ('./img/layer-2.png');
const backgroundLayer3 = new Image();
backgroundLayer3.src = ('./img/layer-3.png');
const backgroundLayer4 = new Image();
backgroundLayer4.src = ('./img/layer-4.png');
const backgroundLayer5 = new Image();
backgroundLayer5.src = ('./img/layer-5.png');



window.addEventListener('load', () => {
    let x = 0;
    let x2 = 2400;
    
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
    
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if(this.x <= -this.width) {
                this.x = 0;
            }
            this.x = Math.floor(this.x - this.speed);
        }
    
        draw() {
            c.drawImage(this.image, this.x, this.y, this.width, this.height);
            c.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    
    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);
    
    const layers = [layer1, layer2, layer3, layer4, layer5];
    
    function animate() {
        c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        layers.forEach(object => {
            object.update();
            object.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
})

