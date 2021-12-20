import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import style from'./App.scss';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {
            wight: 0,
            height: 0,
        }
    }

    Sketch = (p5) => {
        let xoff = 0;
        let yoff = 0;
        let size = 10;
        let r = 255;
        let g = 255;
        let b = 255;
        p5.setup = () => {
            p5.createCanvas(630, 400);
            p5.background(0);

            xoff = p5.width / 2;
            yoff = p5.height / 2;
        };

        p5.draw = () => {
            p5.fill(r, g, b);
            p5.stroke(0);
            p5.strokeWeight(1);
            
            xoff += 0.01;
            yoff += 0.01;

            let x = p5.noise(xoff*2) * p5.width;
            let y = p5.noise(yoff*2) * p5.height;
            size = p5.noise(xoff) * 80;
            p5.ellipse(x, y, size, size);
            
            r = p5.noise(xoff) * 255;
            g = p5.noise(yoff) * 255;
            b = p5.noise(xoff,yoff) * 255;

        };
    }
    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }
    render() {
        return (
            <>
                <div className='title'>
                    <h1>Black Metal Logo Generator</h1>
                    <h3>by Nicolas Vycas Nery</h3>
                </div>
                <div className='canvasContainer' ref={this.myRef}>

                </div>
                <div>
                    <button onClick={() => this.myP5.background(0)}>Clear</button>
                </div>
            </>
        )
    }
}

export default App;
