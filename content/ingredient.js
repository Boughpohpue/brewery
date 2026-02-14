import { Is } from './.external/just.js-1.0.1.js';
import IngredientAttributes from './ingredient_attributes.js'
import Rune from './rune.js'

export class Ingredient {
  key;
  value;
  attributes;
  constructor(attributes, key, value = null) {
    this.key = key;
    this.value = value;
    this.attributes = attributes;
  }
  hasAttribute(expected) {
    return (this.attributes & expected) > 0;
  }

  static fromRune(rune) {
    if (!(rune instanceof Rune)) {
      throw new Error("Argument must be an instance of Rune!")
    }
    if (Is.thisString(rune.attributes)) {
      const flags = rune.attributes
        .split("|")
        .map(a => a.trim())
        .filter(Boolean)
        .reduce((acc, a) => {
          const attr = IngredientAttributes[a];
          return Is.thisBigInt(attr)
            ? acc | attr
            : acc;
        }, 0n);
      return new Ingredient(flags, rune.key, rune.value);
    }
    return new Ingredient(rune.attributes ?? IngredientAttributes.None, rune.key, rune.value);
  }
}

export default Ingredient;
