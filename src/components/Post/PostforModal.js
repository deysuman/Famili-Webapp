import React,{Component} from "react";
import PostAdapter from "./PostAdapter";
import {URLS} from "../../constants/api";
import Ajax from "../../lib/ajax";
import Modal from "../PostModal/Modal"
import PostAdapterforModal from "./PostAdapterforModal";


export default class PostforModal extends Component{

    constructor(props) {
      super(props);
      this.state = {
          data: this.props.data,
          postModal : false,
          imgName : ''
      }
  }

  templateModal (){
        if(this.state.postModal) {
            return(<Modal imgName={this.state.imgName}/>)
        }
        else{
            return null
        }
  }

  changeModallistener(item){
      this.setState({
          postModal : true,
          imgName : item
      })
  }



	render(){

     const path = window.location.pathname.toLowerCase();
     const page = path.split("/").pop();
     const lclass = (page=="search") ? 'profile-search-post-container' : '';

     const items = this.state.data;
     const item = items.map((item) => {return <PostAdapterforModal openmodal={this.changeModallistener.bind(this)} value={item} key={Math.random()}/>});
		return (
		    <div>

                {item}

            </div>);

	}







}