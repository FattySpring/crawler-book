const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto("");
  const list = await page.evaluate(() => {
    const list = document.querySelectorAll("dd");
    console.log("list: ", list);
    return Object.values(list)
      .map((item) => {
        return {
          title: item.firstChild.innerHTML,
          url: item.firstChild.href,
        };
      })
      .slice(65);
  });
  console.log(list);

  fs.writeFileSync("chapters.json", JSON.stringify(list));

  console.log(list.length);
  for (let i = 0; i < list.length; i++) {
    let chapter = list[i];
    console.log(`正在抓取 ${i} 章`, chapter);
    await sleep();
    await page.goto(chapter.url);
    const content = await page.evaluate(() => {
      let content = document.getElementById("content");
      return content.innerText;
    });

    fs.writeFileSync(`chapters/${chapter.title}.txt`, content);
  }
  await browser.close();
})();

function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
