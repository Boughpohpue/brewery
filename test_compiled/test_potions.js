import { IngredientAttributes, Ingredient, Recipe, Grimoire } from '../compiled/brewery-1.0.1.js';


/* POTIONS */

console.info('Defining test potions...');

export class BasicPotion {
  static _foo = 12;
  constructor() {}
  get foo() {
    return this.constructor._foo;
  }
}
console.log(`\n${BasicPotion.toString()}`, { style: "color: gold;" });
Grimoire.inscribe(BasicPotion);

export class PanoramixSpecial {
  foo;
  constructor(foo) {
    this.foo = foo;
  }
}
console.log(`\n${PanoramixSpecial.toString()}`, { style: "color: gold;" });
Grimoire.inscribe(
  PanoramixSpecial,
  new Recipe([new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.Number, "foo", 144)])
);

export class GummiberryJuice {
  foo;
  bar;
  constructor(foo, bar) {
    this.foo = foo;
    this.bar = bar;
  }
}
console.log(`\n${GummiberryJuice.toString()}`, { style: "color: gold;" });
Grimoire.inscribe(
  GummiberryJuice,
  new Recipe([
    new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.Number, "foo", 69),
    new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.String, "bar", "Toadie stinkz!"),
  ])
);

export class LovePotion {
  enchant;
  from;
  to;
  constructor(enchant, from, to) {
    this.loveEnchant = enchant;
    this.from = from;
    this.to = to;
  }
}
console.log(`\n${LovePotion.toString()}`, { style: "color: gold;" });
Grimoire.inscribe(
  LovePotion,
  new Recipe([
    new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.String, "from", "_from"),
    new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.String, "to", "_to"),
    new Ingredient(IngredientAttributes.ParameterStuff | IngredientAttributes.String, "enchant", "_enchant"),
  ])
);

console.info('\nTest potions has been defined!\n');

/* *** * *** */
