const fs = require('fs');
let phonebookData = JSON.parse(fs.readFileSync('./models/phonebookData.json', 'utf8'));

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

module.exports = {
    getIndex: async (req, res) => {
        res.render('index', {
            phonebook: phonebookData
        });
    },

    getAddIndex: async (req, res) => {
        res.render('indexAdd', {
            phonebook: phonebookData
        });
    },

    getUpdateIndex: async (req, res) => {
        const phone = req.params.phone;
        const itemToUpdate = phonebookData.find(item => item.phone === phone);
        res.render('indexUpdate', {
            itemToUpdate,
            phonebook: phonebookData
        });
    },

    addController: async (req, res) => {
        const { name, phone } = req.body;

        if (!validatePhoneNumber(phone)) {
            return res.status(400).send('Invalid phone number');
        }
        
        const existingEntry = phonebookData.find(entry => entry.phone === phone);
        if (existingEntry) {
            return res.status(400).send('Phone number already exists');
        }
        
        const newData = {
            name: name,
            phone: phone
        };

        phonebookData.push(newData);

        fs.writeFileSync('./models/phonebookData.json', JSON.stringify(phonebookData));

        res.redirect('/');
    },
    updateController: async (req, res) => {
        const { id, name, phone } = req.body;
        
        if (!validatePhoneNumber(phone)) {
            return res.status(400).send('Invalid phone number');
        }

        const index = phonebookData.findIndex(entry => entry.phone === id);
        if (index !== -1) {
            phonebookData[index] = { name, phone };
            fs.writeFileSync('./models/phonebookData.json', JSON.stringify(phonebookData));
        }

        res.redirect('/');
    },
    deleteController: async (req, res) => {
        const { phone } = req.body;

        if (!validatePhoneNumber(phone)) {
            return res.status(400).send('Invalid phone number');
        }

        phonebookData = phonebookData.filter(entry => entry.phone !== phone);

        fs.writeFileSync('./models/phonebookData.json', JSON.stringify(phonebookData));

        res.redirect('/');
    }
}