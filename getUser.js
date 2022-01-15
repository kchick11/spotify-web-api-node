const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQCFA42UtWslfrB30FflT8ZMppKKgN-jaQ5uBZEwG_y0yrham9LH5n4lPGydkEVpoc8s_EQ_a5hviozn9EpUUt40wLcgad6z5Y8Zu7Xc4TIVlsCdqNJ_eWACjJZXBzY0-FKgAXu55y6JoZNP6vwIuFpfLBPTGswWu_uGleXDwY3cJiyxvyIYuRgQpGW-i9rvqOAjqC-aO8n7UxclfFuo-390VSEwG8Qq3cHMsDop7J4VSr9hJKfd57KP_BWFui-vQlGc-VPDqOk10EBYiEDqjXPBzD2Gv2S5Xnwc0x1kqYhu0gT71k0A"

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
        limit: 50
    })

    console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-")
    let playlists = []

    for (let playlist of data.body.items){
        console.log(playlist.name + " " + playlist.id)
    }
}


getMyData();