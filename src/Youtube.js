import React from 'react';
import axios from "axios";
import { Input } from 'antd';
import { Card } from 'antd';
import "antd/dist/antd.css";
const { Meta } = Card;


class Youtube extends React.Component {
    state = {
        q: "",
        youtubeCards: [],
        spotifyCards:[]
    }
    handleChange = (name) => event => {
        this.setState({ [name]: event.target.value });
    }
    handleSearch() {
        axios({
            method: "GET",
            url: "https://8zxd89s648.execute-api.eu-north-1.amazonaws.com/test/get-youtube",
            headers: { 'content-type': 'application/json' }
        }).then(res => { 
            console.log(res);
            this.setState({ youtubeCards: res.data.body.items })
            // feed.concat(res.data.body.i)
         })
         axios({
            method: "GET",
            url: "https://8zxd89s648.execute-api.eu-north-1.amazonaws.com/test/get-spotify",
            headers: { 'content-type': 'application/json' },
         }).then(res=>{
             console.log(res)
             this.setState({spotifyCards:res.data.body.playlists.items})
            })
    }
    render() {
        return (
            <>
                {/* <Input type="text" onChange={this.handleChange("q")} /> */}
                <button type="button" onClick={() => this.handleSearch()}>Hae</button>
                {this.state.youtubeCards.map(c => (
                    <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<iframe width="560" height="315" src={`https://www.youtube.com/embed/${c.id && c.id.videoId}`} frameborder="0" allowfullscreen></iframe>}
                    >
                        <Meta title={c.snippet && c.snippet.title} description={c.snippet && c.snippet.description} />
                    </Card>
                ))}
                {this.state.spotifyCards.map(c => (
                    <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<iframe width="560" height="315" src={`https://open.spotify.com/embed/playlist/${c.id}`} frameborder="0" allowfullscreen></iframe>}
                    >
                        <Meta title={c.name} description={c.description} />
                    </Card>
                ))}

            </>
        )

    }
};

export default Youtube;
