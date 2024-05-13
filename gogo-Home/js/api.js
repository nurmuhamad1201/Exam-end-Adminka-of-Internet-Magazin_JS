import { getData } from "./dom.js";

let api = "http://localhost:45000/api/data";



async function get() {
    try {
        let response = await fetch(api); 
        if (response.ok) {
            let data = await response.json();
            getData(data);
        } else {
            console.error('Failed to fetch data:', response.status);
        }
    } catch (error) {
        console.error(error);
    }
}


let search = document.querySelector(".search");

search.oninput = async () => {
    let url = api;
    let value = search.value.toUpperCase().trim();
    try {
      const {data} = await axios.get(url)

        let newUser = data.filter((el) => {
            return el.fields.name.toUpperCase().trim().includes(value);
        });

        getData(newUser);
    } catch (error) {
        console.error(error);
    }
};

async function deleteUser(id) {
    try {
        let {data} = await axios.delete(`${api}/${id}`)
        get()
    } catch (error) {
        console.error(error);
    }


}



export { get, deleteUser};


