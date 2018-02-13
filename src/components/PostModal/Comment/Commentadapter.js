import React,{Component} from "react";
import CommentHtmlparser from "../../../lib/CommentHtmlparser"
import Ajax from "../../../lib/ajax";
import {URLS} from "../../../constants/api";
import CommentEdit from "./CommentEdit";
import DropdownMenu from 'react-dd-menu';

export default class Commentadapter extends Component{
    constructor(props){
        super(props);

        this.state = {
            editComment : true,
            editcommentId : '',
            data: this.props.value,
			commentMode : this.props.typemode,
            isMenuOpen: false,
        }

        this.click = this.click.bind(this);
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);

        this.changeEditCommentValue = this.changeEditCommentValue.bind(this);
        //this.changecommentEditstatus = this.changecommentEditstatus.bind(this)''

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



    changeEditCommentValue (value){

		this.state.data.comment = value.pdata;
    	this.state.data.posttime = value.formattime;
    	this.state.data.created = value.commentTime;
    	this.state.data.edited = true;

    	//this.changecommentEditstatus();

        this.forceUpdate();
	}


	changecommentEditstatus(){
    	this.setState({
			edited : true,
    	})
	}



    textToHTML (content,type,images){
        const finalContent = CommentHtmlparser(content,type,images);
        return {__html: finalContent}
    }


    reportcomment (y){

        const reactThis=this;
        const data='commentid='+y.com_id;

        $("body").append('<div id="report_comment"></div>');

        Ajax(URLS.REPORT, data , reactThis,
          function(data){
            $("#report_comment").html(data);
          }
        );

    }



    actionLayout(comment,index){



        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close,
            toggle:
				<div className="post-option-btn" onClick={this.toggle} value={comment.com_id} data-related="inner-drop7">
					<img src="assets/img/option-dropdown.png"  alt=""/>
				</div>


            ,
            align: 'right'
        };

        return (<DropdownMenu {...menuOptions}>
			<div className="post-drop-popup" id={"React-Comment__"+comment.com_id} ref="postool">
				<div className="post-drop-pop">
                    {this.showpanel(comment,index)}
				</div>
			</div>
		</DropdownMenu>);



    }




    showEditcomment (e){

		document.getElementById("React-Comment__"+e.com_id).classList.add("none");
		document.getElementById("React-Comment__"+e.com_id).style.display = "none";
		document.getElementById("React-Comment_id_"+e.com_id).classList.remove("none");
	}

	editCommentFrom (e){
        if(this.state.editComment){
			return(<CommentEdit  editchange={this.changeEditCommentValue} dataId={e.com_id} dataComment={e.comment} />)
		}
	}

	actionTool (e){

		if(document.getElementById("React-Comment__"+e.com_id).style.display==="none"
            || document.getElementById("React-Comment__"+e.com_id).style.display===""){
		    document.getElementById("React-Comment__"+e.com_id).classList.remove("none");
		    document.getElementById("React-Comment__"+e.com_id).style.display = "block";
	    }
	    else{

		    document.getElementById("React-Comment__"+e.com_id).classList.add("none");
		    document.getElementById("React-Comment__"+e.com_id).style.display = "none";
	    }
	}

	editedcomment (comment){
		if(comment.edited){
			return(<p id={"comment_edited"+comment.com_id}>Edited</p>);
		}
		else{
			return(<p className="none" id={"comment_edited"+comment.com_id}>Edited</p>);
		}
	}

    updatecom (l) {
        let type = "true";
        if(!l.shown){
            l.shown = true;
            this.state.data.shown = true;

            //document.getElementById("React_boot_commentshow"+l.com_id).innerHTML = 'Show this comment';

        }
        else{
            l.shown = false;
            type = "false";
            this.state.data.shown = false;
            //document.getElementById("React_boot_commentshow"+l.com_id).innerHTML = 'Hide this comment';

        }





        let reactThis=this;
        let data='commentid='+l.com_id+'&type='+type;
        Ajax(URLS.UPDATECOM, data , reactThis, function(data){

        });
        this.forceUpdate();
    }

    showpanel (comment,index){

		const pri = (comment.shown==false) ? 'Show this comment' : 'Hide this comment';

        if(comment.owner==0 && comment.postowner==true){
            if(comment.type == "0"){
                return(
                    <div>
                        <a data-testid="" onClick={this.showEditcomment.bind(this,comment)}>Edit</a>
                        <a href="#" data={comment.com_id} onClick={this.props.deleteComment} data-value={index} data-testid="">Delete</a>
                    </div>);
            }
            else{
                return(
                    <div>
                        <a data-testid="" onClick={this.showEditcomment.bind(this,comment)}>Edit</a>
                        <a href="#" data={comment.com_id} onClick={this.props.deleteComment} data-value={index} data-testid="">Delete</a>
                        <a href="#" id={"React_boot_commentshow_"+comment.com_id} onClick={this.updatecom.bind(this,comment)} data-value={index} data-testid="">{pri}</a>
                    </div>);
            }

        }

		else if(comment.owner==0){
			return(
				<div>
					<a data-testid="" onClick={this.showEditcomment.bind(this,comment)}>Edit</a>
					<a href="#" data={comment.com_id} onClick={this.props.deleteComment} data-value={index} data-testid="">Delete</a>
				</div>);
		}

		else if(comment.owner==1){

			return(<div><a href="#" onClick={this.updatecom.bind(this,comment)} id={"React_boot_commentshow_"+comment.com_id} data-value={index} data-testid="">{pri}</a></div>);

		}



		else{
			return(<div><a onClick={this.reportcomment.bind(this,comment)}  data-testid="">Report</a></div>);
		}

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

	template (comment,index){
    	//console.log('Hello')
		if(comment.type=="1" && this.state.commentMode == "1"){
                return(
                <div className="comment-box" key={comment.com_id}>
                    <div className="comment-image-box">
                        <div className="comment-image">
                            <img src={comment.profile_pic} alt="user"/>
                        </div>
                        <div className="comment-name">
                            <h2>
                                <a href="" className="3__ljt">{comment.name}</a>
                            </h2>
                            <p className="posttime" data-time={comment.posttime} id={"famile_comment_time_"+comment.com_id}>{comment.created}</p>
                            {this.editedcomment(comment)}
                        </div>
                        <div className="post-option-btn-container">
                            {this.actionLayout(comment,index)}
                        </div>
                    </div>
                    <div className="comment-text-box" id={"commentIo__"+comment.com_id}>
                        <p dangerouslySetInnerHTML={this.textToHTML(comment.comment,0,null)}></p>
                        <p dangerouslySetInnerHTML={this.textToHTML(null,1,comment.uploads)}></p>
                    </div>
                    {this.editCommentFrom(comment)}
                    </div>
                );
			}

			else if(comment.type=="0" && this.state.commentMode == "0"){
			 return(
                <div className="comment-box" key={comment.com_id}>
                    <div className="comment-image-box">
                        <div className="comment-image">
                            <img src={comment.profile_pic} alt="user"/>
                        </div>
                        <div className="comment-name">
                            <h2>
                                <a href="" className="3__ljt">{comment.name}</a>
                            </h2>
                            <p className="posttime" data-time={comment.posttime} id={"famile_comment_time_"+comment.com_id}>{comment.created}</p>
                            {this.editedcomment(comment)}
                        </div>

						<div className="post-option-btn-container">
                            {this.actionLayout(comment,index)}
						</div>


                    </div>
                    <div className="comment-text-box" id={"commentIo__"+comment.com_id}>
                        <p dangerouslySetInnerHTML={this.textToHTML(comment.comment, 0, null)}/>
                        <p dangerouslySetInnerHTML={this.textToHTML(null, 1, comment.uploads)}/>
                    </div>
                    {this.editCommentFrom(comment)}
                    </div>
                );
		}

		else {
				return false
		}
    }

	render () {

	    let comment = this.state.data;
	    const index = comment.com_id;

	    return this.template(comment,index)

	}


}