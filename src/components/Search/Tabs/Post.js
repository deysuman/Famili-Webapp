import React,{Component} from "react";
import Post from "../../Post/Post";



export default class Postsearch extends Component{
  constructor(props) {
      super(props);
      this.state = {
          data: this.props.data
      }
  }
	render(){

        const items = this.state.data;
		return (<div className="allposts"><Post data={items}/></div>);

	}



}