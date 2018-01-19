import React,{Component} from 'react';
import Postmodal from "./Postmodal";
import Modalcontent from "./Modalcontent";
import {URLS} from "../../constants/api"
import {ajaxObj,ajaxReturn} from "../../lib/ajax"

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalActive: true,
      isModalAppendable: true
    };
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.unmountModal = this.unmountModal.bind(this);
  }

  activateModal(){
    this.setState({
      isModalActive: true
    });
  }


  deactivateModal(){

    this.props.hidePopup();


  }


  unmountModal(){
    this.setState({
      isModalActive: false,
      isModalAppendable: false
    });
  }


  render(){

    //console.log(this.props.actionS);

    //this ugly hunk of trash determines if we should unmount the component by returning the right things
    let modal = this.state.isModalAppendable
      ? (<Postmodal isActive={this.state.isModalActive} closeModal={this.deactivateModal}>
            {<Modalcontent imgName={this.props.imgName} removemodal={this.deactivateModal}/>}
         </Postmodal>)
      : null;
    let newmodal = this.state.isModalActive ? modal : null;
    return newmodal;
  }


}