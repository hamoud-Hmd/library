const title = document.querySelector('.book-title');
const author = document.querySelector('.author');
const pages = document.querySelector('.pages');
const status = document.querySelector('.status');
const inputSearch = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const addBookBtn = document.querySelector('.add-book');
let index = -1;

let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;

	this.info = function () {
		const str = this.read ? 'is read' : 'not read yet';
		return `The ${this.title} by ${this.author}, ${this.pages} pages, ${str}`;
	};
}

const book1 = new Book('book', 'hamoud', 201, false);
const kenan = new Book('harry poter', 'souley', 201, false);
const wimp = new Book('wimp kid', 'Kenan', 201, false);

myLibrary.push(book1);
myLibrary.push(kenan);
myLibrary.push(wimp);

function findBook(myLibrary, title, author, pages) {
	const index = myLibrary.findIndex(
		book =>
			book.title === title && book.author === author && book.pages === pages
	);
	return index;
}

function findMatches(wordToMatch, myLibrary) {
	const regex = new RegExp(wordToMatch, 'gi');
	return myLibrary.filter(book => {
		return book.author.match(regex) || book.title.match(regex);
	});
}

function displayMatches() {
	const arrayMatch = findMatches(this.value, myLibrary);
	const html = arrayMatch
		.map((book, idx) => {
			const regex = new RegExp(this.value, 'gi');

			let title = book.title.replace(
				regex,
				`<span class="hl"> ${this.value}</span>`
			);
			let author = book.author.replace(
				regex,
				`<span class="hl"> ${this.value}</span>`
			);
			let str = book.read ? 'Read' : 'Not Read';
			const className = book.read ? 'read' : 'not-read';
			if (this.value == '') {
				title = book.title;
				author = book.author;
			}
			return `
      <li>
        <span class="name">${title}, ${author}</span>
        <span class="population">${book.pages}</span>
        <span class="${className} change-status" id=${idx}> ${str} </span>
        <span> <i class="fas fa-trash" id=${idx}></i></span>
      </li>
    `;
		})
		.join('');

	suggestions.innerHTML = html;
	const allButtons = suggestions.querySelectorAll('.fa-trash');
	const status = suggestions.querySelectorAll('.change-status');

	allButtons.forEach(trash =>
		trash.addEventListener('click', function () {
			myLibrary.splice(this.id, 1);
			this.parentElement.parentElement.remove();
		})
	);

	status.forEach(state => {
		state.addEventListener('click', function () {
			myLibrary[this.id].read = !myLibrary[this.id].read;
			this.textContent = myLibrary[this.id].read == true ? 'Read' : 'Not Read';
			this.classList.toggle('read');
			this.classList.toggle('not-read');
		});
	});
}
let isError = false;
function addBookToLibrary() {
	if (title.value == '') {
		title.classList.add('required');
		isError = true;
	} else {
		title.classList.remove('required');
	}
	if (pages.value == '' || pages.value <= 0) {
		pages.classList.add('required');
		isError = true;
	} else {
		pages.classList.remove('required');
	}
	if (author.value == '') {
		author.classList.add('required');
		isError = true;
	} else {
		author.classList.remove('required');
	}

	if (isError) {
		isError = false;
		return;
	}

	index = findBook(
		myLibrary,
		title.value.toLowerCase(),
		author.value.toLowerCase(),
		pages.value
	);

	if (index !== -1) {
		console.log(myLibrary[index]);
		alert('The book is already on your shelf!');
		return;
	}
	const newBook = new Book(
		title.value.toLowerCase(),
		author.value.toLowerCase(),
		pages.value,
		status.checked
	);

	myLibrary.push(newBook);
}

addBookBtn.addEventListener('click', addBookToLibrary);
inputSearch.addEventListener('keyup', displayMatches);
inputSearch.addEventListener('change', displayMatches);
addBookBtn.addEventListener('click', displayMatches);
