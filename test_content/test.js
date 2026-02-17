import { nameof, Matcher } from 'https://boughpohpue.github.io/just.js/compiled/just.js-1.0.1.js';
import Legend from '../content/legend.js';
import CustomSupply from '../content/custom_supply.js';
import Grimoire from '../content/grimoire.js';
import Wizard from '../content/wizard.js';
import { BasicPotion, PanoramixSpecial, GummiberryJuice, LovePotion } from './test_potions.js';


(async () => {
  console.info('\n\nStarting test...\n');

  console.warn(`🧑‍🦱 You're asking Wizard for a ${nameof(BasicPotion)}...`);
  let potion_1 = await Wizard.craftPotion(nameof(BasicPotion), [], [`${Matcher.entag("foo")}`]);
  console.warn(`🧪 ${nameof({ potion_1 })} is a ${nameof(potion_1)}\n`);

  console.warn(`🧑‍🦱 You're asking Wizard for a ${nameof(PanoramixSpecial)}...`);
  let potion_2 = await Wizard.craftPotion(nameof(PanoramixSpecial), [], [`${Matcher.entag("foo")}`]);
  console.warn(`🧪 ${nameof({ potion_2 })} is a ${nameof(potion_2)}\n`);

  console.warn(`🧑‍🦱 You're asking Wizard for a ${nameof(GummiberryJuice)}...`);
  let potion_3 = await Wizard.craftPotion(nameof(GummiberryJuice), [], [`${Matcher.entag("foo")}`, `${Matcher.entag("bar")}`]);
  console.warn(`🧪 ${nameof({ potion_3 })} is a ${nameof(potion_3)}\n`);

  console.warn(`🧑‍🦱 You're asking Wizard for a ${nameof(GummiberryJuice)} using your custom supplies...`);
  let potion_4 = await Wizard.craftPotion(
    nameof(GummiberryJuice),
    [new CustomSupply("foo", 369), new CustomSupply("bar", "sTupiT igTHorN")],
    [`${Matcher.entag("foo")}`, `${Matcher.entag("bar")}`]
  );
  console.warn(`🧪 ${nameof({ potion_4 })} is a ${nameof(potion_4)}\n`);

  console.warn(`🧑‍🦱 You're asking Wizard for a ${nameof(LovePotion)}...`);
  let potion_5 = await Wizard.craftPotion(
    nameof(LovePotion),
    [new CustomSupply("from", "Romeo"), new CustomSupply("to", "Juliette"), new CustomSupply("enchant", "'Amor est omnia'")],
    [
      "✨ Grinding stardust...",
      "💫 Mixing moonlight with whispers...",
      `❤️ Infusing with love from ${Matcher.entag("from")} to ${Matcher.entag("to")}...`,
      `🔮 Binding the souls: ${Matcher.entag("enchant")}`,
      "🌙 Sealing the bond with eternal light...",
      `💗 Their love shall last forever. ${Matcher.entag("enchant")}`,
    ]
  );
  console.warn(`🧪 ${nameof({ potion_5 })} is a ${nameof(potion_5)}\n`);


  console.warn(`\n📜 You have found an old weathered scroll...`);
  const scroll = `
  {
  	"legends": [
  		{
  			"name": "FelixFelicis",
  			"runes": [
  				{
  					"key": "foo",
  					"value": 96,
  					"attributes": "ParameterStuff|Number"
  				},
  				{
  					"key": "bar",
  					"value": "I feel lucky 🤪",
  					"attributes": "ParameterStuff|String"
  				}
  			]
  		},
  		{
  			"name": "PolyjuicePotion",
  			"runes": [
  				{
  					"key": "foo",
  					"value": 12369,
  					"attributes": "ParameterStuff|Number"
  				},
  				{
  					"key": "bar",
  					"value": "It's a hair! 🤮",
  					"attributes": "ParameterStuff|String"
  				}
  			]
  		}
  	]
  }`;
  console.warn(JSON.parse(scroll), { style: "color: antiquewhite;" });

  console.warn(`\n✨ Long forgotten legends has been revealed!`);
  const legends = Legend.fromJson(scroll);
  const legendaryNames = [];
  for (const legend of legends) {
    const legendary = legend.getArchetype();
    Grimoire.inscribe(legendary, legend.getRecipe());
    legendaryNames.push(nameof(legendary));
  }
  console.warn(`📙 The Sacred Tome hums softly... legendary formulas are ready to be brewed!\n`);

  for (const legendaryName of legendaryNames) {
    console.warn(`🧑‍🦱 You're asking Wizard for a ${legendaryName}...`);
    let legendaryPotion = await Wizard.craftPotion(legendaryName, [], [`${Matcher.entag("foo")}`, `${Matcher.entag("bar")}`]);
    console.warn(`🧪 ${nameof({ legendaryPotion })} is a ${nameof(legendaryPotion)}\n`);
  }
  for (const legendaryName of legendaryNames) {
    console.warn(`🧑‍🦱 You're asking Wizard for a ${legendaryName} using your custom supplies...`);
    let legendaryPotion = await Wizard.craftPotion(
      legendaryName,
      [new CustomSupply("foo", 369), new CustomSupply("bar", `My own ${legendaryName}!`)],
      [`${Matcher.entag("foo")} just for me 🤩`, `${Matcher.entag("bar")} just for me 😁`]);
    console.warn(`🧪 ${nameof({ legendaryPotion })} is a ${nameof(legendaryPotion)}\n`);
  }

  console.info('\nTest complete!\n');
})();
