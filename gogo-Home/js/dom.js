import { deleteUser } from "./api.js";

let box = document.querySelector('.box');

function getData(data) {
    box.innerHTML = "";
    data.forEach(elem => {
        let container = document.createElement('div');
        container.classList.add('container');

        let img = document.createElement('img');
        img.src = elem.fields.image[0].url;
        img.classList.add('imgcard');

        let status = document.createElement('h3');
        status.innerHTML = elem.fields.status ? "pro" : "onpro";

        let name = document.createElement('h3');
        name.innerHTML = elem.fields.name;

        let price = document.createElement('p');
        price.innerHTML = elem.fields.price || "Price not available";

        let btnDel = document.createElement('button')
        btnDel.classList.add('btnDel');
        let imgDel = document.createElement('img')
        imgDel.src = '/img/icons8-delete-50.png';
        imgDel.style.width = "30px"
        btnDel.style.border = "none"
        btnDel.style.background = "none"

        btnDel.append(imgDel);
        btnDel.onclick = () => {
            deleteUser(elem.id)
        }

        container.append(status, img, name, price , btnDel);
        box.append(container);
    });
}

const btnAd = document.querySelector('.btnAd');
const diaAd = document.querySelector('.diaAd');
const formAd = document.querySelector('.formAd');
const btnclosAd = document.querySelector('.btnclosAd'); 

btnAd.addEventListener('click', () => {
    diaAd.showModal();
});

btnclosAd.onclick = () => {
    diaAd.close();
    formAd.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('savedData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        getData(parsedData);
    } else {
        console.log('No saved data found.');
    }
});  

function saveDataToLocalStorage(data) {
    localStorage.setItem('savedData', JSON.stringify(data));
}

formAd.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(formAd);

    const newItem = {
        fields: {
            name: formData.get('name'),
            company: formData.get('SelAd'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            status: formData.get('selstat') === 'new',
            image: [
                {
                    id: generateUniqueId(),
                    url: formData.get('img'),
                },
            ],
        },
    };

    try {
        const response = await fetch('http://localhost:45000/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        if (response.ok) {
            const responseData = await response.json();

            saveDataToLocalStorage(responseData);
        } else {
            console.error('Failed to add item:', response.status);
        }
    } catch (error) {
        console.error('Error adding item:', error);
    }

    diaAd.close();
    formAd.reset();
});

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}



let header = document.querySelector('header')



document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.querySelector('.darkMode');
    const lightModeButton = document.querySelector('.lightMode');
    const body = document.body;

    darkModeButton.addEventListener('click', () => {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        box.classList.add('dark-modebo');
        header.classList.add('dark-modebo');
        
        
    });

    lightModeButton.addEventListener('click', () => {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        box.classList.remove('dark-modebo');
        header.classList.remove('dark-modebo');

    });
}); 





export { getData };