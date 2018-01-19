import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import TimeAgo from 'react-simple-timeago';


export default class MessageAdapter extends Component{

	constructor(props){
        super(props);

        this.state = {

        	data : this.props.value
        }

	}


	deliverd_status(){

		let deliverd = this.props.deliverd_status;
		let is_seen = this.props.seen;

		if(deliverd==true){

			//If message have been seen by recived user
			if(is_seen){

				return (

					<div className="is_seen"></div>

					)

			}

			else {


				return (

					<div className="deliverd"></div>

				)

			}


		}

		else {

			return (

				<div className="replay"></div>


			)

		}

		



	}

	componentDidMount() {
        //this.refs.test.getDOMNode().setAttribute('ng-click', 'startChat(this)');
        //ReactDOM.findDOMNode(this.refs.bbs).setAttribute('ng-click', 'startChat()');
        ReactDOM.findDOMNode(this.refs.bbs).setAttribute('onclick', 'showdiv(this)');
        //on-click=""
    }

	
	template(){

		const details = this.state.data;

		let d = new Date(details.time_stamp);

		return(

				<div ref="bbs" name={details.name} className="ng-scope ng-isolate-scope notification-list-box notification-read" id={details.user_id} ng-click="startChat()">
				    <div className="notification-list-image"><img src={details.avatar} alt=""/></div>
				    <div className="notification-list-text">
				        <div className="notification-list-text-name"> <a href="#">{details.name}</a>
				            <p><span><i className="fa fa-clock-o" aria-hidden="true"></i></span>
				            <TimeAgo date={d} /></p>
				        </div>
				        <p> <span className="accept"> <i className="fa fa-angle-right" aria-hidden="true"></i> </span> {details.message}</p>
				    </div>
				</div>
		)


	}

	render (){

		return (<div>{this.template()}</div>)

	}


}