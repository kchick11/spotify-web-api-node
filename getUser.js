const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQAMxJ603NRbUjKDfNFx7MvX-zTYAz3IreaCk1eCAFc2wK7VDY82Fo_EroC_fYgUrv_zK_9xGSpithO4_Gr_LwrkhVjMlWxJZhNj3TWS2jiPe54HQRYLZBwoyvcrwN8Y1q1zTBlYlsG7WtGBcogJPeYU0bmjHMA4gbBXVHLusnfYhvSv7aIttyrgPbD-L34ZCzEIIye24oUWO42cpNUBaoGncEi4YhrifA_FlowlhQH5oKZx2Bkk9ZZVYVRPuiD9zjXh3besWXdQyKWyhyK6u6PYHC-7XywC4PksMjo4P_jxBIy0yz5W"

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GETS PROFILE DATA
function getMyData(){
    (async() => {
        const me = await spotifyApi.getMe();
        console.log(me.body);
    })().catch(e=>{
        console.error(e);
    });
}

getMyData();