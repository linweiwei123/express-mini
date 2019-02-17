var a = {
    age: 2
};
var f = {
    getCount : function () {
        return 2;
    }
}

a = {
    __proto__: f
};

console.log(a);

console.log(a.getCount());
