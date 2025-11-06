const params = new URLSearchParams(window.location.search)
const userId = params.get('id')

const apiUrl = 'http://localhost:17462/api/users/'

if (userId) {
    document.querySelector('#form-title').textContent = 'Edit User'
    loadUser(userId)
}

function loadUser(id) {
    fetch(apiUrl + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error loading user.')
            }
            return response.json()
        })
        .then(user => {
            document.querySelector('#id').value = user.id
            document.querySelector('#username').value = user.username
            document.querySelector('#firstName').value = user.firstName
            document.querySelector('#lastName').value = user.lastName
            document.querySelector('#birthDate').value = user.birthDate.split('T')[0]
        })
        .catch(error => {
            console.error(error)
            alert('Error while loading user data.')
        })
}

document.querySelector('#user-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const user = {
        username: document.querySelector('#username').value.trim(),
        firstName: document.querySelector('#firstName').value.trim(),
        lastName: document.querySelector('#lastName').value.trim(),
        birthDate: document.querySelector('#birthDate').value
    }

    if (!user.username || !user.firstName || !user.lastName || !user.birthDate) {
        alert('All fields are required.')
        return
    }

    if (userId) {
        fetch(apiUrl + userId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.ok) {
                    alert('User updated successfully!')
                    window.location.href = '../index.html'
                } else {
                    alert('Error while updating user.')
                }
            })
    } else {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.ok) {
                    alert('User added successfully!')
                    window.location.href = '../index.html'
                } else {
                    alert('Error while adding user.')
                }
            })
    }
})

document.querySelector('#cancelBtn').addEventListener('click', function () {
    window.location.href = '../index.html'
})