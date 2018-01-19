import React,{Component} from "react";
import ReactDOM from 'react-dom';
import DropdownMenu from 'react-dd-menu';



export default class Privacyopt extends Component{


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
            toggle: <div>
            <a className="drop_popip" onClick={this.toggle}>
              <i className="privacy_selection_menu icon icon-security"/>
              <span id={"privacy_"+update.update_id}>{update.postprivacy}</span>
            </a>
      </div>
      ,
            align: 'right'
        };

    return (<DropdownMenu {...menuOptions}>
      {this.action()}
    </DropdownMenu>);

  }


  render (){

  		return this.template()

  }


}