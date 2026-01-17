{
	const ytLinkVerifier = /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/|e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)([\w-]{11})[\?&#]?\S*$/;
	const ytShortsLinkVerifier = /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?(youtube\.com\/shorts\/))([\w-]{11})/;
	
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
				const elem = targetElem.closest("ytd-rich-item-renderer");
				if (elem) {
					const titleChildren = elem.getElementsByClassName("reel-item-endpoint");
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
		
		let videoUrl = scrapeUrl();
		if (!videoUrl) {
			yt0s_runtime_api.runtime.sendMessage({pushName: "yt0s_disableContextMenuOptions", videoUrl: null});
		} else {
			if (ytShortsLinkVerifier.test(videoUrl)) {
				videoUrl = videoUrl.replaceAll("shorts/", "watch?v=");
			}
			yt0s_runtime_api.runtime.sendMessage({pushName: "yt0s_startContextMenuOptions", videoUrl: videoUrl});
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