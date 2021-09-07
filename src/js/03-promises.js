import { Notify } from 'notiflix';

const promiseOn = {
  form: document.querySelector('.form'),
  btn: document.querySelector('.js-btn'),
};

promiseOn.btn.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();

  const { delay, step, amount } = Object.fromEntries(new FormData(promiseOn.form));

  for (let i = 0; i < amount; i += 1) {
    createPromise(i, Number(delay) + Number(step) * i)
      .then(onSuccess)
      .catch(onError);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { clickToClose: true });
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { clickToClose: true });
}
