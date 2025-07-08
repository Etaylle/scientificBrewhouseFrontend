import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export function AboutSection() {
  const { t } = useLanguage();
  const fullText = t("about.text") ?? "...";
  const extraMarkdown = t("about.extra");

  return (
    <section id="about" className="w-full py-12 space-y-6 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-extrabold text-foreground mb-8 border-b border-muted pb-2">
          {t("about.title") ?? "Über das Scientific Brewhouse"}
        </h2>

        <div className="text-lg text-muted-foreground text-justify">
        {fullText}
        {extraMarkdown && (
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="link" 
                className="px-2 text-primary underline whitespace-nowrap ml-1"
              >
                {t("blog.readMore") ?? "Mehr erfahren"}
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl">
              <DialogHeader className="mb-4 text-center">
                <DialogTitle className="text-4xl font-black text-primary tracking-tight text-center">
                  {t("about.title") ?? "Über das Scientific Brewhouse"}
                </DialogTitle>
                <div className="border-b border-border mt-3 w-24 mx-auto" />
              </DialogHeader>

              <div className="prose dark:prose-invert text-justify max-w-none overflow-y-auto max-h-[75vh]">
                <div className="px-8">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {extraMarkdown}
                  </ReactMarkdown>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        </div>
      </div>
    </section>
  );
}