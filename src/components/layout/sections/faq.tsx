"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQList } from "@/constants";
import { motion } from "motion/react";

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <motion.div>
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-lg tracking-wider text-center text-primary">
            FAQS
          </h2>

          <h2 className="text-3xl font-bold text-center md:text-4xl">
            Common Questions
          </h2>
        </div>
      </motion.div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
