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

	componentDidMount() {

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