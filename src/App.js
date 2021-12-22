import React from 'react';
import Particle from './util/particle';
import p5 from 'p5';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {
            wight: 0,
            height: 0,
            text: 'METAL',
            textColor: '#f2f3f4',
            backgroundColor: '#000000',
            fontSize: 240,
            flowFieldFactor: 5.27,
            flowFieldSeed: 50,
            particleStartSize: 5,
            particleEndSize: 0,
            particleLifeTime: 100,
            particleDensity: 18,
            scale: 10,
            mirrorFlowFieldX: true,
            mirroFlowFieldY: false,
        }
        this.changed = true;
    }

    Sketch = (p5) => {
        let particles = []
        let flowField = []
        let cols, rows;
        const setupParticles = () => {
            particles = [];
            const density = this.state.particleDensity
            for (let y = 0; y < p5.height / density; y++) {
                for (let x = 0; x < p5.width / density; x++) {

                    let px = x * density
                    let py = y * density
                    let p = new Particle(p5,
                        px,
                        py,
                        this.state.particleLifeTime,
                        this.state.particleStartSize,
                        this.state.particleEndSize,
                        p5.color(this.state.textColor));
                    particles.push(p);

                }
            }
        }

        const setupFlowField = () => {
            p5.noiseSeed(this.state.flowFieldSeed)
            cols = p5.floor(p5.width / this.state.scale);
            rows = p5.floor(p5.height / this.state.scale);
            flowField = new Array(cols * rows);
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const index = x + y * cols;
                    const angle = p5.noise(x * 0.1, y * 0.1) * p5.TWO_PI * this.state.flowFieldFactor;
                    flowField[index] = p5.createVector(p5.cos(angle), p5.sin(angle));
                }
            }

            if (this.state.mirrorFlowFieldX) {
                const halfCols = p5.floor(cols / 2);
                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < halfCols; x++) {
                        const index = x + y * cols;
                        const mirroX = (-x + cols);
                        const mirroIndex = mirroX + y * cols;
                        flowField[mirroIndex] = flowField[index].copy()
                        flowField[mirroIndex].x = -flowField[mirroIndex].x;
                    }
                }
            }

            if (this.state.mirroFlowFieldY) {
                const halfRows = p5.floor(rows / 2);
                for (let y = 0; y < halfRows; y++) {
                    for (let x = 0; x < cols; x++) {
                        const index = x + y * cols;
                        const mirroY = (-y + rows);
                        const mirroIndex = x + mirroY * cols;
                        flowField[mirroIndex] = flowField[index].copy()
                        flowField[mirroIndex].y = -flowField[mirroIndex].y;
                    }
                }
            }


        }

        const drawFlowField = () => {
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const index = x + y * cols;
                    const v = flowField[index];
                    p5.stroke(this.state.textColor);
                    p5.push();
                    p5.translate(x * this.state.scale, y * this.state.scale);
                    p5.rotate(v.heading());
                    p5.line(0, 0, this.state.scale, 0);
                    p5.pop();
                }
            }
        }

        const reset = () => {
            p5.background(this.state.backgroundColor);
            p5.textSize(this.state.fontSize);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.fill(this.state.textColor);
            p5.text(this.state.text, p5.width / 2, p5.height / 2);

            //const points = p5.textToPoints(this.state.text, p5.width / 2, p5.height / 2);

            setupFlowField();
            setupParticles();

        }

        p5.preload = () => {

        }

        p5.setup = () => {
            p5.createCanvas(1360, 768);
            p5.background(255);
        };

        p5.draw = () => {
            //console.log(p5.get(p5.mouseX, p5.mouseY))
            if (this.changed) {
                reset();
                this.changed = false;
                //drawFlowField();
            } else {
                for (let i = 0; i < particles.length; i++) {
                    if (!particles[i].isDead()) {
                        particles[i].applyForce(flowField, this.state.scale, cols);
                        particles[i].update();
                        particles[i].draw();
                    }
                }
            }
        };

    }

    cleanCanvas() {
        this.myP5.background(255);
    }

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current);
        document.getElementById('body').style.backgroundColor = this.state.backgroundColor;
    }

    AlterarTexto = (event) => {
        this.setState({ text: event.target.value });
        this.changed = true;
    }

    AlterarTextoCor = (event) => {
        this.setState({ textColor: event.target.value });
        this.changed = true;
    }

    AlterarFundoCor = (event) => {
        this.setState({ backgroundColor: event.target.value });
        this.changed = true;
        document.getElementById('body').style.backgroundColor = this.state.backgroundColor;
    }

    AlterarFlowFieldFactor = (event) => {
        this.setState({ flowFieldFactor: event.target.value });
        this.changed = true;
    }

    AlterarFlowFieldSeed = (event) => {
        this.setState({ flowFieldSeed: event.target.value });
        this.changed = true;
    }

    AlterarTamanhoFonte = (event) => {
        this.setState({ fontSize: event.target.value });
        this.changed = true;
    }

    AlterarParticulaTamanhoInicial = (event) => {
        this.setState({ particleStartSize: event.target.value });
        this.changed = true;
    }

    AlterarParticulaTamanhoFinal = (event) => {
        this.setState({ particleEndSize: event.target.value });
        this.changed = true;
    }

    AlterarParticulaVida = (event) => {
        this.setState({ particleLifeTime: event.target.value });
        this.changed = true;
    }

    AlterarParticulaDensidade = (event) => {
        this.setState({ particleDensity: event.target.value });
        this.changed = true;
    }

    AlterarFlowFieldX = (event) => {
        this.setState({ mirrorFlowFieldX: event.target.checked });
        this.changed = true;
    }

    AlterarFlowFieldY = (event) => {
        this.setState({ mirroFlowFieldY: event.target.checked });
        this.changed = true;
    }

    render() {
        return (
            <div id='body' lassName="container page-container">

                <div className="row">
                    <div className="col-md-12">
                        <div className='title'>
                            <h1>Black Metal Logo Generator</h1>
                            <h3>by Nicolas Vycas Nery</h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="canvasHome">
                        <div ref={this.myRef}>

                        </div>
                    </div>
                </div>

                <div className='controls'>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <lable>Text:</lable>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Enter text"
                                    onChange={this.AlterarTexto}
                                    value={this.state.text}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <lable>Text Color:</lable>
                                <input type="color"
                                    className="form-control form-control-color"
                                    placeholder="Enter text color"
                                    onChange={this.AlterarTextoCor}
                                    id='textColor'
                                    value={this.state.textColor}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <lable>Background Color:</lable>
                                <input type="color"
                                    className="form-control form-control-color"
                                    placeholder="Enter background color"
                                    onChange={this.AlterarFundoCor}
                                    id='backgroundColor'
                                    value={this.state.backgroundColor}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <lable>Flow Field Factor:</lable>
                                <input type="range"
                                    className="form-range"
                                    id="flowFieldFactor"
                                    min={1}
                                    max={6}
                                    step={0.01}
                                    placeholder="Enter font size"
                                    onChange={this.AlterarFlowFieldFactor}
                                    value={this.state.flowFieldFactor}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <lable>Flow Field Seed:</lable>
                                <input
                                    id="flowFieldSeed"
                                    type="range"
                                    className="form-range"
                                    min={1}
                                    max={100}
                                    step={1}
                                    placeholder="Enter font size"
                                    onChange={this.AlterarFlowFieldSeed}
                                    value={this.state.flowFieldSeed}
                                />
                            </div>
                        </div>
                    </div>



                    {/*
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <lable>Font Size:</lable>
                                <input type="number"
                                    className="form-control form-control-sm"
                                    placeholder="Enter font size"
                                    onChange={this.AlterarTamanhoFonte}
                                    value={this.state.fontSize}
                                />
                            </div>
                        </div>
                    </div>
                     */}

                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <lable>Particle Start Size:</lable>
                                <input type="range"
                                    className="form-range"
                                    min={0}
                                    max={50}
                                    step={1}
                                    placeholder="Enter particle start size"
                                    onChange={this.AlterarParticulaTamanhoInicial}
                                    id='particleStartSize'
                                    value={this.state.particleStartSize}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <lable>Particle End Size:</lable>
                                <input type="range"
                                    className="form-range"
                                    min={0}
                                    max={200}
                                    step={1}
                                    placeholder="Enter particle end size"
                                    onChange={this.AlterarParticulaTamanhoFinal}
                                    id='particleEndSize'
                                    value={this.state.particleEndSize}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <lable>Particle Life Time:</lable>
                                <input type="range"
                                    className="form-range"
                                    min={0}
                                    max={200}
                                    step={1}
                                    placeholder="Enter particle life time"
                                    onChange={this.AlterarParticulaVida}
                                    id='particleLifeTime'
                                    value={this.state.particleLifeTime}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <lable>Particle Density:</lable>
                                <input type="range"
                                    className="form-range"
                                    min={1}
                                    max={100}
                                    step={1}
                                    placeholder="Enter particle density"
                                    onChange={this.AlterarParticulaDensidade}
                                    id='particleDensity'
                                    value={this.state.particleDensity}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="form-check">
                                <lable for="mirrorFlowFieldX" className="form-check-label">Mirro Flow Field in x axis:</lable>
                                <input type="checkbox"
                                    className="form-check-input"
                                    placeholder="Enter particle density"
                                    onChange={this.AlterarFlowFieldX}
                                    id="mirrorFlowFieldX"
                                    checked={this.state.mirrorFlowFieldX}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <div className="form-check">
                                    <input type="checkbox"
                                        className="form-check-input"
                                        placeholder="Enter particle density"
                                        onChange={this.AlterarFlowFieldY}
                                        id="mirroFlowFieldY"
                                        checked={this.state.mirroFlowFieldY}
                                    />
                                    <label className="form-check-label" htmlFor="mirroFlowFieldY">Mirro Flow Field in y axis:</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default App;
