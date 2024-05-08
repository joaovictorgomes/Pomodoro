import { controls } from './elements.js';
import * as actions from './actions.js';
import * as el from './elements.js';
import state from './state.js';
import { updateDisplay } from './timer.js';

export function registerControls() {
    controls.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        if (typeof actions[action] !== "function") {
            return;
        }

        actions[action]();
    });
}

function clearContent(element) {
    element.addEventListener('focus', () => {
        element.textContent = "";
    });

    element.addEventListener('keypress', (event) => {
        if (!/\d/.test(event.key)) {
            event.preventDefault();
        }
    });

    el.minutes.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent
        time = time > 60 ? 60 : time

        state.minutes = time
        updateDisplay()
        el.minutes.removeAttribute('contentditable')
    })

    el.seconds.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent
        time = time > 59 ? 59 : time

        state.seconds = time
        updateDisplay()
        el.minutes.removeAttribute('contentditable')
    })
}

export function setSeconds() {
    clearContent(el.seconds);
}

export function setMinutes() {
    clearContent(el.minutes);
}