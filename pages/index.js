import { getDatabase, getPage, getBlocks } from "../lib/notion";
import Link from "next/link";
import Text from "../components/Text";
import slugify from "slugify";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div className="">
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <a href={`/post/${post.id}`}>
              <Text text={post.properties.Name.title}>
                {post.properties.Name.title[0].plain_text}
              </Text>
            </a>

            {/* <Link
              href={`/post/${slugify(
                post.properties.Name.title[0].plain_text
              )}`}
            >
            
            </Link> */}
          </div>
        );
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);
  return {
    props: {
      posts: database,
    },
  };
};
