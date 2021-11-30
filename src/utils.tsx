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
//防抖函数
function debounce(fn: Function, wait: number) {
    let $timeout: any;
    return function () {
        if ($timeout) clearTimeout($timeout);
        $timeout = setTimeout(fn, wait);
    }
}