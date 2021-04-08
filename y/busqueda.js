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
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('perro');
        mainDiv.innerHTML = `<div class='datos'><h2>${petName}</h2><h3>${petSpec}</h3><h3>${personName}</h3><h4>${personPlace}</h4></div><h2 class='ficha'>Acceder</h2>`;
        bloqueDiv.append(mainDiv);
    });
});

bloqueDiv.addEventListener('click', (e) => {
    if ((e.target.classList[0] = 'ficha')) {
        window.open('./ficha.html', '_blank').focus();
    }
});
