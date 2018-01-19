import React,{Component} from "react"
import Video from "./Videoplayer"


export default class Videopreview extends Component {

    constructor(){
		super()
		this.api = null;
		this.getApi = this.getApi.bind( this );
		this._setContent = this._setContent.bind(this);
		this._toggleControls = this._toggleControls.bind(this);

		this.state = {
			content:"",
			showControls: true,
			controlPanelStyle:"overlay",
		}
	}
	getApi(api){
		//console.log( this )
		this.api = api;
	}
	_togglePlay(){
		//console.log(this.api)
		if(!this.api) return;
		this.api.togglePlay()
	}
	_volume( increment ){
		if(!this.api) return;
		this.api.volume( this.api.$video.volume + increment )
	}
	_fullscreen(){
		if(!this.api) return;
		this.api.fullscreen();
	}
	_setTime( second ){
		if(!this.api) return;
		this.api.setTime(second )
	}
	_setContent(e){
		this.setState({
			content: e.target.value
		})
	}
	_toggleControls(e){
		//console.log("toggle controls")
		this.setState({
			showControls: !this.state.showControls
		})
	}
	_changeStyle(style){
		//console.log("set panel style to:",  style)
		this.setState({controlPanelStyle: style });
	}

	render() {
        let sources = [this.props.source];
        let subtitles = [];
        let poster = ''

        return (

            <Video
							sources={sources}
							subtitles={subtitles}
							poster={poster}
							metaDataLoaded={this.getApi}
							controls={this.state.showControls}
							controlPanelStyle={this.state.controlPanelStyle}
						>


						</Video>

        )



    }


}