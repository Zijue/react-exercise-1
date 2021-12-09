export function loadMore(domElement: HTMLElement, callback: Function) {
    let lastTs = Date.now();
    function _loadMore() {
        console.log(Date.now() - lastTs);
        lastTs = Date.now();
        let clientHeight = domElement.clientHeight; //窗口的高度 px 667px - 220px / 2 = 557px
        let scrollTop = domElement.scrollTop; //向上卷去的高度
        let scrollHeight = domElement.scrollHeight;
        if (clientHeight + scrollTop + 10 /*加10px，避免滚动到底才发送请求*/ >= scrollHeight) {
            callback()
        }
    }
    domElement.addEventListener('scroll', debounce(_loadMore, 500)); //给容器绑定scroll事件
}
//防抖函数 -- 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
export function debounce(fn: Function, wait: number) {
    let $timeout: any;
    return function () {
        if ($timeout) clearTimeout($timeout);
        $timeout = setTimeout(fn, wait);
    }
}
//下拉刷新
export function downRefresh(domElement: HTMLElement, callback: Function) {
    let startY: number; //存放开始下拉时的纵坐标
    let distance: number; //本次下拉的总距离
    let originalTop: number = domElement.offsetTop; //最初的时候此元素距离顶部的距离 50px
    let startTop: number; //开始下拉的top值；初始时是50px，后续如果连续下拉，就不是50px
    let backTimer: any; //下拉回退优化定时器
    domElement.addEventListener('touchstart', function (event: TouchEvent) {
        let touchMove = throttle(_touchMove, 50);
        if (domElement.scrollTop === 0) { //如果此前的元素没有向上滚动才会进行下拉的逻辑处理
            if (backTimer) {
                clearInterval(backTimer);
                backTimer = null;
            }
            startTop = domElement.offsetTop; //第一次的都是50px
            startY = event.touches[0].pageY; //先记录点击时的Y坐标
            domElement.addEventListener('touchmove', touchMove);
            domElement.addEventListener('touchend', touchEnd);
        }

        function _touchMove(event: TouchEvent) {
            let pageY = event.touches[0].pageY; //获取最新的Y坐标
            if (pageY > startY) { //只处理下拉
                distance = pageY - startY;
                domElement.style.top = startTop + distance + 'px';
            } else {
                domElement.removeEventListener('touchmove', touchMove);
                domElement.removeEventListener('touchend', touchEnd);
            }
        }
        function touchEnd() {
            domElement.removeEventListener('touchmove', touchMove);
            domElement.removeEventListener('touchend', touchEnd);
            if (distance > 30) { //下拉距离够30像素才发送请求刷新
                callback();
            }
            backTimer = setInterval(() => { //下拉回弹
                let currentTop = domElement.offsetTop;
                if (currentTop - originalTop >= 1) {
                    //如果距离最原始的顶部多于1个像素，回弹一个像素
                    domElement.style.top = currentTop - 1 + 'px';
                } else {
                    backTimer && clearInterval(backTimer);
                    domElement.style.top = originalTop + 'px';
                }
            }, 1)
        }
    });
}
//节流函数 -- 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
export function throttle(fn: Function, delay: number) {
    let prev = Date.now();
    return function () {
        const context = this;
        let args = arguments;
        let now = Date.now();
        if (now - prev >= delay) {
            fn.apply(context, args);
            prev = now;
        }
    }
}