import React,{Component} from 'react';



export default class Opengraph extends Component{


    constructor(props){
        super(props);
        this.state = {
            data : this.props.dataOpengraph
        }
    }



    template(){

            const x = this.state.data;

            //console.log()

         if(this.props.dataAttachment < 1){
            if(x.title == null && x.description == ""){
                console.log("ji")
                return null;
            }
            else if(x.images==""||x.images==null || x.images.length < 1){
                return (
                    <a href={x.url} target="_blank">
                    <div id="facebooksharer" className="hnj">

                <div id="facebookdetails">
                        <div className="biglinetitle">{x.title}</div>
                        <div className="m7">{x.description}</div>
                    </div>
                </div>
                </a>
                );
            }
            else{
                return (
                    <a href={x.url} target="_blank">
                            <div id="facebooksharer" className="hnj">

                            <div id="facebookthumb" className="loju">
                                <img src={x.images[0]}/>
                            </div>

                            <div id="facebookdetails">
                                <div className="biglinetitle">{x.title}</div>
                                <div className="m7">{x.description}</div>
                            </div>
                        </div>

                    </a>);
            }

        }

        else{
                return (
                <a href={x.url} target="_blank">
                    <div id="facebooksharer" className="hnj">
                        <div id="facebookdetails">
                            <div className="biglinetitle">{x.title}</div>
                            <div className="m7">{x.description}</div>
                        </div>
                    </div>
                </a>
                );

        }


    }


    render () {

        return this.template()

    }
}