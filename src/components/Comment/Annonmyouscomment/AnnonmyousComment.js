import React,{Component} from "react";
import Commentadapter from "../Commentadapter"

export default class Annonmyouscomment extends Component{
    constructor(props){
        super(props);

        this.state = {
           data : this.props.dataComments
        }
    }



    render (){
        //console.log(this.state.data);
         const uniqueComment = [];
         const items = this.state.data;
         const item = items.map((item) => {

            if (uniqueComment.indexOf(item.com_id) === -1) {

                uniqueComment.push(item.com_id);
                 return (
                     <Commentadapter
                     value={item}
                     typemode="1"
                     key={Math.random()}
                     deleteComment={this.props.deleteComment}/>
                 )

             }
         }
         );
         return (<div id="anoncommnetsFeed">{item}</div>);
    }
}