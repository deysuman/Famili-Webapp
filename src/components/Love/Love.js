import React,{Component} from "react";
import ReactDOM from 'react-dom';
import numberToHuman from "../../lib/numberToHuman";
import Likelistingopen from "../Likelisting/Likelistingopen";
import Ajax from "../../lib/ajax";
import {URLS} from "../../constants/api";


export default class Love extends Component{

	constructor(props){
    super(props);
    
	    this.state = {     

	        liked : this.props.liked,
	        likeCount : this.props.likecount,
	        update : this.props.update,
	        type : this.props.type
	    
	   	 }

       this.updatestate = this.updatestate.bind(this);


 	}


 	 incrementCount(l) {

  		if(typeof action_active !== 'undefined'){

  			if(action_active == 0){

  				this.love(l);
			}

			else {

                swal("Notify", msg, "error");
			}

		}

		else {

            this.love(l);

		}


    }

    love (l){

        //First like
        let type = "true";
        if(!l.liked){
            
            l.liked = true;
            l.likeCount = l.likeCount + 1;

            type ="true";

            this.setState({liked: true});

        }
        else{

           l.liked = false;
           l.likeCount = l.likeCount - 1;
           type = "false";
           this.setState({liked: false})
        }

        //$("body").css("cursor","wait")


        var reactThis=this;
        var data='postid='+l.update_id+'&type='+type+'&mode='+0;
        Ajax(URLS.LOVE_REQUEST, data , reactThis, function(data){


           // $("body").css("cursor","auto")

        });

        return false;

        this.forceUpdate();
	}

 	likelistings(update){

		if(document.getElementById("like_listing")){

		}

		else{


			let div = document.createElement("div");
			div.id="like_listing";
			document.body.appendChild(div);
     // div.innerHTML='<div id="like_listing2" class="default-modal-mu"></div>';


		}

		return(ReactDOM.render(<Likelistingopen likesdata={update.likelisting}/>,document.getElementById("like_listing")));

	}




 	wholikesthis (l) {

        if (!l.liked) {
            if (l.likeCount != 0) {            	

                return (<div className="like-count"   onClick={this.likelistings.bind(this, l)}>
                             {numberToHuman(l.likeCount, false)} people love this

                             </div>);

            }

        }

        else if (l.liked) {

            if (l.likeCount != 0 && l.likeCount > 1) {


                return (<div className="like-count" onClick={this.likelistings.bind(this, l)}>You
                    and {numberToHuman(Math.round(l.likeCount - 1), false)} others people love this</div>);

            }

            else if (l.likeCount == 1 && l.liked == true) {

                return (<div className="like-count">You love this</div>);

            }


        }
    }

  updatestate(){

    this.setState({
      updatestate : true
    });

    this.forceUpdate();

   // alert();

  }

 	template (){

 		let update = this.state.update;
    let mystyle = {display : 'none'}


 		if(this.state.type == 0){

 			return (
 			
 			<div className="post-like-button">
        <span id={"update_"+update.update_id} style={mystyle} onClick={this.updatestate}></span>
				<button type="button" name="like" value={update.update_id} key={update.update_id} onClick={this.incrementCount.bind(this,update)}> <i className="icon icon-heart" data-love={update.liked}/> </button>
				<div className="like-count">{numberToHuman(update.likeCount,false)} </div>
					{this.wholikesthis(update)}
			</div>

 			)

 		}

 		else{

 			return (
 			
 			<div className="post-comment-button">
        <span id={"update_"+update.update_id} style={mystyle} onClick={this.updatestate}></span>
				<button type="button" name="like" value={update.update_id} key={update.update_id} onClick={this.incrementCount.bind(this,update)}> <i className="icon icon-heart" data-love={update.liked}/> </button>
				<div className="like-count">{numberToHuman(update.likeCount,false)} </div>
					{this.wholikesthis(update)}
			</div>

 			)
 		}

 		
 	}


 	render (){

 		return this.template()
 	}



}