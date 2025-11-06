function getGroupMembers(groupId) {
    fetch('http://localhost:17462/api/groups/' + groupId + '/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed. Status: ' + response.status)
            }
            return response.json()
        })
        .then(users => renderData(users))
        .catch(error => {
            console.error('Error:', error.message)
            alert('An error occurred while loading group members.')
        })
}

function renderData(users) {
    let tableBody = document.querySelector('table tbody')
    tableBody.innerHTML = ''

    let tableHeader = document.querySelector('table thead')
    let noDataMessage = document.querySelector('#no-data-message')

    if (users.length === 0) {
        tableHeader.classList.add('hidden')
        noDataMessage.classList.remove('hidden')
        return
    }

    noDataMessage.classList.add('hidden')
    tableHeader.classList.remove('hidden')

    users.forEach(user => {
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

        tableBody.appendChild(newRow)
    })
}

document.querySelector('#loadBtn').addEventListener('click', function () {
    let groupId = document.querySelector('#groupId').value.trim()
    if (groupId === '') {
        alert('Please enter a group ID.')
        return
    }
    getGroupMembers(groupId)
})

document.querySelector('#backBtn').addEventListener('click', function () {
    window.location.href = '../index.html'
})