import React,{Component} from "react";
import PeoplesAdapter from "./PeoplesAdapter";


export default class People extends Component{
	constructor(props){
    super(props);
    this.state = {
      data:this.props.data
    }

  }

	render(){

		console.log("Here is problem")

		const items = this.state.data;
		const item = items.map((item) => {return <PeoplesAdapter value={item} key={Math.random()}/>});
		return (
			<div className="challenge-list-container">
				{item}
			</div>);

	}



}