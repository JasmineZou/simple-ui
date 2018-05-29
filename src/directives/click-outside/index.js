function clickOutSide () {

}

export default {
	bind (el, {value}) {
		let onClickOutside = value;
		el.handler = function (e) {
			if(el && !el.contains(e.target)) {
				onClickOutside(e);
			}
		}
		document.addEventListener('click', el.handler, true);
	},
	unbind (el) {
		document.removeEventListener('click', el.handler, true);
		el.handler = null;
	}
}