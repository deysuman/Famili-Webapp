import Readmore from "./Readmore"


let urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
let hashpatten = /(^|\s)(#[a-z\d-]+)/gi;;
let mention = /\@([A-Za-z0-9\_-]+)/i;


export function Htmlparser(text,type,images,divid,textlength) {



    if (type == "0") {
        let finalText = text.replace(/&/g, '&amp;').replace('&nbsp;', ' &nbsp;');
        let htmlData = finalText;


        htmlData = Readmore(htmlData, textlength);


        if(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(text)){
            return htmlData;
        }

        else{
            if (textlength < 181) {
                return '<span class="bigtext">' + htmlData + '</span>';
            } else {
                return htmlData;
            }
        }



    } else if (type == 1 && images != null && images != "") {

        String.prototype.contains = String.prototype.contains || function(str) {
            return this.indexOf(str) >= 0;
        }


        if(images.contains(',')) {

            let str_array = images.split(',');

            if (str_array.length > 1) {
                return '';//newSlider(images, divid);

            } else {
                let Extension = images.toString()
                    .replace(",", "")
                    .substring(images
                        .toString()
                        .replace(",", "")
                        .lastIndexOf('.') + 1)
                    .toLowerCase();
                if (Extension == "gif"
                    || Extension == "png"
                    || Extension == "bmp"
                    || Extension == "jpeg"
                    || Extension == "jpg") {

                    if (images.toString().replace(",", "").match(/.(gif)$/i)) {

                        let imgpng = images
                            .toString()
                            .replace(",", "");

                        let imgjpg = imgpng
                            .replace("gif", "jpg");
                        let imggif = images
                            .toString()
                            .replace(",", "");

                        return '<img draggable="true"' +
                            ' onClick="modalcreate(this)"' +
                            ' class="gif"' +
                            ' data-gif="' + imggif + '"' +
                            ' src="' + imgjpg + '"></img>';
                    } else {
                        return '<img class="pop-open" ' +
                            'onClick="modalcreate(this)" ' +
                            'draggable="true" ' +
                            'src="' + images.toString().replace(",", "") + '">' +
                            '</img>';
                    }

                } else if (Extension == "mp4" || Extension == "mpg" || Extension == "avi" || Extension == "m4v") {
                    return '<video controls>' +
                        '<source ' +
                        'src="' + images.toString().replace(",", "") + '">' +
                        '</source>' +
                        '</video>';
                }


            }
        }
        else {
            return ''
        }
    }

    function validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }

}



export default Htmlparser