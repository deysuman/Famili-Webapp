import React,{Component} from "react";
import numberToHuman from "../../../lib/numberToHuman";
import {SITE} from "../../../constants/action_types";



export default class PeoplesAdapter extends Component{

  constructor(props){
    super(props);
    this.state = {
      data:this.props.value
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
										<div className="profile-search-text-follow"><a href="">{followlabel}</a></div>
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