const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const inputId = document.querySelector('#id')
const inputName = document.querySelector('#name')
const inputType = document.querySelector('#type')
const inputCredits = document.querySelector('#credits')
const btnAdd = document.querySelector('#btnAdd')

let _id

async function openModal(edit = false, id = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    courses = await getCourses()
    course = courses.find(c => c.id == id)

    if (edit) {
        document.querySelector('.modal-container form #id').disabled = true
        document.querySelector('.modal-container form #type').disabled = true
        inputId.value = course.id
        inputName.value = course.name
        inputType.value = course.typeCourse
        inputCredits.value = course.credits
        _id = id
    } else {
        document.querySelector('.modal-container form #id').disabled = false
        document.querySelector('.modal-container form #type').disabled = false
        inputId.value = ''
        inputName.value = ''
        inputType.value = ''
        inputCredits.value = ''
    }

}

function editCourse(id) {
    openModal(true, id)
}

async function deleteCourse(id) {
    try {
        const response = await axios.delete(`http://localhost:3000/courses/${id}`)
        const course = response.data
        alert(`Se eliminó al curso con código ${course.id}`)

    } catch (errors) {
        console.error(errors)
    }

    loadData()
}

function insertCourse(course) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${course.id}</td>
    <td>${course.name}</td>
    <td>${course.typeCourse}</td>
    <td class="acao">${course.credits}</td>
    <td class="acao">${course.students.length}</td>
    <td class="acao">
      <button onclick="viewCourse(${course.id})"><i class='bx bx-notepad' ></i></button>
    </td>
    <td class="acao">
      <button onclick="editCourse(${course.id})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteCourse(${course.id})"><i class='bx bx-trash'></i></button>
    </td>
  `
    tbody.appendChild(tr)
}

btnAdd.onclick = async (e) => {

    if (inputId.value == '' || inputName.value == '' || inputType.value == '' || inputCredits.value == '') {
        return
    }

    e.preventDefault();

    const course = {
        id: +inputId.value,
        name: inputName.value,
        typeCourse: inputType.value,
        credits: +inputCredits.value,
    }

    if (_id !== undefined) { //Actualizar
        await updateCourse(course)

    } else { //Agregar
        await createCourse(course)
    }


    modal.classList.remove('active')
    loadData()
    _id = undefined
}

async function loadData() {
    courses = await getCourses()
    tbody.innerHTML = ''
    courses.forEach((course) => {
        insertCourse(course)
    })
}

const getCourses = async () => {
    try {
        const response = await axios.get('http://localhost:3000/courses')

        const courses = response.data

        return courses
    } catch (errors) {
        console.error(errors)
    }
}

const createCourse = async (course) => {
    try {
        const response = await axios.post('http://localhost:3000/courses', course)

        const newCourse = response.data
        alert(`Se creó el curso con código ${newCourse.id}`)
    } catch (errors) {
        alert('Error al crear el curso')
        console.log(errors)
    }

    loadData()
}

const updateCourse = async (course) => {
    try {
        const response = await axios.patch('http://localhost:3000/courses', course)

        const updated = response.data
        alert(`Se actualizó la información del curso con código ${updated.id}`)
    } catch (errors) {
        console.error(errors)
    }

    loadData()
}

const viewCourse = (id) => {
    localStorage.setItem('viewCourseId', id)
    window.location.replace('grades.html')
}

loadData()