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
    <section id="about" className="container mx-auto px-4 py-12 space-y-6">
      <h2 className="text-3xl font-extrabold text-foreground mb-8 border-b border-muted pb-2">
        {t("about.title") ?? "Über das Scientific Brewhouse"}
      </h2>

      <p className="text-lg text-muted-foreground max-w-3xl whitespace-pre-line">
        {fullText}
      </p>

      {extraMarkdown && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="px-0 text-primary underline">
              {t("blog.readMore") ?? "Mehr erfahren"}
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl">
  <DialogHeader className="mb-4 text-center">
    <DialogTitle className="text-4xl font-black text-primary tracking-tight">
      {t("about.title") ?? "Über das Scientific Brewhouse"}
    </DialogTitle>
    <div className="border-b border-border mt-3 w-24 mx-auto" />
  </DialogHeader>

  <div className="prose dark:prose-invert max-w-none overflow-y-auto max-h-[75vh]">
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {extraMarkdown}
    </ReactMarkdown>
  </div>
</DialogContent>
        </Dialog>
      )}
    </section>
  );
}