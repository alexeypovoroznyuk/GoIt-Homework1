import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./db", "contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function getlistContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(id) {
  const contacts = await getlistContacts();
  const result = contacts.find((item) => String(item.id) === String(id));
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(id) {
  const contacts = await getlistContacts();
  const idx = contacts.findIndex((item) => String(item.id) === String(id));
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return result;
}

async function addContact(data) {
  const contacts = await getlistContacts();
  const newContact = {
    ...data,
    id: nanoid(),
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

export default {
  getlistContacts,
  getContactById,
  removeContact,
  addContact,
};
