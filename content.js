const api = this.browser || this.chrome;
const ytLinkVerifier = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
document.addEventListener('focusin', event => {
	const linkUrl = event.target.href;
	const msg = linkUrl && ytLinkVerifier.test(linkUrl) ? 'yt0s_enableContextMenuOptions' : 'yt0s_disableContextMenuOptions';
	api.runtime.sendMessage(msg);
});
document.addEventListener('focusout', event => api.runtime.sendMessage('yt0s_disableContextMenuOptions'));
api.runtime.onMessage.addListener((data, sender) => {
	switch (data?.action) {
		case 'yt0s_perform_startAt0sInCurrentTab': {
			//TODO
			break;
		}
	}
	return false;
});