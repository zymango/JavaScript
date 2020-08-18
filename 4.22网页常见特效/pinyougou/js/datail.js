window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    //当我们鼠标经过preview_img就显示和隐藏mask遮挡层和big大盒子
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';

    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';

    })
    preview_img.addEventListener('mousemove', function(e) {
        //(1).先计算鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        //(2)减去盒子高度的一半
        //(3)我们 mask移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //(4)如果x坐标小于等于 0 就让它停在0
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        //因为mask盒子是正方形 所以  maskX = maskY
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离/遮挡层最大移动距离
        var bigImg = document.querySelector('.bigImg');
        // console.log(bigImg);

        //大图片最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        //大图片的移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})