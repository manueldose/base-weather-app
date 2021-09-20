import {handleSetSelectedClick} from './period-time.js';

const $tabContainer = document.querySelector('#tabs');
const $tabList = $tabContainer.querySelectorAll('.tab');

const today = new Date();
let weekday = today.getDay();

const week = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]

function nextDay(day) {
  if(day === 6) {
    return 0;
  }
  return day + 1;
}

$tabList.forEach(($tab, index) => {
  $tab.addEventListener('click', handleSelectTabClick);
  if(index === 0) {
    $tab.textContent = 'Hoy';
    weekday = nextDay(weekday);
    return false;
  }
  if(index === 1) {
      $tab.textContent = "Mañana";
      weekday = nextDay(weekday);
      return false;
  }

  $tab.textContent = week[weekday];
  weekday = nextDay(weekday);
})

function handleSelectTabClick(event) {

  const $tabSelected = event.target;
  const $tabActive = document.querySelector('.tab[aria-selected="true"]');// seleccionamos los elementos con atributo aria-selected
  $tabActive.removeAttribute('aria-selected'); // borramos el atributo de los elementos que no esten seleccionados en ese momento
  $tabSelected.setAttribute('aria-selected', true); // mantenemos el atributo en el día seleccionado

  const id = $tabSelected.id;
  const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`);
  const $tabPanelSelected = document.querySelector(`.tabPanel:not([hidden])`);

  const selectedPanelId = id.split("-")[1];
  handleSetSelectedClick(`weather-section-${selectedPanelId}-0`);
  $tabPanel.hidden = false; // mostramos los tabs seleccionados al clicar en un día
  $tabPanelSelected.hidden = true; // ocultamos los demás

}