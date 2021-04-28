

try {
    let arrList = [];
    let valueList = document.querySelector('.input-list');
    let divOut = document.querySelector('.div-list');

    // the appearance of list when loading the page from localstorage
    document.addEventListener('DOMContentLoaded', function () {
        arrList = JSON.parse(localStorage.getItem('list')) || [];
        if (!arrList.length) {
            return;
        };
        for (let i = 0; i < arrList.length; i++) {
            if (arrList.length) {
                let div = document.createElement('div');
                div.classList.add('p-list');

                let pList = document.createElement('p');
                let pClose = document.createElement('p');

                pClose.innerText = 'X';
                pClose.classList.add('close');
                pList.innerHTML = arrList[i].text;
                div.append(pList);
                div.append(pClose);
                divOut.append(div);

                if (arrList[i].done === true) {
                    div.classList.add('checked');
                };

                pList.addEventListener('click', function () {
                    if (div.classList.contains('checked') != true) {
                        arrList[i].done = true;
                        div.classList.add('checked');
                    }
                    else {
                        arrList[i].done = false;
                        div.classList.remove('checked');
                    };

                    localStorage.setItem('list', JSON.stringify(arrList));
                });

                // delete list
                pClose.addEventListener('click', function () {
                    let index = arrList.indexOf(arrList[i]);
                    div.remove();
                    arrList.splice(index, 1);
                    localStorage.setItem('list', JSON.stringify(arrList));
                });

                localStorage.setItem('list', JSON.stringify(arrList));
            };
        };

    });

    // filling in list by clicking on the button
    document.querySelector('.btn-list').addEventListener('click', function () {
        if (valueList.value) {
            let div = document.createElement('div');
            div.classList.add('p-list');
            div.setAttribute('data-index', arrList.length);
            let index = +div.getAttribute('data-index');

            let pList = document.createElement('p');
            let pClose = document.createElement('p');

            pClose.innerText = 'X';
            pClose.classList.add('close');
            pList.innerHTML = valueList.value;
            div.append(pList);
            div.append(pClose);
            divOut.append(div);
            let item = { done: false, text: valueList.value };
            arrList.push(item);
            div.item = item;

            // checked list
            pList.addEventListener('click', function () {
                if (div.classList.contains('checked') != true) {
                    arrList[index].done = true;
                    div.classList.add('checked');
                }
                else {
                    arrList[index].done = false;
                    div.classList.remove('checked');
                }

                localStorage.setItem('list', JSON.stringify(arrList));
            });

            // delete list
            pClose.addEventListener('click', function () {
                let index = arrList.indexOf(div.item);
                div.remove();
                arrList.splice(index, 1);
                localStorage.setItem('list', JSON.stringify(arrList));
            });

            localStorage.setItem('list', JSON.stringify(arrList));
        };

        valueList.value = '';
    });

    // download pdf list
    document.querySelector('.download').addEventListener('click', function () {
        if (arrList.length) {
            let newArr = JSON.parse(localStorage.getItem('list'));
            let PDFobject = newArr.map(line => { return [{ text: line.text, margin: [0, 0, 0, 15] }] });
            let docInfo = {
                info: {
                    title: 'Card',
                    author: 'Tolmach Yuliia',
                    subject: 'list',
                    keywords: 'Список, To do list'
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
                    PDFobject,
                ]
            };
            pdfMake.createPdf(docInfo).download('card.pdf');
        }

    });

    document.onkeypress = (e) => {
        if (e.keyCode === 13) {
            if (valueList.value) {
                let div = document.createElement('div');
                div.classList.add('p-list');
                div.setAttribute('data-index', arrList.length);
                let index = +div.getAttribute('data-index');

                let pList = document.createElement('p');
                let pClose = document.createElement('p');

                pClose.innerText = 'X';
                pClose.classList.add('close');
                pList.innerHTML = valueList.value;
                div.append(pList);
                div.append(pClose);
                divOut.append(div);
                let item = { done: false, text: valueList.value };
                arrList.push(item);
                div.item = item;

                // checked list
                pList.addEventListener('click', function () {
                    if (div.classList.contains('checked') != true) {
                        arrList[index].done = true;
                        div.classList.add('checked');
                    }
                    else {
                        arrList[index].done = false;
                        div.classList.remove('checked');
                    }

                    localStorage.setItem('list', JSON.stringify(arrList));
                });

                // delete list
                pClose.addEventListener('click', function () {
                    let index = arrList.indexOf(div.item);
                    div.remove();
                    arrList.splice(index, 1);
                    localStorage.setItem('list', JSON.stringify(arrList));
                });

                localStorage.setItem('list', JSON.stringify(arrList));
            };

            valueList.value = '';
        };
    };

    /*live search*/
    document.querySelector('#input-search').oninput = function () {
        let search_value = this.value.trim();
        search_value = search_value.toLowerCase();
        let search_p = document.querySelectorAll('.p-list');
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
}
catch (e) {
    console.log(e);
}
