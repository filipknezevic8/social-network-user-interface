function getAll() {
    fetch('http://localhost:17462/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed. Status: ' + response.status)
            }
            return response.json()
        })
        .then(users => renderData(users))
        .catch(error => {
            console.error('Error:', error.message)
            alert('An error occurred while loading users. Please try again.')
        })
}

function renderData(data) {
    let tableBody = document.querySelector('table tbody')
    tableBody.innerHTML = ''

    let tableHeader = document.querySelector('table thead')
    let noDataMessage = document.querySelector('#no-data-message')

    if (data.length === 0) {
        tableHeader.classList.add('hidden')
        noDataMessage.classList.remove('hidden')
        return
    }

    noDataMessage.classList.add('hidden')
    tableHeader.classList.remove('hidden')

    data.forEach(user => {
        let newRow = document.createElement('tr')

        let usernameCell = document.createElement('td')
        usernameCell.textContent = user.username
        newRow.appendChild(usernameCell)

        let firstNameCell = document.createElement('td')
        firstNameCell.textContent = user.firstName
        newRow.appendChild(firstNameCell)

        let lastNameCell = document.createElement('td')
        lastNameCell.textContent = user.lastName
        newRow.appendChild(lastNameCell)

        let birthDateCell = document.createElement('td')
        birthDateCell.textContent = new Date(user.birthDate).toLocaleDateString()
        newRow.appendChild(birthDateCell)

        // Actions (Edit + Delete)
        let actionsCell = document.createElement('td')

        let editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.addEventListener('click', function () {
            window.location.href = './userForm/userForm.html?id=' + user.id
        })
        actionsCell.appendChild(editButton)

        let deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', function () {
            fetch('http://localhost:17462/api/users/' + user.id, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        const error = new Error('Request failed. Status: ' + response.status)
                        error.response = response
                        throw error
                    }
                    getAll()
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    if (error.response && error.response.status === 404) {
                        alert('User not found!')
                    } else {
                        alert('An error occurred while deleting the user.')
                    }
                })
        })
        actionsCell.appendChild(deleteButton)

        newRow.appendChild(actionsCell)
        tableBody.appendChild(newRow)
    })
}

document.addEventListener('DOMContentLoaded', getAll)

let addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', function () {
    window.location.href = './userForm/userForm.html'
})