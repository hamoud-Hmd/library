const title = document.querySelector('.book-title');
const author = document.querySelector('.author');
const pages = document.querySelector('.pages');
const status = document.querySelector('.status');
const inputSearch = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const addBookBtn = document.querySelector('.add-book');

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

// const comment = comments.find(comment => comment.id === 823423);

// console.log(comment);

myLibrary.push(book1);
myLibrary.push(kenan);
myLibrary.push(wimp);

const id = myLibrary.findIndex(
	book => book.title === 'wimp kid' && book.author === 'Kenan'
);

console.log(id);
function findMatches(wordToMatch, myLibrary) {
	const regex = new RegExp(wordToMatch, 'gi');
	return myLibrary.filter(book => {
		return book.author.match(regex) || book.title.match(regex);
	});
}
function displayMatches() {
	const arrayMatch = findMatches(this.value, myLibrary);
	const html = arrayMatch
		.map(book => {
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
			if (this.value == '') {
				title = book.title;
				author = book.author;
			}
			return `
      <li>
        <span class="name">${title}, ${author}</span>
        <span class="population">${book.pages}</span>
        <span> ${str} </span>
        <span> <i class="fas fa-trash"></i></span>
      </li>
    `;
		})
		.join('');

	suggestions.innerHTML = html;
	const allButtons = suggestions.querySelectorAll('.fa-trash');
	console.log(allButtons);
	allButtons.forEach(trash =>
		trash.addEventListener('click', function () {
			console.log(this.parentElement);
		})
	);
}
function addBookToLibrary() {
	if (title.value == '' || author.value == '' || pages.value == '') {
		alert('Error');
		return;
	}
	const newBook = new Book(
		title.value,
		author.value,
		pages.value,
		status.checked
	);

	myLibrary.push(newBook);
	alert('book added!');
}

addBookBtn.addEventListener('click', addBookToLibrary);
inputSearch.addEventListener('keyup', displayMatches);
