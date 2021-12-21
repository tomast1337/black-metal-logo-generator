import React, { useEffect, useState } from 'react';
import p5 from 'p5';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {
            wight: 0,
            height: 0,
            text: 'text',
            textColor: '#000000',
            backgroundColor: '#ffffff',
            particleStartSize: 1,
            particleEndSize: 1,
            particleLifeTime: 1,
            particleDensity: 1,
            scale : 10,
            mirrorFlowFieldX: false,
            mirroFlowFieldY: false,
        }
    }

    Sketch = (p5) => {
        let xoff = 0;
        let yoff = 0;
        let size = 10;
        let r = 255;
        let g = 255;
        let b = 255;
        let a = 255 / 10;
        p5.setup = () => {
            p5.createCanvas(1360, 768);
            p5.background(255);

            xoff = p5.width / 2;
            yoff = p5.height / 2;
        };

        p5.draw = () => {
            p5.fill(r, g, b, a);
            p5.stroke(0, 0, 0, 255 / 10);
            p5.strokeWeight(1);

            xoff += 0.01;
            yoff += 0.01;

            let x = p5.noise(xoff * 2) * p5.width;
            let y = p5.noise(yoff * 2) * p5.height;
            size = p5.noise(xoff) * 80;
            p5.ellipse(x, y, size, size);

            r = p5.noise(xoff) * 255;
            g = p5.noise(yoff) * 255;
            b = p5.noise(xoff, yoff) * 255;

        };
    }
    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    AlterarTexto = (event) => {
        this.setState({ text: event.target.value })
    }

    AlterarTextoCor = (event) => {
        this.setState({ textColor: event.target.value })
    }

    AlterarFundoCor = (event) => {
        this.setState({ backgroundColor: event.target.value })
    }

    AlterarParticulaTamanhoInicial = (event) => {
        this.setState({ particleStartSize: event.target.value })
    }

    AlterarParticulaTamanhoFinal = (event) => {
        this.setState({ particleEndSize: event.target.value })
    }

    AlterarParticulaVida = (event) => {
        this.setState({ particleLifeTime: event.target.value })
    }

    AlterarParticulaDensidade = (event) => {
        this.setState({ particleDensity: event.target.value })
    }

    AlterarFlowFieldX = (event) => {
        this.setState({ mirrorFlowFieldX: event.target.checked })
    }

    AlterarFlowFieldY = (event) => {
        this.setState({ mirroFlowFieldY: event.target.checked })
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
