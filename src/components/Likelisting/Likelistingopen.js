import React,{Component} from "react";
import Likelisting from "./Likelisting";

export default class Likelistingopen extends Component{


    constructor(props){
        super(props);

        this.closeModal = this.closeModal.bind(this);

    }


    closeModal(){
        document.getElementById("myModal").remove();
    }

    render (){
        return (
            <div id="myModal" onClick={this.closeModal} className="default-modal">
                <div className="default-modal-mu">

                    <Likelisting likesdata={this.props.likesdata}/>
                <button onClick={this.closeModal} className="default-modalclose">
                    <i className="icon icon-multiply"></i>
                </button>

                </div>
                
            </div>
        )
    }

}