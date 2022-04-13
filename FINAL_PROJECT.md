# Visualizer Project


### Visualizer Component

Add a **unique** visualizer (i.e., add code under `client/src/visualizers/`) \
One component we will add is a music visualizer [https://en.wikipedia.org/wiki/Music_visualization](https://en.wikipedia.org/wiki/Music_visualization). The base template provides a simple waveform visualizer.

Add a **new** visualizer
* Display visualizer in the visualizer panel and make it selectable from the side panel. 

The current visualizer creates a 1D waveform as a function of time.
* Small modification would mean that the visualization is a waveform based visualization.
* Medium modification would mean that the visualization takes a waveform based visualization and adds some different dimensions, e.g., a display of a waveform not as a curve but as a series of bars.
* Major modification will look nothing like the base visualization. For example, we might have 2D shape visualizations.

### Instrument Component

Add a **new** instrument
* Display instrument in the instrument panel and make it selectable from the side panel.

The current instrument is a piano.
* Small modification would mean some small modification of a piano (e.g., more keys).
* Major modification will involve adding a completely new instrument such as a guitar, flute, etc.

### Playlist Database

Build out the playlist database (`server`).
* Small modification would mean minor updates to the SQL song database and no UI improvements.
* Major modification will involve modifying the SQL database by adding meta-data for songs, albums, and artists, as well as the corresponding UI elements for searching for songs.

### Extra Features

* Playlist management dashboard with search functionality added
* Adding custom music notes in database for personalized music beats
