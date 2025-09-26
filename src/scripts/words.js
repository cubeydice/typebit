export const WORDS = {
  easy: [
    "smile",
    "hello world",
    "yum yum",
    "whatever",
    "1, 2, 3",
    "Ew!",
    "gobble",
    "Come here.",
    "octopus",
    "puff puff",
    "WOOHOO",
    "UwU",
    "O_O"
  ],
  
  medium: [
    "coding is cool",
    "drink water",
    "wash your hands",
    "boba is life",
    "ball is life",
    "blue over pink",
    "shake it off",
    "keep calm",
    "roses are red",
    "I like sushi",
    "yum lunch",
    "champagne",
    "vanilla extract",
    "Rose Water",
    "brave new world",
    "hike and brunch",
    "it be like that",
    "my back hurts",
    "the very best",
    "is purple blue?",
    "are you a bully?",
    "don't mock me",
    "Who am I?",
    "what am I?",
    "I'm just filler"
  ],
  
  hard: [
    "drill pierce heavens!",
    "dedicate your heart", 
    "time stops for no one",
    "krusty krab pizza",
    "come along with me",
    "crying in slime mart",
    "baby, don't hurt me",
    "reincarnated as a",
    "what in the isekai",
    "hark the herald",
    "2 + 2 = 5",
    "booty everywhere",
    "a bus hit me",
    "ask salmon else"
  ],
  
  anime: [
    "find the One Piece",
    "plus ultra",
    "me hokage!",
    "yer a wizard",
    "I wanna digivolve.",
    "do or do not",
    "let it rip",
    "what is love?",
    "don't hurt me",
    "destroy me",
    "don't kill me",
    "let me live T_T",
    "my slime academia",
    "slimer moon",
    "Slimeball Z"
  ],
  
  slime_themed: [
    "slime slime slime",
    "rise and slime",
    "slime this",
    "slimes not limes",
    "slimes be sliming",
    "i am goo-tiful",
    "stay gooey",
    "you goo-fy",
    "slime feelin' good",
    "SQUISHY",
    "squish this",
    "splendid slimes",
    "snails have slime",
    "slimageddon"
  ],
  
  misc: [
    "Mike is the best",
    "Abbey is the best", 
    "Paulo is the best",
    "WOW BUNNY",
    "8==D",
    "bewbs"
  ]
};

// Helper function to get all words as a flat array
export const getAllWords = () => {
  return Object.values(WORDS).flat();
};

// Helper function to get random word from a specific category
export const getRandomWordFromCategory = (category) => {
  const categoryWords = WORDS[category];
  if (!categoryWords || categoryWords.length === 0) return null;
  return categoryWords[Math.floor(Math.random() * categoryWords.length)];
};

// Helper function to get random word from all categories
export const getRandomWord = () => {
  const allWords = getAllWords();
  return allWords[Math.floor(Math.random() * allWords.length)];
};

