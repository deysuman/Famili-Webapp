import React,{Component} from 'react';
import GifPlayerContainer from "./GifConPlayer"
import { DefaultPlayer as Video } from 'react-html5video';
import Videopreview from "../Videoplayer/Videopreview"
import Modal from "../PostModal/Modal"
import MyVideoPlayer from "../Videoplayer/Videoconnect"
import MediaPlayer from "../Videoplayer/MediaPlayer";
import plyr from 'plyr';
import $ from 'jquery'
import faceDetection from 'jquery-facedetection'
faceDetection($)

let ic = 0;

export default class Imageview extends React.PureComponent{

    constructor(props){
        super(props);

        this.state = {
            slider: props.items,
            activeIndex: props.activeIndex,
            left: 0,
            click : props.click,
            data : [],
            isModal : false

        }

        this.prevSlide = this.prevSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.clickIndicator = this.clickIndicator.bind(this);
        //this.openmodal = this.openmodal.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.videoUpdate = this.videoUpdate.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState){

       /* console.log(this.state);
        console.log(nextState);*/

        if(this.props.items.activeIndex !== nextProps.items.activeIndex){
            return true;
        } 
        
        if (this.props.items !== nextProps.items) {
             return false;
         }

         if (this.state.activeIndex !== nextState.activeIndex)
          {
            return true;
          }




                
        return false;
    }


    videoUpdate(value){
        this.props.updateTime(value);
    }






    faceDetectionIntit (){
        let reactThis = this;

        if(!this.state.click) {

            $('.mySlides2 img').faceDetection({

                complete: function (faces) {

                    if(ic < 1) {

                        reactThis.props.attachArea(faces);
                    }
                    ic++;

                }
            });

        }
    }



    prevSlide () {

        let f = this.state.activeIndex - 1;

        this.setState({
          activeIndex: this.state.activeIndex - 1,

        })
         

        if (this.state.activeIndex === 1) {

            f = this.state.activeIndex + this.state.slider.length - 1;

          this.setState({
            activeIndex: this.state.activeIndex + this.state.slider.length - 1,

          })

             
        }

        this.props.upindex(f);

        this.faceDetectionIntit();


    }




    nextSlide () {


       
        let f = this.state.activeIndex + 1;

        //console.log("Current Imageview " + this.state.activeIndex);

        this.setState({
          activeIndex: this.state.activeIndex + 1,

        })
         
         

        if (this.state.activeIndex === this.state.slider.length) {

            f = this.state.activeIndex - this.state.slider.length + 1;

          this.setState({
            activeIndex: this.state.activeIndex - this.state.slider.length + 1,

          })

          

        }


        this.props.upindex(f);


        // console.log("Now Imageview " + this.state.activeIndex);


        

       // this.faceDetectionIntit();
    }

    clickIndicator (e) {
        this.setState({
          activeIndex: parseInt(e.target.textContent),

        })
    }

    prev (){
        if(this.state.slider.length > 1){
            return <button className="prev-button" onClick={this.prevSlide}></button>
        }
    }

    next (){
        if(this.state.slider.length > 1) {
            return <button className="next-button" onClick={this.nextSlide}></button>
        }
    }

    openmodal (item){

       this.props.openmodal(item);
      // console.log(item);

    }




    template (item){
        const gh = Math.random();
        console.log(gh);

        let Extension = item.substring(item.lastIndexOf('.') + 1).toLowerCase();

        if(Extension == "gif" || Extension == "png" || Extension == "bmp"   || Extension == "jpeg" || Extension == "jpg"){

            if(item.toString().match(/.(gif)$/i)){

				let imgjpg = item.replace("gif","jpg");

				return (<GifPlayerContainer gif={item} still={imgjpg} />)

			}

			else{
                if(this.state.click == true) {

                    let style = {
                        cursor : 'pointer'
                    }

                    return <img style={style} onClick={this.openmodal.bind(this,item)} src={item}/>
                }
                else {
                    return <img src={item}/>
                }
            }

        }

        else if(Extension == "mp4" || Extension == "mpg" || Extension == "avi" || Extension == "m4v" || Extension == "3gp"){

           // return (<video src={item}></video>)

           const videoJsOptions = {
                autoplay: false,
                controls: true,
                sources: [{
                  src: item,
                 type: 'video/mp4'
                }]
            }

            return <MediaPlayer { ...videoJsOptions } />

            //return (<Videopreview source={item} />)

        }



    }

    componentDidMount(){
       // plyr.setup();

        let reactThis = this;

        this.faceDetectionIntit();

        $(window).resize(function(){

        });

        if(this.state.click == false) {
            if(this.state.slider.length > 1) {

                window.addEventListener("keydown", this.handleKeyPress, false);

            }

           // window.addEventListener("keydown", this.handleKeyPress, false);
        }

         //this.props.upindex(this.state.activeIndex);
    }


    componentWillUnmount(){
        let reactThis = this;

        if(this.state.click == false) {
            if(this.state.slider.length > 1) {

                window.addEventListener("keydown", this.handleKeyPress, false);

            }

            // window.addEventListener("keydown", this.handleKeyPress, false);
        }
    }







    handleKeyPress = (event) => {
        if(event.keyCode  === 37){
            $('.pop-modal-content .prev-button').click();
            
        }

        else if(event.keyCode === 39){
            $('.pop-modal-content .next-button').click();
        }
    }



    render () {



        let style = {
          width: this.props.sliderWidth,
          height: this.props.sliderHeight
        };

        let newclass = (this.state.click) ? ' ' : ' mySlides2';

        return (
          <div key={Math.random()}>
            <div  className="slider-wrapper">

                <ul className="slider">
            {
                this.state.slider.map(function(item,index) {


              return (

              <li key={Math.random()} style={style} className={index+1 === this.state.activeIndex ? this.state.click ? 'slider-item' : 'slider-item cv mySlides2' : 'hide'}>

                  {this.template(item)}

              </li>

              )
            },this)
            }
            </ul>
            </div>
            <div className="buttons-wrapper">

                {this.prev()}
                {this.next()}

            </div>

          </div>
        );
     }


     




}

Imageview.defaultProps = {
      items: [],
      activeIndex: 1,
      click: true,
      data: [],
      isModal: false,
     
}