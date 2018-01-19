import Togglereadmore from "../helper/Togglereadmore";
let showChar = 120;
let ellipsestext = "...";
let moretext = "Read more";
let lesstext = "Show less";

export function CommentReadmore(data){
    let content = data;
    if(content.length > showChar) {
        let c = content
            .substr(0, showChar);
        let h = content
            .substr(showChar, content.length - showChar);
        const html = c + '' +
            '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span>' +
            '<span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;' +
            '<a  class="morelink">' + moretext + '</a></span>';
        data = html;
    };
    return data
}

export default CommentReadmore