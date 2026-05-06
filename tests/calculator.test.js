const assert = require("node:assert/strict");
const { calculateRecipe } = require("../script.js");

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

console.log("calculator tests passed");
