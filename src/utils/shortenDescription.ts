export const shortenDescription = (description: string) => {
  const defaultContinue = " Continue reading on Medium »";

  description = description
    ?.replace(/<h3>.*<\/h3>|<figcaption>.*<\/figcaption>|<[^>]*>/gm, "")
    .substring(0, 150);
  if (description.length <= 150 - defaultContinue.length) {
    description += defaultContinue;
  }
  description += "...";

  return description;
};
