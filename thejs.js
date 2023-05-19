/* TODO: on page load, animate all the cards like dominos to show that they can be flipped */

async function populateCards() {
	// fetch json from root and load into memory
	const url = 'content.json'
	const request = new Request(url)
	const response = await fetch(request)
	// the json data that populates the tiles
	const thingsAboutMe = await response.json()

	// get ui elements
	const main = document.querySelector('main')
	const tiles = document.querySelectorAll('.tile')

	// TODO: randomly select objects from the json array
	// generate a new tile for each thing about me
	let animationDelay = 0
	const ANIMATION_DELAY_INTERVAL = 0.3 // seconds
	const imgDir = 'img'
	for (let i = 0; i < thingsAboutMe.length; i++) {

		const thisThing = thingsAboutMe[i]

		// build the new nodes, set attributes, and populate them
		const tile = document.createElement('article')
		tile.id = thisThing['id']
		tile.className = 'tile'
		tile.style.animationDelay = `${animationDelay}s`
		animationDelay += ANIMATION_DELAY_INTERVAL

		const cardContainer = document.createElement('div')
		cardContainer.className = 'card-container'
		// hide this wrapper from screen readers as it breaks the semantics
		cardContainer.ariaHidden = "true"

		const cardFront = document.createElement('section')
		cardFront.className = 'card-front'

		const cardBack = document.createElement('section')
		cardBack.className = 'card-back'

		const img = document.createElement('img')
		img.src = `${imgDir}/${thisThing['img']}`
		img.alt = thisThing['img_alt']

		const text = document.createElement('p')
		// not using .textContent bc it renders html as plaintext -- need links
		text.innerHTML = thisThing['text']

		// put the nodes together
		main.append(tile)
		tile.append(cardContainer)
		cardContainer.append(cardFront, cardBack)
		cardFront.append(img)
		cardBack.append(text)

		// add image citation to credits list
		const credits = document.querySelector('.credits ul')
		const listItem = document.createElement('li')
		listItem.innerHTML = thisThing['img_link']
		credits.append(listItem)

		// style the tile with a random background color
		const bgColors = [
			'--gradient-purple-pink',
			'--gradient-blue-green',
			'--gradient-pink-green',
			'--gradient-yellow-pink',
			'--gradient-pink-green2',
			'--gradient-blue-green', //
			"--gradient-coral-peachpuff",
			"--gradient-atomictangerine-salmon",
			"--gradient-limegreen-dodgerblue",
			"--gradient-beige-tomato",
			"--gradient-orange-yellow",
			"--gradient-skyblue-royalblue",
			"--gradient-crimson-deeppink",
			"--gradient-red-orangered",
			"--gradient-gold-darkorange",
			"--gradient-deepskyblue-blue",
			"--gradient-darkorchid-darkviolet",
			"--gradient-firebrick-sienna",
			"--gradient-darkorange-coral",
			"--gradient-steelblue-cornflowerblue",
			"--gradient-palevioletred-hotpink"
		];
		const randomColor = randomChoiceFromArray(bgColors)
		const bgColorFront = `var(${randomColor})`
		const bgColorBack = bgColorFront
		cardFront.style.backgroundImage = bgColorFront
		// add a bg image + a translucent gradient atop it
		// cardBack.style.background =
		// 	`${bgColorBack}, url(${imgDir}/${thisThing['img']}), hsla(0, 0%, 0%, 0.512)`
		cardBack.style.background =
			`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)), ${bgColorBack}, url(${imgDir}/${thisThing['img']})`
			//  /* top layer */
      // url("img/frog.png"), /* middle layer */
      // linear-gradient(to bottom, blue, pink)
		cardBack.style.backgroundPosition = 'center'
		cardBack.style.backgroundSize = '100%'

		

		debugger


	}




	// works up to here
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}


/* Returns a random choice from an array. */
function randomChoiceFromArray(array) {
	const rand = Math.floor(Math.random() * (array.length))
	return array[rand]
}


populateCards()
