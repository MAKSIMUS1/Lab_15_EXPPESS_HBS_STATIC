document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.querySelector('input[name="name"]');
    const deleteButton = document.getElementById('deleteButton');

    inputField.addEventListener('input', function(event) {
        if (event.target.value.length > 0) {
            deleteButton.disabled = true;
        } else {
            deleteButton.disabled = false;
        }
    });
});

document.getElementById('addContactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone')
    };

    fetch('/Add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; 
        } else {
            if (!response.ok) {
                throw new Error('Bad data');
            }
            return response.json();
        }
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
});

function updateFunction() {
    const url = window.location.href;
    const phoneNumber = url.substring(url.lastIndexOf('/') + 1);
    const formData = new FormData(document.getElementById('updateOrDeleteContactForm'));
    const data = {
        id: phoneNumber,
        name: formData.get('name'),
        phone: formData.get('phone')
    };

    fetch('/Update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Bad data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

function deleteFunction() {
    const url = window.location.href;
    const phoneNumber = url.substring(url.lastIndexOf('/') + 1);
    const formData = new FormData(document.getElementById('updateOrDeleteContactForm'));
    const data = {
        id: phoneNumber,
        name: formData.get('name'),
        phone: formData.get('phone')
    };

    fetch('/Delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Bad data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};
