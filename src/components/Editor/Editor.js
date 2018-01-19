import React,{Component} from 'react';
import {ChangeFontSizePostBox,hash} from "../../helper/Postbox/Postbox"
import Ajax from "../../lib/ajax"
import {URLS} from "../../constants/api"
import "../../lib/Hashtag"
import "../../lib/Mention"
import "../../lib/Emoji"
let _ = require('underscore')

export default class Editor extends Component{
    constructor(props){
        super(props);

       this.state = {
            value : '',
            Tagusers : [],
            People : [],
            Taggedusers : []
        }
        this.changefontsize = this.changefontsize.bind(this);

    }

    changefontsize (){
        ChangeFontSizePostBox();
    }

    getAllusers (){
        let data = '';
        let reactThis = this;
        Ajax(URLS.TAGUSERS,data,this,function (data) {
            for(let i=0;i<data.length;i++){
                reactThis.state.Tagusers.unshift(data[i]);

            }
        });

        this.setState({
            Tagusers : this.state.Tagusers
        })

    }


     componentDidMount (){

         this.getAllusers();

         let reactThis = this;
         let objects = this.state.Tagusers;

        $("#editable-boss").emojioneArea({
            pickerPosition: "left",
            tonesStyle: "bullet",
            hidePickerOnBlur: false
        });

         window.setTimeout(function () {

             //$('.emojionearea-editor').on('paste', function() {console.log('text pasted!')})​

             $(".emojionearea-editor").hashtags();
             $(".emojionearea-editor").mentionsInput({
                 onDataRequest:function (mode, query, callback) {
                     let data = objects;
                     data = _.filter(data, function(item) { return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 });
                     callback.call(this, data);
                 }
             });
             jQuery(function($) {
                 $('.emojionearea-editor').on('keyup keydown', function() {
                     ChangeFontSizePostBox();
                     hash();
                 });

                 $(".emojionearea-editor").bind("paste", function(e){
                     // access the clipboard using the api


                     ChangeFontSizePostBox();
                     hash();


                 } );

                 $(document).mouseup(function(e)
                 {
                     let container = $(".emojionearea-picker");

                     // if the target of the click isn't the container nor a descendant of the container
                     if (!container.is(e.target)  && container.has(e.target).length === 0)
                     {
                         if($(".emojionearea-button").hasClass("active")){
                             $(".emojionearea-button").click();
                         }
                     }
                 });



             });
         },2000);





    }

    render (){

        return (
            <div onKeyPress={this.changefontsize}
                 onKeyUp={this.changefontsize}
                 onKeyDown={this.changefontsize}
                 contentEditable="true"
                 placeholder="Whats on your mind?"
                 spellCheck="false"
                 className="editable-boss edit_form_div"
                 id="editable-boss"
                 name="editable-boss"
                 type="hidden">
            </div>
        )

    }

}