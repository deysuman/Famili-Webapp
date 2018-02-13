import React,{Component} from "react";
import ReactDOM from 'react-dom';
import CommentFrom from "./CommentForm";
import Annonmyouscomment from "./Annonmyouscomment/AnnonmyousComment";
import Normalcomment from "./NormalComment/NormalComment";
import Ajax from "../../../lib/ajax";
import {URLS} from "../../../constants/api";
import {updatetime} from "../../../helper/Postbox/Postbox";
import swal from 'sweetalert';


export default class Comment extends Component{
    constructor(props){
        super(props);

        this.state = {
            dataComments: this.props.dataComentsBlock,
            dataannoncoment: this.props.annocomment,
            datanoPage :  this.props.datanopages,
            commentMode: this.props.dataComentmode,
            showComment: true,
            annomyousComment: false,
            normalComment: true,
            commode : 0,
            compage : 2,
            totalpages : 2,
            compage2 : 2,
            loading :false,
            viewmore : true,
            commentCount : (this.props.datacommentcount==0 || this.props.datacommentcount=="0") ? 0 : this.props.datacommentcount,
            postdata : this.props.postdata,
            normal : this.props.normalComments,
            anon : this.props.anonComments
        }

        this.commentAjaxSubmit=this.commentAjaxSubmit.bind(this);
        this.commentAjaxLoadMore=this.commentAjaxLoadMore.bind(this);
        this.anonmyousComment=this.anonmyousComment.bind(this);
        this.normalComment=this.normalComment.bind(this);
        this.deleteComment=this.deleteComment.bind(this);

    }

    commentAjaxSubmit (data){
         
          let update_id=this.props.updateID;
          let reactThis=this;
          let postimg=data.user_photo;
          let commentMode = (this.state.commode==0) ? 0 : 1;
          let img = encodeURIComponent(postimg);
          if(postimg==null||postimg==""){
              img = '';
          }
          let com = 0;
          const postdata = 'postid='+update_id+'&posttext='+data.user_comment+'&postimg='+img+'&commentMode='+commentMode;
          Ajax('post/newComment', postdata , reactThis, function(datas){

           // alert("llkk");
              if(datas.comments[0].type==0){
                  console.log("mhbhhh")
                  console.log(datas)
                  reactThis.state.dataComments.push(datas.comments[0]);
                  if(document.getElementById("React-Comment_count"+update_id)!=null) {
                     //document.getElementById("React-Comment_count" + update_id).innerHTML = datas.commentCount;
                  }
                 /* reactThis.setState({dataComments: reactThis.state.dataComments,commentCount: datas.commentCount});
                  com = (reactThis.state.dataComments.length + reactThis.state.dataannoncoment.length > data.commentCount) ? data.commentCount : reactThis.state.dataComments.length;
                  //co = com;*/

                  
                  //com = (reactThis.state.dataComments.length + reactThis.state.dataannoncoment.length > data.commentCount) ? data.commentCount : reactThis.state.dataComments.length;
                  //co = com;

                  

                        //if(datas.comments[0].uid_fk == myid){  

                          let totalc = ( reactThis.state.commentCount == 0 || reactThis.state.commentCount == "0" || reactThis.state.commentCount < 1) ? 1 : reactThis.state.commentCount + 1;
                          let totalnormal = ( reactThis.state.normal == 0 || reactThis.state.normal == "0" || reactThis.state.normal < 1) ? 1 : reactThis.state.normal + 1;



                          reactThis.setState({commentCount: totalc,normal : totalnormal});
                          reactThis.props.updatecount(reactThis.state.commentCount);




                       // }

                        console.log("my counts " + reactThis.state.commentCount);



              }

             else if(datas.comments[0].type==1){
                 reactThis.state.dataannoncoment.push(datas.comments[0]);
                  if(document.getElementById("React-Comment_count"+update_id)!=null) {
                     //document.getElementById("React-Comment_count" + update_id).innerHTML = datas.commentCount;
                  }
                
               /* reactThis.setState(
                    {
                        commentCount: datas.commentCount

                });*/

                  //reactThis.props.updatecount(datas.commentCount);

                  //if(datas.comments[0].uid_fk == myid){  

                    let totalc = ( reactThis.state.commentCount == 0 || reactThis.state.commentCount == "0" || reactThis.state.commentCount < 1) ? 1 : reactThis.state.commentCount + 1;
                    let totalanon = ( reactThis.state.anon == 0 || reactThis.state.anon == "0" || reactThis.state.anon < 1) ? 1 : reactThis.state.anon + 1;

                    reactThis.setState({commentCount: totalc,anon : totalanon});
                    reactThis.props.updatecount(reactThis.state.commentCount);


                   //}

              }


              if(document.getElementById("React_co"+update_id)!=null){
                //document.getElementById("React_co"+update_id).innerText = com + " of " + datas.commentCount;
              }

              updatetime();

          });



    }


    commentAjaxLoadMore (){

          let commentMode = (this.state.commode==0) ? 0 : 1;
          if(commentMode==0){

              let update_id=this.props.updateID;
              let reactThis=this;
              this.showloadingComponent();
              const data='postid='+update_id+'&pagenum='+this.state.compage+'&commenttype='+0;
              Ajax(URLS.MORE_COMMENT, data , reactThis, function(datas){
                  

                  for(let i=0;i<datas.comments.length;i++){

                    if(datas.comments[i].type == "0"){

                      let position2 = reactThis.state.dataComments.map((el) => el.com_id).indexOf(datas.comments[i].com_id);
                      

                      if(position2 === -1){

                        reactThis.state.dataComments.unshift(datas.comments[i]);

                      }

                    }

                    
                  }

                  let count = reactThis.state.compage+1;
                  let yi = reactThis.state.totalpages+1;
                  reactThis.setState({compage : count,totalpages : yi,loading : false});
                  let com = (reactThis.state.dataComments.length + reactThis.state.dataannoncoment.length > datas.commentCount) ? datas.commentCount : reactThis.state.dataComments.length+reactThis.state.dataannoncoment.length;
                  //document.getElementById("React_co"+update_id).innerHTML= com + " of " + datas.commentCount;
              });

          }

          if(commentMode==1){

              let update_id=this.props.updateID;
              let reactThis=this;
              this.showloadingComponent();
              const data='postid='+update_id+'&pagenum='+this.state.compage2+'&commenttype='+1;
              Ajax(URLS.MORE_COMMENT, data , reactThis, function(datas){

                 for(let i=0;i<datas.comments.length;i++){

                  if(datas.comments[i].type == "1"){

                      let position2 = reactThis.state.dataannoncoment.map((el) => el.com_id).indexOf(datas.comments[i].com_id);
                      if(position2 === -1){
                        reactThis.state.dataannoncoment.unshift(datas.comments[i]);
                      }

                    }
                 }
                let count = reactThis.state.compage2+1;

                let yi = reactThis.state.totalpages+1;



                reactThis.setState({compage2 : count,totalpages : yi,loading : false});

                let com = (reactThis.state.dataComments.length + reactThis.state.dataannoncoment.length > datas.commentCount) ? datas.commentCount : reactThis.state.dataComments.length+reactThis.state.dataannoncoment.length;
                //document.getElementById("React_co"+update_id).innerHTML= com + " of " + datas.commentCount;

                  updatetime();

              });

          }

    }

    showloadingComponent (){
	    this.setState({loading : true });
    }

    renderLoading(){
        if(this.state.loading){
            return (<div className="loa"><div className="loading_class"></div></div>)
        }
    }

    deleteComment(e){

          e.preventDefault();
          let commentIndex=e.target.getAttribute('data-value');
          let com_id=e.target.getAttribute('data');
          let update_id=this.props.updateID;
          let commentMode = (this.state.commode==0) ? 0 : 1;
          let reactThis=this;




          swal(
              {
                   title:'Are you sure?',
                  text:'You won\'t be able to revert this!',
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
              })
          .then(willDelete => {

              if(willDelete){




                      const data='postid='+update_id+'&commentid='+com_id;


                      Ajax(URLS.DELETE_COMMENT, data , reactThis, function(data){

                        if(commentMode==0){
                          const yui = reactThis.state.dataComments.map((el) => el.com_id).indexOf(com_id);
                          reactThis.state.dataComments.splice(yui,1);
                          reactThis.setState({dataComments: reactThis.state.dataComments});
                          reactThis.setState({
                              commentCount : data.totalcomments
                          })

                          reactThis.props.updatecount(data.totalcomments);

                           if(reactThis.state.dataComments.length  < 1 && data.totalcomments != 0){
                              ReactDOM.findDOMNode(reactThis.refs.compo).click();
                          }
                        }
                        else if(commentMode==1){
                             const yui = reactThis.state.dataannoncoment.map((el) => el.com_id).indexOf(com_id);
                             reactThis.state.dataannoncoment.splice(yui,1);
                             reactThis.setState({dataannoncoment: reactThis.state.dataannoncoment});

                             reactThis.setState({
                              commentCount : data.totalcomments
                            })

                             reactThis.props.updatecount(data.totalcomments);


                             if(reactThis.state.dataannoncoment.length  < 1 && data.totalcomments != 0){
                              ReactDOM.findDOMNode(reactThis.refs.compo).click();
                          }

                        }

                        document.getElementById("React-Comment_count"+update_id).innerHTML = data.totalcomments;



                         if(document.getElementById("React_co"+update_id)!=null){

                             //document.getElementById("React_co"+update_id).innerHTML=reactThis.state.dataComments.length + reactThis.state.dataannoncoment.length + " of " + data.totalcomments;

                              /*if(data.totalcomments==0){
                                 document.getElementById("React_co"+update_id).innerHTML = '';
                              }
*/
                          }

                          updatetime();

                      });


              }




          })


    }


    rendermore(){

        this.renderCommentmore();

        /*if(this.state.commode == 0 && this.state.normal <= this.state.dataComments.length) {

            console.log("hello");
            this.renderCommentmore();

        }

        else if(this.state.commode == 1 && this.state.anon <= this.state.dataannoncoment.length){
            console.log("hello2");
            this.renderCommentmore();
        }*/

    }


    renderCommentmore (){

        if(this.state.viewmore){
            if(this.state.totalpages <= this.state.datanoPage){

                if(this.state.commode==0 && (this.state.normal > this.state.dataComments.length)) {

                    return (
                        <div onClick={this.commentAjaxLoadMore} ref="compo" className="challange-viewall-button">
                            <a>View more comments</a>
                        </div>
                    )
                }

                else if(this.state.commode==1 && (this.state.anon > this.state.dataannoncoment.length)){
                    return (
                        <div onClick={this.commentAjaxLoadMore} ref="compo" className="challange-viewall-button">
                            <a>View more comments</a>
                        </div>
                    )
                }


            }
        }

    }

    commentofcomment (){
        const co = this.state.dataComments.length + this.state.dataannoncoment.length;

         if(co != 0){
                return (
                    <span className="fcg UFIPagerCount">
                        <em id={'React_co'+this.props.updateID} ref="comCou" className="_4qba" data-intl-translation="{countshown} of {totalcount}" data-intl-trid="">
                            {co} of {this.state.commentCount}
                        </em>
                    </span>
                )
            }
	}

	commentLink (){
      this.setState({ showComment: !this.state.showComment });
      this.renderCommentForm();
    }

    anonmyousComment(){

	    if(this.state.normalComment){

           this.setState({
               annomyousComment : !this.state.annomyousComment ,
               normalComment : false,
               commode : 1});
           this.renderanonmyousComment();
           ReactDOM.findDOMNode(this.refs.dfs).classList.add("Rvd");

        }

        ReactDOM.findDOMNode(this.refs.df).classList.remove("Rvd");
    }

    normalComment(){
        if(this.state.commentMode=="1"){

            if(this.state.annomyousComment)
                {
                    this.setState(
                        {
                            annomyousComment : false ,
                            normalComment: !this.state.normalComment,
                            commode : 0
                        }
                    );

                    this.rendernormalComment();
                    ReactDOM.findDOMNode(this.refs.dfs).classList.remove("Rvd");
                }
            ReactDOM.findDOMNode(this.refs.df).classList.add("Rvd");
        }
    }

    renderanonmyousComment(){
        if(this.state.annomyousComment)
        {


            if(this.state.postdata.postown==true){

                return(<Annonmyouscomment dataComments={this.state.dataannoncoment}
                                          deleteComment={this.deleteComment}/>
                )
            }


            else if(this.state.postdata.postown==false && this.state.postdata.commentShow==true){

                return(<Annonmyouscomment dataComments={this.state.dataannoncoment}
                                          deleteComment={this.deleteComment}/>
                )
            }
        }
    }


    renderAnonbutton (){
        if(this.state.commentMode=="1"){

            if(this.state.postdata.postown==true){

                return (
                    <button className="tablinks" onClick={this.anonmyousComment} ref="dfs" data-related="anonymous_comments">
                        Honest views
                    </button>)

            }
            else{

                if(this.state.postdata.commentShow==true){

                    return (<button className="tablinks" onClick={this.anonmyousComment} ref="dfs" data-related="anonymous_comments">
                        Honest views
                    </button>)

                }

            }


        }
    }

    rendernormalComment (){

        if(this.state.normalComment)
        {
            return(<Normalcomment dataComments={this.state.dataComments}
                                 deleteComment={this.deleteComment}/>
            )

        }
    }

    renderCommentForm (){
        if(this.state.showComment)
        {
            return (<CommentFrom  onCommentSubmit={this.commentAjaxSubmit}/>)
        }
    }

    createMarkup (str) {
        return {__html: str};
    }

    Templates (){


        return this.Layout();



    }

    Layout(){
        return (
            <div className="xxx">

                <div className="post-comments-box">

                    <div className="tab">

                        <button className="tablinks Rvd" onClick={this.normalComment} ref="df" data-related="commnets">Commnets</button>
                        {this.renderAnonbutton()}
                        {this.commentofcomment()}

                    </div>
                    {
                        this.renderCommentmore()
                    }
                    {this.renderLoading()}
                    <div id="commnets" className="tabcontent activeLnk">

                        {this.rendernormalComment()}
                        {this.renderanonmyousComment()}


                    </div>
                </div>

                {this.CommentFrom()}


            </div>
        )
    }

    CommentFrom (){

        if(typeof action_active !== 'undefined'){

            if(action_active == 0){


                return this.renderCommentForm();

            }



            else {

                return(<div className="srr">
                        <p dangerouslySetInnerHTML={this.createMarkup(msg)}></p>
                    </div>
                )
            }

        }

        else{


            return this.renderCommentForm();

        }

    }



    render (){
        return this.Templates();
    }






}