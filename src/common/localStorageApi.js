const LS_KEY = 'contacts';

function getContacts() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY));
  } catch (error) {
    console.log('ERROR!' + error.message);
    return [];
  }
}

function saveContacts(contacts) {
  localStorage.setItem(LS_KEY, JSON.stringify(contacts));
}

const api = { getContacts, saveContacts };
export default api;
