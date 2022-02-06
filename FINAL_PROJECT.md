# Custom Visualizer and Instrument Project


## Individual Component

**Each** person in the group will be required to:
1. Add a **unique** (i.e., different from other group members) visualizer (i.e., add code under `client/src/visualizers/`).
2. Add a **unique** (i.e., different from other group members) instrument (i.e., add code under `client/src/instruments/`).


### Visualizer

One component we will add is a music visualizer [https://en.wikipedia.org/wiki/Music_visualization](https://en.wikipedia.org/wiki/Music_visualization). The base template provides a simple waveform visualizer.

1. You are each required to add a new visualizer that is different from the other group members. 
2. Display your visualizer in the visualizer panel and make it selectable from the side panel using your github handle as the name of the visualizer.
    * `client/src/visualizers/<github-handle-1>.tsx` 
    * `client/src/visualizers/<github-handle-2>.tsx` 
    * etc.
3. You can use the visualizer in the `client/src/visualizers/` as a starting point for your visualization. The current visualizer creates a 1D waveform as a function of time.
    * A small modification would mean that the visualization is a waveform based visualization similar to the one given in the template.
    * A medium modification would mean that the visualization takes a waveform based visualization and adds some different dimensions, e.g., a display of a waveform not as a curve but as a series of bars.
    * A major modification will look nothing like the base visualization. For example, we might have 2D shape visualizations.


### Instrument

1. You are each required to add a new instrument that is different from the other group members. 
2. Display your instrument in the instrument panel and make it selectable from the side panel using your github handle as the name of the instrument.
    * `client/src/instruments/<github-handle-1>.tsx` 
    * `client/src/instruments/<github-handle-2>.tsx` 
    * etc.
3. You can use the visualizer in the `client/src/instruments/` as a starting point for your visualization. The current instrument is a piano.
    * A small modification would mean that you made some small modification of a piano (e.g., more keys).
    * A major modification will involve adding a completely new instrument such as a guitar, flute, etc.


### Playlist Database

1. You are required to build out the playlist database (`server`).
    * A small modification would mean that you have made minor updates to the SQL song database and no UI improvements.
    * A major modification will involve modifying the SQL database by adding meta-data for songs, albums, and artists, as well as the corresponding UI elements for searching for songs.

2. Bonus: add any feature not included in the individual component. Some ideas include:
    * Try out new sound libraries
    * Playlist management dashboard
