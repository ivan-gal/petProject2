//get Firebase Database

const database = firebase.database();
const dataref = database.ref().child('animalejos');
const tablaSearch = document.querySelector('.search_table');
const searchBar = document.querySelector('.search_bar');
const searchButton = document.querySelector('.search_button');

const auth = firebase.auth();

//get URL for query
let currentUrl = window.location.href;
let currentSearch = '';
if (currentUrl.indexOf('=') != -1) {
    currentSearch = currentUrl.slice(
        currentUrl.indexOf('=') + 1,
        currentUrl.length
    );
}

console.log(currentSearch);

setTimeout(function () {
    auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser === null) {
            window.location = './index.html';
        }
    });
}, 2000);

searchButton.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = './busqueda.html?id=' + searchBar.value;
});

if (currentSearch.length >= 1) {
    dataref
        .orderByChild('animal_name')
        .startAt(currentSearch)
        .endAt(String.fromCharCode(currentSearch.charCodeAt(0) + 1))
        .on('value', (snapshot) => {
            const data = snapshot.val();
            const idData = Object.keys(data);
            snapshot.forEach((child) => {
                const childKey = child.key;
                const petName = child.child('animal_name').val();
                const personName = child.child('prop_name').val();
                const personPlace = child.child('prop_city').val();
                const petSpec = child.child('animal_esp').val();
                const petSex = child.child('animal_sex').val();
                const personPhone = child.child('prop_phone').val();
                const tableRow = document.createElement('tr');
                tableRow.innerHTML = `
                            <td>${petName}</td>
                            <td>${petSpec}</td>
                            <td>${petSex}</td>
                            <td>${personName}</td>
                            <td class="dis_phone">${personPlace}</td>
                            <td class="td_phone dis_phone">${personPhone}</td>
                        `;

                const newTD = document.createElement('td');
                const button = document.createElement('button');
                button.textContent = 'Acceder';
                button.addEventListener('click', () => {
                    auth.onAuthStateChanged((firebaseUser) => {
                        if (firebaseUser == null) {
                            console.log(firebaseUser);
                            window.location('./index.html');
                        } else {
                            window
                                .open('./ficha.html?id=' + childKey, '_blank')
                                .focus();
                        }
                    });
                });
                newTD.append(button);
                tableRow.append(newTD);

                tablaSearch.append(tableRow);
            });
        });
} else {
    dataref.orderByKey().on('value', (snapshot) => {
        const data = snapshot.val();
        const idData = Object.keys(data);
        snapshot.forEach((child) => {
            const childKey = child.key;
            const petName = child.child('animal_name').val();
            const personName = child.child('prop_name').val();
            const personPlace = child.child('prop_city').val();
            const petSpec = child.child('animal_esp').val();
            const petSex = child.child('animal_sex').val();
            const personPhone = child.child('prop_phone').val();
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                            <td>${petName}</td>
                            <td>${petSpec}</td>
                            <td>${petSex}</td>
                            <td>${personName}</td>
                            <td class="dis_phone">${personPlace}</td>
                            <td class="td_phone dis_phone">${personPhone}</td>
                        `;

            const newTD = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = 'Acceder';
            button.addEventListener('click', () => {
                auth.onAuthStateChanged((firebaseUser) => {
                    if (firebaseUser == null) {
                        console.log(firebaseUser);
                        window.location('./index.html');
                    } else {
                        window
                            .open('./ficha.html?id=' + childKey, '_blank')
                            .focus();
                    }
                });
            });
            newTD.append(button);
            tableRow.append(newTD);

            tablaSearch.append(tableRow);
        });
    });
}
