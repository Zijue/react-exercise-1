function immer(state, thunk) {
    let copies = new Map(); //Map的key可以是一个对象，非常适合用来缓存被修改的对象

    const handler = {
        get(target, prop) {
            return new Proxy(target[prop], handler); //增加一个get的劫持，返回一个proxy
        },
        set(target, prop, value) {
            const copy = { ...target }; // 浅拷贝
            copy[prop] = value; // 给拷贝对象赋值
            copies.set(target, copy);
        }
    };

    function finalize(state) { //增加一个finalize函数
        const result = { ...state };
        Object.keys(state).map(key => { //以此遍历state的key
            const copy = copies.get(state[key]);
            if (copy) { //如果有copy，表示被修改过
                result[key] = copy; //使用修改后的内容
            } else {
                result[key] = state[key]; //否则还是保留原来的内容
            }
        });
        return result;
    }

    const proxy = new Proxy(state, handler);
    thunk(proxy);
    return finalize(state);
}

const state = {
    "phone": "1-770-736-8031 x56442",
    "website": { site: "hildegard.org" }, //为了方便测试状态共享，将简单数据类型改成对象
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
};

const copy = immer(state, draft => {
    // draft.website = 'www.google.com';
    draft.company.name = 'google';
});

console.log(copy.website === state.website); // 'www.google.com'
console.log(copy.company); // true
copy.website.site = 'zijue.com';
console.log(copy.website === state.website);
console.log(copy.website)
//更详细的可以参考 https://juejin.cn/post/6926099651510665230