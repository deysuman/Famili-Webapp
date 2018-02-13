import React,{Component} from "react";
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from "./Search/Search";
import Postutil from "./Post/Index"
import NotificationRoot from "./Notification/NotificationRoot"
import NotificationPage from "./Notification/NotificationPage"
import Message from "./Chat/Header/Message.js"
import "../lib/sweetalert";
import {URLS} from "../constants/api"
import swal from 'sweetalert';
import Ajax from "../lib/ajax";



window.jQuery = $;
window.$ = $;
global.jQuery = $;




export default class Main extends Component{

	Routes () {
		const path = window.location.pathname.toLowerCase();
		const page = path.split("/").pop();
		if(page=="search"){
			return (<Search/>)
		}

		else if(page=="notifications" || page=="notification"){
			return (<NotificationPage/>)
		}

		else {

			return (<Postutil/>)
			
		}
	}


	updateNoti(){
		let reactThis=this;
		let data='';
        Ajax(URLS.UPDATE_NOTIFICATION, data , reactThis, function(data){
            

        });
	}


	updateMsg(){
		let reactThis=this;
		let data='';
        Ajax(URLS.UPDATE_MSG, data , reactThis, function(data){
            
        });
	}

	componentDidMount() {

		let reactThis=this;

		

        if(document.getElementById("notification_root")!=null){

            let allnoti = ReactDOM.render(<NotificationRoot url={URLS.NOTIFICATIONS}/>,document.getElementById("notification_root"))

		}


		if(document.getElementById("message_box")!=null){

			let allmessage = ReactDOM.render(<Message url={URLS.NOTIFICATIONS}/>,document.getElementById("message_box"))
		}



        $(document).ready(function(){
            $(".notification-icon").on("click", function() {
                var target_id = ("#" + $(this).attr("data-related"));
                $(target_id).toggle();

                return false;

            });

            $(".post-option-btn ").on("click", function() {
                var target_id = ("#" + $(this).attr("data-related"));
                $(target_id).toggle();
            });




            $(".notification-popup-headline").on("click", function() {
                $(".notification-popup-content").removeClass("activeLnk");
                $("#" + $(this).attr("data-related")).addClass("activeLnk");
            });

            $(".tablinks").on("click", function() {
                $(".tabcontent").removeClass("activeLnk");
                $("#" + $(this).attr("data-related")).addClass("activeLnk");
            });
        });

        $(document).click(function()
		{
		$(".notification-popup").hide();
		});

        $(".notification-popup").click(function()
		{
			if($(this).css('display') == 'block')
			{
				$(this).show();

			}

			
		});


		if(document.getElementById("dft")!=null){

			$("#dft").mousedown(function(){
			    reactThis.updateNoti();
			});

		}

		

		if(document.getElementById("msg_bb")!=null){			

			$("#msg_bb").mousedown(function(){
				$("#message_counter").hide();
            	$("#message_counter p").html("");
			    reactThis.updateMsg();
			});

		}



    }





	NotificationRoot (){

		return (

			<NotificationRoot/>,document.getElementById('notification_root')

		)

	}

	render(){
		return (<div>
                {this.Routes()}
			</div>
		);

	}
}