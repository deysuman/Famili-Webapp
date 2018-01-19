import React,{Component} from 'react';
import Loading from "../loading/loading"
import {URLS} from "../../constants/api"
import {ajaxObj,ajaxReturn} from "../../lib/ajax"
import Imageview from "../Imageview/Imageview";
import FacedetectArea from "./FacedetectArea";
import PostforModal from "../Post/PostforModal";
import io from 'socket.io-client';
let myarrays = new Array();
let k = 0;

let socket = io('https://'+document.domain+':3000');

export default class Modalcontent extends Component{

    constructor(props){
        super(props);

        this.state = {
            images : [],
            loading : true,
            area : [],
            mylength : 0,
            data : []
        }

        this.changelistener = this.changelistener.bind(this);
        this.attachArea = this.attachArea.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this)

    }

    changelistener (){
        return false
    }

     getImages (){

        let item = this.props.imgName;
        item = item.split("/");
		let img = item[item.length - 1];
		let reactThis = this;
		let a=ajaxObj("POST",URLS.POSTDETAILS);a.onreadystatechange=function(){if(!0==ajaxReturn(a)){

		     reactThis.state.images.length = 0;
             reactThis.state.data.length = 0;

             let json=JSON.parse(a.responseText);

			let ui = [];

			for(let i=0;i<json.images.length;i++) {

			    reactThis.state.images.push(json.images[i]);

                let my_arrays = json.images[i].split("/");
                let name = my_arrays[my_arrays.length - 1];

            }

             for(let i=0;i<json.updates.length;i++){
                 reactThis.state.data.push(json.updates[i]);
             }

            reactThis.setState({
            images : reactThis.state.images,
            loading : false,
            data : reactThis.state.data
        })

             //console.log(reactThis.state.data);

             //reactThis.ChangeUrl(null,'/photo.php?token='+reactThis.state.data[0].token);

		}};

		a.send("imgname="+img);



		return false;
  }

    ChangeUrl(page, url) {
        if (typeof (history.pushState) != "undefined") {
            var obj = {Page: page, Url: url};
            history.pushState(obj, obj.Page, obj.Url);
        } else {
            window.location.href = "homePage";
            // alert("Browser does not support HTML5.");
        }
    }

    componentDidMount (){


         this.getImages();

        let reactThis = this;

        /*
        socket.on('newcomment', function(datas) {

            let i = 0;

            let position = reactThis.state.data.map((el) => el.update_id).indexOf(datas.postid);


            if(position != -1){

                if(datas.response[i].type=="0"){

                    //console.log(reactThis.state.data[position]);



                    //let position2 = reactThis.state.data[position].comments.map((el) => el.comid).indexOf(datas.response[i].com_id);

                    let position2 = reactThis.state.data[position].comments.map((el) => el.com_id).indexOf(datas.postid)

                    if(position2 == -1){

                        reactThis.state.data[position].comments.push(datas.response[i]);
                        reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;

                    }

                }
                else {

                    let position3 = reactThis.state.data[position].comments.map((el) => el.com_id).indexOf(datas.postid)

                    if(position3 == -1){
                        reactThis.state.data[position].comments.push(datas.response[i]);
                    }

                    let position4 = reactThis.state.data[position].anonymouscomment.map((el) => el.com_id).indexOf(datas.response[i].com_id);

                    if(position4 == -1){

                        reactThis.state.data[position].anonymouscomment.push(datas.response[i]);

                    }

                    reactThis.state.data[position].comments.commentCount = reactThis.state.data[position].comments.commentCount + 1;


                    //reactThis.state.data[position].anonymouscomment.unshift(datas.response[i]);
                }

                if(document.getElementById("posxl_"+datas.postid)!=null) {

                    document.getElementById("posxl_" + datas.postid).click();

                }

            }

        });*/



    }

    getIndex(val) {
        for (var i = 0; i < this.state.images.length; i++) {
                if (this.state.images[i] === val) {
                    return i;
                }
        }
    }

    template (){


        if(this.state.loading){

            return  (<Loading/>)

        }

        else{

            let index = this.getIndex(this.props.imgName);

            return (<Imageview  attachArea={this.attachArea} triggering=""  activeIndex={Math.round(index+1)} openmodal="" click={false} items={this.state.images} key={Math.random()}/>)

        }
    }

    handleClickOutside(){
        this.props.removemodal();
    }


    attachArea (faces){

        this.state.area.push(faces);

        this.setState({
            area : faces
        })

    }




    setMyareas(areas){

        this.state.area.length = 0;
        this.state.area = areas;

        this.setState({
            area: this.state.area
        })

    }


    boxArea (){


        if(!this.state.loading) {

            const listItems = this.state.area.map((item) => {
                return <FacedetectArea key={Math.random()} item={item}/>
            });

            return listItems;

        }

        else{
            return null
        }




    }

    Postdetails (){
        if(this.state.loading){
            $(document.body).css({'cursor' : 'wait'});
            return  (<Loading/>)
        }
        else{
            $(document.body).css({'cursor' : 'default'});
            const items = this.state.data;


            return (
                <div>

                    <div className="pop-modal-content">
                        <div className="pop-box">
                            <div className="slideshow-container">

                                {this.boxArea()}


                                <div id="ic_con">

                                    {this.template()}

                                </div>


                            </div>
                        </div>

                        <div className="pop-com-text" id="posty">

                            {<PostforModal data={items}/>}

                        </div>

                    </div>


                    <button onClick={this.handleClickOutside} className="pop-modalclose"><i className="icon icon-multiply"></i></button>

                </div>

            )
        }
    }


    render (){

        return this.Postdetails()


    }

}