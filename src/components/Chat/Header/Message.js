import React,{Component} from 'react';
import MessageAdapter from "./MessageAdapter.js";
import {URLS} from "../../../constants/api";
import Ajax from "../../../lib/ajax";
import io from 'socket.io-client';


let socket = io('https://'+document.domain+':3000');

export default class Message extends Component{

	constructor(props){
        super(props);

		this.state = {

			data : [],
			loading : true

		}


		//this.socket = io('http://'+document.domain+':8080');

	}


	componentDidMount(){

		let datas = '';

		let reactThis = this;

		Ajax(URLS.GETCHAT, datas, reactThis, function (data) {


				if(data.unseen_message > 0){

	                

	                $("#message_counter").show();

	                $("#message_counter p").html(data.unseen_message);
            	}

                for (let i = 0; i < data.messages.length; i++) {

                	//console.log("message " + data.messages);

                    reactThis.state.data.push(data.messages[i]);


                }


                reactThis.setState({data: reactThis.state.data, loading : false});


        });

        

        socket.on('connect_failed', function(){
		    console.log('Connection Failed');
		});
		socket.on('connect', function(){
		    console.log('Connected');
		    //alert();
		});
		socket.on('disconnect', function () {
		  console.log('Disconnected');
		});


		this.socketWorks();
        
	}



	socketWorks(){

        let reactThis = this;
        socket.on('message', function (data){ 

        	console.log(data);    

          	if(data.from_id == myid){

        		let position = reactThis.state.data.map((el) => el.user_id).indexOf(data.to_id);

        		if(position != -1){

        			let element = reactThis.state.data[position];


        			//alert();

        			element.message = data.user_message;
        			element.time_stamp = data.message_timestamp;


        			//reactThis.setState({data : reactThis.state.data});


	        		

	        		reactThis.state.data.splice(position, 1);
	        		reactThis.state.data.unshift(element);
	        		reactThis.setState({working : true});


        		}

        		else {

        				let datas = 'userid='+data.to_id;

        				Ajax(URLS.USERPROFILE, datas, reactThis, function (result) {

        					let user = {
	        					message : data.user_message,
	        					time_stamp : data.message_timestamp,
	        					user_id : data.to_id,
	        					name : result.name,
	        					avatar : result.avatar 
	        				}

	        				reactThis.state.data.unshift(user);
	        				reactThis.setState({working : true});

				        });



        				/**/




        		}

        		

        	}

        	else if(data.to_id == myid) {

        		let position = reactThis.state.data.map((el) => el.user_id).indexOf(data.from_id);

        		if(position != -1){

        			//alert();

        			let element = reactThis.state.data[position];


        			//alert();

        			element.message = data.user_message;
        			element.time_stamp = data.message_timestamp;


        			//reactThis.setState({data : reactThis.state.data});


	        		

	        		reactThis.state.data.splice(position, 1);
	        		reactThis.state.data.unshift(element);
	        		reactThis.setState({working : true});


        		}



        		else {

        			let datas = 'userid='+data.from_id;

        				Ajax(URLS.USERPROFILE, datas, reactThis, function (result) {

        					let user = {
	        					message : data.user_message,
	        					time_stamp : data.message_timestamp,
	        					user_id : data.from_id,
	        					name : result.name,
	        					avatar : result.avatar 
	        				}

	        				reactThis.state.data.unshift(user);
	        				reactThis.setState({working : true});

				        });
        		}

        		



        	}

            
        });

        //t//his.setState({upgrade : true});
       // this.forceUpdate();

    }



	template (){

		const nomessage = {
                textAlign : "center",
                fontsize : "14px",
                color : "#000000",
                margin : "5px auto",
                width : "100%",
                top : "35px",
                position : "relative"
            }

		let items = this.state.data;
		const item = items.map((item) => {return <MessageAdapter value={item} key={Math.random()}/>});

		if(this.state.loading == true){

			return (
				<div> <div className="loa jui"> <div className="loading_class"></div> </div> </div>
			)
		}

		else {

			if(this.state.data.length > 0){

				return item;

			}

			else {

				return(<p style={nomessage}>Opps ! Your inbox is empty </p>);

			}
		}

		
		

	}

	render (){

		return (<div>{this.template()}</div>)

	}



}