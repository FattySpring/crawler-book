const Epub = require("epub-gen");
const fs = require("fs");
const chapters = require("./chapters.json");
// console.log(chapters);
const content = chapters
  .map((item) => {
    try {
      let data = fs.readFileSync(`./chapters/${item.title}.txt`, "utf-8").split('\n').filter(item => !!item).map(item => {
        return `<p>${item}</p>`
      }).join('');
      return {
        title: item.title,
        data: data,
      };
    } catch (error) {
      return undefined;
    }
  })
  .filter((item) => !!item);
console.log(content[0]);

const option = {
  title: "庆余年", // *Required, title of the book.
  author: "猫腻", // *Required, name of the author.
  // publisher: "Macmillan & Co.", // optional
  // cover: "http://demo.com/url-to-cover-image.jpg", // Url or File path, both ok.
  content: content,
};

new Epub(option, "./庆余年.epub");
