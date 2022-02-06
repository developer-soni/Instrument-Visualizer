// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import {Visualizer} from '../Visualizers';

function Dub(p5: P5, analyzer: Tone.Analyser) {
  const width = window.innerWidth;
  const height = window.innerHeight / 2;
  const dim = Math.min(width, height);
  const colors = ['blue', 'white', 'yellow', 'red']

  p5.background('black');
  p5.noFill();

  p5.strokeWeight(dim * 0.01);

  const values = analyzer.getValue();
  p5.beginShape();

  for (let j = 0; j < colors.length; j++) {
    p5.translate(-170*j, 17);
    p5.rotateX(p5.frameCount*0.01*j);
    p5.rotateY(p5.frameCount*0.03*j);
    for (let i = 0; i < values.length; i++) {
      p5.stroke(colors[j]);
      const amplitude = values[i] as number;
      p5.box(amplitude*100*(j+1), amplitude*100*(j+1), amplitude*100*(j+1));
    }
  }

  p5.endShape();
}

export const DubVisualizer = new Visualizer('Dub (adam-bel)', Dub);