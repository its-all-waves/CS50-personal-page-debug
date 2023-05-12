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
	const imgDir = 'img/'
	for (let i = 0; i < thingsAboutMe.length; i++) {

		const thisThing = thingsAboutMe[i]

		// build the new nodes, set attributes, and populate them
		const article = document.createElement('article')
		article.id = thisThing['id']
		article.className = 'tile'

		const cardContainer = document.createElement('div')
		cardContainer.className = 'card-container'
		// hide this wrapper from screen readers as it breaks the semantics
		cardContainer.ariaHidden = true

		const cardFront = document.createElement('section')
		cardFront.className = 'card-front'

		const cardBack = document.createElement('section')
		cardBack.className = 'card-back'

		const img = document.createElement('img')
		img.src = `${imgDir}${thisThing['img']}`
		img.alt = thisThing['img_alt']

		const text = document.createElement('p')
		text.innerHTML = thisThing['text']

		// put the nodes together
		main.append(article)
		article.append(cardContainer)
		cardContainer.append(cardFront, cardBack)
		cardFront.append(img)
		cardBack.append(text)

		// add image citation to credits list
		const credits = document.querySelector('.credits ul')
		const listItem = document.createElement('li')
		listItem.innerHTML = thisThing['img_link']
		credits.append(listItem)

		// style the tile with a random background color
		const bgColors_old = [
			'--gradient-purple-pink',
			'--gradient-purple-blue',
			'--gradient-blue-green',
			'--gradient-pink-green',
			'--gradient-yellow-pink',
			'--gradient-pink-green2',
			'--gradient-blue-green',
		]
		const bgColors = [
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
		const randomColor = randomChoiceFromArray([...bgColors, ...bgColors_old])
		const bgColorFront = `var(${randomColor})`
		const bgColorBack = bgColorFront
		cardFront.style.backgroundImage = bgColorFront
		// add a bg image + a translucent gradient atop it
		cardBack.style.background =
			`${bgColorBack}, url(${imgDir}${thisThing['img']})`
		cardBack.style.backgroundPosition = 'center'
		cardBack.style.backgroundSize = '100%'
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
