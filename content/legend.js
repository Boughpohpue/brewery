import { Is } from './.external/just.js-1.0.1.js';
import Rune from './rune.js';
import Ingredient from './ingredient.js';
import Recipe from './recipe.js';

export class Legend {
  name;
  runes;
  constructor(name, runes = []) {
    this.name = name;
    this.runes = runes
      .map((rune) =>
        rune instanceof Rune
        ? rune
        : Rune.fromObj(rune));
  }
  getArchetype() {
    const cls = class {};
    Object.defineProperty(cls, "name", { value: this.name });
    this.runes.forEach((rune) =>
      Object.defineProperty(cls.prototype, rune.key, {
        value: structuredClone(rune.value),
        writable: true,
        enumerable: true,
        configurable: true
    }));
    return cls;
  }
  getRecipe() {
    return new Recipe(this.runes.map((rune) => Ingredient.fromRune(rune)));
  }

  static fromObj(obj) {
    if (!Is.thisObject(obj)) { throw new Error("Argument must be an object."); }
    if (!Is.thisString(obj.name)) { throw new Error("Argument property 'name'  must be a string."); }
    if (!Is.thisArray(obj.runes)) { throw new Error("Argument property 'runes' must be an array."); }
    return new Legend(obj.name, obj.runes);
  }
  static fromJson(json) {
    if (!Is.thisString(json)) { throw new Error("Argument must be a JSON string."); }
    let parsed;
    try { parsed = JSON.parse(json); }
    catch (e) { throw new Error("JSON parsing error.", { cause: e }); }
    const src =
      Is.thisObject(parsed) && Is.thisArray(parsed.legends)
        ? parsed.legends
        : Is.thisArray(parsed)
          ? parsed
          : Is.thisObject(parsed)
            ? [parsed]
            : null;
    if (!src) { throw new Error("JSON does not contain valid Legend data."); }
    const legends = src
      .map((l, index) => {
        try { return Legend.fromObj(l); }
        catch (e) { return { index, error: e }; }
      });
    if (!legends.every((l) => l instanceof Legend)) {
      console.warn("Some legends failed to parse:",
        legends.filter((l) => !(l instanceof Legend)));
    }
    return legends.filter((l) => l instanceof Legend);
  }
}

export default Legend;
