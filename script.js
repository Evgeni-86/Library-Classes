const allLibrary = document.querySelector('.main_content');
const inputForm = document.querySelectorAll('.form_input'); 
const addBtd = document.querySelector('.btd_addBook');
const openModalBtc = document.querySelector('.modal_addBook');
const openModal = document.querySelector('.modal_dialog');
const closeModal = document.querySelector('.close_modal');
let myLibrary = [];

/*****************ОБЩИЙ КЛАСС БИБЛИОТЕКА********************************/
class Library {
    type = "Book";
    // методы класса
    constructor(title) {
        this.title = title;   
        this.info = function() {
            return this.title+', '+this.author;
        }; 
    }
};
/***********************************************************************/
/*****************ПОДКЛАСС КЛАСС КНИГА**************************************/
class Book extends Library {
    constructor(title, author, pages, read) {
        super(title);
        this.author = author;
        this.pages = pages;
        this.read;
    }
};
/********************************************************************/
/****************СОЗДАЕМ КНИГУ, ДОБАВЛЯЕМ МАССИВ И DOM***********************/
function addBookToLibrary (title, author, pages, read) {
    const newBook = new Book (title, author, pages, read);
    myLibrary.push(newBook);
    new BookCard(newBook);
    console.log(myLibrary);
    checkingRead();
    deleteBook();
};
/***********************************************************************/
/****************ДОБОВЛЯЕМ КНИГУ В DOM*********************************/
class BookCard {
    constructor(elem) {
        let div = document.createElement('div');
        let info = document.createElement('div');
        let btcDel = document.createElement('button');
        let p = document.createElement('p');
        let readChecking = document.createElement('input');
        readChecking.type = 'checkbox';
        readChecking.classList.add('readBookCheck');
        p.textContent = 'Read';
        p.append(readChecking);
        btcDel.classList.add('delBook');
        btcDel.textContent = 'Delete Book';
        info.textContent = elem.info();
        div.append(info);
        div.append(p);
        div.append(btcDel);
        /**установим аттрибут по номеру в массиве что бы потом легко найти*/
        div.setAttribute("Book_number", myLibrary.indexOf(elem));
        allLibrary.append(div);
    };
};
/*************************************************************************************/
/****************ОТМЕТКА О ПРОЧТЕНИИ************************************************/
function checkingRead() {
    let readBookCheck = document.querySelectorAll('.readBookCheck');/*отметки о прочтении*/
    readBookCheck.forEach(element => {
        element.onclick = function () {
            let numberBook = element.parentElement.parentElement.getAttribute('Book_number');
            let elem = myLibrary[numberBook];
            (element.checked) ? elem.read = 'read': elem.read = 'not read';
            console.log(elem);
        };
    });
};
/**********************************************************************************/
/***************УДАЛЯЕМ КНИГУ ИЗ DOM И МАССИВА********************************/
function deleteBook () {
    let delBook = document.querySelectorAll('.delBook');/*КНОПОКИ УДАЛИТЬ*/
    delBook.forEach(element => {
        element.onclick = function () {
            /*ищем нужный по установленому аттрибуту*******/
            let numberBook = element.parentElement.getAttribute('Book_number');
            myLibrary.splice(numberBook, 1);
            element.parentElement.remove();
            updateAllLibrary();
            console.log(myLibrary);
        };
    });
    };
/**********************************************************************/
/*****************ДОБАВЛЯЕМ КНИГУ В БРАУЗЕРЕ****************************/
openModalBtc.onclick = function () {
    openModal.classList.add('modal_dialog_target');
};
closeModal.onclick = function () {
    openModal.classList.remove('modal_dialog_target');
};


addBtd.onclick = function () {
/**СДЕСЬ ПРОВЕРКА ВАЛИДНОСТЬ*/
/***************************/
//переписать обработку формы
let bookInfoArr = []; 
inputForm.forEach(element => {
    bookInfoArr.push(element.value);
});   
addBookToLibrary (bookInfoArr[0], bookInfoArr[1], bookInfoArr[2], bookInfoArr[3]);
openModal.classList.remove('modal_dialog_target');
};
/*********************************************************************/
/***************ОБНОВЛЕНИЕ АТРИБУТОВ ПОСЛЕ УДАЛЕНИЯ ЭЛЕМЕНТА****************/
function updateAllLibrary () {
    let child = allLibrary.children;
    for (let i = 0; i < child.length; i++) {
        let element = child[i];
        element.setAttribute('Book_number', i);
    }
};
/************************************************************************/
addBookToLibrary("theHobbit", "J.R.R. Tolkien", "295", "not read yet");
addBookToLibrary("sajjl", "asd", "200", "not read yet");
/**************ВЫВЕСТИ ЭЛЕМЕНТЫ ИЗ МАССИВА*****************************************/
myLibrary.forEach(element => {
    addBookToLibrary (element.title, element.author, element.pages, element.read)
});
/************************************************************************/
