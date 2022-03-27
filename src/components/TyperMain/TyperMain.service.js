import { LoremIpsum } from "lorem-ipsum";
let getNewStory = () => {
  let lorem = new LoremIpsum();
  let story = lorem.generateWords(35);
  story = story.slice(0, 250);
  // let story = lorem.generateWords(3);
  story = story.trim();
  story += ".";
  // console.log("Story length:", story.length);
  return story;
};
export { getNewStory };
