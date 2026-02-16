import { Is } from 'https://boughpohpue.github.io/just.js/compiled/just.js-1.0.1.js';
import IngredientAttributes from './ingredient_attributes.js';
import Grimoire from './grimoire.js';

export class Brewery {
  static brew(potionName, supplies = null) {
    const potion = Grimoire.getArchetype(potionName);
    if (Is.thisNothing(potion)) {
      throw new Error(`${potionName} not found in the grimoire!`);
    }
    const recipe = Grimoire.getRecipe(potionName);
    if (Is.thisNothing(recipe)) {
      return Object.create(potion.prototype);
    }
    const mixture = this.prepareMixture(recipe, supplies);
    return Object.create(potion.prototype, mixture);
  }
  static prepareMixture(recipe, supplies) {
    const mixture = {};
    for (const ingredient of recipe.ingredients) {
      mixture[ingredient.key] = this.marinate(ingredient, supplies);
    }
    return mixture;
  }
  static marinate(ingredient, supplies) {
    let marinade = ingredient.value;
    if (Is.thisArray(supplies)) {
      const supply = supplies.find((s) => s.ingredientName === ingredient.key);
      if (Is.thisSomething(supply)) {
        marinade = supply.value;
      }
    }
    return {
      value: this.spice(marinade, ingredient),
      writable: ingredient.hasAttribute(IngredientAttributes.Writable),
      enumerable: ingredient.hasAttribute(IngredientAttributes.Enumerable),
      configurable: ingredient.hasAttribute(IngredientAttributes.Configurable)
    };
  }
  static spice(marinade, ingredient) {
    if (ingredient.hasAttribute(IngredientAttributes.String) && !Is.thisString(marinade)) {
      return String(marinade);
    }
    return marinade;
  }
}

export default Brewery;
