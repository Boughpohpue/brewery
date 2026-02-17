import { nameof, Is } from 'https://boughpohpue.github.io/just.js/compiled/just.js-1.0.1.js';

export class Grimoire {
  static #_index = new Map();
  static #_recipes = new Map();
  static inscribe(potion, recipe, overwrite = false) {
    if (Is.thisNothing(potion) || !Is.thisClass(potion)) {
      throw new Error("Argument potion must be a class!");
    }
    let potionName = nameof(potion);
    if (this.#_index.has(potionName)) {
      if (!overwrite) {
        console.error(`${potionName} already exists in Grimoire!`);
        return;
      }
      console.warn(`${potionName} is being overwritten in Grimoire.`);
    }
    this.#_index.set(potionName, potion);
    if (Is.thisSomething(recipe)) {
      this.#_recipes.set(potionName, recipe);
    }
    console.log(`🧪 ${potionName} has been etched into the Grimoire.`);
  }
  static getArchetype(potionName) {
    return this.#_index.get(potionName);
  }
  static getRecipe(potionName) {
    return this.#_recipes.get(potionName);
  }
}

export default CookBook;
