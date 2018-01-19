import Togglereadmore from "../helper/Togglereadmore";

export function readmore(data, len) {
    let hashpatten = /(\S*#\[[^\]]+\])|(\S*#\S+)/g; ///(^|\s)(#[a-z\d-]+)/gi;

    let mention = /\@([A-Za-z0-9\_-]+)/i;
    let urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
    let showChar = 350;
    let ellipsestext = "...";
    let moretext = "Read more";
    let lesstext = "Show less";
    let content = data;
    if (len > showChar) {
        let c = content.substr(0, showChar);
        let h = content.substr(showChar, content.length - showChar);
        let html = c + '' +
            '<span class="moreellipses">' + ellipsestext
                .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
                .replace(hashpatten, helphashConvert)
                .replace(mention, '<a target="_blank" href="$&">$&</a>') + '&nbsp;</span>' +
            '<span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;' +
            '<a class="morelink">' + moretext + '</a></span>';
        data = html;
    } else {


        //let f = encodeURI(c);



        let html = data
            .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
            .replace(hashpatten, helphashConvert)
            .replace(/\n/g, "<br />");
        data = html;
    };
    return data
}

function ty() {
    alert()
}

function fy(x){
    return x.replace('#','')
}


function helphashConvert(str, p1, offset, s) {  

    console.log("My total arguments");
    console.log(arguments);
    return '<a target="_blank" onClick="hashtag" href="/search?hashtag=true&terms='+encodeURIComponent(str)+'">'+str+'</a>';
}


export default readmore