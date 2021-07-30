import { getBlogs } from "../lib/notion";

export default function Home({ posts }) {
  console.log(posts[0].properties.Name.title[0].text.content);

  return (
    <div className="">
      {posts.map((post) => {
        return <p>{post.properties.Name.title[0].text.content}</p>;
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = getBlogs();

  return {
    props: {
      posts: await posts,
    },
  };
};
