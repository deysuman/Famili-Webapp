import CommentReadmore from "./CommentReadmore"
import ImageDevider from "./ImageDevider";

export function CommentHtmlparser(text,type,images) {


        if (type == "0") {

                text.replace(/[\r\n]+/g, '\n');
                text.replace(/[\r\n]+/g, '\n\n');
                let finalText = text.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace('&nbsp;', ' &nbsp;')
                    .replace(/\n/g, "<br />");
                let urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
                let hashpatten = /\#([A-Za-z0-9\_-]+)/i;
                let mention = /\@([A-Za-z0-9\_-]+)/i;
                let htmlData = finalText
                    .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
                    .replace(hashpatten, '<a target="_blank" href="$&">$&</a>')
                    .replace(mention, '<a target="_blank" href="$&">$&</a>')
                    .replace(/\n/g, "<br />");
                htmlData = CommentReadmore(htmlData);

                return htmlData

        }

        else if (type == 1 && images !== null) {

            if (images == null || images == "") {
                return ''
            } else {

                let data = ImageDevider(images);
                return data.toString().replace(",", "");
            }
        }


}

export default CommentHtmlparser