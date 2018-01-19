import React,{Component} from "react"

export default class Taggeduser extends Component{


    constructor(props){
        super(props);

    }

    removeTag (el){
        this.props.removeTag(el.id)
    }


    render (){

        const items = this.props.items;


        const item = items.map((el) => {

            return (
                <div className="tag" key={Math.random()}>
                    <span>{el.name}</span>
                    <button className="remove" onClick={this.removeTag.bind(this,el)}></button>
                </div>
            )

        });

        return (<div>{item}</div>)

    }

}