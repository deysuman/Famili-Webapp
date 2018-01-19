import React,{Component} from "react"


export default class Peoplelist extends Component{


        constructor(props){
            super(props);
        }


        render (){

            let values = this.props.value;

            return (
                <div className="peoples accepted" title={values.name} data-attributr={values}>
                    <i></i>
                    <img src={values.avatar} alt="user_img"/>
                </div>
            )
        }


}