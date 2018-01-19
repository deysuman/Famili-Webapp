import React,{Component} from "react";

export default class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showbutton : false
        }

    }

    typeofotification (type){

        if(type==0){
            return (<i className="icon icon-heart" aria-hidden="true"></i>)
        }

        else if(type==1){
            return (<i className="icon icon-chat-comment-oval-speech-bubble-with-text-lines" aria-hidden="true"></i>)
        }

    }

    isseen (type){
        if(type=='0'){
            return ('notification-list-box');
        }
        else if(type=="1"){
            return ('notification-list-box notification-read')
        }
    }

    grammer (e) {
        return {__html: e};
    }

    poster (e){
        if(e!=""){

            return (<div className="notification-upload-image"><img src={e} alt=""/></div>)
        }
    }
    showdectivebutton (e){

        if(document.getElementById("React-Comment_show"+e.createdid).style.display=="none" || document.getElementById("React-Comment_show"+e.createdid).style.display==""){
            document.getElementById("React-Comment_show"+e.createdid).style.display = "block";}
        else{
            document.getElementById("React-Comment_show"+e.createdid).style.display = "none";
        }

    }

    render(){

        var com=this.props.data.map(function(notification,index)
        {
            return(
                <div className={this.isseen(notification.seen)} key={Math.random()}>
                    <a href={'/'+notification.link}>
                        <div className="notification-list-image"><img src={notification.avatar} alt=""/></div>
                        <div className="notifi-box-list-text">
                            <div className="notification-list-text-name"><span>{notification.fname + ' '+ notification.lname}</span><dd dangerouslySetInnerHTML={this.grammer(notification.grammer)}></dd></div>
                            <p> <span> {this.typeofotification(notification.type)} </span> {notification.time}</p>
                        </div>

                        {this.poster(notification.poster)}




                        <div className="notification-edit-container" onClick={this.showdectivebutton.bind(this,notification)}>
                            <div className="notification-edit" data-related="drop-noti3">
                                <img src="assets/img/option-dropdown.png" alt=""/>
                            </div>
                            <div className="post-drop-popup" id={"React-Comment_show"+notification.createdid}>
                                <div className="post-drop-pop">
                                    <button>Hide this notification</button>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

            )

        },this);

        return(
            <div id="notificationFeed">
                {com}
            </div>
        );

    }


}