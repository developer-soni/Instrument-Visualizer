// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import {List, Range} from 'immutable';
import React, {useEffect} from 'react';

// project imports
import {Instrument, InstrumentProps} from '../Instruments';
import {RecursivePartial} from "tone/Tone/core/util/Interface";
import {OmniOscillatorOptions} from "tone/Tone/source/oscillator/OscillatorInterface";
import image from './../img/violin.jpg';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Violin.
 ** ------------------------------------------------------------------------ */

interface ViolinKeyProps {
  note: string; 
  duration?: string;
  synth?: Tone.Synth; 
  minor?: boolean; 
  octave: number;
  index: number; 
  topDi: number;
  leftDi: number; 
  rota: string; 
}

export function ViolinKey({note, synth, minor, index, topDi, leftDi, rota}: ViolinKeyProps): JSX.Element {
  return (
    <div
      style={{
        transform: rota
      }}>
      <div
        onMouseDown={() => synth?.triggerAttack(`${note}`)} 
        onMouseUp={() => synth?.triggerRelease('+0.1')}
        className={classNames('ba pointer absolute dim')}
        style={{
          top: topDi,
          transform: "rotate(0deg)",
          left: `${leftDi}rem`,
          zIndex: 0,
          marginLeft: minor ? '0.25rem' : 0,
          background: "#C8C9C5",
          height: '10px',
          width: "20px",
          borderRadius: "6px"
        }}>
      </div>
    </div>
  );
}

function Violin({synth, setSynth}: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);

  const setOscillator = () => {
    setSynth(oldSynth => {
      oldSynth.disconnect();
      return new Tone.Synth({
        "volume": 5,
        "detune": 0,
        "portamento": 0,
        "envelope": {
          "attack": 2,
          "attackCurve": "cosine",
          "decay": 0.1,
          "decayCurve": "linear",
          "release": 0.2,
          "releaseCurve": "cosine",
          "sustain": 0.2
        },
        "oscillator": {
          "partialCount": 5,
          "partials": [
            1,
            0.8434636622299384,
            0.000244140625,
            0.31640625,
            0.0625
          ],
          "phase": 8,
          "type": "custom"
        } as RecursivePartial<OmniOscillatorOptions>,
      }).toDestination();}
    );
  };

  useEffect(setOscillator, [setSynth]);

  return (
    <div className="pv4">
      <div className={"image"}>
        <img src={image} alt={"Violin"} style={{
          position: 'absolute',
          top: window.innerHeight/16,
          left: window.innerWidth/8
        }}/>
      </div>
      <div className="relative dib h4 w-100 ml4">
        {Range(3, 4).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave+1}`;
            if (isMinor) {
              return null
            } 
            return (
              <ViolinKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave+1}
                index={(octave - 2) * 7 + key.idx}
                topDi={125}
                leftDi={(((octave - 2) * 7 + key.idx) * 2)+20}
                rota={"rotate(1.5deg)"}
              />
            );
          }),
        )}
      </div>
      <div className="relative dib h4 w-100 ml4">
        {Range(4, 5).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave+1}`;
            if (isMinor) {
              return null
            }
            return (
              <ViolinKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave+1}
                index={(octave - 2) * 7 + key.idx}
                topDi={3}
                leftDi={(((octave - 2) * 7 + key.idx) * 2)+3}
                rota={"rotate(0deg)"}
              />
            );
          }),
        )}
      </div>
      <div className="relative dib h4 w-100 ml4">
        {Range(5, 6).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave+1}`;
            if (isMinor) {
              return null
            }
            return (
              <ViolinKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave+1}
                index={(octave - 2) * 7 + key.idx}
                topDi={-120}
                leftDi={(((octave - 2) * 7 + key.idx) * 2)-11}
                rota={"rotate(0deg)"}
              />
            );
          }),
        )}
      </div>
      <div className="relative dib h4 w-100 ml4">
        {Range(6, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave+1}`;
            if (isMinor) {
              return null
            }
            return (
              <ViolinKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave+1}
                index={(octave - 2) * 7 + key.idx}
                topDi={-240}
                leftDi={(((octave - 2) * 7 + key.idx) * 2)-22}
                rota={"rotate(-1.5deg)"}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const ViolinInstrument = new Instrument('Violin (adam-bel)', Violin);