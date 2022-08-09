const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const lblCourse = document.querySelector('.container .header span')
const inputCode = document.querySelector('#code')
const inputGrade1 = document.querySelector('#grade1')
const inputGrade2 = document.querySelector('#grade2')
const inputGrade3 = document.querySelector('#grade3')
const inputLab = document.querySelector('#lab')
const btnAdd = document.querySelector('#btnAdd')

let id
const courseId = localStorage.getItem('viewCourseId')

async function openModal(edit = false, studentCode = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    course = await getCourse()
    grades = course.students.find(g => g.studentCode == studentCode)

    if (edit) {
        document.querySelector('.modal-container form #code').disabled = true
        inputCode.value = grades.studentCode
        inputGrade1.value = grades.grade1
        inputGrade2.value = grades.grade2
        inputGrade3.value = grades.grade3
        inputLab.value = (grades.lab)?grades.lab:''
        id = studentCode
    } else {
        document.querySelector('.modal-container form #code').disabled = false
        inputCode.value = ''
        inputGrade1.value = ''
        inputGrade2.value = ''
        inputGrade3.value = ''
        inputLab.value = ''
    }

}

function editGrades(studentCode) {
    openModal(true, studentCode)
}

async function delistStudent(studentCode) {
    try {
        const info = {
            courseId: +courseId,
            studentCode: +studentCode
        }
        const response = await axios.delete(`http://localhost:3000/grades/delist/`, {data: info})
        const delisted= response.data
        alert(`Se eliminó al estudiante ${delisted.studentCode} del curso ${delisted.courseId}`)

    } catch (errors) {
        console.error(errors)
    }

    loadData()
}

function insertGrades(grades) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${grades.studentCode}</td>
    <td>${grades.grade1}</td>
    <td>${grades.grade2}</td>
    <td>${grades.grade3}</td>
    <td>${(grades.lab)?grades.lab:''}</td>
    <td>${grades.finalGrade}</td>
    <td class="acao">
      <button onclick="editGrades(${grades.studentCode})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="delistStudent(${grades.studentCode})"><i class='bx bx-trash'></i></button>
    </td>
  `
    tbody.appendChild(tr)
}

btnAdd.onclick = async (e) => {

    if (inputCode.value == '' || inputGrade1.value == '' || inputGrade2.value == '' 
    || inputGrade3.value == '' || inputLab.value == '') {
        return
    }

    e.preventDefault();

    const grades = {
        courseId: +courseId,
        studentCode: +inputCode.value,
        grades: [+inputGrade1.value, +inputGrade2.value, +inputGrade3.value, +inputLab.value]
    }

    if (id !== undefined) { //Actualizar
        await updateGrades(grades)

    } else { //Agregar
        await enrollStudent(grades)
    }


    modal.classList.remove('active')
    loadData()
    id = undefined
}

async function loadData() {
    course = await getCourse()
    
    lblCourse.innerHTML = `${course.name} - ${course.id}
    <br>Tipo: ${course.typeCourse}`

    tbody.innerHTML = ''
    course.students.forEach((grades) => {
        insertGrades(grades)
    })
}

const getCourse = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/courses/sorted/${courseId}`)

        const courses = response.data

        return courses
    } catch (errors) {
        console.error(errors)
    }
}

const enrollStudent = async (grades) => {
    try {
        const response = await axios.post('http://localhost:3000/grades/enroll/', grades)

        const newGrades = response.data
        alert(`Ahora el estudiante ${newGrades.studentCode} está inscrito en el curso ${newGrades.courseId}`)
    } catch (errors) {
        alert('Error al inscribir al estudiante')
        console.log(errors)
    }

    loadData()
}

const updateGrades = async (course) => {
    try {
        const response = await axios.patch('http://localhost:3000/grades', course)

        const updated = response.data
        alert(`Se actualizaron las notas del estudiante ${updated.studentCode} en el curso ${updated.courseId}`)
    } catch (errors) {
        console.error(errors)
    }

    loadData()
}

const failing = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/courses/failing/${courseId}`)

        const course = response.data
        tbody.innerHTML = ''
        course.students.forEach((grades) => {
            insertGrades(grades)
        })

    } catch (errors) {
        console.error(errors)
    }
}

loadData()