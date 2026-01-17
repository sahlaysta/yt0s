{
	const ytLinkVerifier = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
	function focusInOrMouseDown(targetElem) {
		function scrapeUrl() {
			{
				const elem = targetElem.closest("yt-lockup-view-model");
				if (elem) {
					const titleChildren = elem.getElementsByClassName("yt-lockup-metadata-view-model__title");
					if (titleChildren && titleChildren.length === 1) {
						return titleChildren[0].href;
					}
				}
			}
			
			{
				const elem = targetElem.closest("#media-container-link");
				if (elem) {
					return elem.href;
				}
			}
			
			{
				const targetHref = targetElem.href;
				if (targetHref) {
					if (ytLinkVerifier.test(targetHref)) {
						return targetHref;
					}
				}
			}
			
			return null;
		}
		
		const videoUrl = scrapeUrl();
		if (videoUrl) {
			yt0s_runtime_api.runtime.sendMessage({pushName: "yt0s_startContextMenuOptions", videoUrl: videoUrl});
		} else {
			yt0s_runtime_api.runtime.sendMessage({pushName: "yt0s_disableContextMenuOptions", videoUrl: null});
		}
	}
	document.addEventListener("focusin", event => {
		focusInOrMouseDown(event.target);
	});
	document.addEventListener("mousedown", event => {
		focusInOrMouseDown(event.target);
	});
	document.addEventListener("focusout", event => {
		yt0s_runtime_api.runtime.sendMessage({pushName: "yt0s_disableContextMenuOptions", videoUrl: null});
	});
	//yt0s_runtime_api.runtime.onMessage.addListener((data, sender) => {
		//switch (data?.action) {
		//	case "yt0s_perform_startAt0sInCurrentTab": {
		//		break;
		//	}
		//}
	//	return false;
	//});
}