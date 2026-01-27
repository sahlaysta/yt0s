if (typeof importScripts !== "undefined") {
	importScripts("yt0s_runtime_api.js");
}
{
	let videoUrl;
	yt0s_runtime_api.runtime.onMessage.addListener((data, sender) => {
		switch (data?.pushName) {
			case "yt0s_startContextMenuOptions": {
				videoUrl = data.videoUrl;
				//yt0s_runtime_api.contextMenus.create({
				//	id: "yt0s_menuItem_startAt0sInCurrentTab",
				//	title: "Start at 0:00",
				//	contexts: ["all"]
				//});
				yt0s_runtime_api.contextMenus.create({
					id: "yt0s_menuItem_startAt0sInNewTab",
					title: "Start at 0:00 in new tab",
					contexts: ["all"]
				});
				break;
			}
			case "yt0s_disableContextMenuOptions": {
				videoUrl = null;
				yt0s_runtime_api.contextMenus.removeAll();
				break;
			}
		}
		return false;
	});
	yt0s_runtime_api.contextMenus.onClicked.addListener((info, tab) => {
		switch (info?.menuItemId) {
			//case "yt0s_menuItem_startAt0sInCurrentTab": {
			//	break;
			//}
			case "yt0s_menuItem_startAt0sInNewTab": {
				const newVideoUrl = new URL(videoUrl);
				newVideoUrl.searchParams.set("t", 0);
				const videoUrl0s = newVideoUrl.href;
				yt0s_runtime_api.tabs.create({active: false, url: videoUrl0s, index: tab.index + 1});
				break;
			}
		}
	});
}