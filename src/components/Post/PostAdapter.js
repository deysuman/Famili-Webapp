import React,{Component} from "react";
import ReactDOM from 'react-dom';
import numberToHuman from "../../lib/numberToHuman";
import Ajax from "../../lib/ajax";
import {URLS} from "../../constants/api";
import Htmlparser from "../../lib/Htmlparser";
import Comment from "../Comment/Comment";
import Imageview from "../Imageview/Imageview";
import Require from "../../helper/Postbox/Require";
import {editpostSetup} from "../../helper/Postbox/Postbox"
import Togglereadmore from "../../helper/Togglereadmore"
import Likelistingopen from "../Likelisting/Likelistingopen"
import "../../lib/Hashtag"
import {ChangeFontSizePostBox,hash} from "../../helper/Postbox/Postbox"
import DropdownMenu from 'react-dd-menu';
import OpenGraph from "../Opengraph/Opengraph";
import Love from "../Love/Love.js";
import PostAction from "./PostAction.js";
import Privacyopt from "./Privacy.js";
import Commentlayout from "../Comment/Commentlayout.js";
import swal from 'sweetalert';
import Tooltipconnectivity from './Tooltipconnectivity'
import Tooltiptag from './Tooltiptag'




export default class PostAdapter extends Component{

  constructor(props){
    super(props);
    
    this.state = {       

        data : this.props.value,
        activeIndex : 1,
        isMenuOpen: false,
        isMenuOpen2: false,
        liked: false,
        noOfLikes: 0,
        count: 0,
        melikes: false,
        commentShowEnable : false,
        cmdshow: false,
        privacy: false,
        isuue : false,
        time : 0,
        isTooltipActive: false
    
    }

      let editworking = Require.editworking;
	    let posid = Require.posid;

	    this.upgradeState = this.upgradeState.bind(this);

      this.click = this.click.bind(this);
      this.toggle = this.toggle.bind(this);
      this.close = this.close.bind(this);

      this.click2 = this.click2.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.close2 = this.close2.bind(this);
      this.updateCommentcount = this.updateCommentcount.bind(this);
      this.slideUpdatedate = this.slideUpdatedate.bind(this);
      this.videoUpdate = this.videoUpdate.bind(this);

  }


  showTooltip() {
        //this.setState({isTooltipActive: true})
        this.state.isTooltipActive = true;
        this.forceUpdate();

    }
    hideTooltip() {
        this.state.isTooltipActive = false;
        this.forceUpdate();
    }

  componentWillMount() {

      //this.setState()



  }

    videoUpdate(value){

      this.setState({
        time : value
      })

    }


    



    slideUpdatedate(value){
        console.log("Myslideimage"+value);
        this.setState({
            activeIndex : value
        })

    }


    toggle() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    close() {
        this.setState({ isMenuOpen: false });
    }

    click() {
        //console.log('You clicked an item');
    }


    toggle2() {
        this.setState({ isMenuOpen2: !this.state.isMenuOpen2 });
    }

    close2() {
        this.setState({ isMenuOpen2: false });
    }

    click2() {
        //console.log('You clicked an item');
    }



  Htmlparse (content, type, images, divid, textlength) {
    var finalContent = Htmlparser(content, type, images, divid, textlength);
    return {
        __html: finalContent
    }
  }

  Htmlvideo (content){

      //var finalContent=textTovideo(content);return {__html: finalContent}

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

    
    shouldComponentUpdate(nextProps, nextState){

        console.log(nextState);
        console.log("State comments are " + this.props.value.commentCount);

                 
         if (this.state.data.liked !== nextState.data.liked)
          {
            return false;
          }


         if(this.state.time !== nextState.time){

            return false;

          }


        if(this.state.data.likeCount !== nextState.data.liked){

            return false;
          }

    
         if (this.state.activeIndex !== nextState.activeIndex)
          {
            return false;
          }

                
        return false;
          
    }



    actionTool (e){

    	//console.log(document.getElementById("React-edit"+e.update_id).style.display);
    	
    	//$(".post-drop-popup").css("display","none");

		//$(".post-user-profile-image").click();
		//$(document).click();
        $("#React-edit"+e.update_id).toggle();
        return false;


		/*if(document.getElementById("React-edit"+e.update_id).style.display==""||document.getElementById("React-edit"+e.update_id).style.display=="none"){
		    document.getElementById("React-edit"+e.update_id).style.display = "block";
		    var value= "#React-edit"+e.update_id;
		    var valueL= "#React-edit_c"+e.update_id;



	  }
	  else{
			if(document.getElementById("React-edit"+e.update_id)!==null){
		  		document.getElementById("React-edit"+e.update_id).style.display = "none";
			}
	 	 }*/
	}

	privacyTool(e){

		if(document.getElementById("React-privacyt"+e.update_id)!=null){

			if(document.getElementById("React-privacyt"+e.update_id).style.display==""||document.getElementById("React-privacyt"+e.update_id).style.display=="none"){

				document.getElementById("React-privacyt"+e.update_id).classList.remove("none");
				document.getElementById("React-privacyt"+e.update_id).style.display = "block";

				var value= "#React-privacyt"+e.update_id;
				//$(document).mouseup(function (e){var container = $(value);if (!container.is(e.target) && !$(".drop_popip").is(e.target) && container.has(e.target).length === 0){container.hide();}});

			}

			else{

				document.getElementById("React-privacyt"+e.update_id).classList.add("none");
				document.getElementById("React-privacyt"+e.update_id).style.display = "none";

			}
		}
	}

	likelistings(update){

		if(document.getElementById("like_listing")){

		}

		else{


			let div = document.createElement("div");
			div.id="like_listing";
			document.body.appendChild(div);
      div.innerHTML='<div id="like_listing2" class="default-modal-mu"></div>';


		}

		return(ReactDOM.render(<Likelistingopen likesdata={update.likelisting}/>,document.getElementById("like_listing2")));

	}

	wholikesthis (l) {

        if (!l.liked) {
            if (l.likeCount != 0) {


                return (<div className="like-count"
                             onClick={this.likelistings.bind(this, l)}>{numberToHuman(l.likeCount, false)} people love
                    this</div>);

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

	anonprivacy(l){

		const pri = (l.commentShow==true) ? 'Hide honest views' : 'Show honest views';


				return (<a onClick={this.updateprivacy.bind(this,l)} data-testid="" id={"React_boot_privacy"+l.update_id}>{pri}</a>);


	}




	updateprivacy (l){

		console.log(l);

		let type = "true";
          if(!l.commentShow){
           l.commentShow = true;
           l.anonComment = 1
           this.state.data.anonComment = "1";
			     this.state.data.commentShow = true;
           this.forceUpdate();

          // $('#post_'+l.update_id).find(".tablinks")[0].click();

           


          }
		else{
          l.commentShow = false;
          type = "false";
              this.state.data.anonComment = "0";
              this.state.data.commentShow = false;
              this.forceUpdate();

              document.getElementById("normal_c_"+l.update_id).click();
          //document.getElementById("React_boot_privacy"+l.update_id).innerHTML = 'Hide annonmyous comment';
        }

		const reactThis=this;
		const data='postid='+l.update_id+'&type='+type;
		Ajax(URLS.UPDATE_ANONMYOUS_PRIVACY, data , reactThis,
			function(data){

			}
		);

		//console.log(this.state.data.anonComment);

		//this.forceUpdate();
    }

    editpost (update) {

        if (document.getElementById("editable-boss") !== null) {
            document.getElementsByClassName("opentabs")[0].click();
            document.getElementById("editable-boss").textContent = update.oriText;
            document.getElementsByClassName("emojionearea-editor")[0].textContent = update.oriText;
            document.getElementById("React-edit" + update.update_id).style.display = "none";
            document.getElementById("postbox").classList.add("edit_post");
            document.getElementById("postbox").setAttribute("data-edit",update.update_id);
            //autoScrollTo("editable-boss");
            document.getElementsByClassName("emojionearea-editor")[0].focus();
            editpostSetup(update.update_id);



            ChangeFontSizePostBox();
            hash();
          
             if( navigator.userAgent.match(/Android/i)
             || navigator.userAgent.match(/webOS/i)
             || navigator.userAgent.match(/iPhone/i)
             || navigator.userAgent.match(/iPad/i)
             || navigator.userAgent.match(/iPod/i)
             || navigator.userAgent.match(/BlackBerry/i)
             || navigator.userAgent.match(/Windows Phone/i)
             ){
                document.getElementById("post-small-btn").click();
            }

        }
        else {

            window.location.href = URLS.MAINURL + URLS.SINGLE_POST + update.update_id;

        }
    }

	anonmyouscommentChange(l){

		if(l.commentShow){
			return (<div className="like-count">{l.likeCount} people love this</div>);
		}

	}

	reportpost (y){

		const reactThis=this;
    const data='postid='+y.update_id;

    $("body").append('<div id="report_post"></div>');

    Ajax(URLS.REPORT, data , reactThis,
      function(data){
        $("#report_post").html(data);
      }
    );

	}

    savepost (y){

		let reactThis = this;
		let data = "postid="+y.update_id;

    Ajax(URLS.SAVEPOST, data, reactThis, function(data) {
                  if (data.error === true) {
                    
                    if(data.status === 1){

                          swal("Error", "Something went wrong!", "error");
                    }

                    else { swal("Notify", "You have Successfully unsave this post", "success");

                     reactThis.state.data.savepost = false;

                     reactThis.forceUpdate();




                   }
              

                  } else {
                      swal("Notify", "You have Successfully save this post", "success");
                      //reactThis.setState({data.savepost : true})

                      reactThis.state.data.savepost = true;

                      reactThis.forceUpdate();
                  }
                   });


        


	}


  editg(update){

    if(update.postedit == true){

       if(document.getElementById("postsectioncl")!=null){

                            
    
            if($("#postsectioncl").hasClass("active")){
                                    
               return (
                    <a onClick={this.editpost.bind(this, update)} data-testid="">Edit</a>
              )


            }

            else if($("#talent").hasClass("active")){

                                
                                
            return (
                  <a onClick={this.editpost.bind(this, update)} data-testid="">Edit</a>
               )

            }

        }

        else{

      return (
          <a onClick={this.editpost.bind(this, update)} data-testid="">Edit</a>
        )
    }

      
  }

}


	postowner (update){

    //alert();

		if(update.postown == true){

			if(update.posttype == 0) {

        

             return (
                  <div>
                    {this.editg(update)}
                    <a onClick={this.props.removePost} data-value={update.update_id} data={update.update_id}
                       data-testid="">Delete</a>
                                {this.anonprivacy(update)}
                    
                  </div>
              );
          
        }

      else {
                return (
					<div>
						<a onClick={this.props.removePost} data-value={update.update_id} data={update.update_id}
						   data-testid="">Delete</a>
                        {this.anonprivacy(update)}
					</div>
                );
			}


		}

		else{

      let f = (this.props.value.savepost == true) ? 'Unsave post' : 'Save post'

			return (
					<div>
						<a onClick={this.reportpost.bind(this,update)} data-testid="">Report</a>
						<a onClick={this.savepost.bind(this,update)} data-testid="">{f}</a>
					</div>
				);
		}

	}



	changePrivacy(e) {
		e.preventDefault();
		let update_id = e.target.getAttribute('data-value');
		let privacy = e.target.getAttribute('data-famile-privacy');

		document.getElementById("React-privacyt" + update_id).classList.add("none");
		document.getElementById("React-privacyt" + update_id).style.display = "none";

		var reactThis = this;
		var data = 'postid=' + update_id + '&privacy=' + privacy;
		Ajax(URLS.CHANGE_POSTPRIVACY, data, reactThis, function(data) {
			if (data.error == false) {
				document.getElementById("privacy_" + update_id).innerHTML = data.privacy;
			} else {
				swal("Error", "Something went wrong!", "error");
			}
		});
	}


	privacyTemplate(update){

        if(update.postown == true){
            if(update.posttype=='0' && update.is_type==false){
                /*return (
                        <div className="post-drop-popup" id={"React-privacyt"+update.update_id}>
                          <div className="post-drop-pop">
                            <a href="javascript:void(0);" onClick={this.changePrivacy} data-value={update.update_id} data-famile-privacy='0'  data={update.update_id} >Global</a>
                            <a href="javascript:void(0);" onClick={this.changePrivacy} data-famile-privacy='1' data-value={update.update_id}  data={update.update_id} data-testid="">Friends</a>
                            <a href="javascript:void(0);" onClick={this.changePrivacy} data-famile-privacy='2' data-value={update.update_id}  data={update.update_id} data-testid="">Only me</a>
                          </div>
                         </div>
                );*/

                return (

						<div className="post-drop-popup" id={"React-privacyt"+update.update_id}>
							<div className="post-drop-pop">
								<a href="javascript:void(0);" onClick={this.changePrivacy} data-value={update.update_id} data-famile-privacy='0'  data={update.update_id} >Global</a>
								<a href="javascript:void(0);" onClick={this.changePrivacy} data-famile-privacy='1' data-value={update.update_id}  data={update.update_id} data-testid="">Friends</a>
								<a href="javascript:void(0);" onClick={this.changePrivacy} data-famile-privacy='2' data-value={update.update_id}  data={update.update_id} data-testid="">Only me</a>
							</div>
						</div>

                )




            }

        }

	}



	postowner2(update,index){



		return (<Privacyopt update={update} showlayout={this.privacyTemplate.bind(this,update)} />)



	}


    postOptionTemplate(update,index){

        return (<PostAction update={update} showlayout={this.postowner.bind(this,update)} />)

    }

	tag (e){
		return {__html: e};
	}

	makeplayer (){
		//window.tr();
	}

	commentShowEnableopt (l){

		if(l.postown === true){

			this.setState({ cmdshow: !this.state.cmdshow});

		}
		else if(l.postown === false){
			if(l.commentShow === true){
				this.setState({ cmdshow: !this.state.cmdshow});
			}
			else if(l.commentShow === false){
				this.setState({ cmdshow: false});
			}
		}
	}

	timeAgo (time){

		if(time.posttime!=0){
			return (<h3 className="posttime" data-time={time.posttime}>{time.timeformat}</h3>);
		}
		else{
			return (<h3 className="posttime">{time.timeformat}</h3>);
		}
	}

	opengraph (update){
		console.log("myimage"+update.opengraph.length);


		if(update.opengraph.length > 0) {
            const items = update.opengraph;
            const item = items.map((item) => {
                return <OpenGraph dataAttachment={update.uploads.length + update.video.length} dataOpengraph={item} key={Math.random()}/>
            });
            if (update.graphcount > 0) {
                return item;
            }
        }



    }

	talent_template (update){
	if(update.is_type){
		return (<div className="challenge-container-image-text">
                    <h2>{update.title}</h2>
                    <h4>Category: <span>{update.xhcp_category}</span></h4>
                    <p className="posttexts" dangerouslySetInnerHTML={this.Htmlparse(update.user_update, 0, null, update.update_id, update.textlength)}/>
                    <p dangerouslySetInnerHTML={this.Htmlvideo(update.video)}/>

              </div>
        );
	}

	}



	c_template (update){
      if(update.posttype=='1'){
          return (
            <div className="challenge-container-text">
              <h2>{update.title}</h2>
               <p className="posttexts" dangerouslySetInnerHTML={this.Htmlparse(update.user_update,0,null,update.update_id,update.textlength)}></p>
              <div className="challenge-category-list">
               <p>Category:<span>{update.xhcp_category} </span></p>

              </div>
            </div>
          )
      }
	}

	normal_template (update){
        if(!update.is_type){
            return (
                <div className="post-container-image-text">
                   <p className="posttexts" dangerouslySetInnerHTML={this.Htmlparse(update.user_update,0,null,update.update_id,update.textlength)}></p>
					{this.opengraph(update)}
              </div>
              );
        }

	}

	componentWillMount (){
        //this.forceUpdate();
	}


    createMarkup(str) {
        return {__html: str};
    }

	challenge_template (update){

		if(update.posttype=="1"){

			let path = window.location.pathname;
			let page = path.split("/").pop();


			if(typeof windowfethtype !== 'undefiend') {

                if (windowfethtype == 0) {

                    return (
						<div>
							<div className="challenge-participation-count-box">
								<div className="challenge-participation-count" dangerouslySetInnerHTML={this.createMarkup(update.challengeCount)}></div>
								<div className="challenge-participation-text">
									<h2>challengres are join</h2>
									<p>your challenge</p>
								</div>

							</div>
							<div className="challange-viewall-button"><a rel="nofollow"
																		 href={"/challenge/" + update.token}>View
								Challenge</a></div>
						</div>
                    );
                }

            }
		}
	}

    ralert (text){
        swal("Error", text, "error");
    }

    updateCommentcount(values){
    	this.state.data.commentCount = values;
    	this.forceUpdate();
	}

	post_controler (update){

		if(update.posttype=='0'){
			if(!update.is_type){
				return (

				 <div className="post-like-button-box">
			     
          <Love type={0} incrementCount={this.incrementCount.bind(this,this.props.value)} liked={this.props.value.liked} update={this.props.value} likeCount={this.props.value.likeCount}/>


			  <div className="post-commnet-and-share">
				
          <Commentlayout type={0} data={this.props.value}/>

			  </div>
			</div>

				);
			}
			else if(update.is_type){
				return (

				<div className="post-like-button-box">
				  <div className="challenge-commnet-and-share">
					
           <Love type={1} incrementCount={this.incrementCount.bind(this,this.props.value)} liked={this.props.value.liked} update={this.props.value} likeCount={this.props.value.likeCount}/>

					<div className="post-share-button">
					  <Commentlayout type={1}   data={this.props.value}/>
					</div>
					
				  </div>
				</div>

				);
			}
		}

		else if(update.posttype=='1'){
			var path = window.location.pathname;
			var page = path.split("/").pop();

			if(windowfethtype=="0"){

				return(<div className="post-like-button-box">
				  
          <div className="challenge-commnet-and-share">

					<Love type={1} incrementCount={this.incrementCount.bind(this,this.props.value)} liked={this.props.value.liked} update={this.props.value} likeCount={this.props.value.likeCount}/>

          <div className="post-share-button">
					<Commentlayout type={1} data={this.props.value}/>  
          </div>
					
				  </div>
				</div>);
			}

			else{
				return (

				<div className="post-like-button-box">
				  <div className="challenge-commnet-and-share">

				  <Love type={0} incrementCount={this.incrementCount.bind(this,this.props.value)} liked={this.props.value.liked} update={this.props.value} likeCount={this.props.value.likeCount}/>



					<div className="post-share-button">
					 
           <Commentlayout type={1}  data={this.props.value}/>

          </div>
					
				  </div>
				</div>

				);
			}
		}
	}

	forchallenge (update){

		if(update.posttype=="0"){
			 return(<div className="post-challenge-button"><a href="">Challenge</a></div>);
		}

		else if(update.posttype=="1"){

			if(update.particpatestatus == false){
                return(
					<div className="post-challenge-button"><a href={"/challenge/" + update.token}>Join</a></div>

                );
			}

			else {
				return null;
			}

		}
	}

	commentArea (update2){

    console.log(this.props.value.commentCount);

    let update = this.props.value;

		let path = window.location.pathname;
		let page = path.split("/").pop();
		let postdata = this.state.data;
		if(update.posttype=="0"){

			return (<Comment count={this.props.value} normalComments={this.props.value.normal_comment} anonComments={this.props.value.annon_comments} datacommentshow={this.props.value.commentShow}  dataComentsBlock={this.props.value.comments} datanopages={this.props.value.totalPage} datacommentcount={this.props.value.commentCount} annocomment={this.props.value.anonymouscomment} dataComentmode={this.props.value.anonComment} updateID={this.props.value.update_id} postdata={this.props.value} updatecount={this.updateCommentcount}/>);
		}

		else if(update.posttype=="1" && perticipate == 1 && update.commentShow==true){

				return (<Comment count={this.props.value}   normalComments={this.props.value.normal_comment} anonComments={this.props.value.annon_comments} datacommentshow={this.props.value.commentShow}  dataComentsBlock={this.props.value.comments} datanopages={this.props.value.totalPage} datacommentcount={this.props.value.commentCount} annocomment={this.props.value.anonymouscomment} dataComentmode={this.props.value.anonComment} updateID={this.props.value.update_id} postdata={this.props.value} updatecount={this.updateCommentcount}/>);

		}

	}

	openionChallenge (update){
		if(update.departmentChallenge){
			return (<div className="challenger-initiator">Initiator</div>)
		}
		else{
			return (<div className="challenger-participant">Participant</div>)
		}
	}


	upgradeState (){

		//this.props.upgrade();

		this.setState ({
			isuue : true
		});

      // this.forceUpdate();

	}

    updao (text){
        alert();
    }


    challengeTimes(update){

    	if(update.departmentChallenge)
        {
			return (<div className="post-time-table"><i className="icon icon-clock"/>
				<h3>{update.remaindate}</h3>
			</div>)
        }

        else{


			return (<div className="post-time-table"> <i className="icon icon-clock"/>


                {this.timeAgo(update)}


			</div>);
		}



	}




	template (update,index){

		const none = {
			display : "none"
		}

        const activeIndex = this.state.activeIndex;
        const recent_activity = (update.recentAcitivty) ? update.recenttext : null;




		if(windowfethtype==0){




			 const path = window.location.pathname.toLowerCase();
			 const page = path.split("/").pop();
     		 const lclass = (page=="search") ? '' : 'post-container';


			return(<div className={lclass} id={"post_"+update.update_id} key={update.update_id}>

	                    <div className="post-container-padding">

	 	                     <div className="post-container-header">


                                   {this.forchallenge(update)}


                                    <div className="post-user-profile-image"><img src={update.profile_pic} alt="user-image"/></div>
                                    <div className="post-option-btn-container">
										<div className="upd" style={none} id={"posx_"+update.update_id} onClick={this.upgradeState}></div>
										{this.postOptionTemplate(update,index)}



                                    </div>

                                    <div className="post-time-table"> <i className="icon icon-clock"/>


                                                {this.timeAgo(update)}


                                        </div>

                                  </div>



                                  <div className="post-container-header-text">
                                  <div className="post-container-header-text-name">
                                    <h3><a className="__ljt" href={update.username}>{update.name}</a></h3>
                                     <h5 className="post-pri" data-related="drop-pri1">



                                        {this.postowner2(update,index)}


                                        </h5>
                                    </div>

                                        
                                        <Tooltiptag data={update}/>
                                        <Tooltipconnectivity data={update}/>


                                  </div>

                                  {this.talent_template(update)}

                                   <div className="post-container-image">

                                     <div id={"sliderDiv_"+update.update_id}>
										 <Imageview upindex={this.slideUpdatedate} updateTime={this.videoUpdate} time={this.state.time} activeIndex={activeIndex} openmodal={this.props.openmodal} click={true} items={update.uploads} key={Math.random()}/>
									 </div>

                                    </div>


                                    {this.normal_template(update)}



                                 

                                 {this.challenge_template(update)}

                              </div>
                              {this.post_controler(update)}
                              {this.commentArea(update)}
                </div>
            );
		}

		else if(windowfethtype==1){

			 const path = window.location.pathname.toLowerCase();
			 const page = path.split("/").pop();
     		 const lclass = (page=="search") ? '' : 'challenge-post-container post-container';

			return(
                <div className={lclass} id={"post_"+update.update_id} key={update.update_id}>
                    <div className="post-container-padding">
                      <div className="challenge-container-header">
                        <div className="challenger-profile-image">

							<img onClick={this.updao.bind(this,"alert")} src={update.profile_pic} alt="user-image"/>

							<div style={none} className="upd" id={"posx_" + update.update_id} onClick={this.upgradeState}/>

						</div>
                        <div className="challenger-name 3__ljt">{update.name}</div>
                        <div className="challenger-follow-button">
                        {this.openionChallenge(update)}
                          <a href="#">Follow</a></div>
                      </div>

                      <div className="Challenge-container-image">

						  {this.challengeTimes(update)}

						  <div id={"sliderDiv_"+update.update_id}>
							  <Imageview activeIndex={1} openmodal={this.props.openmodal} click={true} items={update.uploads} key={Math.random()}/>
						  </div>
                        {this.c_template(update)}
                        </div>

                        {this.normal_template(update)}
                                                <div className="chall">


                            </div>

                       

                    </div>

                    {this.post_controler(update)}


                     {this.commentArea(update)}


                </div>
		);

		}
	}


	wi(){
		const page = window.location.pathname.toLowerCase();

		const lclass = (page=="search") ? 'search-post-container' : '';
		return lclass
	}

	componentDidMount (){
	    $(".morelink").on("click",function () {
	    	$(this)
        .parent()
        .prev()
        .toggle(),
        $(this)
            .prev()
            .toggle(),
        this.remove()
        });




       /* $(document).mouseup(function(e)
        {
            let container = $(".post-drop-popup");
            let containerParent = $(".post-option-btn");
            container.hide();
          /!*  // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && !containerParent.is(e.target)   && container.has(e.target).length === 0)
            {	console.log("gjg");
                container.hide();
                $('.privacy_select').addClass("none");
            }*!/



        });*/

        /*$(function(){ //<----shorter version of doc ready. this one can be used ->jQuery(function($){
            $(document).click(function(){
            	if($(".post-drop-popup").hasClass("none") || $(".post-drop-popup").css("display","block")){
                    $(".post-drop-popup").css("display","none");
				}

            });
        });*/
    }




	render(){

  		const post = this.state.data;
        const text = this.state.liked ? 'liked' : 'haven\'t liked';
        const label = this.state.liked ? 'unliked' : 'liked';

        const path = window.location.pathname.toLowerCase();
		const page = path.split("/").pop();


		const lclass = (page=="search") ? 'search-post-container' : '';



		return (
                <div className={lclass}>{this.template(post,Math.random())}</div>
        );

	}



}