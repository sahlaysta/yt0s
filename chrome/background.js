let menuItemsAlive = false;
chrome.runtime.onMessage.addListener((data, sender) => {
	switch (data) {
		case 'yt0s_enableContextMenuOptions': {
			if (!menuItemsAlive) {
				/*TODO*/if (false) chrome.contextMenus.create({
					id: 'yt0s_menuItem_startAt0sInCurrentTab',
					title: 'Start at 0s',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					id: 'yt0s_menuItem_startAt0sInNewTab',
					title: 'Start at 0s in new tab',
					contexts: ['link']
				});
				menuItemsAlive = true;
			}
			break;
		}
		case 'yt0s_disableContextMenuOptions': {
			if (menuItemsAlive) {
				chrome.contextMenus.remove('yt0s_menuItem_startAt0sInCurrentTab');
				chrome.contextMenus.remove('yt0s_menuItem_startAt0sInNewTab');
				menuItemsAlive = false;
			}
			break;
		}
	}
	return false;
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
	switch (info?.menuItemId) {
		case 'yt0s_menuItem_startAt0sInCurrentTab': {
			const videoUrl = new URL(info.linkUrl);
			videoUrl.searchParams.set('t', 0);
			const videoUrl0s = videoUrl.href;
			chrome.tabs.sendMessage(tab.id, {targetLink: videoUrl0s, action: 'yt0s_perform_startAt0sInCurrentTab'});
			break;
		}
		case 'yt0s_menuItem_startAt0sInNewTab': {
			const videoUrl = new URL(info.linkUrl);
			videoUrl.searchParams.set('t', 0);
			const videoUrl0s = videoUrl.href;
			chrome.tabs.create({active: false, url: videoUrl0s, index: tab.index + 1});
			break;
		}
	}
});
