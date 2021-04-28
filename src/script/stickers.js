
try {
    let arrStickers = new Array(8);

    for (let i = 0; i < arrStickers.length; i++) {
        arrStickers[i] = [];
    }


    // the appearance of the stickers when loading the page from localstorage
    document.addEventListener('DOMContentLoaded', function () {
        let stickers = JSON.parse(localStorage.getItem('paragraphs')) || [];

        let count = 0;
        if (!stickers.length) {
            return;
        }
        arrStickers = stickers;

        let sticker = document.querySelectorAll('.div-content');

        for (let i = 0; i < sticker.length; i++) {
            if (arrStickers[i].length) {
                for (let p of arrStickers[i]) {

                    let pText = document.createElement('p');
                    pText.classList.add('content');
                    let newP = document.createElement('p');
                    let textSpan = document.createTextNode('X');
                    let newDiv = document.createElement('div');


                    newDiv.classList.add('par');

                    pText.innerText = p.text;

                    newP.classList.add('close');
                    newP.appendChild(textSpan);
                    newDiv.append(pText);
                    newDiv.append(newP);


                    if (p.done == true) {
                        pText.classList.add('p-decoration');
                    }

                    // strikethrough text
                    pText.addEventListener('click', function () {
                        if (this.classList.contains('p-decoration') != true) {
                            p.done = true;
                            this.classList.add('p-decoration');

                        }
                        else {
                            p.done = false;
                            this.classList.remove('p-decoration');
                        };
                        localStorage.setItem('paragraphs', JSON.stringify(arrStickers));
                    });
                    sticker[i].append(newDiv);

                    // delete text
                    newP.addEventListener('click', function () {
                        let ind = arrStickers[i].indexOf(p);
                        console.log(ind);
                        arrStickers[i].splice(ind, 1);
                        newDiv.remove();
                        localStorage.setItem('paragraphs', JSON.stringify(arrStickers));
                    });
                };
            };
            count = 0;
        };
        /*live search*/
        document.querySelector('#input-search').oninput = function () {
            let search_value = this.value.trim();
            search_value = search_value.toLowerCase();
            let search_p = document.querySelectorAll('.content');
            if (search_value != '') {
                search_p.forEach(function (e) {
                    if (e.innerText.search(search_value) == -1) {
                        e.classList.add('hide');
                        e.nextElementSibling.classList.add('hide')

                    }
                    else {
                        e.classList.remove('hide');
                        e.nextElementSibling.classList.remove('hide')
                    }
                })
            }
            else {
                search_p.forEach(function (e) {
                    e.classList.remove('hide');
                    e.nextElementSibling.classList.remove('hide')
                })
            }
        }

    });

    // filling in stickers by clicking on the button
    document.querySelectorAll('.btn-sticker').forEach(d => {

        d.addEventListener('click', function () {

            let valueInput = d.previousElementSibling;
            let index = +d.getAttribute('data-index');
            if (valueInput.value) {
                if (arrStickers[index].length < 5) {
                    if (valueInput.value.length <= 17) {
                        let sticker = document.querySelectorAll('.div-content');
                        let item = { 'done': false, 'text': valueInput.value };
                        arrStickers[index].push(item);
                        let newDiv = document.createElement('div');
                        newDiv.item = item;
                        newDiv.classList.add('par');
                        let p = document.createElement('p');
                        newDiv.append(p);
                        p.classList.add('content');

                        let newP = document.createElement('p');
                        let textP = document.createTextNode('X');

                        p.innerText = valueInput.value;

                        newP.classList.add('close');
                        newP.appendChild(textP);

                        newDiv.append(newP);

                        p.addEventListener('click', function () {

                            if (this.classList.contains('p-decoration') != true) {
                                arrStickers[index][ind].done = true;
                                this.classList.add('p-decoration');
                            }
                            else {
                                arrStickers[index][ind].done = false
                                this.classList.remove('p-decoration');
                            }

                            localStorage.setItem('paragraphs', JSON.stringify(arrStickers));


                        });
                        sticker[index].append(newDiv);


                        newP.addEventListener('click', function () {
                            let ind = arrStickers[index].indexOf(newDiv.item);
                            arrStickers[index].splice(ind, 1);
                            newDiv.remove();
                            localStorage.setItem('paragraphs', JSON.stringify(arrStickers));
                        });
                    }
                    else {
                        if (document.querySelector('#language').value == 'rus') {
                            alert('Вы ввели слишком длинное значение');
                        };
                        if (document.querySelector('#language').value == 'eng') {
                            alert('You entered a value that is too long');
                        };
                        if (document.querySelector('#language').value == 'ukr') {
                            alert('Ви ввели завеливе значення');
                        };
                    };
                    valueInput.value = '';
                    localStorage.setItem('paragraphs', JSON.stringify(arrStickers));
                };
            };
        });

    });

}
catch (e) {
    console.log(e);
}

