import { Is } from 'https://boughpohpue.github.io/just.js/compiled/just.js-1.0.1.js';

export class Rune {
  key;
  value;
  attributes;
  constructor(key, value, attributes) {
    this.key = key;
    this.value = value;
    this.attributes = attributes;
  }

  static fromObj(obj) {
    if (!Is.thisObject(obj)) { throw new Error("Argument must be an object."); }
    if (!Is.thisString(obj.key)) { throw new Error("Argument property 'name' must be a string."); }
    if (!Is.thisSomething(obj.value)) { throw new Error("Argument property 'value' must have a value."); }
    if (!Is.thisString(obj.attributes)) { throw new Error("Argument property 'attributes'  must be a string."); }
    return new Rune(obj.key, obj.value, obj.attributes);
  }
}

export default Rune;
