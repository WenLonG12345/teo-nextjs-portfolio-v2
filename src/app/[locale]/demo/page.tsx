"use client";

import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import dynamic from "next/dynamic";

const MdxEditor = dynamic(() => import("@/components/mdx-editor"), {
  ssr: false,
});

import React, { Suspense, useState } from "react";

const DemoPage = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="container py-24 sm:py-32">
      <Suspense>
        <MdxEditor
          markdown={markdown}
          onChange={setMarkdown}
        />
      </Suspense>
    </div>
  );
};

export default DemoPage;
