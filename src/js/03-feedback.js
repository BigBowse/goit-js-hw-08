import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
// const textArea = document.querySelector('.feedback-form textarea');
// const input = document.querySelector('.feedback-form input');

const STORAGE_KEY = 'feedback-form-state';
const savedMessage = localStorage.getItem(STORAGE_KEY);
let formData = JSON.parse(savedMessage) ?? {};

function onFormSubmit(e) {
    e.preventDefault();

    if (!e.target.elements.email.value || !e.target.elements.message.value)  {
        return window.alert('Please, fill in all the necessary fields');
    }

    e.currentTarget.reset();
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    const message  = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, message);
}

function populateTextarea() {
    if(savedMessage) {
        for (key of keys) {
            form[key] = formData[key];
        }
        // form.elements.message.value = formData?.message;
        // form.elements.email.value = formData?.email;
    }
}

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();