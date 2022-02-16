$(function(){
    var title_color = "#94558D";
    var subtitle_color = "#44B78B";
    var font_color = "#A9B7C6"

    var cols_html = "<ul>";
    for(collection in collections){
        let cs = collections[collection];
        cols_html += "<li><div><span style=\"color:"+title_color+";\">"+collection+"</span><ul>";
        for(item in cs){
            cols_html += "<li><div><span style=\"color:"+subtitle_color+";\">"+item+"</span><ul>";
            let ci = cs[item];
            for(link in ci){
                let ci_link = ci[link];
                name = ci_link['name'];
                url = ci_link['url'];
                cols_html += "<li><a href=\""+url+"\" name=\""+name+"\" target=\"_blank\" style=\"color:"+font_color+";\">"+name+"</a></li>";
            }
            cols_html += "</ul></div></li>";
        }
        cols_html += "</ul></div></li>";
    }
    cols_html += "</ul>";
    document.getElementById("collections").innerHTML = cols_html;
});