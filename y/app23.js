const auth = firebase.auth();

const animalName = document.querySelector('#an-name');
const animalEsp = document.querySelector('#an-esp');
const animalBreed = document.querySelector('#an-breed');
const animalSex = document.querySelector('#an-sex');

const personName = document.querySelector('#p-name');
const personPhone = document.querySelector('#p-phone');
const personCity = document.querySelector('#p-city');
const personAdress = document.querySelector('#p-adress');

const fichaAnamnesis = document.querySelector('#fi-amn');
const fichaDiagnostico = document.querySelector('#fi-diag');
const fichaExploracion = document.querySelector('#fi-exp');
const fichaObservacion = document.querySelector('#fi-obv');
const fichaTratamiento = document.querySelector('#fi-trat');

const todayDate = new Date();
const euroDate =
    todayDate.getDate() +
    '-' +
    todayDate.getMonth() +
    '-' +
    todayDate.getFullYear();
//Button

const createButton = document.querySelector('.create-pc');

//Getting data

const database = firebase.database();
const dataref = database.ref();

setTimeout(function () {
    auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser === null) {
            window.location = './index.html';
        }
    });
}, 2000);

createButton.addEventListener('click', (e) => {
    auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser != null) {
            if (
                animalEsp.value &&
                animalName.value &&
                personName.value &&
                personPhone.value
            ) {
                try {
                    dataref
                        .child('animalejos')
                        .push()
                        .set({
                            animal_name: animalName.value,
                            animal_esp: animalEsp.value,
                            animal_breed: animalBreed.value,
                            animal_sex: animalSex.value,
                            prop_name: personName.value,
                            prop_phone: personPhone.value,
                            prop_city: personCity.value,
                            person_adress: personAdress.value,
                            regis_date: euroDate,
                            clinical_info: {
                                [euroDate]: {
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
                                },
                            },
                        });
                    dataref.on('child_added', (snapshot) => {
                        alert('Has a??adido a una nueva mascota');
                    });
                } catch (error) {
                    alert(error);
                }
            } else {
                alert('Rellena los campos obligatorios.');
            }
        } else {
            window.open('./index.html').focus();
        }
    });
});
