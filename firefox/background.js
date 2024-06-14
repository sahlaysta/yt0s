let menuItemsAlive = false;
browser.runtime.onMessage.addListener((data, sender) => {
	switch (data) {
		case 'yt0s_enableContextMenuOptions': {
			if (!menuItemsAlive) {
				/*TODO*/if (false) browser.contextMenus.create({
					id: 'yt0s_menuItem_startAt0sInCurrentTab',
					title: 'Start at 0s',
					contexts: ['link']
				});
				browser.contextMenus.create({
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
				browser.contextMenus.remove('yt0s_menuItem_startAt0sInCurrentTab');
				browser.contextMenus.remove('yt0s_menuItem_startAt0sInNewTab');
				menuItemsAlive = false;
			}
			break;
		}
	}
	return false;
});
browser.contextMenus.onClicked.addListener((info, tab) => {
	switch (info?.menuItemId) {
		case 'yt0s_menuItem_startAt0sInCurrentTab': {
			const videoUrl = new URL(info.linkUrl);
			videoUrl.searchParams.delete('t');
			const videoUrl0s = videoUrl.href;
			browser.tabs.sendMessage(tab.id, {targetLink: videoUrl0s, action: 'yt0s_perform_startAt0sInCurrentTab'});
			break;
		}
		case 'yt0s_menuItem_startAt0sInNewTab': {
			const videoUrl = new URL(info.linkUrl);
			videoUrl.searchParams.delete('t');
			const videoUrl0s = videoUrl.href;
			browser.tabs.create({active: false, url: videoUrl0s, index: tab.index + 1});
			break;
		}
	}
});