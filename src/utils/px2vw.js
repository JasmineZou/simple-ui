function getWindowWidth () {
	return window.innerWidth;
}
function getWindowHeight () {
	return window.innerHeight;
}

function getVw(wpx) {
	let winWidth = getWindowWidth();

	return `${parseFloat(wpx, 10) / parseFloat(winWidth, 10) * 100}vw`;
}

function getVh(hpx) {
	let winHeight = getWindowHeight;
	return `${parseFloat(wph, 10)/ parseFloat(winHeight, 10) * 100}vh`;
}

export default getVw;

export {getVh};