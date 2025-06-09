import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider"; 

export function BlogCard({ post }) {
  const { t, language } = useLanguage(); 
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen(!isOpen);

  return (
    <>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <img src={post.image} alt={post.title[language]} className="w-full h-48 object-cover" />
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm mb-2">{post.category[language]}</CardTitle>
          <CardTitle className="text-lg">{post.title[language]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">{post.shortText[language]}</p>
          <Button variant="link" onClick={toggleDialog}>
            {t("blog.readMore")}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0">
          <img src={post.image} alt={post.title[language]} className="w-full h-64 object-cover rounded-t-md" />
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-4">{post.title[language]}</DialogTitle>
            </DialogHeader>
            <DialogDescription asChild>
              <div className="text-foreground leading-relaxed">
                {post.fullText[language]}
              </div>
            </DialogDescription>
            <Button variant="link" onClick={toggleDialog} className="mt-4">
              {t("blog.readLess")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
