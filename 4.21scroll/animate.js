function animate(obj, target, callBack) {
    //当我们不断点击按钮,这个元素速度会越来越快
    //解决方案就是让我们元素只有一个定时器执行
    //先清除以前的定时器  只保留当前一个定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        //步长值写到定时器的里面
        //把步长值改为整数  不要出现小数问题
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        if (obj.offsetLeft == target) {
            //停止动画本质是停止定时器
            clearInterval(obj.timer);
            //回调函数写到定时器结束里面
            if (callBack) {
                callBack();
            }
        }
        //把每次加1  这个步长改为一个慢慢变小的值  步长公式:(目标值 - 现在的位置) /10
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30);
}