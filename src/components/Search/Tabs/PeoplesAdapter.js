import React,{Component} from "react";
import numberToHuman from "../../../lib/numberToHuman";
import {SITE} from "../../../constants/action_types";
import {URLS} from "../../../constants/api";
import Ajax from "../../../lib/ajax";



export default class PeoplesAdapter extends Component{

  constructor(props){
    super(props);
    this.state = {
      data:this.props.value,
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
			<div className="profile-search-text-follow"><a>waiting</a></div>
                )

		}

		else {
			return(
			<div onClick={this.toggleoption} className="profile-search-text-follow"><a>{ui}</a></div>
                )
		}

	}



	render(){

  		const people = this.state.data;

  		let followlabel = (people.is_follow == true) ? "Following" : "Follow";



		return (
				<div className="profile-search-box">
								<div className="profile-search-image-box">
									<a href=""><img src={people.header} alt={SITE.DEVNAME}/></a>
								</div>
								<div className="profile-search-text-box">
									<div className="profile-search-user-image"><img src={people.avatar} alt={SITE.DEVNAME}/></div>
									<div className="profile-search-user-box">
										<div className="profile-search-user-name">
											<a href={"/"+people.username} title={people.name} rel="nofoolow">{people.name}</a>
										</div>
										<div className="profile-search-user-nikname">
											<a href={"/"+people.username} rel="nofoolow">{people.username}</a>
										</div>

										
										{this.button_area()}

									</div>
									<div className="stats">
										<div className="followers">
											<div className="num">{numberToHuman(people.friend_count,false)}</div>
											   <span className="ng-binding">Friends</span>
											</div>
										<div className="followers">
											<div className="num">{numberToHuman(people.follower_count,false)}</div>
												<span className="ng-binding">Followers</span>
											</div>
										<div className="followers">
											<div className="num">{numberToHuman(people.following_count,false)}</div>
												<span className="ng-binding">Following</span>
											</div>
									</div>
								</div>
				 </div>
		);

	}



}