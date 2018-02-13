import React,{Component} from "react";

import Likelistingpeople from "./Likelistingpeople"

export default class Likelisting extends Component{

    constructor(props){
        super(props);

        this.stopclick = this.stopclick.bind(this);

    }


    stopclick(event){

        event.preventDefault();
        event.stopPropagation();

    }



    render (){

        //window.detribut();

        var updates=this.props.likesdata.map(function(update,index)

        {





            //let ui = (update.is_follow == ture) ? 'Unfollow' : 'Follow';


            return (<Likelistingpeople value={update}/>)




        },this);

        return (<div onClick={this.stopclick} className="default-modal-content"><div className="modal-inner-scroll">{updates}</div></div>)

    }

}