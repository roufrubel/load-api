//spinner display none
document.getElementById('spinner').style.display = "none";
// erroe display none
document.getElementById('show-error').style.display = "none";
// search book
const inputBookSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = ''
    // error handling for empty string
    if (searchText === "") {
        displayError();
    }
    else {
        //display spinner when click search button
        document.getElementById('spinner').style.display = "block";
        //hide previous search result when we click seach button
        document.getElementById('book-search-result').textContent = "";
        //hide books found numbers
        document.getElementById('book-found-numbers').innerText = "";
        // error display none
        document.getElementById('show-error').style.display = "none";

        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }
}

const displayError = () => {
    document.getElementById('show-error').style.display = "block";
    document.getElementById('spinner').style.display = "none";
    document.getElementById('book-found-numbers').innerText = "";
    document.getElementById('book-search-result').textContent = "";
}

const displaySearchResult = docs => {
    //spinner hide when books display
    document.getElementById('spinner').style.display = "none";
    // hide book found numbers
    document.getElementById('book-found-numbers').innerText = "";
    // get search result
    const bookSearchResult = document.getElementById('book-search-result');
    bookSearchResult.textContent = "";
    const bookList = docs.docs;
    // error handling for booklist null
    if (bookList === "") {
        displayError();
    }
    else {
        //found search results books numbers
        document.getElementById('book-found-numbers').innerText = `Books Found ${bookList.length}`;
        //use forEach
        bookList.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">Book name : ${book.title}</h5>
            <p class="card-title">Author : ${book.author_name}</p>
            <p class="card-title">Publisher : ${book.publisher}</p>
            <p class="card-title">First publish date : ${book.first_publish_year}
        </div>
        </div>
        `;
            bookSearchResult.appendChild(div);
        })
    }
}