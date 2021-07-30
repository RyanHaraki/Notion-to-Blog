const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

const myDb = process.env.NOTION_DATABASE_ID;

export const getDatabase = async (databaseId) => {
  const res = await notion.databases.query({
    database_id: databaseId,
  });

  return res.results;
};

export const getBlogs = async () => {
  const payload = {
    path: `databases/${myDb}/query`,
    method: "POST",
  };

  const { results } = await notion.request(payload);

  return results;
};
