import { nameof, Matcher } from '../content/.external/just.js-1.0.1.js';
import Legend from '../content/legend.js';
import CustomSupply from '../content/custom_supply.js';
import Grimoire from '../content/grimoire.js';
import Wizard from '../content/wizard.js';
import { BasicPotion, PanoramixSpecial, GummiberryJuice, LovePotion } from './potions.js';


(async () => {
  console.info('Starting test...<br />');

  console.warn(`🧑‍🦱 You're asking Wizard for a ${nameof(BasicPotion)}...`);
  let potion_1 = await Wizard.craftPotion(nameof(BasicPotion), [], [`${Matcher.entag("foo")}`]);
  console.warn(`🧪 ${nameof({ potion_1 })} is a ${nameof(potion_1)}<br />`);

  console.warn(`🧑‍🦱 You're asking Wizard for a ${nameof(PanoramixSpecial)}...`);
  let potion_2 = await Wizard.craftPotion(nameof(PanoramixSpecial), [], [`${Matcher.entag("foo")}`]);
  console.warn(`🧪 ${nameof({ potion_2 })} is a ${nameof(potion_2)}<br />`);

  console.warn(`🧑‍🦱 You're asking Wizard for a ${nameof(GummiberryJuice)}...`);
  let potion_3 = await Wizard.craftPotion(nameof(GummiberryJuice), [], [`${Matcher.entag("foo")}`, `${Matcher.entag("bar")}`]);
  console.warn(`🧪 ${nameof({ potion_3 })} is a ${nameof(potion_3)}<br />`);

  console.warn(`🧑‍🦱 You're asking Wizard for a ${nameof(GummiberryJuice)}...`);
  let potion_4 = await Wizard.craftPotion(
    nameof(GummiberryJuice),
    [new CustomSupply("foo", 369), new CustomSupply("bar", "sTupiT igTHorN")],
    [`${Matcher.entag("foo")}`, `${Matcher.entag("bar")}`]
  );
  console.warn(`🧪 ${nameof({ potion_4 })} is a ${nameof(potion_4)}<br />`);

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
  console.warn(`🧪 ${nameof({ potion_5 })} is a ${nameof(potion_5)}<br />`);

  console.warn(`‍<br/ >📜 You have found an old weathered scroll...`);
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
  					"value": "I feel lucky",
  					"attributes": "ParameterStuff|String"
  				}
  			]
  		},
  		{
  			"name": "PolyjuicePotion",
  			"runes": [
  				{
  					"key": "foo",
  					"value": "It's a hair!",
  					"attributes": "ParameterStuff|String"
  				},
  				{
  					"key": "bar",
  					"value": 12369,
  					"attributes": "ParameterStuff|Number"
  				}
  			]
  		}
  	]
  }`;
  console.log(JSON.parse(scroll));

  console.warn(`<br />🎇 It revealed long forgotten legends!`);
  const legends = Legend.fromJson(scroll);
  const legendaryNames = [];
  for (const legend of legends) {
    const legendary = legend.getArchetype();
    Grimoire.inscribe(legendary, legend.getRecipe());
    console.log(`🧪 ${nameof(legendary)} has been etched into the sacred tome`);
    legendaryNames.push(nameof(legendary));
  }

  console.warn(`📙 The Grimoire hums softly... legendary formulas await their awakening<br />`);
  for (const legendaryName of legendaryNames) {
    console.warn(`🧑‍🦱 You're asking Wizard for a ${legendaryName}...`);
    let legendaryPotion = await Wizard.craftPotion(legendaryName, [], [`${Matcher.entag("foo")}`, `${Matcher.entag("bar")}`]);
    console.warn(`🧪 ${nameof({ legendaryPotion })} is a ${nameof(legendaryPotion)}<br />`);
  }

  console.info('Test complete!<br />');
})();
