import React,{Component} from "react";
import ReactDOM from 'react-dom';
import Autoexpend from "../../../lib/Autoexpend";
let EmojiPicker = require('emojione-picker');


export default class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state ={
            user_comment: '',
            user_photo: '',
            file: '',
            imagePreviewUrl: ''
        }

        this.commentChange=this.commentChange.bind(this);
        this.handleTest=this.handleTest.bind(this);
        this.commentSubmit=this.commentSubmit.bind(this);
        this.getimage=this.getimage.bind(this);

    }

    commentChange (event){
        this.setState({
            user_comment: event.target.value
        });
    }

      _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                user_photo: reader.result

            });
        }

        ReactDOM.findDOMNode(this.refs.postimgs).classList.remove("none");
        ReactDOM.findDOMNode(this.refs.commentInput).focus();

        reader.readAsDataURL(file)
    }

    commentSubmit (e){
          e.preventDefault();
          let user_comment= this.state.user_comment;
          let user_photo = this.state.user_photo;
          let inputComment = this.refs.commentInput.value
          if(inputComment.trim() === "" && !user_photo)
          {
              //swal('Error','Comment should not be blank','error');
              return false;
          }
          else
          {
              this.props.onCommentSubmit({ user_comment: user_comment,  user_photo :  user_photo});
              this.setState({ user_comment:'', user_photo : '',imagePreviewUrl : ''});
              ReactDOM.findDOMNode(this.refs.commentInput).value="";
              ReactDOM.findDOMNode(this.refs.postimgs).classList.add("none");
              $(ReactDOM.findDOMNode(this.refs.commentInput)).val('').blur();
          }
  }

  getimage (){
	  ReactDOM.findDOMNode(this.refs.postimg).click();
  }

  componentDidMount (){

      Autoexpend(".post-comment-section-edit");



  }

  handleTest (e) {
	 if (e.keyCode == 13 && !e.shiftKey) {
		 ReactDOM.findDOMNode(this.refs.commonfrom).click();
	 }

	 else{
		 return false;
	 }

  }

  render (){

	  let {imagePreviewUrl} = this.state;
	  let $imagePreview = null;
      if (imagePreviewUrl) {
          $imagePreview = (<img className="img_t" src={imagePreviewUrl} />);
      }

      else {
          $imagePreview = ('');
      }

      return(
      <div className="post-comment-section">
          <form  onSubmit={this.commentSubmit} >
              <textarea  className="post-comment-section-edit"
                onKeyPress={this.handleTest}
                onKeyUp={this.handleTest}
                onChange={this.commentChange}
                value={this.state.user_comment}
                onKeyDown={this.handleTest}
                ref="commentInput"
                data-text="Whats on your mind?"
                placeholder="Type Comments"/>


                    <div className="gym_LL">
                         <i id="test_click" onClick={this.getimage} className="icon icon-camera"/>
                             <input type="file" ref="postimg" accept="image/*" onChange={(e)=>this._handleImageChange(e)}/>
                                <div className="image-preview none" ref="postimgs"> {$imagePreview} </div>
                    </div>
              <input  type="submit" ref="commonfrom" value="Comment" className="commentSubmit"/>
              </form>


      </div>
      )
  }
}