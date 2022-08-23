'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const btnShow = document.querySelectorAll('.show-modal');
const btnClose = document.querySelector('.close-modal');

const esc = 'esc'.charCodeAt(0);

btnShow.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();

        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
    });
});

const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keypress', e => {
    if (e.key === 'c' && !modal.classList.contains('hidden')) closeModal();
});