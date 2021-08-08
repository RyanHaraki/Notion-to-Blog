import { getDatabase, getPage, getBlocks } from "../lib/notion";
import Link from "next/link";
import Text from "../components/Text";
import Layout from "../components/layouts/Layout";
export const databaseId = process.env.NOTION_DATABASE_ID;
import { magic } from "../lib/magic";
import { UserContext } from "../lib/UserContext";
import { useContext, useState, useEffect } from "react";

export default function Home({ posts }) {
  const [user] = useContext(UserContext);

  return (
    <Layout page="Ultra">
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
    </Layout>
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
