import React,{Component} from "react";
import ReactDOM from 'react-dom';
import Commentadapter from "../Commentadapter"


export default class Normalcomment extends Component{

    constructor(props){
        super(props);

        this.state = {
           data : this.props.dataComments
        }
    }

     render (){
         const items = this.state.data;
         const uniqueComment = [];

         const item = items.map((item) => {

            if (uniqueComment.indexOf(item.com_id) === -1) {

                uniqueComment.push(item.com_id);

                 return (

                     <Commentadapter
                     value={item}
                     typemode="0"
                     key={Math.random()}
                     deleteComment={this.props.deleteComment}/>

                 )

            }
         }
         );
         return (<div id="commnetsFeed">{item}</div>);
    }
}