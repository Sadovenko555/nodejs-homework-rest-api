const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.find((el) => el.id === contactId) || null;
}

async function addContact(contactData) {
  const data = await listContacts();
  const contact = { id: nanoid(), ...contactData };
  data.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return contact;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
}

async function updateContact(contactId, contactData) {
  const data = await listContacts();
  const index = data.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  
  const updatedContact = { ...data[index], ...contactData };
  data[index] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return updatedContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact };