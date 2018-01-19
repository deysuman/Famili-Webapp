import React from 'react';
import videojs from 'video.js';
//import 'videojs-contrib-ads';
import ads from  'videojs-contrib-ads/dist/videojs.ads.min.js';




export default class MediaPlayer extends React.Component {

   constructor(props){
    super(props);
    this.togglePlayback = this.togglePlayback.bind(this);
   }

  componentDidMount() {

    /*videojs.registerPlugin('examplePlugin', function() {
        this.ads();
    });*/


    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      //console.log('onPlayerReady', this)

       // this.ads(); // initialize the ad framework

       //this.examplePlugin();


    });


   /* this.player.examplePlugin({
      debug: true
     });*/
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }


  pausevideo(){
    this.player.pause();
  }


  setCookie (cname, cvalue, exdays) {
      
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }



  togglePlayback() {

   /* let reactThis = this;
    !this.player.on('playing', function() {*/
      //reactThis.pausevideo();
    //});

    //alert("Hi");
    /*if(!this.player.paused){
        reactThis.pausevideo();
    }*/

   /* if (!this.player.paused()) {
        this.player_.pause();
    } */

    this.player.on('playing', function() {



      });

  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {

    let num = Math.random();


    return (
      <div data-vjs-player> 
          <button id={num} onClick={this.togglePlayback} className="videostopbutton"></button>
        <video ref={ node => this.videoNode = node } className="video-js"></video>
      </div>
    )
  }
}