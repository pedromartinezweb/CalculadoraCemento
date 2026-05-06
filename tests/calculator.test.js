const assert = require("node:assert/strict");
const { calculateRecipe, detectLanguage } = require("../script.js");

const mortar = calculateRecipe(25, "mortar", "medium");
assert.equal(mortar.title, "Mortero medio");
assert.deepEqual(mortar.materials, [
  { kind: "cement", name: "Cemento", amount: 25, unit: "kg" },
  { kind: "sand", name: "Arena", amount: 111, unit: "kg" },
  { kind: "water", name: "Agua", amount: 13.8, unit: "kg / litros" },
]);

const concrete = calculateRecipe(25, "concrete", "strong");
assert.equal(concrete.title, "Hormigon fuerte");
assert.deepEqual(concrete.materials, [
  { kind: "cement", name: "Cemento", amount: 25, unit: "kg" },
  { kind: "sand", name: "Arena", amount: 59.3, unit: "kg" },
  { kind: "stone", name: "Piedra", amount: 65.5, unit: "kg" },
  { kind: "water", name: "Agua", amount: 12, unit: "kg / litros" },
  { kind: "total", name: "Arena + piedra", amount: 124.8, unit: "kg" },
]);

assert.throws(() => calculateRecipe(0, "mortar", "medium"), /mayores que cero/);

const englishMortar = calculateRecipe(25, "mortar", "medium", "en");
assert.equal(englishMortar.title, "Mortar medium");
assert.deepEqual(englishMortar.materials, [
  { kind: "cement", name: "Cement", amount: 25, unit: "kg" },
  { kind: "sand", name: "Sand", amount: 111, unit: "kg" },
  { kind: "water", name: "Water", amount: 13.8, unit: "kg / liters" },
]);

assert.equal(detectLanguage(["en-US", "es-ES"]), "en");
assert.equal(detectLanguage(["zh-CN", "en-US"]), "zh");
assert.equal(detectLanguage(["ar-SA", "en-US"]), "ar");
assert.equal(detectLanguage(["id-ID", "en-US"]), "id");
assert.equal(detectLanguage(["it-IT", "nl-NL"]), "es");

console.log("calculator tests passed");
