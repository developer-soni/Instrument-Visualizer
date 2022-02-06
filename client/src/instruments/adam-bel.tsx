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
}

export function ViolinKey({note, synth, minor, index}: ViolinKeyProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} 
      onMouseUp={() => synth?.triggerRelease('+0.1')}
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      })}
      style={{
        top: 0,
        left: `${(index * 2)-7}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0
      }}>
      <span 
        style={{
          top: minor ? '40px' : '100px',
          left: minor ? '1px' : '4px',
          color: minor ? 'white' : 'black',
          fontSize: minor ? '11px' : '15px',
          boxShadow: minor ? '1px 1px white, -1px -1px white' : '1px 1px black, -1px -1px black',
          position: 'relative'
        }}>
        {note}
      </span>
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
        <img src={image} alt={"Violin"}/>
      </div>
      <div style={{color:'white'}}>violin</div>
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const isB = key.note.indexOf('B') !== -1;
            const note = `${key.note}${octave+1}`;
            if ((octave === 2 && key.note !== "G") || (octave === 6 && isB)) {
              return null
            } else if (octave === 2 && key.note === "G") {
              return (
                <ViolinKey
                  key={note} //react key
                  note={note}
                  synth={synth}
                  minor={isMinor}
                  octave={octave+1}
                  index={(octave - 2) * 7 + 6}
                />
              );
            }
            return (
              <ViolinKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave+1}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const ViolinInstrument = new Instrument('Violin (adam-bel)', Violin);