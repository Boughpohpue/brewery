# 🧪 Potions Brewery

*A dynamic object factory disguised as arcane craftsmanship.*

---

## ✨ What Is This?

**Potions Brewery** is a runtime-driven object factory that can create fully-formed objects using only:

* A class name
* A declarative structure (JSON or code)
* Optional runtime supplies

Behind the scenes, it compiles structured definitions into real JavaScript classes and instances using property descriptors — no `eval`, no string compilation, no unsafe reflection.

---

## 🧠 Core Idea

Instead of manually constructing objects, you describe them.

A **Legend** defines structure.
A **Recipe** defines property descriptors.
A **Grimoire** registers available archetypes.
A **Brewery** instantiates them deterministically.
A **Wizard** orchestrates the process asynchronously.

You don’t “new” things.

You brew them.

---

## 🏗 Architecture Overview

### Rune

Declarative property definition (raw form, often from JSON).

### Ingredient

Compiled form of a Rune — includes attribute flags.

### IngredientAttributes

Bitmask-based descriptor flags using `BigInt`.

```js
Writable
Enumerable
Configurable
String
Number
Boolean
...
```

Composite flags are supported:

```js
ParameterStuff = Writable | Enumerable | Configurable
```

---

### Recipe

Validated collection of Ingredients.

Defines how a potion should be constructed.

---

### Legend

Blueprint for generating:

* A dynamic class (archetype)
* A corresponding Recipe

Can be loaded from:

* Single object
* Array of objects
* `{ legends: [...] }`
* JSON string

---

### Grimoire

A registry mapping potion names to:

* Archetypes (classes)
* Recipes

---

### Brewery

The deterministic constructor engine.

Uses:

```js
Object.create(prototype, descriptors)
```

to produce instances with full control over:

* value
* writable
* enumerable
* configurable

Supports runtime overrides via custom supplies.

---

### Wizard

A serialized async facade.

Ensures potion crafting happens in order using a promise queue:

```js
static #todo = Promise.resolve();
```

Provides staged operations:

* brew
* craft
* enchant

Purely orchestration and presentation layer.

---

## 📜 Loading Legends from JSON

Supports multiple input shapes:

```json
{
  "legends": [ ... ]
}
```

```json
[ ... ]
```

```json
{
  "name": "...",
  "runes": [ ... ]
}
```

Invalid entries are skipped gracefully with warnings.

---

## 🧩 Why Bitmasks?

`IngredientAttributes` uses `BigInt` flags to:

* Avoid 32-bit limitations
* Allow composable descriptor configuration
* Provide fast attribute checks

Example:

```js
ingredient.hasAttribute(IngredientAttributes.Writable)
```

---

## 🔒 Safety & Design Principles

* No `eval`
* No dynamic code generation from strings
* No prototype mutation after instantiation
* Controlled registry overwrite
* Defensive JSON parsing
* Sequential async orchestration

This is not a toy system.

It is a declarative object construction engine with theatrical logging.

---

## 🎭 Why the Magic Theme?

Because good metaphors clarify architecture.

* Recipes describe structure.
* Brewing produces instances.
* A Grimoire stores definitions.
* A Wizard orchestrates the process.

---

## 🚀 Example

```js
const legends = Legend.fromJson(scrollJson);

for (const legend of legends) {
  const archetype = legend.getArchetype();
  Grimoire.inscribe(archetype, legend.getRecipe());
}

const potion = await Wizard.craftPotion("FelixFelicis");
```

---

## 🧪 What This Really Is

A dynamic object factory.

With personality.

---

## Presentation Test

Follow the link and see **Potions Brewery** in action:

https://boughpohpue.github.io/brewery/test_compiled/test.html

---