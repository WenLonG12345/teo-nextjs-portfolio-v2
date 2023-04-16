import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import ThemeProvider from "@/layouts/ThemeProvider";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const greycliffCF = localFont({
  src: [
    {
      path: "../../public/fonts/Greycliff/greycliffcf-thin.otf",
      weight: "100",
    },
    {
      path: "../../public/fonts/Greycliff/greycliffcf-light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/Greycliff/greycliffcf-regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Greycliff/greycliffcf-medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Greycliff/greycliffcf-heavy.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/Greycliff/greycliffcf-bold.otf",
      weight: "700",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --greycliff-font: ${greycliffCF.style.fontFamily};
        }
      `}</style>
      <ThemeProvider customFont={greycliffCF}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </>
  );
}
