import Vue from "vue";
import store from '../store/index'
/**
 * 按钮级别的权限控制 -- 比对元素 -- 元素绑定角色值---登录后获取角色的值
 * 元素绑定角色值,接收字符串或者数组
 */
/** 权限指令 */
let has = Vue.directive("has", {
	inserted: function(el, binding) {
		//注意使用inserted周期,不要使用bind 不然无法删除元素
		let ClassName = binding.value.class; //v-has 接收数组对象
		if (el.parentNode && !Vue.prototype.$_has(ClassName)) {
			el.parentNode.removeChild(el);
		}
	},
});
// 元素指令值与角色值对比,如果不匹配,返回false
// 权限检查
Vue.prototype.$_has = function(val) {
	let isShow = false;
    let bthPerminnions = store.state.buttonData
	if (bthPerminnions === [] || !bthPerminnions) {
		return false;
	}
    for (let i = 0; i < bthPerminnions.length; i++) {
        if (val === String(bthPerminnions[i])) {
            isShow = true;
        }
    }
	return isShow;
};
export { has };