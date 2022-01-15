const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDbx1GR35MJT7F5mORyt5GGNsiI0Ku6bpms6NKfvuj-CBT-j7WurZBdb_Ft1YI1SsLzFXuMnpLN8i7_qQKbq0UPJFDuLzV1LTuZn2xOsiJYep1sLi4StZPZKm6Tb8QXnDWSTuQkOS9sNsKaBhQSz36UJu9zgrfBd2EF0JuZmtGqhKekXG751YdFjiU2NY3wrrrmN3I3dgN6id6Qu_6C2IXp0kVs509R76dc4pUWpqTfCY-nyer_R-jqIzZ7Bj7M1yupePH89QIQr9preA8KcsP3i7aHSYY"

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GETS PROFILE DATA
function getMyData(){
    (async() => {
        const me = await spotifyApi.getMe();
        console.log(me.body);
        getUserPlaylists(me.body.id)
    })().catch(e=>{
        console.error(e);
    });
}

// //GETS PLAYLISTS
async function getUserPlaylists(userName){
    const data = await spotifyApi.getUserPlaylists(userName, {
        limit: 1 // change to 50 later
    })

    console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-")
    let playlists = []

    for (let playlist of data.body.items){
        console.log(playlist.name + " " + playlist.id)

        let tracks = await getPlaylistTracks(playlist.id, playlist.name);
        //console.log(tracks);

        const tracksJSON = { tracks }
        let data = JSON.stringify(tracksJSON);
        fs.writeFileSync(playlist.name+'.json', data);

    }
}

async function getPlaylistTracks(playlistId, playlistName) {
    const data = await spotifyApi.getPlaylistTracks(playlistId, {
        offset: 0,
        limit: 100,
        fields: 'items'
    })

    //console.log('The playlist contains these tracks', data.body);
    console.log("'" + playlistName + "'" + ' contains these tracks:');
    let tracks = [];

    for (let track_obj of data.body.items) {
        const track = track_obj.track
        tracks.push(track);
        console.log(track.name + " : " + track.artists[0].name)
    }

    console.log("-------------++++");
    return tracks;
}


getMyData();