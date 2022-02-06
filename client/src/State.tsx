// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';
import { RGBCirclesVisualizer } from "./visualizers/developer-soni";
import { DubVisualizer } from "./visualizers/adam-bel";
import { FluteInstrument } from "./instruments/developer-soni";
import { ViolinInstrument } from "./instruments/adam-bel";

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 * 5, 'O mio babbino caro', 'B4 C5 D4 B4 C5 D4 G4 A4 B4 B4 C5 D4 C4 C4 B4 B4', 'Puccini', 'Classic', 'The Most Relaxiing Feel'
 */
export type AppState = Map<string, any>;

const instruments = List([PianoInstrument, FluteInstrument, ViolinInstrument]);
const visualizers = List([WaveformVisualizer, RGBCirclesVisualizer, DubVisualizer]);
//var songs = List([{'id': '2', 'songTitle': 'New Age Track', 'notes': 'B4 B4 D4 B4 B4 D4 G4 A4 B4 B4 D4 C4 C4 C4 B4 B4', 'artist': 'The Reacts', 'genre': 'DubStep', 'album': 'FrontEnd Rocks'}, {'id': '1', 'songTitle': 'Ode to Joy (Dubstep Remix)', 'notes': 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'}, {'id': '3', 'songTitle': 'Allegro', 'notes': 'C3 D6 D4 B4 D6 C3 G4 A4 C3 D6 D4 C4 D6 C4 B4 B4', 'artist': 'Mozart', 'genre': 'Classic', 'album': 'Eine kleine Nachtmusik'}, {'id': '4', 'songTitle': 'Fur Elise', 'notes': 'C7 D7 A4 B4 C7 D7 A4 B4 C7 D7 A4 B4 C7 D7 A4 B4', 'artist': 'Beeethoven', 'genre': 'Classic', 'album': 'Fur Elise'}, {'id': '5', 'songTitle': 'O mio babbino caro', 'notes': 'B4 C5 D4 B4 C5 D4 G4 A4 B4 B4 C5 D4 C4 C4 B4 B4', 'artist': 'Puccini', 'genre': 'Classic', 'album': 'The Most Relaxiing Feel'}])
export const defaultState: AppState = Map<string, any>({
    instruments,
    visualizers,
    //songs
});
