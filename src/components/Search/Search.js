import React,{Component} from "react";
import People from "./Tabs/People";
import Postsearch from "./Tabs/Post";
import Ajax from "../../lib/ajax";
import {URLS} from "../../constants/api";
import Loading from "../loading/loading";
import {STRING} from "../../constants/action_types";
import io from 'socket.io-client';
import {Timeupdate,updatetime} from "../../helper/Postbox/Postbox";



let socket = io('https://'+document.domain+':3000');

$.xhrPool = [];
$.xhrPool.abortAll = function() {
    $(this).each(function(idx, jqXHR) {
        jqXHR.abort();
    });
    $.xhrPool = [];
};




$(function() {
    $.xhrPool = [];
    $.xhrPool.abortAll = function() {
        $(this).each(function(i, jqXHR) {   //  cycle through list of recorded connection
            jqXHR.abort();  //  aborts connection
            $.xhrPool.splice(i, 1); //  removes from list by index
        });
    }
    $.ajaxSetup({
        beforeSend: function(jqXHR) { $.xhrPool.push(jqXHR); }, //  annd connection to list
        complete: function(jqXHR) {
            var i = $.xhrPool.indexOf(jqXHR);   //  get index for current connection completed
            if (i > -1) $.xhrPool.splice(i, 1); //  removes from list by index
        }
    });
});


 let ajax_request;



export default class Search extends Component{

	constructor(props){
		super(props);
        this.state = {
			isPeople:false,
			isPost:true,
			isTalent:false,
            value : '',
			isLoading : false,
			results : [],
            salt : 'All',
            noresult : false,
			peoples : [],
			unique : Math.random(),
			socket : '',
            isChallenge : false,
            currentpage : 1,
            ram : false,
            isLoading2: false


		}

        this.post = this.post.bind(this);
        this.people = this.people.bind(this);
        this.talent = this.talent.bind(this);
        this.challenge = this.challenge.bind(this);
        this.ajsearch = this.ajsearch.bind(this);


		this.onChangeInput=this.onChangeInput.bind(this);

        this.onChangeOnselect = this.onChangeOnselect.bind(this);

        this.search = this.search.bind(this);

       

        //this.reciveResponse = this.reciveResponse.bind(this);
	}

	filters (){
		return (
			<div className="challenge-list-filer">
				<div className="challenge-list-filer-dropdown">
				  <div className="formHolder">
					<p>Category</p>
					<select value={this.state.salt} onChange={this.onChangeOnselect}  className="makeMeList">
					  <option value="All">All</option>
					  <option value="Photography">Photography</option>
					  <option value="Dance">Dance</option>
					</select>
				  </div>
				</div>
     	 </div>
		)
	}

	layout (){
	    let checkPeople = this.state.isPeople;
		let checkPost = this.state.isPost;
		let checkTalent = this.state.isTalent;
		let checkChallenge = this.state.isChallenge;

        let type = '';
       if(checkPost){
                type = 'post'
            }

            else if(checkPeople){
                type = 'people'
            }

            else if(checkTalent){
                type = 'talent'
            }
            else if(checkChallenge){
                type = 'challenge'
            }

            console.log("Search type" + type);

		if(checkPeople){
		    return (<People data={this.state.peoples}/>);
        }

        else if(checkPost){
		    return (<Postsearch data={this.state.results}/>);
        }

        else if(checkTalent){
            return (<Postsearch data={this.state.results}/>);
        }

        else if(checkChallenge){
            return (<Postsearch data={this.state.results}/>);
		}
        else{
            return ''
        }
    }

    noreasult (){

	    const checkPeople = this.state.isPeople;
		const checkPost = this.state.isPost;
		const checkTalent = this.state.isTalent;
		const checkChanllenge = this.state.isChallenge;

        if(this.state.noresult) {

            if (checkPost) {
                return (<h1>{STRING.NORESULTSEARPOST}</h1>)
            }
            else if (checkPeople) {
                return (<h1>{STRING.NORESULTSEARPEOPLE}</h1>)
            }
            else if (checkTalent) {
                return (<h1>{STRING.NORESULTSEARTALENT}</h1>)
            }
            else if(checkChanllenge){
                return (<h1>{STRING.NOREASULTCHALLENGE}</h1>)
			}
            else{

            }
        }

    }




	render(){

        //<button ref="talents"  onMouseDown={this.challenge}  onClick={this.ajsearch} className={checkChanllenge?("search-tab-active"):null} type="button">Challenge</button>


		const checkPeople = this.state.isPeople;
		const checkPost = this.state.isPost;
		const checkTalent = this.state.isTalent;
		const loading = this.state.isLoading;
        const checkChanllenge = this.state.isChallenge;
        const loading2 = this.state.isLoading2;

		return (
		    <div>
		    <section className="challenge-banner">
                <img src="assets/img/challenge-banner.jpg" alt=""/>
                  <div className="container">
                    <div className="challenge-search-bar">
                      <form>
                          <input value={this.state.value} onChange={this.onChangeInput}  onKeyUp={this.search}  placeholder="Search..." id="search-in" type="search"/>
                          <button onClick={this.onChangeInput} className="challenge-search-bar-icon"><i className="icon icon-search"></i></button>
                          </form>
                      </div>
                  </div>
            </section>

		    <section className="challenge-list">
				  <div className="container">
					<div className="search-body">
					  <div className="search-tab-box">
						<div className="search-tab-box-content">
						<button ref="posts" onMouseDown={this.post} onClick={this.ajsearch} className={checkPost?("search-tab-active"):null} type="button">Posts</button>
						<button ref="peoples"  onMouseDown={this.people} onClick={this.ajsearch}   className={checkPeople?("search-tab-active"):null} type="button">People</button>
						<button ref="talents"  onMouseDown={this.talent}  onClick={this.ajsearch}  className={checkTalent?("search-tab-active"):null} type="button">Talent</button>
						
						</div>
					  </div>

                        {checkTalent ? this.filters() : null}

						{loading ? <span> Loading..... </span> :null}

						{this.state.noresult ? this.noreasult()  : null}

                        {this.layout()}

                        {loading2 ? <div id="loading"> <span>Loading.....</span></div> :null}


				 	</div>
				  </div>
				</section>
            </div>)


	}

	 post(){

		this.state.results.length = 0;

		this.setState({
			results : this.state.results,
			isPeople:false,
			isPost:true,
			isTalent:false,
			isLoading : false,
			isChallenge : false,
            salt: 'All',
            noresult: false,
			peoples: []
		});

		

     }

     people(){

	 	this.state.results.length = 0;
		this.setState({
			results : this.state.results,
			isPeople:true,
			isPost:false,
			isTalent:false,
            isChallenge : false,
			isLoading : false,
            salt: 'All',
            noresult: false,
			peoples: []
		});

        

     }

     talent(){
        
     	this.state.results.length = 0;
		this.setState({
			results : this.state.results,
			isPeople:false,
			isPost:false,
			isTalent:true,
            isChallenge : false,
			isLoading : false,
            salt: 'All',
            noresult: false,
			peoples: []
		});
        
     }

    challenge(){
        this.state.results.length = 0;
        this.setState({
            results : this.state.results,
            isPeople:false,
            isPost:false,
            isTalent:false,
            isChallenge : true,
            isLoading : false,
            salt: 'All',
            noresult: false,
            peoples: []
        });

       

    }

    


     addTodo(){


	 }

     clearValue(){
     	this.setState({
			value : ''
		})
	 }

     doSearch(value){     

     	if(value < 1)
		{

			return false
		}

         // $.xhrPool and $.ajaxSetup are the solution





         this.setState({
             isLoading : true,
             ram : true,
             isLoading2 : false,
             currentpage : 1
		 })


		const checkPost = this.state.isPost;
		const checkPeople = this.state.isPeople;
		const checkTalent = this.state.isTalent;
		const checkChallenge = this.state.isChallenge;
	    let val = value;
	    let salt = this.state.salt.toLowerCase();
	    if(val!="") {

            let type = 'post';

	    	if(checkPost){
	    		type = 'post'
			}

			else if(checkPeople){
                type = 'people'
			}

			else if(checkTalent){
                type = 'talent'
			}
			else if(checkChallenge){
                type = 'challenge'
			}

            console.log("Search type" + type)

            const reactThis = this;
            const data = "type=" + type + "&terms=" + encodeURIComponent(val) + "&salt="+encodeURIComponent(salt) + "&signature="+this.state.unique+"&page=1";
            //this.state.socket.emit("new_message",{"message":"suman"});

            if(typeof ajax_request !== 'undefined')
                ajax_request.abort();

            ajax_request = $.ajax({
                type:"POST",
                url:URLS.MAINURL + URLS.SEARCHAPI,
                data :data,
                dataType:"json",
                cache:false,
                timeout:50000,
                beforeSend :function(data) {

                     //$.xhrPool.push(jqXHR);

                    console.log("Total ajax "+$.xhrPool.length);

                    $.xhrPool.abortAll();

                	reactThis.setState({
						isLoading : true
					})

				}.bind(this),
                success:function(data){

                    const oldreasults = [];
                    reactThis.state.results.length = 0;
                    reactThis.state.peoples.length = 0;
                    reactThis.state.noresult = false;

                    if(data.updates.length > 0){

                        if(data.method == 0) {

                            for (let i = 0; i < data.updates.length; i++) {

                                reactThis.state.peoples.unshift(data.updates[i]);

                            }
                        }

                        else if(data.method == 1 || data.method == 2 || data.method == 3) {

                            for (let i = 0; i < data.updates.length; i++) {

                                reactThis.state.results.unshift(data.updates[i]);
                                //reactThis.state.data.unshift(data.updates[i]);

                            }

                        }




                    }

                    else{

                        reactThis.state.noresult = true;

                    }

                    reactThis.setState({
                        isLoading : false,
                        results : reactThis.state.results,
                        noresult : reactThis.state.noresult,
                        peoples : reactThis.state.peoples,
                        currentpage : reactThis.state.currentpage + 1,
                        ram : false
                    });

                    console.log(this.state.peoples);

                }.bind(this),
                error:function(data){

                }.bind(this)
            });




            /* Ajax(URLS.SEARCHAPI, data, reactThis, function (data) {


            });*/

        }
        return false;

    }

    doSearch2(value){     

        if(value < 1)
        {

            return false
        }

         // $.xhrPool and $.ajaxSetup are the solution





         this.setState({
             isLoading2 : true,
             ram : true
         })


        const checkPost = this.state.isPost;
        const checkPeople = this.state.isPeople;
        const checkTalent = this.state.isTalent;
        const checkChallenge = this.state.isChallenge;
        let val = value;
        let salt = this.state.salt.toLowerCase();
        if(val!="") {

            let type = 'post';

            if(checkPost){
                type = 'post'
            }

            else if(checkPeople){
                type = 'people'
            }

            else if(checkTalent){
                type = 'talent'
            }
            else if(checkChallenge){
                type = 'challenge'
            }

            console.log("Search type" + type)

            const reactThis = this;
            const data = "type=" + type + "&terms=" + encodeURIComponent(val) + "&salt="+encodeURIComponent(salt) + "&signature="+this.state.unique+"&page="+this.state.currentpage;
            //this.state.socket.emit("new_message",{"message":"suman"});

            if(typeof ajax_request !== 'undefined')
                ajax_request.abort();

            ajax_request = $.ajax({
                type:"POST",
                url:URLS.MAINURL + URLS.SEARCHAPI,
                data :data,
                dataType:"json",
                cache:false,
                timeout:50000,
                beforeSend :function(data) {

                     //$.xhrPool.push(jqXHR);

                    console.log("Total ajax "+$.xhrPool.length);

                    $.xhrPool.abortAll();

                    reactThis.setState({
                        isLoading2 : true
                    })

                }.bind(this),
                success:function(data){

                    

                    if(data.updates.length > 0){

                        if(data.method == 0) {

                            for (let i = 0; i < data.updates.length; i++) {

                                let pos = reactThis.state.peoples.map((el) => el.userid).indexOf(data.updates[i].userid);

                                if(pos == -1){

                                    reactThis.state.peoples.push(data.updates[i]);

                                }

                                

                            }
                        }

                        else if(data.method == 1 || data.method == 2 || data.method == 3) {

                            for (let i = 0; i < data.updates.length; i++) {

                                
                                //reactThis.state.data.unshift(data.updates[i]);

                                let pos = reactThis.state.results.map((el) => el.update_id).indexOf(data.updates[i].update_id);

                                if(pos == -1){

                                    reactThis.state.results.push(data.updates[i]);

                                }

                            }

                        }




                    }

                    else{

                        //reactThis.state.noresult = true;

                    }

                    reactThis.setState({
                        isLoading : false,
                        results : reactThis.state.results,
                        noresult : reactThis.state.noresult,
                        peoples : reactThis.state.peoples,
                        currentpage : reactThis.state.currentpage + 1,
                        ram : false
                    });

                    console.log(this.state.peoples);

                }.bind(this),
                error:function(data){

                }.bind(this)
            });




            /* Ajax(URLS.SEARCHAPI, data, reactThis, function (data) {


            });*/

        }
        return false;

    }


    











    ajsearch () {
       console.log("hi");

         this.setState({
             isLoading : true,
             ram : true,
             isLoading2 : false,
             currentpage : 1
         })
       this.doSearch(this.state.value);
    }

    load_more () {
        if(this.state.ram == false){
           console.log("hi");
           this.doSearch2(this.state.value); 
        }
       
    }

    componentDidMount(){


        if(typeof hashtag !== 'undefined'){

            if(hashtag == 1){

                if(typeof terms !== 'undefined'){

                    if(terms.length > 0){

                        this.setState({
                                value : terms
                        })
                         this.doSearch(terms);

                    }

                }

            }


        }


$(function() {
    $.xhrPool = [];
    $.xhrPool.abortAll = function() {
        $(this).each(function(i, jqXHR) {   //  cycle through list of recorded connection
            jqXHR.abort();  //  aborts connection
            $.xhrPool.splice(i, 1); //  removes from list by index
        });
    }
    $.ajaxSetup({
        beforeSend: function(jqXHR) { $.xhrPool.push(jqXHR); }, //  annd connection to list
        complete: function(jqXHR) {
            var i = $.xhrPool.indexOf(jqXHR);   //  get index for current connection completed
            if (i > -1) $.xhrPool.splice(i, 1); //  removes from list by index
        }
    });
});

    
        this.socketWorks();

        Timeupdate();

        let reactThis = this;


        $(window).scroll(function(){
        if ($(window).scrollTop() == $(document).height() - $(window).height()){
                console.log("Test");
                reactThis.load_more();

            }
        });



    }

    reciveResponse () {
		let reactThis = this;
        this.state.socket.on('search', function (data) {


        	reactThis.state.results.length = 0;
			reactThis.state.peoples.length = 0;
			reactThis.state.noresult = false;

				if(data.updates.length > 0){

					if(data.method == 0) {

                        for (let i = 0; i < data.updates.length; i++) {

                            reactThis.state.peoples.unshift(data.updates[i]);

                        }
                    }

                    else if(data.method == 1) {

						 for (let i = 0; i < data.updates.length; i++) {

                            reactThis.state.results.unshift(data.updates[i]);

                        }

					}




				}

				else{

                    reactThis.state.noresult = true;

				}

				reactThis.setState({
						isLoading : false,
						results : reactThis.state.results,
                        noresult : reactThis.state.noresult,
						peoples : reactThis.state.peoples
				});




		})
    }

    onChangeInput(event){


            this.setState({
                value: event.target.value,
                isLoading : false,
                noresult : false

            });






        //this.doSearch();
    }

    search(event){
        this.setState({
			isLoading : false,
            noresult : false

        });

        this.doSearch(event.target.value);
    }

    onChangeOnselect(event){
        this.setState({
            salt: event.target.value,
            noresult : false
        })

        this.doSearch();
    }




    attachComment(datas){

        let reactThis = this;

        console.log("Myanppjndsjf" + datas);

        let i = 0;

            let position = reactThis.state.results.map((el) => el.update_id).indexOf(datas.postid);


            if(position != -1){

                if(datas.response[i].type=="0"){

                    //console.log(reactThis.state.data[position]);

                    reactThis.state.results[position].comments.push(datas.response[i]);

                    //let position2 = reactThis.state.data[position].comments.map((el) => el.comid).indexOf(datas.response[i].com_id);

                    let position2 = reactThis.state.results[position].comments.map((el) => el.com_id).indexOf(datas.postid)

                    if(position2 == -1){

                        

                        if(datas.response[0].uid_fk == myid){  

                            console.log("My total comments before" + reactThis.state.results[position].commentCount);

                            reactThis.state.results[position].commentCount = reactThis.state.results[position].commentCount + 1;


                            console.log("My total comments2 before" + reactThis.state.results[position].commentCount);



                            //reactThis.state.data[position].comments.push(datas.response[i]);



/*
                             console.log("My total comments after" + reactThis.state.data[position].commentCount);

                             console.log("My total comments2 before" + reactThis.state.data[position].comments.commentCount);

                            reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;

                            console.log("My total comments2 before" + reactThis.state.data[position].comments.commentCount);*/

                            

                        }

                        else if(datas.response[0].postownerid == myid){

                           // reactThis.state.data[position].comments.push(datas.response2[i]);

                            reactThis.state.results[position].comments.commentCount = datas.commentCount;
                            reactThis.state.results[position].commentCount = datas.commentCount;
                        }

                        else {

                             //console.log("Totalcomments is "+ datas.commentCount);

                             reactThis.state.results[position].comments.commentCount = reactThis.state.results[position].comments.commentCount + 1;
                             reactThis.state.results[position].commentCount = reactThis.state.results[position].commentCount + 1;

                        }



                        //reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;

                    }

                }
                else {

                    let position3 = reactThis.state.results[position].comments.map((el) => el.com_id).indexOf(datas.postid)

                    if(position3 == -1){
                        //reactThis.state.data[position].comments.push(datas.response[i]);
                    }

                    let position4 = reactThis.state.results[position].anonymouscomment.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    if(position4 == -1){

                        if(datas.response[0].uid_fk == myid){  

                            //reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;
                            reactThis.state.results[position].commentCount = reactThis.state.results[position].commentCount + 1;
                            reactThis.state.results[position].anonymouscomment.push(datas.response[i]);
                        
                        }

                        else if(datas.response[0].postownerid == myid){

                            //reactThis.state.data[position].comments.commentCount = datas.commentCount2;
                            reactThis.state.results[position].commentCount = datas.commentCount2;
                            reactThis.state.results[position].anonymouscomment.push(datas.response2[i]);

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

                let position = reactThis.state.results.map((el) => el.update_id).indexOf(postid);

                if(position != -1) {

                    if (type) {

                        let fosis = reactThis.state.results[position].liked;

                        if(fosis) {

                            if(reactThis.state.results[position].liked == true) {

                                reactThis.state.results[position].liked = false;
                                reactThis.state.results[position].likeCount = reactThis.state.results[position].likeCount - 1;
                            }

                        }
                    }

                    else {

                        if(reactThis.state.results[position].liked == false) {


                            reactThis.state.results[position].liked = true;
                            reactThis.state.results[position].likeCount = reactThis.state.results[position].likeCount + 1;

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

            let position = reactThis.state.results.map((el) => el.update_id).indexOf(datas.postid);

            console.log(position);


            if(position != -1){

                if(datas.response[i].type=="0"){

                    //console.log(reactThis.state.data[position]);



                    //let position2 = reactThis.state.data[position].comments.map((el) => el.comid).indexOf(datas.response[i].com_id);

                    let position2 = reactThis.state.results[position].comments.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    //console.log(position2+"position")

                    if(position2 != -1){

                        reactThis.state.results[position].comments.splice(position2,1);
                        console.log("My comments arae " +reactThis.state.results[position].commentCount);
                        reactThis.state.results[position].commentCount = reactThis.state.data[position].commentCount - 1;
                        console.log("My comments arae " +reactThis.state.results[position].commentCount);

                    }

                }
                else {

                    let position4 = reactThis.state.results[position].anonymouscomment.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    console.log("Comments jdh"+position4);

                    if(position4 != -1){

                        reactThis.state.results[position].anonymouscomment.splice(position4,1);
                        reactThis.state.results[position].commentCount = reactThis.state.results[position].commentCount - 1;

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

            }

            updatetime();

        });


        socket.on('editcomment', function(datas) {

            if(datas.response[0].uid_fk != myid){
                console.log("This is not my comment");
                return false;
            }

            let i = 0;

            let position = reactThis.state.results.map((el) => el.update_id).indexOf(datas.postid);

            //console.log(position);


            if(position != -1){

                if(datas.response[i].type=="0"){

                    //console.log(reactThis.state.data[position]);



                    //let position2 = reactThis.state.data[position].comments.map((el) => el.comid).indexOf(datas.response[i].com_id);

                    let position2 = reactThis.state.results[position].comments.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    console.log("kkkk"+position2);


                    if(position2 != -1){


                        console.log(datas.response[i]);


                        reactThis.state.results[position].comments.splice(position2,1);

                        reactThis.state.results[position].comments.splice(position2, 0, datas.response[i]);



                    }

                }
                else {

                    let position4 = reactThis.state.results[position].anonymouscomment.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    if(position4 != -1){


                        reactThis.state.results[position].anonymouscomment.splice(position4,1);

                        reactThis.state.results[position].anonymouscomment.splice(position4, 0, datas.response[i]);

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






}