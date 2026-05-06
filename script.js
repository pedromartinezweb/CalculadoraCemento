const RECIPES = {
  mortar: {
    strengths: {
      strong: { cement: 1, sand: 3.33, waterRatio: 0.5 },
      medium: { cement: 1, sand: 4.44, waterRatio: 0.55 },
      low: { cement: 1, sand: 6.67, waterRatio: 0.6 },
    },
  },
  concrete: {
    strengths: {
      strong: { cement: 1, sand: 2.37, stone: 2.62, waterRatio: 0.48 },
      medium: { cement: 1, sand: 3.02, stone: 3.09, waterRatio: 0.55 },
      low: { cement: 1, sand: 4.44, stone: 6.25, waterRatio: 0.55 },
    },
  },
};

const STORAGE_KEY = "cement-calc-last-selection";
const PRESETS = ["5", "10", "25", "35", "50"];
const DEFAULT_LANGUAGE = "es";
const SUPPORTED_LANGUAGES = ["es", "en", "fr", "pt"];

const TEXTS = {
  es: {
    htmlLang: "es",
    title: "Calculadora de cemento",
    description: "Calculadora de cemento para dosificar mortero y hormigon por peso en kg.",
    heroEyebrow: "Mortero y hormigon",
    heroTitle: "Receta por peso",
    heroIntro: "Introduce los kg de cemento, elige la mezcla y la resistencia. Calcularemos arena, piedra y agua para usar con bascula.",
    cement: "Cemento",
    inKg: "En kg",
    adjustCement: "Ajustar cemento",
    subtractKg: "Restar 1 kg",
    addKg: "Sumar 1 kg",
    cementKg: "Kilogramos de cemento",
    presets: "Cantidades frecuentes",
    mix: "Mezcla",
    mortar: "Mortero",
    concrete: "Hormigon",
    strength: "Resistencia",
    strong: "Fuerte",
    medium: "Media",
    low: "Baja",
    ratio: "Peso",
    recipeStrength: { strong: "fuerte", medium: "medio", low: "bajo" },
    material: { cement: "Cemento", sand: "Arena", stone: "Piedra", water: "Agua", total: "Arena + piedra" },
    waterUnit: "kg / litros",
    noteConcrete: "Dosificacion por peso para bascula: {cement} kg de cemento, {sand} kg de arena y {stone} kg de piedra.",
    noteMortar: "Dosificacion por peso para bascula: {cement} kg de cemento y {sand} kg de arena.",
    warning: "Dosificacion pensada para bascula. El agua se pesa o mide en litros y se ajusta poco a poco segun humedad de la arena, granulometria y consistencia necesaria.",
    invalidCement: "Los kg de cemento deben ser mayores que cero.",
    invalidMix: "Tipo de mezcla no valido.",
    invalidRecipe: "Tipo de receta no valido.",
    checkData: "Revisa los datos",
    notCalculable: "No se puede calcular",
  },
  en: {
    htmlLang: "en",
    title: "Cement calculator",
    description: "Cement calculator for mortar and concrete mixes by weight in kg.",
    heroEyebrow: "Mortar and concrete",
    heroTitle: "Recipe by weight",
    heroIntro: "Enter the cement kg, choose the mix and strength. We calculate sand, stone and water for scale-based dosing.",
    cement: "Cement",
    inKg: "In kg",
    adjustCement: "Adjust cement",
    subtractKg: "Subtract 1 kg",
    addKg: "Add 1 kg",
    cementKg: "Kilograms of cement",
    presets: "Common amounts",
    mix: "Mix",
    mortar: "Mortar",
    concrete: "Concrete",
    strength: "Strength",
    strong: "Strong",
    medium: "Medium",
    low: "Low",
    ratio: "Weight",
    recipeStrength: { strong: "strong", medium: "medium", low: "low" },
    material: { cement: "Cement", sand: "Sand", stone: "Stone", water: "Water", total: "Sand + stone" },
    waterUnit: "kg / liters",
    noteConcrete: "Weight dosing for scales: {cement} kg of cement, {sand} kg of sand and {stone} kg of stone.",
    noteMortar: "Weight dosing for scales: {cement} kg of cement and {sand} kg of sand.",
    warning: "Dosing is designed for scales. Water is weighed or measured in liters and adjusted gradually according to sand moisture, aggregate size and required consistency.",
    invalidCement: "Cement kg must be greater than zero.",
    invalidMix: "Invalid mix type.",
    invalidRecipe: "Invalid recipe type.",
    checkData: "Check the data",
    notCalculable: "Cannot calculate",
  },
  fr: {
    htmlLang: "fr",
    title: "Calculateur de ciment",
    description: "Calculateur de ciment pour doser mortier et beton au poids en kg.",
    heroEyebrow: "Mortier et beton",
    heroTitle: "Recette au poids",
    heroIntro: "Saisissez les kg de ciment, choisissez le melange et la resistance. Nous calculons le sable, la pierre et l'eau pour une pesee a la balance.",
    cement: "Ciment",
    inKg: "En kg",
    adjustCement: "Ajuster le ciment",
    subtractKg: "Retirer 1 kg",
    addKg: "Ajouter 1 kg",
    cementKg: "Kilogrammes de ciment",
    presets: "Quantites frequentes",
    mix: "Melange",
    mortar: "Mortier",
    concrete: "Beton",
    strength: "Resistance",
    strong: "Fort",
    medium: "Moyen",
    low: "Faible",
    ratio: "Poids",
    recipeStrength: { strong: "fort", medium: "moyen", low: "faible" },
    material: { cement: "Ciment", sand: "Sable", stone: "Pierre", water: "Eau", total: "Sable + pierre" },
    waterUnit: "kg / litres",
    noteConcrete: "Dosage au poids pour balance: {cement} kg de ciment, {sand} kg de sable et {stone} kg de pierre.",
    noteMortar: "Dosage au poids pour balance: {cement} kg de ciment et {sand} kg de sable.",
    warning: "Dosage prevu pour une balance. L'eau se pese ou se mesure en litres et s'ajuste progressivement selon l'humidite du sable, la granulometrie et la consistance souhaitee.",
    invalidCement: "Les kg de ciment doivent etre superieurs a zero.",
    invalidMix: "Type de melange invalide.",
    invalidRecipe: "Type de recette invalide.",
    checkData: "Verifiez les donnees",
    notCalculable: "Calcul impossible",
  },
  pt: {
    htmlLang: "pt",
    title: "Calculadora de cimento",
    description: "Calculadora de cimento para dosar argamassa e concreto por peso em kg.",
    heroEyebrow: "Argamassa e concreto",
    heroTitle: "Receita por peso",
    heroIntro: "Introduza os kg de cimento, escolha a mistura e a resistencia. Calculamos areia, pedra e agua para dosagem com balanca.",
    cement: "Cimento",
    inKg: "Em kg",
    adjustCement: "Ajustar cimento",
    subtractKg: "Subtrair 1 kg",
    addKg: "Adicionar 1 kg",
    cementKg: "Quilogramas de cimento",
    presets: "Quantidades frequentes",
    mix: "Mistura",
    mortar: "Argamassa",
    concrete: "Concreto",
    strength: "Resistencia",
    strong: "Forte",
    medium: "Media",
    low: "Baixa",
    ratio: "Peso",
    recipeStrength: { strong: "forte", medium: "media", low: "baixa" },
    material: { cement: "Cimento", sand: "Areia", stone: "Pedra", water: "Agua", total: "Areia + pedra" },
    waterUnit: "kg / litros",
    noteConcrete: "Dosagem por peso para balanca: {cement} kg de cimento, {sand} kg de areia e {stone} kg de pedra.",
    noteMortar: "Dosagem por peso para balanca: {cement} kg de cimento e {sand} kg de areia.",
    warning: "Dosagem pensada para balanca. A agua e pesada ou medida em litros e ajustada aos poucos conforme a humidade da areia, granulometria e consistencia necessaria.",
    invalidCement: "Os kg de cimento devem ser maiores que zero.",
    invalidMix: "Tipo de mistura invalido.",
    invalidRecipe: "Tipo de receita invalido.",
    checkData: "Revise os dados",
    notCalculable: "Nao e possivel calcular",
  },
};

let currentLanguage = DEFAULT_LANGUAGE;

function roundAmount(value) {
  return Math.round(value * 10) / 10;
}

function formatRatio(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function getTexts(language = currentLanguage) {
  return TEXTS[language] || TEXTS[DEFAULT_LANGUAGE];
}

function detectLanguage(languages) {
  const browserLanguages = languages && languages.length ? languages : [DEFAULT_LANGUAGE];
  const found = browserLanguages
    .map((language) => String(language).toLowerCase().split("-")[0])
    .find((language) => SUPPORTED_LANGUAGES.includes(language));

  return found || DEFAULT_LANGUAGE;
}

function fillTemplate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key]);
}

function calculateRecipe(cementKg, mixKind, strength, language = currentLanguage) {
  const text = getTexts(language);
  const cement = Number(cementKg);
  const mix = RECIPES[mixKind];

  if (!Number.isFinite(cement) || cement <= 0) {
    throw new Error(text.invalidCement);
  }

  if (!mix) {
    throw new Error(text.invalidMix);
  }

  const ratio = mix.strengths[strength];

  if (!ratio) {
    throw new Error(text.invalidRecipe);
  }

  const sand = cement * ratio.sand;
  const stone = ratio.stone ? cement * ratio.stone : 0;

  const result = {
    title: `${text[mixKind]} ${text.recipeStrength[strength]}`,
    ratioText: buildRatioText(ratio, text),
    note: buildNote(mixKind, ratio, text),
    materials: [
      { kind: "cement", name: text.material.cement, amount: roundAmount(cement), unit: "kg" },
      { kind: "sand", name: text.material.sand, amount: roundAmount(sand), unit: "kg" },
      { kind: "water", name: text.material.water, amount: roundAmount(cement * ratio.waterRatio), unit: text.waterUnit },
    ],
  };

  if (ratio.stone) {
    result.materials.splice(2, 0, { kind: "stone", name: text.material.stone, amount: roundAmount(stone), unit: "kg" });
    result.materials.push({
      kind: "total",
      name: text.material.total,
      amount: roundAmount(sand + stone),
      unit: "kg",
    });
  }

  return result;
}

function buildRatioText(ratio, text = getTexts()) {
  return ratio.stone
    ? `${text.ratio} ${formatRatio(ratio.cement)}:${formatRatio(ratio.sand)}:${formatRatio(ratio.stone)}`
    : `${text.ratio} ${formatRatio(ratio.cement)}:${formatRatio(ratio.sand)}`;
}

function buildNote(mixKind, ratio, text = getTexts()) {
  const values = {
    cement: formatRatio(ratio.cement),
    sand: formatRatio(ratio.sand),
    stone: ratio.stone ? formatRatio(ratio.stone) : "",
  };

  if (mixKind === "concrete") {
    return fillTemplate(text.noteConcrete, values);
  }

  return fillTemplate(text.noteMortar, values);
}

function createMaterialCard(material) {
  return `
    <li class="material" data-kind="${material.kind}">
      <span class="name">${material.name}</span>
      <span class="value">${material.amount}<span class="unit">${material.unit}</span></span>
    </li>
  `;
}

function getSelection() {
  const cementInput = document.querySelector("#cement-kg");
  const mix = document.querySelector('input[name="mixKind"]:checked');
  const strength = document.querySelector('input[name="strength"]:checked');

  return {
    cementKg: cementInput ? cementInput.value : "",
    mixKind: mix ? mix.value : "mortar",
    strength: strength ? strength.value : "medium",
  };
}

function updatePresets(value) {
  const normalized = String(value).replace(/^0+(\d)/, "$1");
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.dataset.active = chip.dataset.preset === normalized ? "true" : "false";
  });
}

function renderRecipe() {
  const { cementKg, mixKind, strength } = getSelection();
  const cards = document.querySelector("#recipe-cards");
  const title = document.querySelector("#recipe-title");
  const ratio = document.querySelector("#recipe-ratio");
  const note = document.querySelector("#recipe-note");
  const text = getTexts();

  try {
    const recipe = calculateRecipe(cementKg, mixKind, strength);

    title.textContent = recipe.title;
    ratio.textContent = recipe.ratioText;
    note.textContent = recipe.note;
    cards.innerHTML = recipe.materials.map(createMaterialCard).join("");
  } catch (error) {
    title.textContent = text.checkData;
    ratio.textContent = text.notCalculable;
    note.textContent = error.message;
    cards.innerHTML = "";
  }

  updatePresets(cementKg);
}

function applyText(language) {
  currentLanguage = language;
  const text = getTexts(language);

  document.documentElement.lang = text.htmlLang;
  document.title = text.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = text.description;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (text[key]) node.textContent = text[key];
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    node.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":");
      if (attr && key && text[key]) node.setAttribute(attr, text[key]);
    });
  });

  renderStructuredData(text);
}

function renderStructuredData(text) {
  const node = document.querySelector("#structured-data");
  if (!node) return;

  node.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: text.title,
    description: text.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: "https://pedromartinezweb.github.io/CalculadoraCemento/",
    inLanguage: text.htmlLang,
    isAccessibleForFree: true,
  });
}

function saveSelection() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getSelection()));
  } catch (e) {}
}

function loadSelection() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const selection = JSON.parse(saved);

    if (selection.cementKg) {
      const input = document.querySelector("#cement-kg");
      if (input) input.value = selection.cementKg;
    }

    if (selection.mixKind) {
      const radio = document.querySelector(`input[name="mixKind"][value="${selection.mixKind}"]`);
      if (radio) radio.checked = true;
    }

    if (selection.strength) {
      const radio = document.querySelector(`input[name="strength"][value="${selection.strength}"]`);
      if (radio) radio.checked = true;
    }
  } catch (e) {}
}

function normalizeCement(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0.5;
  return Math.round(parsed * 10) / 10;
}

function handleStep(delta) {
  const input = document.querySelector("#cement-kg");
  if (!input) return;

  const current = Number(input.value) || 0;
  const next = Math.max(0.5, current + delta);
  input.value = Number.isInteger(next) ? String(next) : next.toFixed(1);
  renderRecipe();
  saveSelection();
}

function handlePreset(value) {
  const input = document.querySelector("#cement-kg");
  if (!input) return;

  input.value = value;
  renderRecipe();
  saveSelection();
}

if (typeof document !== "undefined") {
  const form = document.querySelector("#recipe-form");
  const language = detectLanguage(navigator.languages || [navigator.language]);

  applyText(language);
  loadSelection();

  form.addEventListener("input", () => {
    renderRecipe();
    saveSelection();
  });
  form.addEventListener("change", () => {
    renderRecipe();
    saveSelection();
  });

  form.querySelectorAll("[data-step]").forEach((btn) => {
    btn.addEventListener("click", () => handleStep(Number(btn.dataset.step)));
  });

  form.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => handlePreset(btn.dataset.preset));
  });

  const cementInput = document.querySelector("#cement-kg");
  if (cementInput) {
    cementInput.addEventListener("blur", () => {
      const next = normalizeCement(cementInput.value);
      cementInput.value = Number.isInteger(next) ? String(next) : next.toFixed(1);
      renderRecipe();
      saveSelection();
    });
  }

  renderRecipe();
}

if (typeof module !== "undefined") {
  module.exports = { calculateRecipe, detectLanguage };
}
