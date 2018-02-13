import React,{Component} from "react";
import PostAdapter from "./PostAdapter";
import {URLS} from "../../constants/api";
import Ajax from "../../lib/ajax";
import Modal from "../PostModal/Modal";
import {updatetime} from "../../helper/Postbox/Postbox";
import swal from 'sweetalert';


export default class Post extends Component{

    constructor(props) {
      super(props);
      this.state = {
          data: this.props.data,
          postModal : false,
          imgName : '',
          actions : true
      }
      this.hidePopUp = this.hidePopUp.bind(this);
      this.upddatestate = this.upddatestate.bind(this);
  }

    hidePopUp (){

        this.setState ({

            postModal : false

        })

    }


    upddatestate(){
        console.log("suman")
        this.forceUpdate();
    }




  templateModal (){

        if(this.state.postModal) {
            document.body.style.overflowY = "hidden"
            return(<Modal actionS={this.state.actions} hidePopup={this.hidePopUp} imgName={this.state.imgName}/>)
        }
        else{
            document.body.style.overflowY = "auto"
            return null
        }
  }

  changeModallistener(item){
      this.setState({
          postModal : true,
          imgName : item,
          actions : true
      })
  }

    componentDidMount(){


        $(document).ready(function()
        {

            /*$( ".post-option-btn").each(function(index,elem) {
                elem.click(function () {

                    //$(this).parents(".post-option-btn-container").children(".post-drop-popup").toggle();

                    $(this)
                        .addClass("open")
                        .parent().find('.post-drop-popup').fadeToggle(300);


                    return false;
                });

            });*/


            $(".post-option-btn").each(function(){
                $(this).click(function(){

                    console.log($(this).parent().find('.post-drop-popup').css("display"));

                    if($(this).parent().find('.post-drop-popup').is(':visible')){
                        $(this).parent().find('.post-drop-popup').fadeIn();
                        // return false;
                    }
                    else{
                        // $(this).parent().find('.post-drop-popup').css("display","none");
                        return false;
                    }
                });
            });


//Document Click hiding the popup
            /* $(document).click(function()
             {
                 $("#notificationContainer").hide();
             });
 */
//Popup on click
            /*$("#notificationContainer").click(function()
            {
                return false;
            });*/

        });

    }


	render(){

     const path = window.location.pathname.toLowerCase();
     const page = path.split("/").pop();
     const lclass = (page=="search") ? 'profile-search-post-container' : '';

     const items = this.state.data;
     const item = items.map((item) => {return <PostAdapter upgrade={this.upddatestate.bind(this)} openmodal={this.changeModallistener.bind(this)} removePost={this.removePost.bind(this)} value={item} key={Math.random()}/>});
		return (
		    <div className={lclass}>
                {item}
                {this.templateModal()}
            </div>);

	}

	removePost (e){

	    e.preventDefault();
        let updateIndex = e.target.getAttribute('data-value');


        let update_id = e.target.getAttribute('data');

        const newState = this.state.data;
        let data = 'postid=' + update_id;
        let reactThis = this;;

        let array = this.state.data;
        let index = array.indexOf(updateIndex);

        let position = array.map((el) => el.update_id).indexOf(updateIndex);

        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this post",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).
            then(willDelete => {

              if (willDelete) {
                array.splice(position, 1);
                reactThis.setState({
                    data: array
                });

                Ajax(URLS.DELETE_POST, data, reactThis, function(data) {


                });

                swal("Deleted!", "Your post has been deleted.", "success");

                updatetime();
              }
            });




    }








}