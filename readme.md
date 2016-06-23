Image-Animation
===============

#### Javascript Image Animation

This Class provides a way to realize the animation by images.

### Usage
```html
<img id="container" src="http://img.alibaba.com/images/cms/upload/wholesale/home_banner/2014/03/14_movie/2014312144850001.png">
<script>
$(document).ready(function() {
    var param = {
        frameMultiple: 5,//帧数倍 16.7ms * n
        loopPlayTimes: 2,//循环播放次数
        progress: 60000,//总播放时间
        pause: 1000,//播放完成后暂停时间
        prefix: 'http://img.alibaba.com/images/cms/upload/wholesale/home_banner/2014/03/14_movie/',
        current: 2014312144850001,//从第几张开始播放
        start: 2014312144850001,//开始播放的图片
        end: 2014312144850100,//结束播放的图片
        suffix: '.png'
    };
    new ImageAnimation('container', param);
});
</script>
```

### params

- *frameMultiple* Multiple frame 帧数倍
- *loopPlayTimes* The number of loops 循环播放次数
- *progress* Total play time 总播放时间
- *pause* After the completion of the broadcast suspended for a period of time 播放完成后暂停时间
- *prefix* Image url prefix 图片地址前缀
- *current* From which to begin playing 从第几张开始播放
- *start* Where an image to start playing 从哪一张图片开始播放
- *end* Play stopped at the end of which an image 结束播放时停在哪一张图片
- *suffix* Images suffix

### license
MIT