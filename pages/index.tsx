import type { GetStaticProps, NextPage } from "next";

import Link from "next/link";
import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { FileInfo, YamlHeader } from "../src/types";
import { MARKDOWN_FILE_NAME_REGEX } from "../src/constants";
import { getPostContent, getPostFileNameList } from "../src/functions";

interface Props {
  fileInfoList: FileInfo[];
}

const Home: NextPage<Props> = ({ fileInfoList }) => {
  return (
    <ul>
      {fileInfoList.map((info) => {
        return (
          <li key={info.path}>
            <Link prefetch={false} href={`/${info.path}`}>
              <a>
                제목 : {info.data.title} ( {info.data.date} )
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const validFileNames = await getPostFileNameList();

  const fileInfoList = await Promise.all(
    validFileNames.map(async (name) => {
      const fileContent = await getPostContent(name);
      const data = matter(fileContent).data as YamlHeader;
      return { data, path: name.replace(MARKDOWN_FILE_NAME_REGEX, "") };
    })
  );

  return {
    props: { fileInfoList },
  };
};
export default Home;
