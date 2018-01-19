import React,{Component} from "react";
import ReactDOM from 'react-dom';
import numberToHuman from "../../lib/numberToHuman";



export default class Commentlayout extends Component{


	constructor(props){
        super(props);


        this.updatestate = this.updatestate.bind(this);

    }

    updatestate(){
    	console.log("My data");
    	console.log(this.props);
    	this.setState({
    		cla : true
    	})

    	this.forceUpdate();


    }

	template (){

		const type = this.props.type;
		let update = this.props.data;


		if(type == 0){

			return (

				<div className="post-comment-button ghb" onClick={this.updatestate}>
				  <button type="button" name="like"> <i className="icon icon-big-speech-balloon"/> </button>
				  <div className="comment-count" onClick={this.updatestate} id={"React-Comment_count"+update.update_id}>
				  	{numberToHuman(this.props.data.commentCount,false)}
				  </div>
				</div>

			);

		}


		else {

			return (

				<div className="post-share-button ghb" onClick={this.updatestate} >
				  <button type="button" name="like"> <i className="icon icon-big-speech-balloon"/> </button>
				  <div className="comment-count" id={"React-Comment_count"+update.update_id}>{numberToHuman(this.props.data.commentCount,false)}</div>
				</div>

			);

		}


	}

	render (){

		return this.template();
	}


}