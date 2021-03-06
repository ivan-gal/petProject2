const auth = firebase.auth();
setTimeout(function () {
    auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser === null) {
            window.location = './index.html';
        }
    });
}, 2000);

const database = firebase.database();
const dataref = database.ref().child('animalejos');

const rootRef = database.ref('animalejos');
let currentUrl = window.location.href;
// currentUrl = currentUrl.toString().split('=');
const currentId = currentUrl.slice(
    currentUrl.indexOf('=') + 1,
    currentUrl.length
);

//Get docu things

const todayDate = new Date();
const dogData = document.querySelector('.datos-Perro');
const propData = document.querySelector('.datos-prop');
const detailsUl = document.querySelector('.details_fic');
const deleteBtn = document.querySelector('.delete_btn');

//Add data

const fichaAnamnesis = document.querySelector('#fi-amn');
const fichaDiagnostico = document.querySelector('#fi-diag');
const fichaExploracion = document.querySelector('#fi-exp');
const fichaObservacion = document.querySelector('#fi-obv');
const fichaTratamiento = document.querySelector('#fi-trat');

const formButton = document.querySelector('.form-button');

dataref.orderByKey().on('value', (snapshot) => {
    snapshot.forEach((child) => {
        if (child.key === currentId) {
            const petName = child.child('animal_name').val();
            const petBreed = child.child('animal_breed').val();
            const petSpec = child.child('animal_esp').val();
            const petSex = child.child('animal_sex').val();
            const propName = child.child('prop_name').val();
            const propCity = child.child('prop_city').val();
            const propPhone = child.child('prop_phone').val();
            const propAdress = child.child('person_adress').val();
            const regisDate = child.child('regis_date').val();
            dogData.innerHTML = `<li>${petName}</li>
                        <li>${petSpec}</li>
                        <li>${petName}</li>
                        <li>${petSex}</li>
                        <li>Registro</li>`;
            propData.innerHTML = `<li>${propName}</li>
                        <li>${propPhone}</li>
                        <li>${propAdress}</li>
                        <li>${propCity}</li>
                        <li>${regisDate}</li>`;

            child.forEach((subChild) => {
                if (subChild.key === 'clinical_info') {
                    subChild.forEach((eachClinical) => {
                        const petAmn = eachClinical.child('fi_Amn').val();
                        const petDiag = eachClinical.child('fi_Diag').val();
                        const petObs = eachClinical.child('fi_obs').val();
                        const petTrat = eachClinical.child('fi_trat').val();
                        const petExp = eachClinical.child('fi_Exp').val();
                        const diaDate = eachClinical.child('regis_date').val();
                        const newLi = document.createElement('li');

                        newLi.innerHTML = `
                            <details>
                                <summary>${diaDate}</summary>
                                <h2>Amnesis</h2>
                                <p>
                                ${petAmn}
                                </p>
                                <h2>Diagn??stico</h2>
                                <p>
                                ${petDiag}
                                </p>
                                <h2>Exploraci??n</h2>
                                <p>
                                ${petExp}
                                </p>
                                <h2>Observaci??n</h2>
                                <p>
                                ${petObs}
                                </p>
                                <h2>Tratamiento</h2>
                                <p>
                                ${petTrat}
                                </p>
                            </details>
                        `;
                        detailsUl.append(newLi);
                    });
                }
            });
        }
    });
});

formButton.addEventListener('click', (e) => {
    e.preventDefault();
    database
        .ref(`animalejos/${currentId}/clinical_info`)
        .push()
        .set({
            fi_Amn: fichaAnamnesis.value,
            fi_Diag: fichaDiagnostico.value,
            fi_Exp: fichaExploracion.value,
            fi_trat: fichaTratamiento.value,
            fi_obs: fichaObservacion.value,
            regis_date:
                todayDate.getDate() +
                '-' +
                todayDate.getMonth() +
                '-' +
                todayDate.getFullYear(),
        });
    window.open('./ficha.html?=' + currentId).focus();
});

deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser != null) {
            rootRef.child(currentId).remove();
            window.open('./busqueda.html').focus();
        } else {
            window.open('./index.html').focus();
        }
    });
});
