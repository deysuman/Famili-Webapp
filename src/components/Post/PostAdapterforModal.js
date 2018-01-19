import React,{Component} from "react";
import ReactDOM from 'react-dom';
import numberToHuman from "../../lib/numberToHuman";
import Ajax from "../../lib/ajax";
import {URLS} from "../../constants/api";
import Htmlparser from "../../lib/Htmlparser";
import Comment from "../PostModal/Comment/Comment";
import Imageview from "../Imageview/Imageview";
import Require from "../../helper/Postbox/Require";
import {editpostSetup} from "../../helper/Postbox/Postbox"
import Togglereadmore from "../../helper/Togglereadmore"
import Likelistingopen from "../Likelisting/Likelistingopen"
import DropdownMenu from 'react-dd-menu';



export default class PostAdapterforModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      data:this.props.value,
        isMenuOpen: false,
      liked: false, noOfLikes: 0, count: 0, melikes: false, commentShowEnable: false, cmdshow: false, privacy: false,isuue : false
    }

    let editworking = Require.editworking;
	let posid = Require.posid;

      this.upgradeState = this.upgradeState.bind(this);
      this.click = this.click.bind(this);
      this.toggle = this.toggle.bind(this);
      this.close = this.close.bind(this);
      this.updateCommentcount = this.updateCommentcount.bind(this);

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


    toggle() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    close() {
        this.setState({ isMenuOpen: false });
    }

    click() {
        console.log('You clicked an item');
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
            this.setState({liked: !this.state.liked});

        }
        else{

            l.liked = false;
            l.likeCount = l.likeCount - 1;
            type = "false";
        }

        //$("body").css("cursor","wait")


        var reactThis=this;
        var data='postid='+l.update_id+'&type='+type+'&mode='+1;
        Ajax(URLS.LOVE_REQUEST, data , reactThis, function(data){


            $("body").css("cursor","auto")

        });

        this.forceUpdate();
    }

    updateCommentcount(values){
    	//console.log("my commrents count "+this.state.data.commentCount);
    	//console.log("my commrents count value "+this.state.data.commentCount);

    	this.state.data.commentCount = values;

    	//console.log("my commrents count "+this.state.data.commentCount);
    	this.forceUpdate();
	}

    actionTool (e){

		if(document.getElementById("React-edit"+e.update_id).style.display==""||document.getElementById("React-edit"+e.update_id).style.display=="none"){
		    document.getElementById("React-edit"+e.update_id).style.display = "block";
		    var value= "#React-edit"+e.update_id;
		    var valueL= "#React-edit_c"+e.update_id;
		    $(document).mouseup(function (e){var container = $(value);if (!container.is(e.target) && container.has(e.target).length === 0){

			  container.hide();

			  if(document.getElementById("React-edit"+e.update_id)!=null){
				  document.getElementById("React-edit"+e.update_id).style.display = "none";

			  }

			  if(document.getElementById("React-edit"+e.update_id)!=null){

			    if(e.target.getAttribute("class") === null || e.target.getAttribute("class") == undefined || e.target.getAttribute("class") == '' || !e.target.getAttribute("class")==null || !e.target.getAttribute("class")==''){
						document.getElementById("React-edit"+e.update_id).style.display = "none";
			    }
			  }
            }
		 });
	  }
	  else{
		if(document.getElementById("React-edit"+e.update_id)!=null){
		  document.getElementById("React-edit"+e.update_id).style.display = "none";
		}
	  }
	}

	privacyTool(e){
    	
    	
		if(document.getElementById("React-privacyty"+e.update_id)!=null){
			if(document.getElementById("React-privacyty"+e.update_id).style.display==""||document.getElementById("React-privacyty"+e.update_id).style.display=="none"){

				document.getElementById("React-privacyty"+e.update_id).classList.remove("none");
				document.getElementById("React-privacyty"+e.update_id).style.display = "block";

				var value= "#React-privacyty"+e.update_id;
				$(document).mouseup(function (e){var container = $(value);if (!container.is(e.target) && !$(".drop_popip").is(e.target) && container.has(e.target).length === 0){container.hide();}});

			}
			else{
				document.getElementById("React-privacyty"+e.update_id).classList.add("none");
				document.getElementById("React-privacyty"+e.update_id).style.display = "none";

			}
		}
	}

	likelistings(update){

		console.log("hi");

        if(document.getElementById("like_listing")){

        }

        else{


            let div = document.createElement("div");
            div.id="like_listing";
            document.body.appendChild(div);


        }

		return(ReactDOM.render(<Likelistingopen likesdata={update.likelisting}/>,document.getElementById("like_listing")));

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
		const pri = (l.commentShow==true) ? 'Hide annonmyous comment' : 'Show annonmyous comment';
		if(l.anonComment == "1"){

				return (<a onClick={this.updateprivacy.bind(this,l)} data-testid="" id={"React_boot_privacy"+l.update_id}>{pri}</a>);

		}
	}

	updateprivacy (l){

		let type = "true";
          if(!l.commentShow){
          	l.commentShow = true;
          	document.getElementById("React_boot_privacy"+l.update_id).innerHTML = 'Hide annonmyous comment';
          	this.setState({ privacy: !this.state.privacy});
          }
		else{
          l.commentShow = false;
          type = "false";
          document.getElementById("React_boot_privacy"+l.update_id).innerHTML = 'Hide annonmyous comment';
        }

		const reactThis=this;
		const data='postid='+l.update_id+'&type='+type;
		Ajax(URLS.UPDATE_ANONMYOUS_PRIVACY, data , reactThis, function(data){

		});

		this.forceUpdate();
    }

    editpost (update) {
		
        if (document.getElementById("editable-boss") != null) {
            document.getElementsByClassName("opentabs")[0].click();
            document.getElementById("editable-boss").textContent = update.oriText;
            document.getElementsByClassName("emojionearea-editor")[0].textContent = update.oriText;
            document.getElementById("React-edit" + update.update_id).style.display = "none";
            document.getElementById("postbox").classList.add("edit_post");
            document.getElementById("postbox").setAttribute("data-edit",update.update_id);
            //autoScrollTo("editable-boss");
            document.getElementsByClassName("emojionearea-editor")[0].focus();

            editpostSetup(update.update_id);

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

		/*var photoavil = '';
		var photo = '';

		if(y.uploads != null){

			if (y.uploads.indexOf(',') > -1){

				var myarray = y.uploads.split(',');

				photo = '<div class="report-pop-body-iamge"><img src="'+myarray[0]+'" alt="report"/></div>';

			}

			else{

				photo = '<div class="report-pop-body-iamge"><img src="'+y.uploads+'alt="report"/></div>';
			}

			var photoavil = '<div class="form-group"><input type="radio" name="custom_checkbox" id="custom_radio5" value="custom_checkbox"><label for="custom_radio5">I\'m in this photo and I don\'t like i</label></div>';

		}

		var title = '<div class="privacy-title">Help Us UnderstandWhat\'s Happening</div>';
		var firstbody = '<div class="report-pop"></div><div class="report-pop-body">'+photo+'<div class="report-pop-body-box"><h4>What\'s going on?</h4><div class="report-option"><form><div class="form-group"><input type="radio" name="custom_checkbox" id="custom_radio4"value="custom_checkbox"><label for="custom_radio4">It\'s annoying or not interesting</label></div>'+photoavil+'<div class="form-group"><input type="radio" name="custom_checkbox" id="custom_radio6" value="custom_checkbox"><label for="custom_radio6">I think it shouldn\'t be on Facebook</label></div><div class="form-group"><input type="radio" name="custom_checkbox" id="custom_radio7" value="custom_checkbox"><label for="custom_radio7">It\'s spam</label></div></form></div></div></div>';

		var twoendbody = '';


		swal({title:title, text:firstbody,html:true,confirmButtonText: "Continue",closeOnConfirm: false},

		function(){
				swal({title:title, text:body,html:true,confirmButtonText: "Continue",closeOnConfirm: false});
		}


		);*/

	}

	postowner (update,index){
		if(update.postown == true){

			return (
					<div>
					<a onClick={this.editpost.bind(this,update)}data-testid="">Edit</a>
					<a onClick={this.props.removePost} data-value={update.update_id}  data={update.update_id} data-testid="">Delete</a>
						{this.anonprivacy(update)}
					</div>
            );


		}

		else{
			return (
					<div>
						<a onClick={this.reportpost.bind(this,update)} data-testid="">Report</a>
						<a data-testid="">Savepost</a>
					</div>
				);
		}

	}



	changePrivacy(e) {
		e.preventDefault();
		let update_id = e.target.getAttribute('data-value');
		let privacy = e.target.getAttribute('data-famile-privacy');

		//document.getElementById("React-privacyty" + update_id).classList.add("none");
		//document.getElementById("React-privacyty" + update_id).style.display = "none";

		var reactThis = this;
		var data = 'postid=' + update_id + '&privacy=' + privacy;
		Ajax(URLS.CHANGE_POSTPRIVACY, data, reactThis, function(data) {
			if (data.error == false) {
				document.getElementById("privacy_t" + update_id).innerHTML = data.privacy;
			} else {
				swal("Error", "Something went wrong!", "error");
			}
		});
	}



	/*postowner2(update,index){
		if(update.postown == true){
			if(update.posttype=='0' && update.is_type==false){
                return (
                        <div className="post-drop-popup" id={"React-privacyty"+update.update_id}>
                          <div className="post-drop-pop">
                            <a href="javascript:void(0);" onClick={this.changePrivacy} data-value={update.update_id} data-famile-privacy='0'  data={update.update_id} >Global</a>
                            <a href="javascript:void(0);" onClick={this.changePrivacy} data-famile-privacy='1' data-value={update.update_id}  data={update.update_id} data-testid="">Friends</a>
                            <a href="javascript:void(0);" onClick={this.changePrivacy} data-famile-privacy='2' data-value={update.update_id}  data={update.update_id} data-testid="">Only me</a>
                          </div>
                         </div>
                );

			}

		}

	}*/

	tag (e){
		return {__html: e};
	}

	makeplayer (){
		//window.tr();
	}

	commentShowEnableopt (){

		if(l.postown == true){

			this.setState({ cmdshow: !this.state.cmdshow});

		}
		else if(l.postown == false){
			if(l.commentShow == true){
				this.setState({ cmdshow: !this.state.cmdshow});
			}
			else if(l.commentShow == false){
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
		if(update.opengraph.length > 0){
			//return (<OpenGraph dataOpengraph={update.opengraph}/>)
		}
	}

	talent_template (update){
	if(update.is_type){
		return (<div className="challenge-container-image-text">
                    <h2>{update.title}</h2>
                    <h4>Category: <span>{update.xhcp_category}</span></h4>
                    <h5>Sub Category: <span>{update.xhcp_sub_category}</span></h5>
                    <p className="posttexts" dangerouslySetInnerHTML={this.Htmlparse(update.user_update,0,null,update.update_id,update.textlength)}></p>
                    <p dangerouslySetInnerHTML={this.Htmlvideo(update.video)}></p>

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
                <p>Sub-Category:<span>{update.xhcp_sub_category}</span></p>
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
                   <p dangerouslySetInnerHTML={this.Htmlvideo(update.video)}></p>
              </div>
              );
        }

	}

	tagList (update){

		if(update.tag != "") {

            return (<div className="pop-container-header-text">
				<h4 dangerouslySetInnerHTML={this.tag(update.tag)}></h4>
			</div>)
        }
        else{
			return null
		}
	}

	challenge_template (update){

		if(update.posttype=="1"){

			let path = window.location.pathname;
			let page = path.split("/").pop();

			if(page=="post"){

				return (
				    <div>
							<div className="challenge-participation-count-box">
									<div className="challenge-participation-count"> {update.challengeCount} </div>
										<div className="challenge-participation-text">
											<h2>challengres are join</h2>
												<p>your challenge</p>
										</div>
									<div className="challenge-challenge-button"><a href="">Join</a></div>
							</div>
					  <div className="challange-viewall-button"> <a rel="nofollow" href={"/challenge/"+update.token}>View Challenge</a> </div>
                    </div>
				);
			}
		}
	}

	post_controler (update){

		if(update.posttype=='0'){

			if(!update.is_type){
				return (

				 <div className="post-like-button-box">
			  <div className="post-like-button">
				<button type="button" name="like" value={update.update_id} key={update.update_id} onClick={this.incrementCount.bind(this,update)}> <i className="icon icon-heart" data-love={update.liked}></i> </button>
				<div className="like-count">{numberToHuman(update.likeCount,false)} </div>
					{this.wholikesthis(update)}


			  </div>
			  <div className="post-commnet-and-share">
				<div className="post-comment-button">
				  <button type="button" name="like"> <i className="icon icon-big-speech-balloon"></i> </button>
				  <div className="comment-count" id={"React-Comment_count"+update.update_id}>
				  {numberToHuman(update.commentCount,false)}
				 </div>
				</div>

			  </div>
			</div>

				);
			}
			else if(update.is_type){
				return (

				<div className="post-like-button-box">
				  <div className="challenge-commnet-and-share">
					<div className="post-comment-button">
					  <button type="button" name="like" value={update.update_id} key={update.update_id} onClick={this.incrementCount.bind(this,update)}> <i className="icon icon-heart"  data-love={update.liked}></i> </button>
					  <div className="like-count">{numberToHuman(update.likeCount,false)}</div>
					  {this.wholikesthis(update)}
					</div>
					<div className="post-share-button">
					  <button type="button" name="like"> <i className="icon icon-big-speech-balloon"></i> </button>
					  <div className="comment-count" id={"React-Comment_count"+update.update_id}>{numberToHuman(update.commentCount,false)}</div>
					</div>
					<div className="post-share-button">
					  <button type="button" name="like"><i className="icon icon-view"></i></button>
					  <div className="share-count"> {numberToHuman(update.views,false)}</div>
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
					<div className="post-comment-button">
					  <button type="button" name="like" value={update.update_id} onClick={this.ralert.bind(this,"Post vote feature not available here. Please go to View page.")} key={update.update_id}> <i className="icon icon-heart"  data-love={update.liked}></i> </button>
					  <div className="like-count">{numberToHuman(update.likeCount,false)}</div>
					  {this.wholikesthis(update)}
					</div>
					<div className="post-share-button">
					  <button type="button" name="like" onClick={this.ralert.bind(this,"Post comment feature not available here. Please go to View page.")} key={update.update_id}> <i className="icon icon-big-speech-balloon"></i> </button>
					  <div className="comment-count" id={"React-Comment_count"+update.update_id}>{numberToHuman(update.commentCount,false)}</div>
					</div>
					<div className="post-share-button">
					  <button type="button" name="like"><i className="icon icon-view"></i></button>
					  <div className="share-count"> {numberToHuman(update.views,false)}</div>
					</div>
				  </div>
				</div>);
			}

			else{
				return (

				<div className="post-like-button-box">
				  <div className="challenge-commnet-and-share">

				  <div className="post-like-button">
					<button type="button" value={update.update_id} key={update.update_id} onClick={this.incrementCount.bind(this,update)} name="like"> <i className="icon icon-voting-urn" data-love={update.liked}></i> </button>
					<div className="like-count">{numberToHuman(update.likeCount,false)}</div>
					{this.wholikesthis(update)}
					</div>


					<div className="post-share-button">
					  <button type="button" name="like"> <i className="icon icon-big-speech-balloon"></i> </button>
					  <div className="comment-count" id={"React-Comment_count"+update.update_id}>{update.commentCount}</div>
					</div>
					<div className="post-share-button">
					  <button type="button" name="like"><i className="icon icon-view"></i></button>
					  <div className="share-count">{numberToHuman(update.views,false)}</div>
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
			return(<div className="post-challenge-button"><a href="">Join</a></div>);
		}
	}

	commentArea (update){

		var path = window.location.pathname;
		var page = path.split("/").pop();

		if(update.posttype=="0"){

			return (<Comment normalComments={update.normal_comment} anonComments={update.annon_comments} datacommentshow={update.commentShow}  dataComentsBlock={update.comments} datanopages={update.totalPage} datacommentcount={update.commentCount} annocomment={update.anonymouscomment} dataComentmode={update.anonComment} updateID={update.update_id} postdata={update} updatecount={this.updateCommentcount}/>);
		}

		else if(update.posttype=="1" && update.commentShow==true){

				return (<Comment normalComments={update.normal_comment} anonComments={update.annon_comments} datacommentshow={update.commentShow}  dataComentsBlock={update.comments} datanopages={update.totalPage} datacommentcount={update.commentCount} annocomment={update.anonymouscomment} dataComentmode={update.anonComment} updateID={update.update_id} postdata={update} updatecount={this.updateCommentcount}/>);

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


        this.setState ({
            isuue : true
        });

        this.forceUpdate();

    }

    ralert (text){
        swal("Error", text, "error");
    }


    postowner2(update,index){



        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close,
            toggle: <div>
				<a className="drop_popip" onClick={this.toggle}>
					<i className="privacy_selection_menu icon icon-security"/>
					<span id={"privacy_t"+update.update_id}>{update.postprivacy}</span>
				</a>
			</div>
            ,
            align: 'right'
        };

        return (<DropdownMenu {...menuOptions}>
            {this.privacyTemplate(update,index)}
		</DropdownMenu>);



    }


    privacyTemplate(update,index){

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



	template (update,index){

		const none = {
			display : "none"
		}

        let windowfethtype = 0;


			 const path = window.location.pathname.toLowerCase();
			 const page = path.split("/").pop();
     		 const lclass = (page=="search") ? '' : 'post-container';


			return(

				<aside>
					<div className="pop-container-header">
						<div className="pop-com-profile-image">
							<img src={update.profile_pic} alt="user-image"/>
							<div style={none} className="upd" id={"posxl_"+update.update_id} onClick={this.upgradeState}></div>
						</div>
						<div className="pop-com-profile-image-name">
							<h3><a className="__ljt" href={update.username}>{update.name}</a></h3>

							<h5 className="post-pri" data-related="drop-pri1">

								{this.postowner2(update,index)}

							</h5>
						</div>
					</div>



					{this.tagList(update)}

                    {this.normal_template(update)}





                    {this.post_controler(update)}

                    {this.commentArea(update)}


				</aside>

            );

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