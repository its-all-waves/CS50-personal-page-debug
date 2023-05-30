/* TODO: on page load, animate all the cards like dominos to show that they can be flipped */

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




async function main() {
	// list of tile bg colors to randomly choose from
	const CARD_BG_COLORS = [
		'--gradient-purple-pink',
		'--gradient-blue-green',
		'--gradient-pink-green',
		'--gradient-yellow-pink',
		'--gradient-pink-green2',
		'--gradient-blue-green', //
		'--gradient-coral-peachpuff',
		'--gradient-atomictangerine-salmon',
		'--gradient-limegreen-dodgerblue',
		'--gradient-beige-tomato',
		'--gradient-orange-yellow',
		'--gradient-skyblue-royalblue',
		'--gradient-crimson-deeppink',
		'--gradient-red-orangered',
		'--gradient-gold-darkorange',
		'--gradient-deepskyblue-blue',
		'--gradient-darkorchid-darkviolet',
		'--gradient-firebrick-sienna',
		'--gradient-darkorange-coral',
		'--gradient-steelblue-cornflowerblue',
		'--gradient-palevioletred-hotpink',
	]

	// get the json data from the root
	let thingsAboutMe = await fetchJSONdata()
	// guard against JSON failure - return since the rest needs the JSON data
	if (!thingsAboutMe) {
		console.log('Error: Could not populate the site with content.')
		return
	}

	// RUN THE MAIN FUNCTIONS
	populateCards()

	// had to go 2nd as black space would load instead of bg vid, otherwise
	alertIfAppleLowPowerMode()

	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// FUNCTION DEFINITIONS
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	async function populateCards() {
		// get a reference to the flippy cards container
		const cardsContainer = document.querySelector('.cards-container')

		// setup to generate a new tile for each thing about me
		let animationDelay = 0
		const ANIMATION_DELAY_INTERVAL = 0.3 // seconds
		const imgDir = 'img'

		// build nodes, set attributes, and populate them with things about me
		for (let i = 0; i < thingsAboutMe.length; i++) {
			const thisThing = thingsAboutMe[i]

			const box = document.createElement('div')
			box.className = 'box'
			box.id = thisThing['id']
			box.style.animationDelay = `${animationDelay}s`
			animationDelay += ANIMATION_DELAY_INTERVAL

			const cardBody = document.createElement('article')
			cardBody.className = 'card-body'

			const cardFront = document.createElement('div')
			cardFront.className = 'card-front'

			const img = document.createElement('img')
			img.src = `${imgDir}/${thisThing['img']}`
			img.alt = thisThing['img_alt']

			const cardBack = document.createElement('div')
			cardBack.className = 'card-back'

			const div = document.createElement('div')

			const text = document.createElement('p')
			text.innerHTML = thisThing['text']

			// append everything to main
			// main.append(container)
			cardsContainer.append(box)
			box.append(cardBody)
			cardBody.append(cardFront)
			cardFront.append(img)
			cardBody.append(cardBack)
			cardBack.append(div)
			div.append(text)

			// TODO: maybe, someday, launch the youtube vids in modals instead of a new tab/window

			// add image citation to credits list
			const credits = document.querySelector('.credits ul')
			const listItem = document.createElement('li')
			listItem.innerHTML = thisThing['img_link'] + '&nbsp; : : : &nbsp;'
			credits.append(listItem)

			const randomColor = randomChoiceFromArray(CARD_BG_COLORS)
			const bgColorFront = `var(${randomColor})`
			const bgColorBack = bgColorFront
			cardFront.style.backgroundImage = bgColorFront
			// add a bg image + a translucent gradient atop it
			cardBack.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)), ${bgColorBack}, url(${imgDir}/${thisThing['img']})`
			cardBack.style.backgroundPosition = 'center'
			cardBack.style.backgroundSize = '100%'
		}
	}

	async function fetchJSONdata() {
		let thingsAboutMe = null
		const url = 'content.json'
		// fetch json object array from root and load into memory
		try {
			const request = new Request(url)
			try {
				const response = await fetch(request)
				try {
					// the json data that populates the tiles
					thingsAboutMe = await response.json()
					shuffle(thingsAboutMe)
				} catch (responseError) {
					console.log('There was an error decoding the JSON data.')
					console.log(responseError)
				}
			} catch (fetchError) {
				console.log('There was an error fetching the requested JSON data.')
				console.log(fetchError)
			}
		} catch (requestError) {
			console.log('There was an error requesting the JSON data.')
			console.log(requestError)
		}
		return thingsAboutMe
	}

	/* Returns a random choice from an array. */
	function randomChoiceFromArray(array) {
		const rand = Math.floor(Math.random() * array.length)
		return array[rand]
	}

	/* Shuffles the array of JSON objects (thingsAboutMe), so the order is randomized when the page is loaded.
	The Fisher-Yates (aka Knuth) Shuffle
	https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1)) // `;` necessary
			;[array[i], array[j]] = [array[j], array[i]]
		}
	}

	/* Returns an array of YouTube url strings from the 'text' property of a JSON thingAboutMe. Assumes thisThing.text has video links. 
NOTE: Stopped short of using this with the goal of creating modals for each youtube link... maybe one day. */
	// function getVideoLinksFrom(thisThingText) {
	// 	// assume thisThing has video links
	// 	// find a youtube URL ending with a single quote (')
	// 	const regex = /https:\/\/www\.youtube\.com\/watch\?[^ ]*'/g;
	// 	const matches = thisThingText.match(regex)
	// 	const urls = []
	// 	for (let i = 0; i < matches.length; i++) {
	// 		// remove the trailing single quote from this url
	// 		let match = matches[i].slice(0, -1)
	// 		urls.push(match)
	// 	}
	// 	return urls
	// }

	/* Indirectly checks if an Apple device is in low power mode, with about 75% confidence. */
	function alertIfAppleLowPowerMode() {
		// return if no userAgent property
		if (!navigator.userAgent) return
		const userAgent = navigator.userAgent
		if (
			!userAgent.includes('iPhone') &&
			!userAgent.includes('iPad') &&
			!userAgent.includes('iPod') &&
			!userAgent.includes('Mac')
		) {
			return
		}

		const bgVideo = document.querySelector('#background-video')
		bgVideo.controls

		setTimeout(() => {
			// after 3 seconds, if the bg video is still paused, its likely because the device is in low power mode -- alert the user sarcastically
			// TODO: if video paused and in-view
			// if (bgVideo.paused) {
			if (
				bgVideo.currentTime === 0 &&
				bgVideo.paused &&
				bgVideo.readyState > 2 // has enough data to play
			) {
				alert(
					"I think I've detected low power mode on your device. If my eyebrows aren't doing the wave (or you can't see my face), I'm probably right, and you should probably turn that off, wait 5-10 seconds, then refresh the page. It's totally worth the battery drain."
				)
			}
		}, 3000)
	}
}

main()