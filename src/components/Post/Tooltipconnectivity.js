import React,{Component} from "react";
import ReactDOM from 'react-dom';
import ToolTip from 'react-portal-tooltip'



export default class Tooltipconnectivity extends Component{


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

      if(update.extra_user_connectivity.length > 0){

        return (

             <ToolTip active={this.state.isTooltipActive} position="top" arrow="center" parent={"#ps"+update.update_id}>
                    <div dangerouslySetInnerHTML={this.tag(update.extra_user_connectivity)}>
                        
                    </div>
       </ToolTip>


          )

      }

     

    }

    


    render(){

    	let update = this.state.data;


    	return(

    		<div>
    			<div id={"ps"+update.update_id} onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}> 
    				<p dangerouslySetInnerHTML={this.tag(update.recenttext)}></p>
            	</div>
            	{this.show_other_tagged_people(update)}
            </div>

    	)


    }
    


}