import React from "react";
import { Disclosure } from "@headlessui/react";
import { FEATURE_GALLERY } from "@/constant";
import { BsChevronDown } from "react-icons/bs";
import Image from "next/image";

const FeatureGallery = () => {
  return (
    <div className="flex flex-col items-center lg:flex-row">
      <div className="flex flex-col flex-1 w-full gap-2 my-8">
        {FEATURE_GALLERY.map((gallery) => (
          <div
            className="bg-gray-200 rounded-lg hover:bg-gray-100"
            key={gallery.title}
          >
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left">
                    <span>{gallery.title}</span>
                    <BsChevronDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {gallery.description}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
      <Image
        alt="image"
        src="/hero.png"
        width={600}
        height={100}
        className="flex-1"
      />
    </div>
  );
};

export default FeatureGallery;
