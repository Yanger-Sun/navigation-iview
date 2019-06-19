import naviHeader from './component/navigation/navigation-header.vue';
import naviSecondary from './component/navigation/navigation-secondary.vue';

const components = [
    naviHeader,
    naviSecondary
    // ...如果还有的话继续添加
]

const install = function (Vue, opts = {}) {
    components.map(component => {
      Vue.component(component.name, component);
    })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

// naviHeader.install = Vue => Vue.component(naviHeader.name, naviHeader);
// naviSecondary.install = Vue => Vue.component(naviSecondary.name, naviSecondary);

export  default {
    install,
    naviHeader,
    naviSecondary
};
// oHd794qI6i4TGqX7p5sbUUzhO7I=