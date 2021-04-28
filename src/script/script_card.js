/*live search*/
document.querySelector('#input-search').oninput = function () {
    let search_value = this.value.trim();
    search_value = search_value.toLowerCase();
    let search_p = document.querySelectorAll('.col');
    if (search_value != '') {
        search_p.forEach(function (e) {
            if (e.innerText.search(search_value) == -1) {
                e.classList.add('hide');
            }
            else {
                e.classList.remove('hide');
            }
        })
    }
    else {
        search_p.forEach(function (e) {
            e.classList.remove('hide');
        })
    }
}
// card name
let inputValues = new Array(8);// front array, corresponds to the number of cards
let inputBackValues = new Array(8);//back array, corresponds to the number of cards
let globalIndex = -1;
let targetInput = null;
let globalIndexBack = -1;
let targetInputBack = null;



// the appearance of the card when loading the page from localstorage
document.addEventListener('DOMContentLoaded', function () {
    let values = localStorage.getItem('values');
    let backValues = localStorage.getItem('backValues');
    if (values) {
        inputValues = JSON.parse(values);
        const cards = document.querySelectorAll('.btn-card-text');
        for (let i = 0; i < cards.length; i++) {
            if (inputValues[i]) {
                let card_body = cards[i].closest('.card-body');
                card_body.querySelector('.out-front').innerText = inputValues[i].text;
                if (inputValues[i].img !== '') {
                    newSrc = card_body.parentElement;
                    let img = newSrc.querySelector('.upload-image');
                    if (img) {
                        img.setAttribute('src', inputValues[i].img);
                        img.classList.remove('upload-image');
                        img.classList.add('img-new');
                        newSrc.querySelector('.upload-container label').classList.add('hide');
                        newSrc.querySelector('.upload-container span').classList.add('hide');
                    }

                }
            }
        }
    }

    if (backValues) {
        inputBackValues = JSON.parse(backValues);
        const cardBack = document.querySelectorAll('.btn-card-back');
        for (let i = 0; i < cardBack.length; i++) {
            if (inputBackValues[i]) {
                let backBodyCard = cardBack[i].nextElementSibling;
                backBodyCard.innerText = inputBackValues[i];
                cardBack[i].classList.add('hide');
                cardBack[i].previousElementSibling.classList.add('hide');
            }
        }
    }
});

// text front card
document.querySelectorAll('.btn-card-text').forEach(e => {

    e.addEventListener('click', function () {
        let card_body = this.closest('.card-body');
        let input_front = card_body.querySelector('.card-text');
        if (input_front.value != '') {
            const index = +this.getAttribute('data-index');
            if (!inputValues[index]) {
                inputValues[index] = { text: input_front.value, img: '' };
            }
            else {
                inputValues[index].text = input_front.value;
            }

            localStorage.setItem('values', JSON.stringify(inputValues));
            card_body.querySelector('.out-front').innerText = input_front.value;
            input_front.value = '';
        }
    });
});

document.onkeypress = (e) => {

    if (e.keyCode === 13) {
        if (globalIndex >= 0) {
            let cardBody = document.querySelectorAll('.card-body')[globalIndex];
            cardBody.querySelector('.out-front').innerText = targetInput.value;



            if (!inputValues[globalIndex]) {
                inputValues[globalIndex] = { text: targetInput.value, img: '' };
            }
            else {
                inputValues[globalIndex].text = targetInput.value;
            }
            localStorage.setItem('values', JSON.stringify(inputValues));
            targetInput.value = '';
            globalIndex = -1;
            targetInput = null;
        }

        if (globalIndexBack >= 0) {
            let backBody = document.querySelectorAll('.back')[globalIndexBack];
            backBody.querySelector('.out').innerText = targetInputBack.value;

            if (!inputBackValues[globalIndexBack]) {
                if (backBody.querySelector('.back-text').value != '') {
                    inputBackValues[globalIndexBack] = targetInputBack.value;
                    localStorage.setItem('backValues', JSON.stringify(inputBackValues));
                    backBody.querySelector('.back-text').classList.add('hide');
                    backBody.querySelector('.btn-card-back').classList.add('hide');
                    globalIndexBack = -1;
                    targetInputBack = null;
                }
            }
        }
    }
}

document.querySelectorAll('.card-text').forEach(d => {

    d.addEventListener('focus', function (e) {
        let temp = +e.target.nextElementSibling.getAttribute('data-index');
        targetInput = e.target;
        if (!isNaN(temp) && temp >= 0) {
            globalIndex = temp;
        }
    });
});


// text back card keypress
document.querySelectorAll('.back-text').forEach(d => {

    d.addEventListener('focus', function (e) {
        let temp = +e.target.nextElementSibling.getAttribute('data-back');
        targetInputBack = e.target;
        if (!isNaN(temp) && temp >= 0) {
            globalIndexBack = temp;
        }
    });
});

// back text
document.querySelectorAll('.btn-card-back').forEach(d => {

    d.addEventListener('click', function () {
        let inputBack = d.previousElementSibling;
        let indexBack = +d.getAttribute('data-back');

        if (inputBack.value) {
            d.nextElementSibling.innerText = inputBack.value;
            inputBackValues[indexBack] = inputBack.value;
            localStorage.setItem('backValues', JSON.stringify(inputBackValues));
            inputBack.classList.add('hide');
            d.classList.add('hide');
        }

    });
});

// card rotation
document.querySelectorAll('.arrow-card').forEach(e => {

    e.addEventListener('click', function () {
        let card = this.closest('.card');
        card.querySelector('.front').classList.toggle('front-rotate');
        card.querySelector('.back').classList.toggle('back-rotate');
    });
});


// focus front on input
document.querySelectorAll('.file-input').forEach(e => {

    e.addEventListener('focus', function () {
        e.classList.add('focus');
    });
});

document.querySelectorAll('.file-input').forEach(e => {

    e.addEventListener('blur', function () {
        e.classList.remove('focus');
    });
});

// drag-and-drop Image
const dropArea = document.querySelectorAll('.upload-container');

dropArea.forEach(d => {
    d.addEventListener('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    d.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (document.querySelector('#language').value == 'rus') {
            alert('Если вы хотите распечатать карточку в PDF формате ваша картинка должна быть следующих форматов: PNG, JPG, SVG.');
        };
        if (document.querySelector('#language').value == 'eng') {
            alert('If you want to print the card in PDF format, your picture must be in the following formats: PNG, JPG, SVG.');
        };
        if (document.querySelector('#language').value == 'ukr') {
            alert('Якщо ви хочете роздрукувати картку в PDF форматі ваша картинка повинна бути наступних форматах: PNG, JPG, SVG.');
        };
        const fileList = e.dataTransfer.files;
        const reader = new FileReader();
        reader.onload = function () {
            const img = d.querySelector('.upload-image');
            const indexImg = +d.getAttribute('data-img');
            if (!inputValues[indexImg]) {
                inputValues[indexImg] = { text: '', img: reader.result };
            }
            else {
                inputValues[indexImg].img = reader.result;
            }
            localStorage.setItem('values', JSON.stringify(inputValues));
            img.setAttribute('src', reader.result);
            img.classList.remove('upload-image');
            img.classList.add('img-new');
            d.querySelector('.upload-container label').classList.add('hide');
            d.querySelector('.upload-container span').classList.add('hide');
        };
        reader.readAsDataURL(fileList[0]);

    });
});

// download file input
document.querySelectorAll('label').forEach(d => {

    d.addEventListener('click', function () {
        d.parentElement.querySelector('input').focus();
    });
});


document.querySelectorAll('.file-input').forEach(d => {

    d.addEventListener('change', function () {
        if (document.querySelector('#language').value == 'rus') {
            alert('Если вы хотите распечатать карточку в PDF формате ваша картинка должна быть следующих форматов: PNG, JPG, SVG.');
        };
        if (document.querySelector('#language').value == 'eng') {
            alert('If you want to print the card in PDF format, your picture must be in the following formats: PNG, JPG, SVG.');
        };
        if (document.querySelector('#language').value == 'ukr') {
            alert('Якщо ви хочете роздрукувати картку в PDF форматі ваша картинка повинна бути наступних форматах: PNG, JPG, SVG.');
        };
        let form_file = this.closest('.upload-container');
        const fileList = d.files;
        const reader = new FileReader();
        reader.onload = function () {
            const img = form_file.querySelector('.upload-image');

            if (img) {
                const indexImg = +form_file.getAttribute('data-img');
                if (!inputValues[indexImg]) {
                    inputValues[indexImg] = { text: '', img: reader.result };
                }
                else {
                    inputValues[indexImg].img = reader.result;
                }

                localStorage.setItem('values', JSON.stringify(inputValues));
                img.setAttribute('src', reader.result);
            }
            img.classList.remove('upload-image');
            img.classList.add('img-new');
            form_file.querySelector('.upload-container label').classList.add('hide');
            form_file.querySelector('.upload-container span').classList.add('hide');
        }
        reader.readAsDataURL(fileList[0]);
    });
});

// delete card front
document.querySelectorAll('.delete-card').forEach(d => {

    d.addEventListener('click', function () {
        const index_del = +this.getAttribute('data-del');
        if (inputValues[index_del]) {
            inputValues[index_del] = null;
            localStorage.setItem('values', JSON.stringify(inputValues));
            location.reload();
        }

    });
});

// delete card back
document.querySelectorAll('.delete-back').forEach(d => {

    d.addEventListener('click', function () {
        const delBack = +this.getAttribute('data-delBack');
        if (inputBackValues[delBack]) {
            inputBackValues[delBack] = null;
            localStorage.setItem('backValues', JSON.stringify(inputBackValues));
            location.reload();
        }

    });
});

// share buttons
document.querySelectorAll('.repost').forEach(d => {

    d.addEventListener('click', function () {
        document.querySelector('.wrap-modal').style.display = 'block';
        document.querySelector('.wrap-modal').classList.add('bgShare');
    });
});

document.querySelector('.modal-close').onclick = () => {
    document.querySelector('.wrap-modal').style.display = 'none';
    document.querySelector('.wrap-modal').classList.remove('bgShare');

};

document.onkeydown = function (e) {
    if (e.keyCode == 27) {
        document.querySelector('.wrap-modal').style.display = 'none';
        document.querySelector('.wrap-modal').classList.remove('bgShare');
    };
};


// saving picture in pdf format
document.querySelectorAll('.download').forEach(d => {

    d.addEventListener('click', function (e) {

        let indexPdf = +e.target.getAttribute('data-down');
        let arrowPdf = localStorage.getItem('values');
        arrowPdf = JSON.parse(arrowPdf);
        let arrowPdfBack = localStorage.getItem('backValues');
        arrowPdfBack = JSON.parse(arrowPdfBack);
        if (arrowPdf == undefined && arrowPdfBack == undefined) {
            if (document.querySelector('#language').value == 'rus') {
                alert('Вы еще не заполнили поля карточки');
            };
            if (document.querySelector('#language').value == 'eng') {
                alert('You have not filled in the fields of the card yet');
            };
            if (document.querySelector('#language').value == 'ukr') {
                alert('Ви ще не заповнили картку ');
            };
        };


        if (arrowPdf[indexPdf] != null && arrowPdfBack[indexPdf] != null) {
            let textFront = arrowPdf[indexPdf].text;
            let img = arrowPdf[indexPdf].img;
            let textBack = arrowPdfBack[indexPdf];
            let docInfo = {
                info: {
                    title: 'Card',
                    author: 'Tolmach Yuliia',
                    subject: 'learning the language',
                    keywords: 'Изучаем языки, карточки для изучения иностранных языков, learning the language'
                },
                pageSize: 'A6',
                pageOrientation: 'portrait',
                pageMargins: [30, 30, 30, 30],
                footer: [
                    {
                        text: '@Tolmach',
                        alignment: 'center'
                    }
                ],
                content: [
                    {
                        image: img,
                        fit: [240, 200]
                    },
                    {
                        text: textFront,
                        fontSize: 38,
                        bold: true,
                        italics: true,
                        alignment: 'center',
                        margin: [0, 50, 0, 30]
                    },
                    {
                        text: textBack,
                        fontSize: 22,
                        bold: true,
                        alignment: 'center',
                        color: 'blue',
                        margin: [0, 0, 0, 30]
                    }
                ]
            }
            pdfMake.createPdf(docInfo).download(textFront + '_card.pdf');
        }
        else {
            if (document.querySelector('#language').value == 'rus') {
                alert('Вы не ввели картинку или название карточки');
            };
            if (document.querySelector('#language').value == 'eng') {
                alert('You did not enter a picture or a name for the card');
            };
            if (document.querySelector('#language').value == 'ukr') {
                alert('Ви не ввели зображення або назву картки');
            };

        };
    });
});


