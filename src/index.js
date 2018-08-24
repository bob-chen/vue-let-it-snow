// Import vue component
import component from './vue-let-it-snow.vue';

// install function executed by Vue.use()
// export function install(Vue) {
// 	if (install.installed) return;
// 	install.installed = true;
// 	Vue.component(component.name, component);
// }


component.install = function(Vue) {
	if (component.installed) return;
	component.installed = true;
    Vue.component(component.name, component)
};

// Create module definition for Vue.use()
// const plugin = {
// 	install,
// };

// To auto-install when vue is found
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	// GlobalVue.use(plugin);
	GlobalVue.use(component);
}

// To allow use as module (npm/webpack/etc.) export component
export default component;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;