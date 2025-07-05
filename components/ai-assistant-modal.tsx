"use client"

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Upload, X } from "lucide-react";
import { generateAdvancedInfoAction } from "@/actions/generate-advanced-info";
import { toast } from "sonner";

interface AIAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  productCategory: string;
  onDataGenerated: (data: any) => void;
}

export function AIAssistantModal({
  open,
  onOpenChange,
  productName,
  productCategory,
  onDataGenerated
}: AIAssistantModalProps) {
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length > 2) {
      toast.error("You can only upload up to 2 images");
      return;
    }
    setSelectedFiles(prev => [...prev, ...files].slice(0, 2));
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() && selectedFiles.length === 0) {
      toast.error("Please provide a description or upload at least one image");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productCategory", productCategory);
        formData.append("description", description);
        
        selectedFiles.forEach((file, index) => {
          formData.append(`image${index + 1}`, file);
        });

        const result = await generateAdvancedInfoAction(formData);
        
        if (result.success) {
          onDataGenerated(result.data);
          onOpenChange(false);
          toast.success("Advanced information generated successfully!");
          // Reset form
          setDescription("");
          setSelectedFiles([]);
        } else {
          toast.error(result.error || "Failed to generate information");
        }
      } catch (error) {
        toast.error("An error occurred while generating information");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Assistant
          </DialogTitle>
          <DialogDescription>
            Let AI help you fill out the advanced information fields. Provide a description or upload images of your product.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Product Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your product, its features, target audience, or any specific styling preferences..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Product Images (Optional - Max 2)</Label>
            <div className="space-y-3">
              <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/70 transition-colors cursor-pointer"
                onClick={() => document.getElementById('ai-images')?.click()}
              >
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload images (JPG, PNG)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  AI will analyze your images to generate better styling recommendations
                </p>
              </div>
              
              <Input
                id="ai-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || (!description.trim() && selectedFiles.length === 0)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Info
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
