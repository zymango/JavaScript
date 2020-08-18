$(function() {
    //1.全选  全不选功能
    //就是把全选按钮（checkall）状态赋值给三个小按钮（j-check）就可以了
    //事件可以使用change
    $(".checkall").change(function() {
        // console.log($(this).prop("checked"));
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            //让所有的商品添加  check-cart-item类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    //2.如果小复选框被选中的个数等于3  就应该把全选按钮选中， 否则全选按钮不选
    $(".j-checkbox").change(function() {
        //$(".j-checkbox").length是所有小复选框的个数
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            //让当前的商品添加  check-cart-item类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    //3.增减商品规模  首先声明一个变量 当我们点击+(increment)，就让这个值++  然后赋值给文本框
    $(".increment").click(function() {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        //4.计算小结模块  根据文本框的值  乘以  当前商品的价格  就是商品的小计
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        // console.log(p);
        //toFixed()方法：保留小数位
        var price = (p * n).toFixed(2); //保留两位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    $(".decrement").click(function() {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        if (n == 1) {
            return false;
        }
        n--;
        //4.计算小结模块  根据文本框的值  乘以  当前商品的价格  就是商品的小计
        $(this).siblings(".itxt").val(n);
        // var p = $(this).parent().parent().siblings(".p-price").html();简写成 $(this).parents(".p-num").siblings(".p-price").html();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        // console.log(p);
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    //5.用户修改文本框的值  计算小计模块
    $(".itxt").change(function() {
        //先得到文本框的值
        var n = $(this).val();
        //当前商品单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    //6.计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0; //计算总件数
        var money = 0; //计算总价钱
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            //去掉￥，转换成浮点型
            money += parseFloat($(ele).text().substr(1));
        });
        //保留两位小数
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    //7.删除商品模块

    //(1).商品后面的删除按钮
    $(".p-action a").click(function() {
        //删除的是当前商品
        $(this).parents(".cart-item").remove();
        getSum();
    })

    //(2).删除选中的商品
    $(".remove-batch").click(function() {
        //删除的是小的复选框选中的按钮
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })

    //(3)清空购物车  删除全部商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    })


})