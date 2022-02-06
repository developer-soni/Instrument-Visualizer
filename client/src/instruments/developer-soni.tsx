// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useEffect } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { OmniOscillatorOptions } from "tone/Tone/source/oscillator/OscillatorInterface";
import { RecursivePartial } from "tone/Tone/core/util/Interface";
import image from './../img/flute.png';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Flute.
 ** ------------------------------------------------------------------------ */

interface FluteKeyProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    index: number; // octave + index together give a location for the Flute key
}

export function FluteKey({
    note,
    synth,
    minor,
    index,
}: FluteKeyProps): JSX.Element {
    /**
     * This React component corresponds to either a major or minor key in the Flute.
     */
    return (
        // Observations:
        // 1. The JSX refers to the HTML-looking syntax within TypeScript.
        // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
        // 3. The curly braces `{` and `}` should remind you of string interpolation.
        <div
            onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
            onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
            className={classNames('ba pointer absolute dim', {
                'bg-black black h3': minor, // minor keys are black
                'black bg-white h4': !minor, // major keys are white
            })}
            style={{
                // CSS
                top: 0,
                left: `${index * 2}rem`,
                zIndex: minor ? 1 : 0,
                width: minor ? '1.5rem' : '2rem',
                marginLeft: minor ? '0.25rem' : 0,
            }}
        />
    );
}

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
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

    // Tone created with : https://tonejs.github.io/examples/simpleSynth
    const setOscillator = () => {
        setSynth(oldSynth => {
            oldSynth.disconnect();
            return new Tone.Synth({
                "volume": 7,
                "detune": 0,
                "portamento": 0,
                "envelope": {
                    "attack": 1,
                    "attackCurve": "cosine",
                    "decay": 2,
                    "decayCurve": "linear",
                    "release": 1,
                    "releaseCurve": "exponential",
                    "sustain": 0
                },
                "oscillator": {
                    "partialCount": 3,
                    "partials": [
                        0.000048225308641975394,
                        0.007236810378086416,
                        1
                    ],
                    "phase": 3,
                    "type": "fatcustom",
                    "count": 5,
                    "spread": 1
                } as RecursivePartial<OmniOscillatorOptions>,
            }).toDestination();
        }
        )
            ;
    };

    useEffect(setOscillator, [setSynth]);

    return (
        <div className="pv4">
            <div className={"image"}>
                <img src={image} alt={"Flute"} />
            </div>
            <div className="relative dib h4 w-100 ml4">
                {Range(2, 7).map(octave =>
                    keys.map(key => {
                        const isMinor = key.note.indexOf('b') !== -1;
                        const note = `${key.note}${octave}`;
                        return (
                            <FluteKey
                                key={note} //react key
                                note={note}
                                synth={synth}
                                minor={isMinor}
                                octave={octave}
                                index={(octave - 2) * 7 + key.idx}
                            />
                        );
                    }),
                )}
            </div>
        </div>
    );
}

export const FluteInstrument = new Instrument('Flute (developer-soni)', Flute);
