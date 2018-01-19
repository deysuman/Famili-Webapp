import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import Ajax from "../../../lib/ajax";
import {URLS} from "../../../constants/api";
import CommentHtmlparser from "../../../lib/CommentHtmlparser"

export default class CommentEdit extends Component{
    constructor(props){

        super(props);

        this.state = {
            comid : this.props.dataId,
            user_comment: this.props.dataComment,
            commentID : ''
        }

        this.commentChange=this.commentChange.bind(this);
        this.handleTests=this.handleTests.bind(this);
    }





    commentChange (e){
		this.setState({
            user_comment: e.target.value
		});
    }

    commentAjaxSubmit () {
        //e.preventDefault();
        let update_id = this.state.comid;
        let reactThis = this;
        const data = 'commentid=' + update_id + '&posttext=' + reactThis.state.user_comment;
        document.getElementById("React-Comment_id_" + update_id).classList.add("none");
        $(document.getElementById("Edit_tool_" + update_id)).val('').blur();

        function decodeHTMLEntities(text) {
            let entities = [
                ['amp', '&'],
                ['apos', '\''],
                ['#x27', '\''],
                ['#x2F', '/'],
                ['#39', '\''],
                ['#47', '/'],
                ['lt', '<'],
                ['gt', '>'],
                ['nbsp', ' '],
                ['quot', '"']
            ];

            for (var i = 0, max = entities.length; i < max; ++i)
                text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);

            return text;
        }


        Ajax(URLS.EDITCOM, data, reactThis, function (data) {
            reactThis.props.editchange(data);
           // (document.getElementById("comment_edited" + update_id).classList.contains('none')) ? document.getElementById("comment_edited" + update_id).classList.remove('none') : '';
        });
    }

    handleTests (e){
            let update_id=this.state.comid;
            if (e.shiftKey && e.keyCode == 13) {
                return false;
            }
            else if(e.key === 'Enter' && e.key != 'Shift'){
                let user_comment = document.getElementById("Edit_tool_"+update_id).value.trim();
                if(user_comment != "" && this.state.user_comment.length > 0){
                    this.commentAjaxSubmit();
                }
                else{
                    ReactDOM.findDOMNode(this.refs.me).value="";
                    swal("Error", "Comment should no be blank", "error");
                }
                return false;
            }
            else if (e.key === 'Escape' || e.keyCode=== 27) {
                document.getElementById("React-Comment_id_"+update_id).classList.add("none");
                ReactDOM.findDOMNode(this.refs.me).value="";
            }
            return false;
    }

    render (){

		return (
		    <div className="hiddnetextarea none" ref="myele"  id={"React-Comment_id_"+this.state.comid}>
                <form>
                    <textarea ref="me"
                              id={"Edit_tool_"+this.state.comid}
                              onChange={this.commentChange}
                              value={this.state.user_comment}
                              onKeyUp={this.handleTests}
                              onKeyDown={this.handleTests}>

                    </textarea>
                </form>
                <div>
                    <p>Enter key press to save comment or Esc key press to cancel comment </p>
                </div>
            </div>

		)
	}



}