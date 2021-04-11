//get Firebase Database

const database = firebase.database();
const dataref = database.ref().child('animalejos');
const tablaSearch = document.querySelector('.search_table');

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
                            <td>${personPlace}</td>
                            <td>${personPhone}</td>
                            <td><button class="ficha">Acceder</button></td>
                        `;
        tablaSearch.append(tableRow);

        const fichaButton = document.querySelector('.ficha');
        fichaButton.addEventListener('click', (e) => {
            window.open('./ficha.html?id=' + childKey, '_blank').focus();
        });
    });
});
