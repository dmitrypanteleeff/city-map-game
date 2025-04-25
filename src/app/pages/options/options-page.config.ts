import { IConfigContent } from '../../shared/models';

export const START_PAGE_CONFIG_TITLE: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Правила игры в «Города» — просто и понятно',
  },
  {
    language: 'eng',
    content: 'The rules of the game of "Cities" are simple and clear',
  },
];

export const START_PAGE_CONFIG_SUBTITLE_1: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Об игре',
  },
  {
    language: 'eng',
    content: 'About the game',
  },
];

export const START_PAGE_CONFIG_TEXT_1: IConfigContent[] = [
  {
    language: 'rus',
    content: `«Города» — это игра, где нужно называть города по цепочке:
    каждый следующий город должен начинаться на букву, которой
    закончился предыдущий.`,
  },
  {
    language: 'eng',
    content: `"Cities" is a game where you need to name cities along a chain.
    Each subsequent city must begin with a letter that
    the previous one ended.`,
  },
];

export const START_PAGE_CONFIG_SUBTITLE_2: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Как играть',
  },
  {
    language: 'eng',
    content: 'How to play',
  },
];

export const START_PAGE_CONFIG_TEXT_2: IConfigContent[] = [
  {
    language: 'rus',
    content: `1. **Первый игрок** говорит любой город, например, «Москва».<br />
    2. **Следующий** придумывает город на последнюю букву — «Москва»
    заканчивается на **А**, значит, можно сказать «Астрахань».<br />
    3. **Дальше по цепочке**: «Астрахань» → на **Н** (Нью-Йорк),
    «Нью-Йорк» → на **К** (Киото), «Киото» → на **О** (Омск) и так
    далее. <br />
    4. **Повторяться нельзя** — если город уже называли, его нельзя
    использовать снова. <br />
    5. **Только реальные города** — никаких «Гадюкино» или
    «Готэм» (если их нет на карте). <br />
    6. За каждый названный город получаешь очки. Чем больше городов
    назовёшь, тем больше шанс попасть в рейтинговую таблицу.<br />`,
  },
  {
    language: 'eng',
    content: `1. ** The first player ** speaks any city, for example, "New York".<br />
    2. ** The next ** comes up with a city with the last letter — "New York"
    ends with **K**, which means you can say "Kyoto".<br />
    3. **Further along the chain**: "Kyoto" → to **O** (Omsk),
    "Omsk" → to **K** (Kabul), "Kabul" → to **L** (Las Vegas) and so
    on. <br />
    4. **It cannot be repeated** — if the city has already been named, it cannot
    be used again. <br />
    5. ** Only real cities** — no "The Night City" or
    "Gotham City" (if they are not on the map). <br />
    6. You get points for each named city. The more cities
    you name, the greater the chance of getting into the ranking table.<br />
    `,
  },
];

export const START_PAGE_CONFIG_SUBTITLE_3: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Важные нюансы',
  },
  {
    language: 'eng',
    content: 'Important nuances',
  },
];

export const START_PAGE_CONFIG_TEXT_3: IConfigContent[] = [
  {
    language: 'rus',
    content: `Если город заканчивается на **Ь, Ы, Ъ** — берем предпоследнюю букву: - «Тюмень» → последняя буква **Ь**, значит, следующий город на **Н**.`,
  },
];

export const START_PAGE_CONFIG_SUBTITLE_4: IConfigContent[] = [
  {
    language: 'rus',
    content: 'Кто проиграл',
  },
  {
    language: 'eng',
    content: 'Who lost',
  },
];

export const START_PAGE_CONFIG_TEXT_4: IConfigContent[] = [
  {
    language: 'rus',
    content: `Игра завершается автоматически, как только заканчивается отведенное время. Выигрывает тот, кто продержался дольше всех! 🏆`,
  },
  {
    language: 'eng',
    content: `The game ends automatically as soon as the allotted time runs out. The winner is the one who lasted the longest! 🏆`,
  },
];

export const START_PAGE_CONFIG_BTN_MENU: IConfigContent[] = [
  {
    language: 'rus',
    content: 'В меню',
  },
  {
    language: 'eng',
    content: 'Back',
  },
];
