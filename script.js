const RECIPES = {
  mortar: {
    label: "Mortero",
    strengths: {
      strong: { label: "Fuerte", cement: 1, sand: 3.33, waterRatio: 0.5 },
      medium: { label: "Medio", cement: 1, sand: 4.44, waterRatio: 0.55 },
      low: { label: "Bajo", cement: 1, sand: 6.67, waterRatio: 0.6 },
    },
  },
  concrete: {
    label: "Hormigon",
    strengths: {
      strong: { label: "Fuerte", cement: 1, sand: 2.37, stone: 2.62, waterRatio: 0.48 },
      medium: { label: "Medio", cement: 1, sand: 3.02, stone: 3.09, waterRatio: 0.55 },
      low: { label: "Bajo", cement: 1, sand: 4.44, stone: 6.25, waterRatio: 0.55 },
    },
  },
};

const STORAGE_KEY = "cement-calc-last-selection";
const PRESETS = ["5", "10", "25", "35", "50"];

function roundAmount(value) {
  return Math.round(value * 10) / 10;
}

function formatRatio(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function calculateRecipe(cementKg, mixKind, strength) {
  const cement = Number(cementKg);
  const mix = RECIPES[mixKind];

  if (!Number.isFinite(cement) || cement <= 0) {
    throw new Error("Los kg de cemento deben ser mayores que cero.");
  }

  if (!mix) {
    throw new Error("Tipo de mezcla no valido.");
  }

  const ratio = mix.strengths[strength];

  if (!ratio) {
    throw new Error("Tipo de receta no valido.");
  }

  const sand = cement * ratio.sand;
  const stone = ratio.stone ? cement * ratio.stone : 0;

  const result = {
    title: `${mix.label} ${ratio.label.toLowerCase()}`,
    ratioText: buildRatioText(ratio),
    note: buildNote(mixKind, ratio),
    materials: [
      { kind: "cement", name: "Cemento", amount: roundAmount(cement), unit: "kg" },
      { kind: "sand", name: "Arena", amount: roundAmount(sand), unit: "kg" },
      { kind: "water", name: "Agua", amount: roundAmount(cement * ratio.waterRatio), unit: "kg / litros" },
    ],
  };

  if (ratio.stone) {
    result.materials.splice(2, 0, { kind: "stone", name: "Piedra", amount: roundAmount(stone), unit: "kg" });
    result.materials.push({
      kind: "total",
      name: "Arena + piedra",
      amount: roundAmount(sand + stone),
      unit: "kg",
    });
  }

  return result;
}

function buildRatioText(ratio) {
  return ratio.stone
    ? `Peso ${formatRatio(ratio.cement)}:${formatRatio(ratio.sand)}:${formatRatio(ratio.stone)}`
    : `Peso ${formatRatio(ratio.cement)}:${formatRatio(ratio.sand)}`;
}

function buildNote(mixKind, ratio) {
  if (mixKind === "concrete") {
    return `Dosificacion por peso para bascula: ${formatRatio(ratio.cement)} kg de cemento, ${formatRatio(ratio.sand)} kg de arena y ${formatRatio(ratio.stone)} kg de piedra.`;
  }

  return `Dosificacion por peso para bascula: ${formatRatio(ratio.cement)} kg de cemento y ${formatRatio(ratio.sand)} kg de arena.`;
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

  try {
    const recipe = calculateRecipe(cementKg, mixKind, strength);

    title.textContent = recipe.title;
    ratio.textContent = recipe.ratioText;
    note.textContent = recipe.note;
    cards.innerHTML = recipe.materials.map(createMaterialCard).join("");
  } catch (error) {
    title.textContent = "Revisa los datos";
    ratio.textContent = "No se puede calcular";
    note.textContent = error.message;
    cards.innerHTML = "";
  }

  updatePresets(cementKg);
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
  module.exports = { calculateRecipe };
}
