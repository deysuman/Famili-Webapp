import React,{Component} from "react";

export default class Likelisting extends Component{

    render (){

        //window.detribut();

        var updates=this.props.likesdata.map(function(update,index)

        {



            return (<div key={Math.random()} className="about-right-mutual-list">
                <div className="about-right-mutual-list-image">
                    <img src={update.img} alt="" />
                </div>
                <div className="about-right-mutual-list-text ">
                    <h2>{update.fullname}</h2>
                    <p><a href="#" className="myBtn"><span>21</span>Mutual friends</a></p>
                </div>
                <div className="about-mutual-popt-button">
                    <a href="#">Intaration</a>
                </div>
            </div>)




        },this);

        return (<div className="default-modal-content"><div className="modal-inner-scroll">{updates}</div></div>)

    }

}