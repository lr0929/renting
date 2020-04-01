import jquery from 'jquery';
var myjquery = {};
myjquery.install = function(Vue) {
	Vue.prototype.$jq = jquery;
}
export default myjquery;
