const casosCovidData = async() => {
    try {
        const res = await fetch('https://www.datos.gov.co/resource/gt2j-8ykr.json')
        const data = await res.json()
        return data
    } catch { console.log }
}

const DEPARTAMENTOS = new Set();
const SEXO = new Set();
const ESTADO = new Set();
const CIUDADES = new Set();

const manageData = async() => {
    const data = await casosCovidData();
    const $departamento = document.querySelector('.departamento');
    const $ciudad = document.querySelector('.ciudad');
    const $sexo = document.querySelector('.sexo');
    const $estado = document.querySelector('.estado');

    const $tbody = document.querySelector('tbody');
    const $template = document.querySelector('tbody template').content;
    const $fragment = document.createDocumentFragment();

    for (const caso of data) {
        $template.getElementById('ID').textContent = caso.id_de_caso
        $template.querySelector('.dmento').textContent = caso.departamento_nom
        $template.querySelector('.cdad').textContent = caso.ciudad_municipio_nom
        $template.querySelector('.edad').textContent = caso.edad
        $template.querySelector('.sex').textContent = caso.sexo
        $template.querySelector('.state').textContent = caso.estado

        let $clone = document.importNode($template, true);
        $fragment.appendChild($clone);
    }
    $tbody.appendChild($fragment);

    data.map(object => {
        DEPARTAMENTOS.add(object.departamento_nom);
        SEXO.add(object.sexo);
        ESTADO.add(object.estado);
        CIUDADES.add(object.ciudad_municipio_nom);
    })

    DEPARTAMENTOS.forEach(departamento => {
        $departamento.innerHTML += `<li><a class="dropdown-item">${departamento}</a></li>`;
    })

    SEXO.forEach(sex => {
        $sexo.innerHTML += `<li><a class="dropdown-item">${sex}</a></li>`;
    })

    CIUDADES.forEach(ciudad => {
        $ciudad.innerHTML += `<li><a class="dropdown-item">${ciudad}</a></li>`;
    })

    ESTADO.forEach(estado => {
        $estado.innerHTML += `<li><a class="dropdown-item">${estado}</a></li>`;
    })

    filtrarSomething($departamento, data, $tbody, $template, $fragment, 'departamento_nom');
    filtrarSomething($ciudad, data, $tbody, $template, $fragment, 'ciudad_municipio_nom');
    filtrarSomething($sexo, data, $tbody, $template, $fragment, 'sexo');
    filtrarSomething($estado, data, $tbody, $template, $fragment, 'estado');
}


const filtrarSomething = (category, data, element, template, fragment, property) => {
    category.addEventListener('click', e => {
        const filtro = data.filter(el => el[property] === e.target.textContent);

        element.innerHTML = ''

        for (const caso of filtro) {
            template.getElementById('ID').textContent = caso.id_de_caso
            template.querySelector('.dmento').textContent = caso.departamento_nom
            template.querySelector('.cdad').textContent = caso.ciudad_municipio_nom
            template.querySelector('.edad').textContent = caso.edad
            template.querySelector('.sex').textContent = caso.sexo
            template.querySelector('.state').textContent = caso.estado

            let $clone = document.importNode(template, true);
            fragment.appendChild($clone);
        }
        element.appendChild(fragment);
    })
}



manageData();