	
function processImages() {
	const imageUrls = [];
    const imgElements = document.querySelectorAll('img[id^="slide-image-"]');
    imgElements.forEach(img =>
		{
			const src = img.getAttribute('src');
			const srcset = img.getAttribute('srcset');

			// Use src if srcset is not available
			let url = src;

			// If srcset is available, choose the most appropriate URL
			if (srcset) {
				const srcsetItems = srcset.split(',').map(item => item.trim());
				// Select the highest resolution image available
				const highResImage = srcsetItems.reduce((max, item) => {
					const parts = item.split(' ');
					const resolution = parseInt(parts[1], 10) || 0;
					if (resolution > max.resolution) {
						return { url: parts[0], resolution: resolution };
					}
					return max;
				}, { url: null, resolution: 0 });

				if(highResImage.url){
					url = highResImage.url;
				}
			}

			// Add the URL to the list if it's valid
			if (url) {
				console.log(`Image ID: ${img.id} url:${url}`);
				imageUrls.push(url);
			}
			else{
				console.log(`Image ID: ${img.id} not found url`);
			}
			
		}
	);
	
	// Create a Blob from the list of URLs
	const blob = new Blob([imageUrls.join('\n')], { type: 'text/plain' });

	// Save the Blob to a file using FileSaver.js
	//saveAs(blob, 'image-urls.txt');

	console.log('Image URLs saved successfully.');
	console.log(imageUrls);
}


