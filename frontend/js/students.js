const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const inputCode = document.querySelector('#code')
const inputName = document.querySelector('#name')
const inputLastName = document.querySelector('#lastName')
const btnAdd = document.querySelector('#btnAdd')

let id

async function openModal(edit = false, code = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    students = await getStudents()
    student = students.find(s => s.code == code)

    if (edit) {
        document.querySelector('.modal-container form #code').disabled = true
        btnAdd.innerHTML = 'Guardar Cambios'
        inputCode.value = student.code
        inputName.value = student.name
        inputLastName.value = student.lastName
        id = code
    } else {
        document.querySelector('.modal-container form #code').disabled = false
        btnAdd.innerHTML = 'Crear Estudiante'
        inputCode.value = ''
        inputName.value = ''
        inputLastName.value = ''
    }

}

function editStudent(code) {
    openModal(true, code)
}

async function deleteStudent(code) {
    try {
        const response = await axios.delete(`http://localhost:3000/students/${code}`)
        const student = response.data
        alert(`Se eliminó al estudiante con código ${student.code}`)

    } catch (errors) {
        console.error(errors)
    }

    loadData()
}

function insertStudent(student) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${student.code}</td>
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td class="acao">0</td>
    <td class="acao">${student.courses.length}</td>
    <td class="acao">
      <button onclick="editStudent(${student.code})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteStudent(${student.code})"><i class='bx bx-trash'></i></button>
    </td>
  `
    tbody.appendChild(tr)
}

btnAdd.onclick = async (e) => {

    if (inputCode.value == '' || inputName.value == '' || inputLastName.value == '') {
        return
    }

    e.preventDefault();

    const student = {
        code: +inputCode.value,
        name: inputName.value,
        lastName: inputLastName.value,
    }

    if (id !== undefined) { //Actualizar
        await updateStudent(student)

    } else { //Agregar
        await createStudent(student)
    }


    modal.classList.remove('active')
    loadData()
    id = undefined
}

async function loadData() {
    students = await getStudents()
    tbody.innerHTML = ''
    students.forEach((student) => {
        insertStudent(student)
    })
}

const getStudents = async () => {
    try {
        const response = await axios.get('http://localhost:3000/students')

        const students = response.data

        return students
    } catch (errors) {
        console.error(errors)
    }
}

const createStudent = async (student) => {
    try {
        const response = await axios.post('http://localhost:3000/students', student)

        const newStudent = response.data
        alert(`Se creó al estudiante con código ${newStudent.code}`)
    } catch (errors) {
        alert('Ya existe un estudiante con ese código')
        console.error(errors)
    }

    loadData()
}

const updateStudent = async (student) => {
    try {
        const response = await axios.patch('http://localhost:3000/students', student)

        const updated = response.data
        alert(`Se actualizó la información del estudiante con código ${updated.code}`)
    } catch (errors) {
        console.error(errors)
    }

    loadData()
}

const showBest = async () => {
    try {
        const response = await axios.get('http://localhost:3000/students/best')

        const students = response.data
        tbody.innerHTML = ''
        students.forEach((student) => {
            insertStudent(student)
        })

    } catch (errors) {
        console.error(errors)
    }
}

const showNotEnrolled = async () => {
    try {
        const response = await axios.get('http://localhost:3000/students/not-enrolled')

        const students = response.data
        tbody.innerHTML = ''
        students.forEach((student) => {
            insertStudent(student)
        })

    } catch (errors) {
        console.error(errors)
    }
}

loadData()