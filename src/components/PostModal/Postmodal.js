import React,{Component} from 'react';
import Loading from "../loading/loading"
import ReactDOM from 'react-dom';
import Ajax from "../../lib/ajax"

export default class Postmodal extends Component{

    constructor(...args){
        super(...args);
        this.handleClickInside = this.handleClickInside.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

   componentDidMount(){
    this.modal = document.createElement('div');
    this.modal.id = "pop-modal";
    this.modal.className = "pop-modal";
    document.body.appendChild(this.modal);
    this.renderModalContent(this.props);
    document.getElementById("pop-modal").style.display = "block";
  }


  componentWillReceiveProps(newProps){
    this.renderModalContent(newProps);
  }

  componentWillUnmount(){
    ReactDOM.unmountComponentAtNode(this.modal);
    document.body.removeChild(this.modal);
  }
  handleClickInside(e){
    e.stopPropagation();
  }

  handleClickOutside(){
    this.props.closeModal();
  }




  renderModalContent(props){
    //put something in the appended shit
    let cont;
    ReactDOM.render(

            this.props.children
    ,
      this.modal
    );
    cont = document.getElementById('modal-container');

  }
  render(){
    //don't render anything here because we are appending to the body portal style ahhhh yissssss
    return null;
  }

}