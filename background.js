const api = this.browser || this.chrome;
let menuItemsAlive = false;
api.runtime.onMessage.addListener((data, sender) => {
	switch (data) {
		case 'yt0s_enableContextMenuOptions': {
			if (!menuItemsAlive) {
				/*TODO*/if (false) api.contextMenus.create({
					id: 'yt0s_menuItem_startAt0sInCurrentTab',
					title: 'Start at 0s',
					contexts: ['link']
				});
				api.contextMenus.create({
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
				api.contextMenus.remove('yt0s_menuItem_startAt0sInCurrentTab');
				api.contextMenus.remove('yt0s_menuItem_startAt0sInNewTab');
				menuItemsAlive = false;
			}
			break;
		}
	}
	return false;
});
api.contextMenus.onClicked.addListener((info, tab) => {
	switch (info?.menuItemId) {
		case 'yt0s_menuItem_startAt0sInCurrentTab': {
			const videoUrl = new URL(info.linkUrl);
			videoUrl.searchParams.delete('t');
			const videoUrl0s = videoUrl.href;
			api.tabs.sendMessage(tab.id, {targetLink: videoUrl0s, action: 'yt0s_perform_startAt0sInCurrentTab'});
			break;
		}
		case 'yt0s_menuItem_startAt0sInNewTab': {
			const videoUrl = new URL(info.linkUrl);
			videoUrl.searchParams.delete('t');
			const videoUrl0s = videoUrl.href;
			api.tabs.create({active: false, url: videoUrl0s, index: tab.index + 1});
			break;
		}
	}
});