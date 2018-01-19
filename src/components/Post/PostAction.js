import React,{Component} from "react";
import ReactDOM from 'react-dom';
import DropdownMenu from 'react-dd-menu';



export default class PostAction extends Component{


	constructor(props){
    super(props);
    
    this.state = {

    	update : this.props.update ,       
        isMenuOpen: false,
            
    }
	  
    this.click = this.click.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.action = this.action.bind(this);

  }

  toggle() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

   close() {
        this.setState({ isMenuOpen: false });
    }

   click() {
        //console.log('You clicked an item');
    }



   action (){
   		return this.props.showlayout();
   }




  template (){

  		let update = this.state.update;

  		const menuOptions = {

            isOpen: this.state.isMenuOpen,
            close: this.close,
            toggle:
				<div className="post-option-btn" onClick={this.toggle} id={"React_edit_c"+update.update_id} >

					<img src="assets/img/option-dropdown.png" alt=""/>

				</div>

            ,
            align: 'right'
        };

        return (<DropdownMenu {...menuOptions}>
					<div className="post-drop-popup" id={"React-edit"+update.update_id}>
						<div className="post-drop-pop">
							{this.action()}
						</div>
					</div>
				</DropdownMenu>);


  }


  render (){

  		return this.template()

  }


}