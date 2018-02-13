import React,{Component} from "react";
import ReactDOM from 'react-dom';
import ToolTip from 'react-portal-tooltip'



export default class Tooltiptag extends Component{


	constructor(props){
        super(props);


        this.state = {
        	isTooltipActive: false,
        	data : this.props.data
        }

    }

    showTooltip() {
        

        this.setState({isTooltipActive: true})
   
    }
    hideTooltip() {
        
         this.setState({isTooltipActive: false})
    }

    tag (e){
		return {__html: e};
	}


    show_other_tagged_people(update){

      if(update.extra_tag.length > 0){

        return (

             <ToolTip active={this.state.isTooltipActive} position="top" arrow="center" parent={"#psl"+update.update_id}>
                    <div dangerouslySetInnerHTML={this.tag(update.extra_tag)}>
                        
                    </div>
       </ToolTip>


          )

      }

     

    }

    


    render(){

    	let update = this.state.data;


    	return(

    		<div>
    			<div id={"psl"+update.update_id} onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}> 
    				<h4 dangerouslySetInnerHTML={this.tag(update.tag)}></h4>
            	</div>
            	{this.show_other_tagged_people(update)}
            </div>

    	)


    }
    


}