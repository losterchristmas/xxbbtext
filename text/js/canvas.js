function Starry() {
    let self = this;
    //构造函数(自己的私有属性)(把类代替)
    self.cxt = canvas.getContext('2d');//画笔 创建2d绘画环境
    self.num = 100;//生成粒子数量
    self.data = [];//存储粒子属性
}


Starry.prototype = {
    //初始化
    init: function () {
        let self = this;
        //设置宽高；
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        self.cW = window.innerWidth;
        self.cH = window.innerHeight;
        for (let i = 0; i < self.num; i++) {
            self.data[i] = {

                //随机位置
                x: Math.random() * self.cW,
                y: Math.random() * self.cH,
                //自定义增量
                cX: Math.random() * 0.6 - 0.3,
                cY: Math.random() * 0.6 - 0.3,
            }
            self.drawCircle(self.data[i].x, self.data[i].y);
        }
    },
    //绘画粒子
    drawCircle: function (x, y) {
        let cxt = this.cxt;
        cxt.save();//保存路径
        cxt.fillStyle = 'yellow'//填充颜色
        cxt.beginPath();//开始路径  
        cxt.arc(x, y, 1, 0, Math.PI * 2, true);//true决定顺时针渲染
        cxt.closePath();//闭合路径
        cxt.fill();//填充方法
        cxt.restore();//释放路径
    },
    //绘画粒子移动方向，消除历史位子
    moveCircle: function () {
        let self = this;

        //先清除前面绘制的粒子，再执行渲染
        self.cxt.clearRect(0, 0, self.cW, self.cH);
        for (let i = 0; i < self.num; i++) {

            self.data[i].x += self.data[i].cX;
            self.data[i].y += self.data[i].cY;
            //边界值判断
            if (self.data[i].x > self.cW || self.data[i].x < 0) {
                self.data[i].cX = - self.data[i].cX;
            }
            if (self.data[i].y > self.cH || self.data[i].y < 0) {
                self.data[i].cY = - self.data[i].cY;
            }
            self.drawCircle(self.data[i].x, self.data[i].y);
            //用勾股定理来判断是否连线

            for (let j = i + 1; j < self.num; j++) {
                if (Math.pow(self.data[i].x - self.data[j].x, 2) + Math.pow(self.data[i].y - self.data[j].y, 2) <= 70 * 70) {
                    self.drawLine(self.data[i].x, self.data[i].y, self.data[j].x, self.data[j].y);
                }
            }
        }
        // console.log(this.e);

        // self.MouseMove(this.e);
    },
    //绘制线条
    drawLine: function (x1, y1, x2, y2) {
        var cxt = this.cxt;
        var color = cxt.createLinearGradient(x1, y1, x2, y2);
        color.addColorStop(0, '#fff');
        color.addColorStop(0.5, '#fff');
        color.addColorStop(1, 'blue');
        cxt.save();//保存路径
        cxt.strokeStyle = color;
        cxt.beginPath();//开始路径  
        cxt.moveTo(x1, y1);//起点
        cxt.lineTo(x2, y2);//终点
        cxt.closePath();//闭合路径
        cxt.stroke();
        cxt.restore();//释放路径
    },
    //获取鼠标焦点
    MouseMove: function (e) {
        console.log(e);
    }
}
var starry = new Starry();//实例化对象（生成this）
starry.init();
setInterval(function () {
    starry.moveCircle();
}, 14)