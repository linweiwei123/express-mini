// pathname进行小写转换，并且去尾巴的 '/'
function pathFormat(route){
    route = route.toLowerCase();
    if(route.length >0 && route.lastIndexOf('/') === route.length - 1){
        route = route.substr(0, route.length-1);
    }
    return route
}

module.exports = {
    pathFormat
};