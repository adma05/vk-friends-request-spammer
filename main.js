const base = JSON.parse(localStorage.getItem('vk-users-brute-fs')) || [];
const messages = {
    request_limit: "К сожалению, вы не можете добавлять больше друзей за один день. Пожалуйста, попробуйте завтра."
}
let addBtn = document.querySelectorAll(".friends_find_user_add");
let counter = 0;
let scroll_counter = 10000;
console.clear();
// console.warn('Running.');
let href = location.href;
let origin = location.origin;
// origin != 'https://vk.com' 
if(origin == 'https://vk.com') {
    if(href != 'https://vk.com/friends?act=find') {
        nav.go('https://vk.com/friends?act=find');
        console.error(`"Invalid location.\n  Please wait while we redirect you to the correct link...\n\nYour path: ${href}\nCorrect path: https://vk.com/friends?act=find"`);
    }
} else {
    console.error("Invalid origin.\n  Go to https://vk.com/friends?act=find");
    let redirect = confirm("Go to https://vk.com/friends?act=find ?");
    if(redirect == true) {
        location.href= 'https://vk.com/friends?act=find';
    }
}

let friends = 0;
function getFriends() {
    console.warn("Открываем список друзей...")
    nav.go('https://vk.com/friends?section=all');
    setTimeout(() => {
        console.warn(`Получаем количество друзей...`);
        friends = document.querySelector("#friends_tab_all a span").innerText;
    }, 2000);
    setTimeout(() => {
        console.warn('Закрываем список друзей...');
        nav.go('https://vk.com/friends?act=find');
    }, 3000);
    setTimeout(() => {
        console.warn(`Готово!`);
        console.log(`%cДрузей: ${friends}\nВсего отправленных заявок: ${base.length}\nВаш ID: ${vk.id}`, 'color: orange;');
    }, 4000);
}
getFriends();


const init = setInterval(run, 10000);
function run() {
    if(document.body.innerText.indexOf(messages.request_limit) > -1) {
        stop();
        console.warn(`Вы достигли лимит запросов.\n ${new Date().toISOString()}`);
        getFriends();
        return;
    }
    addBtn = document.querySelectorAll(".friends_find_user_add");
    let user = {
        name: document.querySelectorAll(".friends_find_user_name")[counter].innerText,
        id: document.querySelectorAll(".friends_find_user_name")[counter].href.slice(15)
    }
    setTimeout(() => {
        if(document.body.innerText.indexOf(messages.request_limit) > -1) {
            stop();
            console.warn(`Вы достигли лимит запросов.\n ${new Date().toISOString()}`);
            getFriends();
            return;
        }
        console.log(`%cПользователь: ${user.name}\nID: ${user.id}\nСтатус: 200\nВыполнено: ${counter}/${addBtn.length}`, 'color: green;');
    }, 500);
    base.push(user);
    addBtn[counter].click();
    scroll(0, scroll_counter);
    scroll_counter = scroll_counter + 10000;
    counter++;
    saveBase('vk-users-brute-fs', base);
    if(counter == addBtn.length) {
        stop();
        console.log('Все пользоватли были добавлены.');
        return;
    }
}

function stop() {
    clearInterval(init);
}

function saveBase(base_name, base) {
    localStorage.setItem(base_name, JSON.stringify(base));
}
