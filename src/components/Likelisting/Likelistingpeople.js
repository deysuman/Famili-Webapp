import React,{Component} from "react";
import {URLS} from "../../constants/api";
import Ajax from "../../lib/ajax";


export default class Likelistingpeople extends Component{

	constructor(props){
	    super(props);
	    
	    this.state = {       

	        data : this.props.value	,
	        loading : false 
	    }

	    this.toggleoption = this.toggleoption.bind(this);

	}


	toggleoption(){


		let reactThis=this;
        let data='data='+myid+'&uname='+reactThis.state.data.userid;

        reactThis.setState({loading : true})

        if(reactThis.state.data.is_follow == true){

        	Ajax(URLS.UNFOLLoW, data , reactThis, function(data){

        		reactThis.state.data.is_follow = false;

        		reactThis.forceUpdate();

        		reactThis.setState({loading : false})

         	});

        }


        else{



        	Ajax(URLS.FOLLOW, data , reactThis, function(data){

        		reactThis.state.data.is_follow = true;
        		reactThis.forceUpdate();

        		reactThis.setState({loading : false})

         	});
        }

        

	}


	button_area(){

		let ui = (this.state.data.is_follow == true) ? 'Unfollow' : 'Follow';

		if(this.state.loading == true){
			return(
			<div className="about-mutual-popt-button">
                    <a>waiting</a>
                </div>
                )

		}

		else {
			return(
			<div className="about-mutual-popt-button">
                    <a onClick={this.toggleoption}>{ui}</a>
                </div>
                )
		}

	}


	template (){

		let update = this.state.data;

            return (<div key={Math.random()} className="about-right-mutual-list">
                <div className="about-right-mutual-list-image">
                    <img src={update.img} alt="" />
                </div>
                <div className="about-right-mutual-list-text">
                    <h2>{update.fullname}</h2>
                    <p><a href="#" className="myBtn"><span>{update.count}</span>Mutual friends</a></p>
                </div>
                {this.button_area()}
            </div>)


	}


	render(){

		return this.template();

	}












}