'use strict';

var phoneBook = [];
    
function checkPhone(phone) {
    var reg = /^(\+?\d{1,2}\s*)?(\(\d{3}\)|\d{3})+\s*\d{3}(\s*|\-)?\d(\s*|\-)?\d{3}$/;
    return reg.test(phone);
}

function checkEmail(email) {
    var reg = /^[-(\w|а-я).]+@([a-z0-9а-я]+[-а-яa-z0-9]+\.)+[а-яa-z0-9]{2,4}$/i;
    return reg.test(email);
}
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
   if(checkPhone(phone) && checkEmail(email)) {
      var contact = {
	     name: name,
		 phone: phone,
		 email: email
	  };
	  phoneBook.push(contact);
	  return true;
   };
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    var contacts = [];
	query = query.toLowerCase();
        for (var i = 0; i < phoneBook.length; i++) {
            var contact = phoneBook[i];
            var keys = Object.keys(contact);
            for (var j = 0; j < keys.length; j++) {
                var contactLower = contact[keys[j]].toLowerCase();
                if (contactLower.indexOf(query) != -1) {
                    contacts.push(contact);
                    break;
                }
            }
        }
	console.log('По запросу найдено: ' + contacts.length);
    for (var i = 0; i < contacts.length; i++) {
        console.log(getContact(contacts[i]));
    }
    console.log('');
	return contacts;
};

function getContact(contact) {
    var info = '';
    var keys = Object.keys(contact);
    for (var i = 0; i < keys.length; i++) {
        info += contact[keys[i]] + ', ';
    }
    return info;
}
/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var contacts = module.exports.find(query);
    filterBook(contacts);
};

function filterBook(contacts) {
    var indices = getIndices(contacts);
    for (var i = indices.length - 1; i >= 0; i--) {
        phoneBook.splice(indices[i], 1);
    }
    console.log('Удалено: ' + indices.length + '\n');
}

function getIndices(contacts) {
    var indices = [];
    for (var i = 0; i < contacts.length; i++) {
        for (var j = 0; j < phoneBook.length; j++) {
            if (contacts[i] === phoneBook[j]) {
                indices.push(j);
            }
        }
    }
    return indices;
}

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    var count = 0;
    var contacts = data.split('\r\n');
    for (var i in contacts) {
        var contact = contacts[i].split(';');
        if (module.exports.add(contact[0], contact[1], contact[2])) {
		    console.log(contacts[i]);
            count++;
        }
    }
    console.log('Добавлено записей:' + count);
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {

    // Ваша чёрная магия здесь

};
