import contacts from "./contacts.js";
import Yargs from "yargs";
const args = Yargs(process.argv.slice(2)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.table(contact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(args);
