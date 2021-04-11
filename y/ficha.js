const database = firebase.database();
const dataref = database.ref().child('animalejos');

let currentUrl = window.location.href;
currentUrl = currentUrl.toString().split('=');
const currentId = currentUrl[1];

//Get docu things
console.log(currentId);
const databaseDog = dataref.child(currentUrl[1]).val();
console.log(databaseDog);

const dogData = document.querySelector('.datos-perro');
const propData = document.querySelector('.datos-prop');
const detailsUl = document.querySelector('.details_fic');

if (databaseDog.child('animal_name').val()) {
    const liName = document.createElement('li');
    liName.textContent = databaseDog.child('animal_name').val();
}
if (databaseDog.child('prop_name').val()) {
    const liNameProp = document.createElement('li');
    liNameProp.textContent = databaseDog.child('prop_name').val();
}
if (databaseDog.child('prop_city').val()) {
    const liCityProp = document.createElement('li');
    liCityProp.textContent = databaseDog.child('prop_city').val();
}
if (databaseDog.child('animal_esp').val()) {
    const liEsp = document.createElement('li');
    liEsp.textContent = databaseDog.child('animal_esp').val();
}
if (databaseDog.child('animal_sex').val()) {
    const liSex = document.createElement('li');
    liSex.textContent = databaseDog.child('animal_sex').val();
}
if (databaseDog.child('prop_phone').val()) {
    const liPhone = document.createElement('li');
    liPhone.textContent = databaseDog.child('prop_phone').val();
}
if (databaseDog.child('person_adress').val()) {
    const liAdress = document.createElement('li');
    liSex.textContent = databaseDog.child('person_adress').val();
}
if (databaseDog.child('regis_date').val()) {
    const liDate = document.createElement('li');
    liDate.textContent = databaseDog.child('regis_date').val();
}
if (databaseDog.child('animal_breed').val()) {
    const liBreed = document.createElement('li');
    liBreed.textContent = databaseDog.child('animal_breed').val();
}

const dogClinic = databaseDog.child('clinical_info');

dogClinic.orderByKey().on('value', (snapshot) => {
    snapshot.forEach((child) => {
        const detailsLi = document.createElement('li');
        const fiAmn = child.child('fi_Amn').val();
        const fiDiag = child.child('fi_Diag').val();
        const fiExp = child.child('fi_Exp').val();
        const fiObs = child.child('fi_obs').val();
        const fiTrat = child.child('fi_trat').val();
        detailsLi.innerHTML = `<details>
                                <summary>02/11/2012</summary>
                                <h2>Amnesis</h2>
                                <p>
                                ${fiAmn}
                                </p>
                                <h2>Diagnóstico</h2>
                                <p>
                                ${fiDiag}
                                </p>
                                <h2>Exploración física</h2>
                                <p>
                                ${fiExp}
                                </p>
                                <h2>Observaciones</h2>
                                <p>
                                ${fiObs}
                                </p>
                                <h2>Tratamiento</h2>
                                <p>
                                ${fiTrat}
                                </p>
                            </details>`;
        detailsUl.append(detailsLi);
    });
});

dogData.append(liName);
dogData.append(liEsp);
dogData.append(liBreed);
dogData.append(liSex);
dogData.append(liDate);

propData.append(liNameProp);
propData.append(liPhone);
propData.append(liAdress);
propData.append(liCityProp);
