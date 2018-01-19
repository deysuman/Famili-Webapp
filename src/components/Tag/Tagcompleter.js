import React,{Component} from "react";
import Ajax from "../../lib/ajax"
import {URLS} from "../../constants/api"
import Tagadapter from "./Tagadapter";
import {isInArray} from "../../lib/Module"
import Require from "../../helper/Postbox/Require"

let commentmode = Require.commentmode;
 let anoncom = Require.anoncom;
 let posttext = Require.posttext;
 let image = Require.image;
 let video = Require.video;
 let postprivacy = Require.postprivacy;
 let peopletag = Require.peopletag;
 let posttype = Require.posttype;
 let xhpc_message = Require.xhpc_message;
 let xhpc_title = Require.xhpc_title;
 let xhpc_type = Require.xhpc_type;
 let xhpc_category = Require.xhpc_category;
 let xhpc_subcategory = Require.xhpc_subcategory;
 let audience = Require.audience;
 let allimages = Require.allimages;
 let chmode = Require.chmode;
 let participatedays = Require.participatedays;
 let normalposttags = Require.normalposttags;
 let challengeposttags = Require.challengeposttags;
 let allvideos = Require.allvideos;
 let cy = Require.cy;
 let ary = Require.ary;
 let p = Require.p;
 let videono = Require.videono;
 let xhpc_end_time = Require.xhpc_end_time
 let title = Require.title;
 let mode= Require.mode;
 let lop = Require.lop;
 let no = Require.no;
 let pmode = Require.pmode;
 let perticipate = Require.perticipate;

export default class Tagcompleter extends Component{

    constructor(props){
        super(props);

        this.addTag = this.addTag.bind(this);
    }

    addTag (userid,name){
        this.props.addTag(userid,name);
    }


    render (){

            const items= this.props.peoples;

           

            let item = items.map((item) => {return <Tagadapter addTag={this.addTag} people={item} key={Math.random()} />})


        return (
            <div  className="Tagpanel">
                {item}
            </div>
        )

    }
}