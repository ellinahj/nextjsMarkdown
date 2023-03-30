import { GetStaticProps, NextPage } from "next";
import path from "path";
import { promises as fs } from "fs";

import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import Head from "next/head";
import { YamlHeader } from "../src/types";
import { MARKDOWN_FILE_NAME_REGEX } from "../src/constants";
import { getPostContent, getPostFileNameList } from "../src/functions";

interface Props {
  contents: string;
}

const Post: NextPage<Props> = ({ contents }) => {
  const matterContents = matter(contents);
  const content = matterContents.content;
  const data = matterContents.data as YamlHeader;
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta
          property="og:title"
          content={data.title ? data.title : "포스트"}
        />
        <meta
          name="description"
          content={data.description || "포스트 설명입니다."}
        />
      </Head>
      <button onClick={() => history.back()}>뒤로가기</button>
      <ReactMarkdown>{content}</ReactMarkdown>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  if (!id) {
    return { notFound: true };
  }

  const fileContents = await getPostContent(`${id}.md`);
  return {
    props: { contents: fileContents },
  };
};

export async function getStaticPaths() {
  const validFileNames = await getPostFileNameList();

  return {
    paths: validFileNames.map((fileName) => ({
      params: { id: fileName.replace(MARKDOWN_FILE_NAME_REGEX, "") },
    })),
    fallback: false,
  };
}
export default Post;
