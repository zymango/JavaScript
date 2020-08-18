var that;
class Tab {
    constructor(id) {
        //获取元素
        that = this;
        this.main = document.querySelector(id);
        // this.lis = this.main.querySelectorAll('li');
        // this.sections = this.main.querySelectorAll('section');
        this.add = this.main.querySelector('.tabadd');

        //li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
            this.updateNode();
            // init初始化操作让相关的元素绑定事件
            this.add.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
        }
        //由于新添加的li和section没有绑定事件 即没有更新li和section节点
    updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.remove = this.main.querySelectorAll('.icon-guanbi');
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');

        }
        //1.切换功能
    toggleTab() {
        // console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';

    }
    clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        //2.添加功能
    addTab() {
            //清除所有li和section
            that.clearClass();
            //(1)创建li元素和section元素
            var random = Math.random();
            var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
            var section = ' <section class="conactive">' + '测试 ' + random + '</section>';
            //(2)把这两个元素追加到对应的父元素里面

            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        //3.删除功能
    removeTab(e) {
            e.stopPropagation(); //阻止冒泡  
            var index = this.parentNode.index;
            //根据索引号删除对相应的li  和  section
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            //当我们删除的不是选中状态的li  的时候，原先的选中状态li保持不变
            if (document.querySelector('.liactive')) {
                return;
            }
            //当我们删除了选中状态的这个li时，让他的前一个li  处于选定状态
            index--;

            //手动调用点击事件  不需要鼠标触发
            that.lis[index] && that.lis[index].click();

        }
        //4.修改功能
    editTab() {
        // alert(11);
        //双击禁止选中文字
        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty();
        this.innerHTML = '<input type = "text"/>';
        var input = this.children[0];
        input.value = str;
        input.select(); //文本框文字全部选中状态
        //当我们离开文本框  就把文本框的值给span
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        };
        //按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                //手动调用表单失去焦点  不需要鼠标离开操作
                this.blur();
            }
        }
    }
}


var tab = new Tab("#tab");
// tab.init();