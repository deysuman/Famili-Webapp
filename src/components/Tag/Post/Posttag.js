import React,{Component} from "react";
import Tagcompleter from "../Tagcompleter";
import Ajax from "../../../lib/ajax"
import {URLS} from "../../../constants/api"
import {Addtag,Deletetag,deletealltag} from "../../../helper/Postbox/Postbox";
import Require from "../../../helper/Postbox/Require"
import {isInArray} from "../../../lib/Module"
import Taggeduser from "./Taggeduser"

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


export default class Posttag extends Component {

    constructor(props){
        super(props);

        this.state = {
            value : '',
            Tagusers : [],
            People : [],
            Taggedusers : []
        }

        this.bindListener = this.bindListener.bind(this);
        this.bindListener2 = this.bindListener2.bind(this);
        this.Addtag = this.Addtag.bind(this);
    }

    clear() {


        this.setState({
               Taggedusers : [],
               value : ''
        });


        deletealltag();


     }


    Addtag (userid,name){
        let tagusers = this.state.Taggedusers;

        if(!isInArray(userid,normalposttags) || !isInArray(userid,challengeposttags)){

            Addtag(userid,name);

            let obj = new Object();
            obj.name = name;
            obj.id  = userid;
            let jsonString= JSON.stringify(obj);

            this.state.Taggedusers.push(obj);

            this.setState({
                value : '',
                Taggedusers : this.state.Taggedusers
            })

            console.log(this.state.Taggedusers);
        }
        else{
          swal('Error','You already tag ' + name,'error');
        }



    }





    Removetag (userid){

        if(isInArray(userid,normalposttags) || isInArray(userid,challengeposttags)){
            Deletetag(userid);
            let position = this.state.Taggedusers.map((el) => el.id).indexOf(userid);
            this.state.Taggedusers.splice(position, 1);

            this.setState({
                Taggedusers : this.state.Taggedusers
            })
        }
    }


    bindListener (event){

        if(Math.round(normalposttags.length + challengeposttags.length) < 1 && this.state.value.length < 1){
            this.state.Taggedusers.length = 0;
            this.setState({
                Taggedusers : this.state.Taggedusers
            })
        }

        this.setState({
            value : event.target.value
        })


    }

     bindListener2 (event){
        this.setState({
            value : event.target.value
        })

        this.Searchregex();

    }

    tagLayout (){
        const typevalue = this.state.value;

        if(typevalue.length > 0) {
            if (typevalue === "" || typevalue === '' || typevalue === null) {

                let items = this.state.Tagusers;
                return (<Tagcompleter addTag={this.Addtag} peoples={items}/>)
            }
            else {
                let items2 = this.state.People;
                //console.log(items2);
                return (<Tagcompleter addTag={this.Addtag} peoples={items2}/>)
            }
        }

    }

    getTagusers (){
        let data = '';
        let reactThis = this;
        Ajax(URLS.TAGUSERS,data,this,function (data) {
            for(let i=0;i<data.length;i++){
                reactThis.state.Tagusers.unshift(data[i]);
            }
        });

        this.setState({
            Tagusers : this.state.Tagusers
        })

    }

    Searchregex (){
        const typedValue = this.state.value;

        if(Math.round(normalposttags.length + challengeposttags.length) < 1 && this.state.value.length < 1){
            this.state.Taggedusers.length = 0;
            this.setState({
                Taggedusers : this.state.Taggedusers
            })
        }

                if(typedValue.length > 0) {
                    const obj = this.state.Tagusers;
                    let reactThis = this;
                    reactThis.state.People.length = 0;
                    for (let Ze = new RegExp('^' + typedValue, 'i'), et = 0, tt = document.createDocumentFragment(), nt = !1; et < obj.length; et++) {

                        if (Ze.test(obj[et].name)) {
                             const people = obj[et];
                            if(!isInArray(people.id,normalposttags) || !isInArray(people.id,normalposttags)){



                                let position3 = reactThis.state.People.map((el) => el.id).indexOf(people.id);

                                console.log(position3);
                                
                                if(position3 == -1){

                                    console.log(people);
                                    reactThis.state.People.unshift(people);

                                }
                                
                             }

                        }
                    }

                    this.setState({
                        People : this.state.People
                    })


                }
    }

    componentDidMount (){
        this.getTagusers();


    }


    render (){

        const typevalue = this.state.value;
        let item;





        return (

            <div className="freedomarea but_place-bottom tagger" id="uhdfg">
                <div className="container" id="container">

                    <Taggeduser items={this.state.Taggedusers} removeTag={this.Removetag.bind(this)} />

                  <input value={typevalue} onChange={this.bindListener} onKeyUp={this.bindListener2} type="text"  id="tagging"/>
                </div>

                {this.tagLayout()}

              </div>
        )
    }

}


