'use strict';

/*
Теоретична частина
Поясніть своїми словами, як ви розумієте поняття асинхронності у Javascript.

Асинхронність у Javascript - це коли виконання одних задач відбувається у фоновому режимі
за рахунок звільнення часу після виконання інших задач. Асинхронність не є синонімом паралельного виконання
задач, хоча може скластися таке враження, що задачі виконуються декількома потоками. інструментом для управління
асинхронністю є проміси.

 */
/*
примітка - використовувала безкоштовну базу https://ipinfo.io/account/home
const token = '6b51795eeab1d8'; // мій токен
targetIp = 78.30.75.70; // мій айпі
*/

async function findIp() {
    try {
        // Запит токену від користувача
        const userToken = prompt('Введіть ваш токен для ipinfo.io:');

        if (!userToken) {
            alert('Токен не введено. Операція скасована!');
            return;
        }

        // Отримання IP адреси клієнта за допомогою api.ipify.org
        const userIpResponse = await fetch('https://api.ipify.org/?format=json');
        const userIpData = await userIpResponse.json();
        const targetIp = userIpData.ip;

        console.log(targetIp);
        console.log(userToken);


        // Отримання інформації про фізичну адресу за допомогою ipinfo.io з введеним токеном
        const addressResponse = await fetch(`https://ipinfo.io/${targetIp}?token=${userToken}`);
        const addressData = await addressResponse.json();


        // Виведення інформації на сторінку
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>IP: ${addressData.ip}</p>
            <p>Hostname: ${addressData.hostname}</p>
            <p>City: ${addressData.city}</p>
            <p>Region: ${addressData.region}</p>
            <p>Country: ${addressData.country}</p>
            <p>Location: ${addressData.loc}</p>
            <p>Organization: ${addressData.org}</p>
            <p>Postal Code: ${addressData.postal}</p>
            <p>Timezone: ${addressData.timezone}</p>
        `;
    } catch (error) {
        console.error('Помилка при виконанні запиту:', error);
    }
}