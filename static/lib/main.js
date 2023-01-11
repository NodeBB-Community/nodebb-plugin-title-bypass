'use strict';

(async () => {
	const [hooks] = await app.require(['hooks']);

	hooks.on('filter:composer.check', async (payload) => {
		if (payload.titleLen >= config.minimumTitleLength) {
			return;
		}

		// Force a preview render
		const html = await socket.emit('plugins.composer.renderPreview', payload.bodyEl.val());
		let plain = utils.stripHTMLTags(html);

		if (plain.length > config.maximumTitleLength) {
			plain = plain.slice(0, config.maximumTitleLength);
		}

		payload.titleEl.val(plain);
		payload.titleLen = plain.length;

		return payload;
	});
})();
