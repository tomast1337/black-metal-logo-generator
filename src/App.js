import React from 'react';
//import Particle from './util/particle.js';
import p5 from 'p5';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {
            wight: 0,
            height: 0,
            text: 'This is a tesT',
            textColor: '#000000',
            backgroundColor: '#ffffff',
            fontSize: 120,
            particleStartSize: 10,
            particleEndSize: 0,
            particleLifeTime: 1,
            particleDensity: 10,
            scale: 10,
            mirrorFlowFieldX: false,
            mirroFlowFieldY: false,
        }
        this.changed = true;
    }

    Sketch = (p5) => {
        let particles = []
        let flowField = []
        let cols, rows;
        let t = 0;
        const setupParticles = () => {
            for (let i = 0; i < this.state.particleDensity; i++) {
                //let p = new Particle(0, 0, this.state.particleLifeTime, this.state.particleStartSize, this.state.particleEndSize, p5.color(this.state.textColor));
                //particles.push(p)
            }
        }

        const setupFlowField = () => {
            cols = p5.floor(p5.width / this.state.scale);
            rows = p5.floor(p5.height / this.state.scale);
            flowField = new Array(cols * rows);
            for (let i = 0; i < flowField.length; i++) {
                flowField[i] = p5.createVector(0, 0);
            }
        }

        const drawFlowField = () => {
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const index = x + y * cols;
                    const angle = p5.noise(x * 0.1, y * 0.1) * p5.TWO_PI * t;
                    const v = p5.createVector(p5.cos(angle), p5.sin(angle));
                    p5.stroke(0);
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
            setupFlowField();
            setupParticles();
        }

        p5.setup = () => {
            p5.createCanvas(1360, 768);
            p5.background(255);
        };

        p5.draw = () => {
            if (this.changed) {
                reset();
                this.changed = false;
            }
            drawFlowField();
            t = p5.sin(p5.frameCount * 0.01) * 0.5 + 0.5;
            this.changed = true;
        };

    }

    cleanCanvas() {
        this.myP5.background(255);
    }

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    AlterarTexto = (event) => {
        this.setState({ text: event.target.value })
        this.changed = true;
    }

    AlterarTextoCor = (event) => {
        this.setState({ textColor: event.target.value })
        this.changed = true;
    }

    AlterarFundoCor = (event) => {
        this.setState({ backgroundColor: event.target.value })
        this.changed = true;
    }

    AlterarTamanhoFonte = (event) => {
        this.setState({ fontSize: event.target.value })
        this.changed = true;
    }

    AlterarParticulaTamanhoInicial = (event) => {
        this.setState({ particleStartSize: event.target.value })
        this.changed = true;
    }

    AlterarParticulaTamanhoFinal = (event) => {
        this.setState({ particleEndSize: event.target.value })
        this.changed = true;
    }

    AlterarParticulaVida = (event) => {
        this.setState({ particleLifeTime: event.target.value })
        this.changed = true;
    }

    AlterarParticulaDensidade = (event) => {
        this.setState({ particleDensity: event.target.value })
        this.changed = true;
    }

    AlterarFlowFieldX = (event) => {
        this.setState({ mirrorFlowFieldX: event.target.checked })
        this.changed = true;
    }

    AlterarFlowFieldY = (event) => {
        this.setState({ mirroFlowFieldY: event.target.checked })
        this.changed = true;
    }

    render() {
        return (
            <div lassName="container page-container">

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
                            <div class="form-group">
                                <lable>Text:</lable>
                                <input type="text"
                                    class="form-control form-control-sm"
                                    placeholder="Enter text"
                                    onChange={this.AlterarTexto}
                                    value={this.state.text}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div class="form-group">
                                <lable>Text Color:</lable>
                                <input type="color"
                                    class="form-control form-control-color"
                                    placeholder="Enter text color"
                                    onChange={this.AlterarTextoCor}
                                    id='textColor'
                                    value={this.state.textColor}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div class="form-group">
                                <lable>background Color:</lable>
                                <input type="color"
                                    class="form-control form-control-color"
                                    placeholder="Enter background color"
                                    onChange={this.AlterarFundoCor}
                                    id='backgroundColor'
                                    value={this.state.backgroundColor}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div class="form-group">
                                <lable>Font Size:</lable>
                                <input type="number"
                                    class="form-control form-control-sm"
                                    placeholder="Enter font size"
                                    onChange={this.AlterarTamanhoFonte}
                                    value={this.state.fontSize}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div class="form-group">
                                <lable>Particle Start Size:</lable>
                                <input type="number"
                                    class="form-control form-control-sm"
                                    placeholder="Enter particle start size"
                                    onChange={this.AlterarParticulaTamanhoInicial}
                                    id='particleStartSize'
                                    value={this.state.particleStartSize}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div class="form-group">
                                <lable>Particle End Size:</lable>
                                <input type="number"
                                    class="form-control form-control-sm"
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
                            <div class="form-group">
                                <lable>Particle Life Time:</lable>
                                <input type="number"
                                    class="form-control form-control-sm"
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
                            <div class="form-group">
                                <lable>Particle Density:</lable>
                                <input type="number"
                                    class="form-control form-control-sm"
                                    placeholder="Enter particle density"
                                    onChange={this.AlterarParticulaDensidade}
                                    id='particleDensity'
                                    value={this.state.particleDensity}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div class="form-check">
                                <lable for="mirrorFlowFieldX" className="form-check-label">Mirro Flow Field in x axis:</lable>
                                <input type="checkbox"
                                    class="form-check-input"
                                    placeholder="Enter particle density"
                                    onChange={this.AlterarFlowFieldX}
                                    id="mirrorFlowFieldX"
                                    value={this.state.mirrorFlowFieldX}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <div className="form-check">
                                    <input type="checkbox"
                                        class="form-check-input"
                                        placeholder="Enter particle density"
                                        onChange={this.AlterarFlowFieldY}
                                        id="mirroFlowFieldY"
                                        value={this.state.mirroFlowFieldY}
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
