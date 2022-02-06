// 3rd party library imports
import classNames from 'classnames';
import {fromJS, List} from 'immutable';
import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Music20, RadioButton20, RadioButtonChecked20,} from '@carbon/icons-react';

// project imports
import {DispatchAction} from './Reducer';
import {AppState} from './State';
import {Instrument} from './Instruments';
import {Visualizer} from './Visualizers';

/** ------------------------------------------------------------------------ **
 * All the components in the side navigation.
 ** ------------------------------------------------------------------------ */

interface SideNavProps {
    state: AppState;
    dispatch: React.Dispatch<DispatchAction>;
}

const Section: React.FC<{ title: string }> = ({title, children}) => {
    return (
        <div className="flex flex-column bb b--light-gray pa3 customHeight">
            <div className="fw7 mb2">{title} </div>
            <div className="flex-auto overflow-scroll">{children}</div>
        </div>
    );
};

interface RadioButtonProps {
    to: any,
    text: string,
    active: boolean,
    onClick: () => void
}

function RadioButton({to, text, active, onClick}: RadioButtonProps): JSX.Element {
    return (
        <Link to={to} className="no-underline">
            <div
                className={classNames('f6 flex items-center black', {fw7: active})}
                onClick={onClick}
            >
                {active ? (
                    <RadioButtonChecked20 className="mr1"/>
                ) : (
                    <RadioButton20 className="mr1"/>
                )}
                <div className="dim">{text}</div>
            </div>
        </Link>
    );
}

function Instruments({state}: SideNavProps): JSX.Element {
    const instruments: List<Instrument> = state.get('instruments');
    const activeInstrument = state.get('instrument')?.name;
    const location = useLocation();

    return (
        <Section title="Instruments">
            {instruments.map(i => (
                <RadioButton
                    key={i.name}
                    to={`/${i.name}${location.search}`}
                    text={i.name}
                    active={i.name === activeInstrument}
                    onClick={() => console.log(i.name)}
                />
            ))}
        </Section>
    );
}

function Visualizers({state}: SideNavProps): JSX.Element {
    const visualizers: List<Visualizer> = state.get('visualizers');
    const activeVisualizer = state.get('visualizer')?.name;
    const location = useLocation();

    return (
        <Section title="Visualizers">
            {visualizers.map(v => (
                <RadioButton
                    key={v.name}
                    to={{
                        pathname: location.pathname,
                        search: `?visualizer=${v.name}`,
                    }}
                    text={v.name}
                    active={v.name === activeVisualizer}
                    onClick={() => console.log(v.name)}
                />
            ))}
        </Section>
    );
}

function Songs({state, dispatch}: SideNavProps): JSX.Element {
    const [songs, setSongs] = useState(List<any>()); // Songs are stored in the component state

    useEffect(() => {
        const songsList: List<any> = state.get('songs', List());
        if (songsList.size > 0) {
            setSongs(songsList); // Adds the songs from the application state
        }
    }, [state]);

    // This method is used within the filter component
    const handleInputChange = (event: Event) => {
        const inputElement = event.target as HTMLInputElement
        const inputValue = inputElement.value ?? "";
        const filteredSongs = inputValue ? songs.filter((song) => {
            return song.get('songTitle').toUpperCase().startsWith(inputValue.toUpperCase());
        }) : state.get('songs', List());
        if (filteredSongs) {
            setSongs(filteredSongs); // Filtered songs are set to this components state
        }
    }

    return (
        <Fragment>
            <SongFilter onChangeHandler={handleInputChange}/>
            <Section title="Playlist">
                {songs.map(song => (
                    <div
                        key={song.get('id')}
                        className="f6 pointer underline flex items-center no-underline i dim"
                        onClick={() =>
                            dispatch(new DispatchAction('PLAY_SONG', {id: song.get('id')}))
                        }
                    >
                        <Music20 className="mr1"/>
                        {song.get('songTitle')}
                    </div>
                ))}
            </Section>
        </Fragment>
    );
}

/*
* This component displays song filter
* */
function SongFilter(props: any): JSX.Element {
    const onChangeHandler = props.onChangeHandler;
    return (
        <div className="pa2 b--light-gray mb1 mr3">
            <h4 className="fw7 mb2">Search songs</h4>
            <input type="text" maxLength={50} onChange={onChangeHandler}/>
        </div>
    )
}

/*
* This component displays details of the currently playing song
* */
function SongDetails({state}: SideNavProps): JSX.Element {
    let song = state.get('playingSong', fromJS({})).toJSON();
    return (
        <Fragment>
            {song.songTitle && <div className="songDetails overflow-scroll">
                <h3 className="fw7 mb2">{song.songTitle}</h3>
                <div className="songDetails__element">
                    <span><b>Artist :</b></span>
                    <span className="songDetails__element-detail">{song.artist ?? 'Not Available'}</span>
                </div>
                <div className="songDetails__element">
                    <span><b>Album : </b></span>
                    <span className="songDetails__element-detail">{song.album ?? 'Not Available'}</span>
                </div>
                <div className="songDetails__element">
                    <span><b>Genre : </b></span>
                    <span className="songDetails__element-detail">{song.genre ?? 'Not Available'}</span>
                </div>
            </div>}
        </Fragment>

    );
}

export function SideNav({state, dispatch}: SideNavProps): JSX.Element {

    return (
        <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
            <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">
                Temp Instrument
            </div>
            <div className="flex-auto">
                <Instruments state={state} dispatch={dispatch}/>
                <Visualizers state={state} dispatch={dispatch}/>
                <Songs state={state} dispatch={dispatch}/>
                <SongDetails state={state} dispatch={dispatch}/> {/* This renders the song details component */}
            </div>
        </div>
    );
}
