//get Firebase Database

const database = firebase.database();
const dataref = database.ref().child('animalejos');
const bloqueDiv = document.querySelector('.perrosBusqueda');

dataref.orderByKey().on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    snapshot.forEach((child) => {
        console.log(child.val());
        const petName = child.child('animal_name').val();
        const personName = child.child('prop_name').val();
        const personPlace = child.child('prop_city').val();
        const petSpec = child.child('animal_esp').val();
        const petSex = child.child('animal_sex').val();
        const personPhone = child.child('prop_phone').val();
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `<tr>
                            <td>${petName}</td>
                            <td>${petSpec}</td>
                            <td>${petSex}</td>
                            <td>${personName}</td>
                            <td>${personPlace}</td>
                            <td>${personPhone}</td>
                            <td><button>Acceder</button></td>
                        </tr>`;
        bloqueDiv.append(mainDiv);
    });
});

bloqueDiv.addEventListener('click', (e) => {
    if ((e.target.classList[0] = 'ficha')) {
        window.open('./ficha.html', '_blank').focus();
    }
});
