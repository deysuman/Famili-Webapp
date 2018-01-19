import React,{Component} from "react";

export default class Tagadapter extends Component{
    constructor(props){
        super(props);

        this.state = {
            people : this.props.people
        }

        //this.Addtag = this.Addtag.bind(this);

    }

    Addtag (l){
        this.props.addTag(l.id,l.name)
    }



    render (){
        const people= this.state.people;
        return (<div onClick={this.Addtag.bind(this,people)} className="li">
                <div className="thumb">
                    <span>
                        <i>

                        </i>
                    </span>
                    <span>
                        {people.name}
                    </span>
                </div>
            </div>)
    }

}