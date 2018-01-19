

export  function ImageDevider(data){
    if(data!=""||data!=null||data.length>0){

        var htmldata= new Array();

        var str_array = data.split(',');

        for(var i = 0; i < str_array.length; i++) {

            str_array[i] = str_array[i]

                .replace(/^\s*/, "")

                .replace(/\s*$/, "");

            htmldata.push('<img draggable="true" src="'+str_array[i]+'" alt=""></img>');
        }

        return htmldata;

    }
}

export default ImageDevider