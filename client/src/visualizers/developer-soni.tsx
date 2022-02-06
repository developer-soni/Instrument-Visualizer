// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import {Visualizer} from '../Visualizers';

export const RGBCirclesVisualizer = new Visualizer(
    'RGBCircles (developer-soni)',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = 150;
        const height = 150;
        const strokeColors = ['#fff700', '#4000ff', '#00ff08', '#ff0000']
        const color = strokeColors[Math.floor(Math.random() * (strokeColors.length + 1))];

        p5.background('#383737');
        p5.stroke(String(color));
        const values = analyzer.getValue();
        p5.beginShape();

        for (let i = 0; i < Math.min(values.length, 255); i++) {
            const amplitude = values[i] as number;
            const x = p5.map(i, 0, values.length - 1, 0, width / 2);
            // const y = height / 2 + amplitude * height;
            const y = p5.map(i, 0, values.length - 1, 0, height / 2);
            const xAngle = p5.map(i, 0, x, -4 * Math.PI, 4 * Math.PI,);
            const yAngle = p5.map(i, 0, y, -4 * Math.PI, 4 * Math.PI,);
            const angle = xAngle * (x / width) + yAngle * (y / height);

            for (let j = 0; j < 10; j++) {
                const myX = (width*-4) - width / 2 * p5.cos(2 * Math.PI * amplitude + angle);
                const myY = (height*-0.5) - height / 2 * p5.sin(2 * Math.PI * -1 * amplitude + angle);
                p5.circle(myX + j * 115, myY, 5); // draw particle
                p5.circle(myX + j * 115, myY + 1 * 150, 5); // draw particle
            }
        }

        p5.endShape();
    },
);