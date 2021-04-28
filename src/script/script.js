
// language switcher
const select_lang = document.querySelector('#language');


select_lang.addEventListener('change', changeURLlanguage);

function changeURLlanguage() {
    let lang = select_lang.value;
    localStorage.setItem('lang', lang);
    location.reload();
}

function changeLanguage() {
    let lang_mem = localStorage.getItem('lang') || 'eng';
    select_lang.value = lang_mem;

    for (let key in lang) {
        let elem = document.querySelector('.' + key);
        if (elem) {
            elem.innerHTML = lang[key][lang_mem]
        }

    }

}
changeLanguage()


// appearance switch
const select_appear = document.querySelector('#appearance');

select_appear.onchange = function (e) {
    let temp = this.options[this.selectedIndex].value;
    window.location = temp;
}


