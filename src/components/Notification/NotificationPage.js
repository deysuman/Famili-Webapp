import React,{Component} from "react";
import Notificationadapter from "./Notificationadapter";
import Ajax from "../../lib/ajax";
import {URLS} from "../../constants/api";
import io from 'socket.io-client';
import {notifyBrowser} from '../../lib/notification';
import Notifier from "react-desktop-notification";

let socket = io('https://'+document.domain+':3000');

let ram = 0;

let totalNotificationpage = 0;

let currentNotificationpage = 1;

let count = 0;

export default class NotificationPage extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            notifications : [],
            loading : true
        }
    }


    updatesFromServer ()
    {
        let data='';
        let reactThis=this;
        Ajax(URLS.NOTIFICATIONS, data , reactThis, function(data){
            reactThis.setState({
                notifications: data.notification,
                loading : false
            });
            totalNotificationpage=data.totalpage;
            if(document.getElementById("loading_notifications2")!=null){
                document.getElementById("loading_notification2").classList.add("none");
            }
        });
    }


    updatesFromloadmore (data)
    {
        let notificationss = this.state.notifications;

        for(var i=0;i< data.notification.length;i++){

            let position4 = notificationss.map((el) => el.createdid).indexOf(data.notification[i].createdid);

            if(position4 == -1){

                notificationss.push(data.notification[i]);
            }

        }

        //let newnotification = notificationss.concat(data.notification);
        this.setState({notifications: newnotification});

    }

    updatesFromSocket (text)
    {
        let reactThis=this;
        console.log(text);
        let updates = reactThis.state.notifications;
        this.state.notifications.unshift(text);
        reactThis.setState({data: this.state.notifications})

    }


    Loadnotification ()
    {

        let reactThis = this;

        if(ram==0){
            
            let authorwho = myid;
            let wrap = document.getElementById('notificationFeed2');
            let contentHeight = wrap.offsetHeight;
            let offset = $("#notificationFeed2").offset();
            let yOffset = offset.top;
            let y = yOffset + document.getElementById("notificationFeed2").offsetHeight;

            //console.log("contentheight "+contentHeight + "&&&" + document.getElementById("notificationFeed2").offsetHeight);

            if (y => contentHeight) {

                ram = 1;

                if(document.getElementById("loading_notification2")!=null){

                    document.getElementById("loading_notification2").classList.remove("none");

                }

                let pn = currentNotificationpage;

                let hr;
                if (window.XMLHttpRequest) {
                    hr = new XMLHttpRequest();
                } else {
                    hr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                this.setState({
                    loading : true
                })
                hr.open("POST", URLS.MAINURL + URLS.NOTIFICATIONS , true);
                hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                hr.onreadystatechange = function() {
                    if (hr.readyState == 4 && hr.status == 200) {

                        let data = JSON.parse(hr.responseText);

                        reactThis.setState({
                                    loading : false
                                })


                        if(document.getElementById("loading_notification")!=null){
                            document.getElementById("loading_notification").classList.add("none");


                        }


                        if(data.notification.length > 0){

                            reactThis.updatesFromloadmore(data);
                            reactThis.setState({
                                    loading : false
                                })

                        }


                        if(currentNotificationpage==data.totalpage){

                            ram = 1;

                        }

                        else{

                            ram = 0;

                        }

                        if (totalNotificationpage != 1) {

                            if (pn != totalNotificationpage) {
                                let value = parseInt(pn, 10);
                                value = isNaN(value) ? 0 : value;
                                value++;
                                currentNotificationpage = value;
                            } else if (pn == totalNotificationpage) {
                                document.getElementById("notificationFeed2").onscroll = !reactThis.Loadnotification;
                            }


                        } else {

                            document.getElementById("notificationFeed2").onscroll = !reactThis.Loadnotification;

                        }

                    };
                };
                let ui=(pn==1) ? 2 : pn;
                hr.send("pageid="+ui);

            }

        }
    }




    componentDidMount ()
    {
        let reactThis = this;


        if(document.getElementsByClassName("icon-notification-bell")[0]!=null){

            $(".icon-notification-bell").click(function(){
                $("#notification_count").css("display","none");
                count = 0;
            });


        }



        if(document.getElementById("loading_notification2")!=null){
            document.getElementById("loading_notification2").classList.remove("none");
        }

        this.updatesFromServer();

        const yhandler = this.Loadnotification();

        if(document.getElementById("notificationFeed2")!=null){
            if(totalNotificationpage<=currentNotificationpage){

                document.getElementById("notificationFeed2").addEventListener("scroll",yhandler,false);
            }
        }



        socket.on('notification', function(datas) {

            console.log(datas);

            for(let i=0;i<datas.response.length;i++){
                if(datas.response[i].reciverId==myid&&datas.response[i].senderId!=myid){
                    reactThis.updatesFromSocket(datas.response[i]);
                    //document.getElementsByClassName("notification-icon-alert")[0].style.display = "block";
                   // $(".notification-icon-alert").css("display","block");
                    $("#notification_count p").html((Math.round(count+1) > 99) ? '+99' : count+1);
                   // count = count + 1;

                    //   notifyBrowser(datas.response[i].fname,datas.response[i].prittygrammer,datas.response[i].avatar,datas.response[i].createdid);
                }
            }
        });

    }

    Loadingbar(){

        const nonotification = {
                textAlign : "center",
                fontsize : "14px",
                color : "#000000",
                margin : "5px auto",
                width : "100%",
                top : "35px",
                position : "relative"
            }

        if(this.state.loading == false && this.state.notifications.length < 1){

            return(<p style={nonotification}>You have no notification recived right now !</p>);

        }

        
    }


    Router()
    {


        if(this.state.notifications.length > 0){

            return (<Notificationadapter data={this.state.notifications}/>)

        }

        else {
           

            const nu = {
                width : "100%"
            }

            return (

                <div style={nu} id="notificationFeed2">
                {
                    this.Loadingbar()
                }
            </div>
            )

        }


    }

    render ()
    {
        return (

        <div className="post-body">
        <div className="container">
                    <div className="viewall-left">
                        {this.Router()}
                    </div>  

                    <div className="viewall-right"></div>                 

        </div>

        </div>)

    }
}
