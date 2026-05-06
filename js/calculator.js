/**
 * calculator.js
 * Calculadora de Cemento, Mortero y Hormigón
 *
 * Densidades de referencia:
 *   Cemento (a granel):  1 500 kg/m³
 *   Arena (seca):        1 600 kg/m³
 *   Grava:               1 750 kg/m³
 *
 * Factores de esponjamiento:
 *   Mortero:  1,30  (volumen seco / volumen húmedo)
 *   Hormigón: 1,54  (volumen seco / volumen húmedo)
 */

'use strict';

// ─── Densidades ───────────────────────────────────────────────────────────────
const DENSITY_CEMENT  = 1500;  // kg/m³
const DENSITY_SAND    = 1600;  // kg/m³
const DENSITY_GRAVEL  = 1750;  // kg/m³
const WC_RATIO        = 0.50;  // relación agua/cemento (en peso)

// Factor de esponjamiento
const SWELL_MORTAR   = 1.30;
const SWELL_CONCRETE = 1.54;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the numeric value of an input field, or NaN if invalid.
 * @param {string} id
 * @returns {number}
 */
function getVal(id) {
  return parseFloat(document.getElementById(id).value);
}

/**
 * Returns the value of a <select> element.
 * @param {string} id
 * @returns {string}
 */
function getSel(id) {
  return document.getElementById(id).value;
}

/**
 * Rounds a number to the given decimal places.
 * @param {number} n
 * @param {number} dp
 * @returns {number}
 */
function round(n, dp = 2) {
  return Math.round(n * 10 ** dp) / 10 ** dp;
}

/**
 * Formats a number with Spanish locale (dot as thousand separator, comma as decimal).
 * @param {number} n
 * @param {number} dp
 * @returns {string}
 */
function fmt(n, dp = 2) {
  return n.toLocaleString('es-ES', { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

/**
 * Builds an HTML result card with the given items.
 * @param {Array<{label:string, value:string, unit:string, highlight?:boolean}>} items
 * @returns {string}
 */
function buildResultHTML(items) {
  const itemsHTML = items.map(({ label, value, unit, highlight }) => `
    <div class="result-item${highlight ? ' highlight' : ''}">
      <span class="ri-label">${label}</span>
      <span class="ri-value">${value}</span>
      <span class="ri-unit">${unit}</span>
    </div>
  `).join('');

  return `
    <div class="result-title">✅ Resultado</div>
    <div class="result-grid">${itemsHTML}</div>
  `;
}

/**
 * Shows an error inside a result box.
 * @param {string} boxId
 * @param {string} message
 */
function showError(boxId, message) {
  const box = document.getElementById(boxId);
  box.innerHTML = `<div class="result-error">⚠️ ${message}</div>`;
  box.classList.remove('hidden');
}

/**
 * Validates that every value is a finite positive number.
 * @param {...number} values
 * @returns {boolean}
 */
function allPositive(...values) {
  return values.every((v) => isFinite(v) && v > 0);
}

// ─── Cemento ──────────────────────────────────────────────────────────────────

/**
 * Calculates volume and weight of pure cement for a given surface.
 * @param {number} length   metres
 * @param {number} width    metres
 * @param {number} thickness centimetres
 * @param {number} bagSize  kg per bag
 * @returns {{ volume:number, weightKg:number, bags:number }}
 */
function calcCemento(length, width, thickness, bagSize) {
  const volume  = length * width * (thickness / 100);            // m³
  const weightKg = round(volume * DENSITY_CEMENT);               // kg
  const bags    = Math.ceil(weightKg / bagSize);                 // units
  return { volume: round(volume, 3), weightKg, bags };
}

// ─── Mortero ──────────────────────────────────────────────────────────────────

/**
 * Parses a ratio string like "1:4" → [1, 4].
 * @param {string} ratio
 * @returns {[number, number]}
 */
function parseMorteroRatio(ratio) {
  const [c, s] = ratio.split(':').map(Number);
  return [c, s];
}

/**
 * Calculates materials for mortar.
 * @param {number} length
 * @param {number} width
 * @param {number} thickness   cm
 * @param {string} ratio       e.g. "1:4"
 * @param {number} bagSize     kg
 */
function calcMortero(length, width, thickness, ratio, bagSize) {
  const [cParts, sParts] = parseMorteroRatio(ratio);
  const totalParts       = cParts + sParts;

  const wetVol  = length * width * (thickness / 100);            // m³ húmedo
  const dryVol  = wetVol * SWELL_MORTAR;                         // m³ seco

  const cementVol  = round(dryVol * cParts / totalParts, 3);     // m³
  const cementKg   = round(cementVol * DENSITY_CEMENT);          // kg
  const bags       = Math.ceil(cementKg / bagSize);
  const sandVol    = round(dryVol * sParts / totalParts, 3);     // m³
  const sandKg     = round(sandVol * DENSITY_SAND);              // kg
  const waterL     = round(cementKg * WC_RATIO);                 // litros

  return {
    wetVol:    round(wetVol, 3),
    dryVol:    round(dryVol, 3),
    cementVol,
    cementKg,
    bags,
    sandVol,
    sandKg,
    waterL,
  };
}

// ─── Hormigón ─────────────────────────────────────────────────────────────────

/**
 * Parses a concrete ratio string like "1:2:4" → [1, 2, 4].
 * @param {string} ratio
 * @returns {[number, number, number]}
 */
function parseHormigonRatio(ratio) {
  const [c, s, g] = ratio.split(':').map(Number);
  return [c, s, g];
}

/**
 * Calculates materials for concrete.
 * @param {number} length
 * @param {number} width
 * @param {number} height  metres (NOT cm)
 * @param {string} ratio   e.g. "1:2:4"
 * @param {number} bagSize kg
 */
function calcHormigon(length, width, height, ratio, bagSize) {
  const [cParts, sParts, gParts] = parseHormigonRatio(ratio);
  const totalParts               = cParts + sParts + gParts;

  const wetVol   = length * width * height;                      // m³ húmedo
  const dryVol   = wetVol * SWELL_CONCRETE;                      // m³ seco

  const cementVol  = round(dryVol * cParts / totalParts, 3);
  const cementKg   = round(cementVol * DENSITY_CEMENT);
  const bags       = Math.ceil(cementKg / bagSize);
  const sandVol    = round(dryVol * sParts / totalParts, 3);
  const sandKg     = round(sandVol * DENSITY_SAND);
  const gravelVol  = round(dryVol * gParts / totalParts, 3);
  const gravelKg   = round(gravelVol * DENSITY_GRAVEL);
  const waterL     = round(cementKg * WC_RATIO);

  return {
    wetVol:    round(wetVol, 3),
    dryVol:    round(dryVol, 3),
    cementVol,
    cementKg,
    bags,
    sandVol,
    sandKg,
    gravelVol,
    gravelKg,
    waterL,
  };
}

// ─── Event Handlers ───────────────────────────────────────────────────────────

document.getElementById('form-cemento').addEventListener('submit', function (e) {
  e.preventDefault();
  const resultBox = document.getElementById('result-cemento');

  const length    = getVal('c-length');
  const width     = getVal('c-width');
  const thickness = getVal('c-thickness');
  const bagSize   = parseFloat(getSel('c-bag'));

  if (!allPositive(length, width, thickness)) {
    showError('result-cemento', 'Por favor, introduce valores válidos y positivos en todos los campos.');
    return;
  }

  const r = calcCemento(length, width, thickness, bagSize);

  resultBox.innerHTML = buildResultHTML([
    { label: 'Volumen',         value: fmt(r.volume, 3),    unit: 'm³' },
    { label: 'Peso total',      value: fmt(r.weightKg, 0),  unit: 'kg',   highlight: true },
    { label: `Sacos (${bagSize} kg)`, value: fmt(r.bags, 0), unit: 'sacos', highlight: true },
  ]);
  resultBox.classList.remove('hidden');
});

document.getElementById('form-mortero').addEventListener('submit', function (e) {
  e.preventDefault();

  const length    = getVal('m-length');
  const width     = getVal('m-width');
  const thickness = getVal('m-thickness');
  const ratio     = getSel('m-ratio');
  const bagSize   = parseFloat(getSel('m-bag'));

  if (!allPositive(length, width, thickness)) {
    showError('result-mortero', 'Por favor, introduce valores válidos y positivos en todos los campos.');
    return;
  }

  const r = calcMortero(length, width, thickness, ratio, bagSize);
  const resultBox = document.getElementById('result-mortero');

  resultBox.innerHTML = buildResultHTML([
    { label: 'Vol. húmedo',              value: fmt(r.wetVol, 3),    unit: 'm³' },
    { label: 'Vol. seco',                value: fmt(r.dryVol, 3),    unit: 'm³' },
    { label: 'Cemento',                  value: fmt(r.cementKg, 0),  unit: 'kg',   highlight: true },
    { label: `Sacos cemento (${bagSize} kg)`, value: fmt(r.bags, 0), unit: 'sacos', highlight: true },
    { label: 'Arena (volumen)',          value: fmt(r.sandVol, 3),   unit: 'm³' },
    { label: 'Arena (peso aprox.)',      value: fmt(r.sandKg, 0),    unit: 'kg' },
    { label: 'Agua aprox.',              value: fmt(r.waterL, 0),    unit: 'litros' },
  ]);
  resultBox.classList.remove('hidden');
});

document.getElementById('form-hormigon').addEventListener('submit', function (e) {
  e.preventDefault();

  const length  = getVal('h-length');
  const width   = getVal('h-width');
  const height  = getVal('h-height');
  const ratio   = getSel('h-ratio');
  const bagSize = parseFloat(getSel('h-bag'));

  if (!allPositive(length, width, height)) {
    showError('result-hormigon', 'Por favor, introduce valores válidos y positivos en todos los campos.');
    return;
  }

  const r = calcHormigon(length, width, height, ratio, bagSize);
  const resultBox = document.getElementById('result-hormigon');

  resultBox.innerHTML = buildResultHTML([
    { label: 'Vol. húmedo',              value: fmt(r.wetVol, 3),    unit: 'm³' },
    { label: 'Vol. seco',                value: fmt(r.dryVol, 3),    unit: 'm³' },
    { label: 'Cemento',                  value: fmt(r.cementKg, 0),  unit: 'kg',   highlight: true },
    { label: `Sacos cemento (${bagSize} kg)`, value: fmt(r.bags, 0), unit: 'sacos', highlight: true },
    { label: 'Arena (volumen)',          value: fmt(r.sandVol, 3),   unit: 'm³' },
    { label: 'Arena (peso aprox.)',      value: fmt(r.sandKg, 0),    unit: 'kg' },
    { label: 'Grava (volumen)',          value: fmt(r.gravelVol, 3), unit: 'm³' },
    { label: 'Grava (peso aprox.)',      value: fmt(r.gravelKg, 0),  unit: 'kg' },
    { label: 'Agua aprox.',              value: fmt(r.waterL, 0),    unit: 'litros' },
  ]);
  resultBox.classList.remove('hidden');
});

// ─── Tab switching ────────────────────────────────────────────────────────────

document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    const target = this.dataset.tab;

    // Update buttons
    document.querySelectorAll('.tab-btn').forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-selected', 'true');

    // Update panels
    document.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.remove('active');
    });
    document.getElementById('tab-' + target).classList.add('active');
  });
});
