import React,{Component} from "react"
import Ajax from "../../lib/ajax";
import Post from "./Post";
import {URLS} from "../../constants/api"
import Postbox from "./Postbox"
import io from 'socket.io-client';
import Progressloader from "../loading/Progressloader";
import Pertipate from "../ChallengePerticipate/Perticipate";
import {Timeupdate,updatetime} from "../../helper/Postbox/Postbox";

let socket = io('https://'+document.domain+':3000');



export default class Postutil extends Component{

    constructor(props){
        super(props);

        this.state = {
            data : [],
            loading : true,
            totalpage : 1,
            currentpage : 1,
            ram : false,
            postbox : true,
            Postcontainer : true,
            currentsec : 0
        }

        this.updateAjaxSubmit = this.updateAjaxSubmit.bind(this);
        this.editpost = this.editpost.bind(this);
        this.ShowInfo = this.ShowInfo.bind(this);
        this.ShowPost = this.ShowPost.bind(this);

    }

    updateAjaxSubmit (text){
        let reactThis=this;
        let updates = reactThis.state.data;
        this.state.data.unshift(text.updates[0]);
        reactThis.setState({data: this.state.data});
    }


    editpost (update){
			var reactThis=this;
			 for(var i = 0; i < reactThis.state.data.length; i++) {
					if(reactThis.state.data[i].update_id === update.update_id) {

						  var array = this.state.data;
						  var index = array.indexOf(update.update_id);
						  var yui = array.map((el) => el.update_id).indexOf(update.update_id);

						  array.splice(yui, 1);

						  array.splice(yui, 0, update);

						  this.setState({data: array});

						  //autoScrollTo("post_"+update.update_id);

					}
			}
    }

    editpostfun (update){
        let reactThis=this;
        for(let i = 0; i < reactThis.state.data.length; i++) {
            if(reactThis.state.data[i].update_id === update.update_id) {
                let array = this.state.data;
                let index = array.indexOf(update.update_id);
                let yui = array.map((el) => el.update_id).indexOf(update.update_id);
                array.splice(yui, 1);
                array.splice(yui, 0, update);
                this.setState({data: array});
                autoScrollTo("post_"+update.update_id);



                $(window).scrollTop($("post_"+update.update_id).offset().top)
            }
        }
    }




    updatesFromServer (){

        let data='';
        let rows = 2;//Math.floor(Math.random() * 2) + 1;

        let extras = "&rows="+rows+"&page_number="+this.state.currentpage;


        if(typeof Querymethod !== 'undefined'){



            if(Querymethod===5){

                data = 'method='+Querymethod+'&postid='+posttokenid;
            }
            

            else if(Querymethod===4){

                data = "method="+Querymethod+'&postid='+token;
            }

            else if(Querymethod===3){

                data = 'method='+Querymethod+'&userid='+profileid+'&type='+0;
            }

            else if(Querymethod===2){

                data = 'method='+Querymethod+'&postid='+posttokenid;
            }
            else if (Querymethod==1){

                data = 'method='+Querymethod+'&profile='+profiletokenid;

            }
        

            else{
                data = 'method='+Querymethod;
            }

        }
        else{

            data = 'method=0';
        }



        let reactThis=this;
        if(reactThis.state.ram === false) {
            reactThis.setState({
                ram : true
            }
            )



            Ajax(URLS.WALLFEED, data+extras, reactThis, function (data) {

                for (let i = 0; i < data.updates.length; i++) {



                    reactThis.state.data.push(data.updates[i]);


                }
                reactThis.setState({
                    data: reactThis.state.data,
                    loading: false,
                    currentpage: reactThis.state.currentpage + 1,
                    ram : false,
                    totalpage : data.total_posts

                });
            });
        }
    }

    

    profilesearch(type){

       let data = 'method='+Querymethod+'&userid='+profileid+'&type='+type;
       let reactThis=this;
       let rows = 2;//Math.floor(Math.random() * 2) + 1;

       let extras = "&rows="+rows+"&page_number="+this.state.currentpage;
       reactThis.state.data.length = 0;
       reactThis.setState({
                ram : false,
                currentpage : 0,
                loading : true,
                data : reactThis.state.data
        });


        if(reactThis.state.ram === false) {
            reactThis.setState({
                ram : true
            }
            )
            Ajax(URLS.WALLFEED, data+extras, reactThis, function (data) {


                reactThis.state.data.length = 0;
                for (let i = 0; i < data.updates.length; i++) {

                    let pos = reactThis.state.data.map((el) => el.update_id).indexOf(data.updates.update_id);

                    if(pos == -1){

                        reactThis.state.data.push(data.updates[i]);

                    }

                    
                }
                reactThis.setState({
                    data: reactThis.state.data,
                    loading: false,
                    currentpage: reactThis.state.currentpage + 1,
                    ram : false,
                    totalpage : data.total_posts

                });
            });
        }

    }


    profilesearch2(type){

       let data = 'method='+Querymethod+'&userid='+profileid+'&type='+type;
       let reactThis=this;
       let rows = 2;//Math.floor(Math.random() * 2) + 1;

       let extras = "&rows="+rows+"&page_number="+this.state.currentpage;
       reactThis.setState({
                ram : false,
                loading : true
         });


        if(reactThis.state.ram === false) {
            reactThis.setState({
                ram : true
            }
            )
            Ajax(URLS.WALLFEED, data+extras, reactThis, function (data) {


                
                for (let i = 0; i < data.updates.length; i++) {

                    let pos = reactThis.state.data.map((el) => el.update_id).indexOf(data.updates.update_id);

                    if(pos == -1){

                        reactThis.state.data.push(data.updates[i]);

                    }

                    
                }
                reactThis.setState({
                    data: reactThis.state.data,
                    loading: false,
                    currentpage: reactThis.state.currentpage + 1,
                    ram : false,
                    totalpage : data.total_posts

                });
            });
        }

    }



    load_more (){

         if(this.state.totalpage > 1){

            console.log(" I am here its go");

            this.setState({
                loading : true
            });

            if(document.getElementById("postsectioncl")!=null){

                this.profilesearch2(this.state.currentsec);


            }


            else{

                this.updatesFromServer();

            }
                
         }
        
    }


    componentDidMount (){

        this.updatesFromServer();

        let reactThis = this;

        /*$(function () {

            $('.__ljt').tooltipster({
                interactive: true,
                content: 'Loading...',
                contentCloning: false,
                contentAsHTML: true,
                animation: 'fade',
                functionBefore: function (origin, continueTooltip) {
                    // we'll make this function asynchronous and allow the tooltip to go ahead and show the loading notification while fetching our data.
                    continueTooltip();
                    origin.tooltipster('content', '<div class="hovercard"> <div> <div class="display-pic"> <div class="cover-photo"> <div class="display-pic-gradient"></div><img src="dp.jpg"> </div><div class="profile-pic"> <div class="pic"> <img src="avatar.jpg" title="Profile Image"> </div><div class="details"> <ul class="details-list"> <li class="details-list-item"> <p> <span class="glyph glyph-home"></span> <span> Also Lives in <a href="#">Chennai</a> <a href="#">TamilNadu</a></span> </p></li><li class="details-list-item"> <p> <span class="glyph glyph-work"></span> <span> Founder at <a href="#">CodeDodle</a></span> </p></li></ul> </div></div></div><div class="display-pic-gradient"></div><div class="title-container"> <a class="title" href="#" title="Visit Page">Tamil Selvan</a> <p class="other-info">2 followers</p></div><div class="info"> <div class="info-inner"> <div class="interactions"> <a href="#" class="btn">Add Friend</a> <a href="#" class="btn">Follow</a> </div></div></div></div></div>');
                }
            });
        });*/

        this.socketWorks();

        Timeupdate();

        //let reactThis = this;

        if(typeof windowfetchtype !== 'undefined'){

            if(windowfetchtype == 3){

                

               


            }


            if(typeof Querymethod !== 'undefined'){

                if(Querymethod === 5){

                 
                    reactThis.setState({
                        postbox : false
                    })


                }

            }


           

        }




        if(typeof Querymethod !== 'undefined'){
            
             if(Querymethod===3){

                if(document.getElementById("postsectioncl")!=null){

                    document.getElementById("postsectioncl").addEventListener("click", function(){
                       reactThis.profilesearch(0);


                       if(document.getElementById("postsectioncl") != null){

                        document.getElementById("postsectioncl").classList.remove('active');

                       }


                       if(document.getElementById("likesectioncl") != null){

                        document.getElementById("likesectioncl").classList.remove('active');

                       }


                       if(document.getElementById("talent") != null){

                        document.getElementById("talent").classList.remove('active');

                       }
                       
                       if(document.getElementById("savepost") != null){

                        document.getElementById("savepost").classList.remove('active');

                       }
                       if(document.getElementById("postsectioncl") != null){

                        document.getElementById("postsectioncl").classList.add('active');

                       }
                       
                       

                       if($("#switches").hasClass('switchon')){
                             document.getElementById("switches").click();

                       }

                       reactThis.setState({postbox:true,currentsec : 0})

                    });


                    if(document.getElementById("talent") != null){

                            document.getElementById("talent").addEventListener("click", function(){
                               reactThis.profilesearch(1);

                               if(document.getElementById("postsectioncl") != null){
                                    document.getElementById("postsectioncl").classList.remove('active');

                                }

                                if(document.getElementById("likesectioncl") != null){
                                    document.getElementById("likesectioncl").classList.remove('active');
                                }

                                if(document.getElementById("talent") != null){
                                    document.getElementById("talent").classList.remove('active');
                                }


                                if(document.getElementById("savepost") != null){

                                    document.getElementById("savepost").classList.remove('active');

                                }

                                 if(document.getElementById("talent") != null){
                                    document.getElementById("talent").classList.add('active');
                                }

                                if(document.getElementById("switches") != null) {

                                    document.getElementById("switches").click();

                                }
                               

                               reactThis.setState({postbox:true,currentsec : 1})

                            });

                    }


                    if(document.getElementById("likesectioncl") != null){

                            document.getElementById("likesectioncl").addEventListener("click", function(){
                               reactThis.profilesearch(2);


                               if(document.getElementById("postsectioncl") != null){
                                    document.getElementById("postsectioncl").classList.remove('active');

                                }

                                if(document.getElementById("likesectioncl") != null){
                                    document.getElementById("likesectioncl").classList.remove('active');
                                }

                                if(document.getElementById("talent") != null){
                                    document.getElementById("talent").classList.remove('active');
                                }


                                if(document.getElementById("savepost") != null){

                                    document.getElementById("savepost").classList.remove('active');

                                }

                                 

                                if(document.getElementById("savepost") != null){
                                    document.getElementById("likesectioncl").classList.add('active');
                                }

                               reactThis.setState({postbox:false,currentsec : 2})

                            });


                     }


                    if(document.getElementById("savepost") != null){


                        document.getElementById("savepost").addEventListener("click", function(){
                           reactThis.profilesearch(3);
                           

                           if(document.getElementById("postsectioncl") != null){
                                document.getElementById("postsectioncl").classList.remove('active');

                            }

                            if(document.getElementById("likesectioncl") != null){
                                document.getElementById("likesectioncl").classList.remove('active');
                            }

                            if(document.getElementById("talent") != null){
                                document.getElementById("talent").classList.remove('active');
                            }


                            if(document.getElementById("savepost") != null){

                                document.getElementById("savepost").classList.remove('active');

                                document.getElementById("savepost").classList.add('active');

                            }




                           

                           reactThis.setState({postbox:false,currentsec : 3})

                        });

                    }

                    
                    


                }

                if(typeof showpostbox !== 'undefined'){

                    if(showpostbox == 0){

                       reactThis.setState({postbox : true});
                       reactThis.forceUpdate();
                       

                    }

                    else{


                        this.setState({
                            postbox : false
                        })

                    }


                }
            }

            

        }


        $(window).scroll(function(){
        if ($(window).scrollTop() == $(document).height() - $(window).height()){
                console.log("Test");
                reactThis.load_more();

            }
        });




    }



    attachComment(datas){

        let reactThis = this;

        console.log("Myanppjndsjf" + datas);

        let i = 0;

            let position = reactThis.state.data.map((el) => el.update_id).indexOf(datas.postid);


            if(position != -1){

                if(datas.response[i].type=="0"){

                    //console.log(reactThis.state.data[position]);

                    reactThis.state.data[position].comments.push(datas.response[i]);

                    //let position2 = reactThis.state.data[position].comments.map((el) => el.comid).indexOf(datas.response[i].com_id);

                    let position2 = reactThis.state.data[position].comments.map((el) => el.com_id).indexOf(datas.postid)

                    if(position2 == -1){

                        

                        if(datas.response[0].uid_fk == myid){  

                            console.log("My total comments before" + reactThis.state.data[position].commentCount);

                            reactThis.state.data[position].commentCount = reactThis.state.data[position].commentCount + 1;


                            console.log("My total comments2 before" + reactThis.state.data[position].commentCount);



                            //reactThis.state.data[position].comments.push(datas.response[i]);



/*
                             console.log("My total comments after" + reactThis.state.data[position].commentCount);

                             console.log("My total comments2 before" + reactThis.state.data[position].comments.commentCount);

                            reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;

                            console.log("My total comments2 before" + reactThis.state.data[position].comments.commentCount);*/

                            

                        }

                        else if(datas.response[0].postownerid == myid){

                           // reactThis.state.data[position].comments.push(datas.response2[i]);

                            reactThis.state.data[position].comments.commentCount = datas.commentCount;
                            reactThis.state.data[position].commentCount = datas.commentCount;
                        }

                        else {

                             //console.log("Totalcomments is "+ datas.commentCount);

                             reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;
                             reactThis.state.data[position].commentCount = reactThis.state.data[position].commentCount + 1;

                        }



                        //reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;

                    }

                }
                else {

                    let position3 = reactThis.state.data[position].comments.map((el) => el.com_id).indexOf(datas.postid)

                    if(position3 == -1){
                        //reactThis.state.data[position].comments.push(datas.response[i]);
                    }

                    let position4 = reactThis.state.data[position].anonymouscomment.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    if(position4 == -1){

                        if(datas.response[0].uid_fk == myid){  

                            //reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;
                            reactThis.state.data[position].commentCount = reactThis.state.data[position].commentCount + 1;
                            reactThis.state.data[position].anonymouscomment.push(datas.response[i]);
                        
                        }

                        else if(datas.response[0].postownerid == myid){

                            //reactThis.state.data[position].comments.commentCount = datas.commentCount2;
                            reactThis.state.data[position].commentCount = datas.commentCount2;
                            reactThis.state.data[position].anonymouscomment.push(datas.response2[i]);

                        }                         

            

                    }



                    //reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;


                    //reactThis.state.data[position].anonymouscomment.unshift(datas.response[i]);
                }

                if(document.getElementById("posx_"+datas.postid)!=null) {

                    document.getElementById("posx_" + datas.postid).click();
                }

                if(document.getElementById("mycomment_op"+datas.postid)!=null){

                    document.getElementById("mycomment_op"+datas.postid).click();
                }

                if(document.getElementById("React-Comment_count"+datas.postid)!=null){
                    document.getElementById("React-Comment_count"+datas.postid).click();
                }

            }

            updatetime();
    }




    socketWorks(){

        let reactThis = this;

        socket.on('newcomment', function(datas) {



            

            if(datas.response[0].type == "1"){

                if(datas.response[0].uid_fk == myid){

                    reactThis.attachComment(datas);
                    return false;

                }

                else if(datas.response[0].postownerid == myid){

                     reactThis.attachComment(datas);  
                     return false;                    
                }

                else {

                    return false;
                }
            }

            else {

                reactThis.attachComment(datas); 
                return false;

            }


        });


        socket.on('newlove', function(data) {


            let postid = data.postid;
            let type = data.type;
            let userid = data.userid;

            if(userid == myid) {

                let position = reactThis.state.data.map((el) => el.update_id).indexOf(postid);

                if(position != -1) {

                    if (type) {

                        let fosis = reactThis.state.data[position].liked;

                        if(fosis) {

                            if(reactThis.state.data[position].liked == true) {

                                reactThis.state.data[position].liked = false;
                                reactThis.state.data[position].likeCount = reactThis.state.data[position].likeCount - 1;
                            }

                        }
                    }

                    else {

                        if(reactThis.state.data[position].liked == false) {


                            reactThis.state.data[position].liked = true;
                            reactThis.state.data[position].likeCount = reactThis.state.data[position].likeCount + 1;

                        }

                    }
                }

                if(document.getElementById("posx_"+postid)!=null) {

                    document.getElementById("posx_" + postid).click();

                    if(document.getElementById("update_" + postid) != null){
                        document.getElementById("update_" + postid).click();
                    }
                    

                }


            }



        });



        socket.on('delcomment', function(datas) {

            //console.log(datas+"me");

            console.log("Hi");

            if(datas.response[0].uid_fk != myid){
                return false;
            }

            let i = 0;

            let position = reactThis.state.data.map((el) => el.update_id).indexOf(datas.postid);

            console.log(position);


            if(position != -1){

                if(datas.response[i].type=="0"){

                    //console.log(reactThis.state.data[position]);



                    //let position2 = reactThis.state.data[position].comments.map((el) => el.comid).indexOf(datas.response[i].com_id);

                    let position2 = reactThis.state.data[position].comments.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    //console.log(position2+"position")

                    if(position2 != -1){

                        reactThis.state.data[position].comments.splice(position2,1);
                        console.log("My comments arae " +reactThis.state.data[position].commentCount);
                        reactThis.state.data[position].commentCount = reactThis.state.data[position].commentCount - 1;
                        console.log("My comments arae " +reactThis.state.data[position].commentCount);

                    }

                }
                else {

                    let position4 = reactThis.state.data[position].anonymouscomment.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    console.log("Comments jdh"+position4);

                    if(position4 != -1){

                        reactThis.state.data[position].anonymouscomment.splice(position4,1);
                        reactThis.state.data[position].commentCount = reactThis.state.data[position].commentCount - 1;

                    }

                    

                    //reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;


                    //reactThis.state.data[position].anonymouscomment.unshift(datas.response[i]);
                }

                if(document.getElementById("posx_"+datas.postid)!=null) {

                    document.getElementById("posx_" + datas.postid).click();
                }

                if(document.getElementById("update_" + datas.postid) != null){
                        document.getElementById("update_" + datas.postid).click();
                }

                if(document.getElementById("mycomment_op" + datas.postid) != null){
                        document.getElementById("mycomment_op" + datas.postid).click();
                }

                $('.ghb').click();

            }

            updatetime();

        });


        socket.on('editcomment', function(datas) {

            if(datas.response[0].uid_fk != myid){
                console.log("This is not my comment");
                return false;
            }

            let i = 0;

            let position = reactThis.state.data.map((el) => el.update_id).indexOf(datas.postid);

            //console.log(position);


            if(position != -1){

                if(datas.response[i].type=="0"){

                    //console.log(reactThis.state.data[position]);



                    //let position2 = reactThis.state.data[position].comments.map((el) => el.comid).indexOf(datas.response[i].com_id);

                    let position2 = reactThis.state.data[position].comments.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    console.log("kkkk"+position2);


                    if(position2 != -1){


                        console.log(datas.response[i]);


                        reactThis.state.data[position].comments.splice(position2,1);

                        reactThis.state.data[position].comments.splice(position2, 0, datas.response[i]);



                    }

                }
                else {

                    let position4 = reactThis.state.data[position].anonymouscomment.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    if(position4 != -1){


                        reactThis.state.data[position].anonymouscomment.splice(position4,1);

                        reactThis.state.data[position].anonymouscomment.splice(position4, 0, datas.response[i]);

                    }



                }

                if(document.getElementById("comments_"+datas.response[i].com_id)!=null) {

                    document.getElementById("comments_" + datas.response[i].com_id).click();

                }

                if(document.getElementById("posx_"+datas.postid)!=null) {

                    document.getElementById("posx_" + datas.postid).click();
                }

                if(document.getElementById("mycomment_op" + datas.postid) != null){
                        document.getElementById("mycomment_op" + datas.postid).click();
                }

            }

            updatetime();

        });


    }







    Loading (){
        if(this.state.loading){
            return(
                <div className="timeline-item">
                    <div className="animated-background pro-image"></div>
                    <div className="animated-background pro-headline"></div>
                    <div className="animated-background pro-headline-text"></div>
                    <div className="pro-body">
                        <div className="animated-background pro-text"></div>
                        <div className="animated-background pro-text"></div>
                        <div className="animated-background pro-text"></div>
                        <div className="animated-background pro-text"></div>
                        <div className="animated-background pro-text"></div>
                        <div className="animated-background pro-text"></div>
                        <div className="animated-background pro-text"></div>
                        <div className="animated-background pro-text"></div>
                    </div>
                </div>
            )
        }
    }

    Router (){

        if(this.state.Postcontainer) {

            if (this.state.loading) {
                return (this.Loading())
            }
            else {

            }
        }
    }



    ShowInfo(){

        this.setState({
            postbox : false,
            Postcontainer : false
        })

    }


    ShowPost (){

        this.setState({
            postbox : true,
            Postcontainer : true
        })

    }




    Template (){

        let path = window.location.pathname;
        let page = path.split("/").pop();

        if(/Challengedescription/i.test(path) || /Challenge/i.test(path) || /challenge/i.test(path) ){

            return (


                <Pertipate showinfo={this.ShowInfo} postid={posttokenid} showpost={this.ShowPost}/>


            )

        }

       

    }


    TemplatePostBox (){

        if(this.state.postbox){
            return (

                <Postbox updateAjaxSubmit={this.updateAjaxSubmit} editpost={this.editpost}/>
            )
        }
    }


    TemplatePostsContainer(){

        const items = this.state.data;

        let path = window.location.pathname;
        let page = path.split("/").pop();


        let ls = '';

        if(/Challengedescription/i.test(path) || /Challenge/i.test(path)){

            ls = 'challenge-details-body newspaper grid';
        }

        if(this.state.Postcontainer) {

            return (



                    <Post data={items}/>



            )
        }

    }



    adverticement (){

        return (
            <div id="middle_adverticement_banner">


            </div>

        )

    }



    render (){

        let path = window.location.pathname;
        let page = path.split("/").pop();

        let ls = '';

        if(/Challengedescription/i.test(path) || /Challenge/i.test(path)){

            ls = 'challenge-details-body newspaper grid';
        }


        return(

            <div>

                {this.Template()}

                <div className={ls}>

                    {this.TemplatePostBox()}  

                    {this.adverticement()}                

                    {this.TemplatePostsContainer()}

                    {this.Router()}


                </div>

            </div>
        )
    }

}