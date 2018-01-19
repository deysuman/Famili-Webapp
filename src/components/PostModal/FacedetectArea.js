import React,{Component} from 'react';

export default class FacedetectArea extends Component{
    constructor(props){
        super(props);
    }

    getPercentWidth(pixels){

        let screenWidth = window.screen.width;
        let percentage =  (pixels / $(window).width())*100;

        return percentage;

    }

    getPercentHeight(pixels){

        let screenWidth = window.screen.width;
        let percentage =  (pixels / $(window).height())*100;

        return percentage;

    }

    componentDidMount(){

    }

    getOffsetPercent(pixel){

        return (pixel / $(".slideshow-container").width())*100;

    }


    render (){

        let img = new Image();
        img.onload = function() {
            
        }
        let n = $(".cv").find('img').attr("src");

        img.src = n;



        const item = this.props.item;

        let pixels = 100;

        let reactThis = this;

        let off = $('.cv img').offset();

        let pos = $('.cv img').position();

        let off_i = $('.pop-modal').offset();

        let topY = this.getPercentHeight(item.offsetY - 40) / 2;

        let style = {
            left : this.getPercentWidth(item.offsetX) +'%',
            top : topY +'%',
            display : 'none',
            width : reactThis.getOffsetPercent(item.width)+'%',
            height : reactThis.getOffsetPercent(item.height + 20)+'%'
        }
   return (
                <div style={style} className="image-tag-box">
            	<div className="image-tag"></div>
                <div className="image-tag-list">
                <div className="image-tag-border"></div>
            	<input type="text" className="inputtext textInput" name="user_name" aria-label="Type any name"/>
                    <div className="friends-tag-list">

                	</div>


                </div>
            </div>
        )
    }

}