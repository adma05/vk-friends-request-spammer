 /* 
    Code by @satosempai
    VK: https://vk.com/satosempai
*/


const base = JSON.parse(localStorage.getItem('vk-users-brute-fs')) || [];
const messages = {
    request_limit: "К сожалению, вы не можете добавлять больше друзей за один день. Пожалуйста, попробуйте завтра."
}
const time = 10000;
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
    let a,b,c;
    console.warn("Открываем список друзей...")
    nav.go('https://vk.com/friends?section=all');
    a = setTimeout(() => {
        console.warn(`Получаем количество друзей...`);
        try {
            friends = document.querySelector("#friends_tab_all a span").innerText;
            if(isNaN(+friends))  {
                friends = document.querySelector("#friends_tab_all a").querySelectorAll("span")[1].innerText;
            }
        } catch (e) {
            console.error(e);
            console.error('Не удалось получить список друзей.');
            clearTimeout(b);
            clearTimeout(c);
            // stop();
            nav.go('https://vk.com/friends?act=find');
        }
    }, 4000);
    b = setTimeout(() => {
        console.warn('Закрываем список друзей...');
        nav.go('https://vk.com/friends?act=find');
    }, 5000);
    c = setTimeout(() => {
        console.warn(`Готово!`);
        console.log(`Друзей: %c${friends}\n%cВсего отправленных заявок: %c${base.length}\n%cИнтервал: %c${time/1000} с.\n%cВаш ID: %c${vk.id}`, 'color: orange;', 'color: white;', 'color: orange;', 'color: white;', 'color: orange;', 'color: white;', 'color: orange;');
    }, 7000);
}
getFriends();

// START
const init = setInterval(run, time);


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
        console.log(`Пользователь: %c${user.name}\n%cID: %c${user.id}\n%cСтатус: %c200\n%cВыполнено: %c ${counter}/${addBtn.length}`, 'color: gold;', 'color: #DEE0E3;', 'color: gold;', 'color: #DEE0E3;', 'color: gold;', 'color: #DEE0E3;', 'color: gold;');
    }, 500);
    base.push(user);
    addBtn[counter].click();
    if(counter == (addBtn.length) - 1) {
        setTimeout(() => {
            console.warn("Загружаем пользователей...");
        }, 600);
        scroll_counter = scroll_counter + 999999;
        scroll(0, scroll_counter);
    }
    counter++;
    saveBase('vk-users-brute-fs', base);
}

function stop() {
    clearInterval(init);
}

function saveBase(base_name, base) {
    localStorage.setItem(base_name, JSON.stringify(base));
}
