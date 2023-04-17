import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import Image from "next/image";
import { Accordion } from "@mantine/core";
import OverTitle from "./OverTitle";
import { FEATURE_GALLERY } from "@/constants";

const FeatureGallery = () => {
  const [selection, setSelection] = useState<string | null>(
    FEATURE_GALLERY[0].title
  );

  return (
    <div className="flex flex-col items-center my-[100px]">
      <OverTitle title='Features'/>
      <h2 className="text-3xl font-bold text-center">What are you signing in for?</h2>
      <div className="flex flex-col items-center gap-5 lg:flex-row">
        <div className="flex flex-col flex-1 w-full lg:max-w-[400px] gap-2 my-8">
          {FEATURE_GALLERY.map((gallery) => (
            <Accordion
              key={gallery.title}
              variant="separated"
              defaultValue={selection}
              multiple={false}
              value={selection}
              onChange={(val) => {
                if (val === null) {
                  return setSelection(selection);
                }
                setSelection(val);
              }}
            >
              <Accordion.Item value={gallery.title}>
                <Accordion.Control>{gallery.title}</Accordion.Control>
                <Accordion.Panel>{gallery.description}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ))}
        </div>
        <Image
          alt="image"
          src={
            FEATURE_GALLERY.find((gal) => gal.title === selection)?.imageUrl ||
            ""
          }
          width={600}
          height={100}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default FeatureGallery;
