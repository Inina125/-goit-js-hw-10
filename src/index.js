import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryEl = document.querySelector('.country-info');



const handleInput = (e) => {
  const searchQuery = e.target.value.trim();
  fetchCountries(searchQuery)
    .then(data => {
      countryList.innerHTML = '';
      countryEl.innerHTML = '';
      if (data.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      } else if (data.length === 1) {
        renderCountry(data)
      } else {
        renderCountryList(data)
      }
    })
    .catch(error => {
      Notiflix.Notify.failure("Oops, there is no country with that name");
    })
}
const handleDebounce = debounce(handleInput,300);


function renderCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li class='country-item'>
          <img class='country-image' src="${flags.svg}" />
          <p class='country-name'>${name.official}</p>
        </li>`;
    })
    .join("");
  countryList.insertAdjacentHTML("beforeend", markup);
}

function renderCountry(countries) {
  const markup = countries
    .map(({ name, capital , population , flags, languages }) => {
      return `<li class='country'>
          <div class='country-item'>
            <img class='country-image' src="${flags.svg}" />
            <p class='country-name'>${name.official}</p>
          </div>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${languages}
        </li>`;
    })
    .join("");
  countryList.insertAdjacentHTML("beforeend", markup);
}

searchEl.addEventListener('input',handleDebounce)