var debounce=(func,delay,args)=>{
    var timer = null;
    return function() {
        var context = this;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function() {
            func.apply(context, args);
            timer = null;
        }, delay);
    }
}
 

export default debounce;