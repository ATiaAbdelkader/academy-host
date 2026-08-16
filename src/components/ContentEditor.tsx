import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import type { ContentBlock } from "@/convex/schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const BLOCK_TYPES: ContentBlock["type"][] = [
  "heading",
  "paragraph",
  "code",
  "list",
  "note",
];

function blankBlock(type: ContentBlock["type"]): ContentBlock {
  switch (type) {
    case "heading":
      return { type: "heading", text: "" };
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "code":
      return { type: "code", text: "", prompt: false };
    case "list":
      return { type: "list", items: [""] };
    case "note":
      return { type: "note", text: "", tone: "info" };
  }
}

/** Convert a block to another type, carrying over its text where possible. */
function convertBlock(
  block: ContentBlock,
  type: ContentBlock["type"],
): ContentBlock {
  const text =
    block.type === "list" ? block.items.join("\n") : block.text;
  switch (type) {
    case "heading":
      return { type: "heading", text };
    case "paragraph":
      return { type: "paragraph", text };
    case "code":
      return {
        type: "code",
        text,
        prompt: block.type === "code" ? block.prompt : false,
      };
    case "list":
      return {
        type: "list",
        items: text.length > 0 ? text.split("\n") : [""],
      };
    case "note":
      return {
        type: "note",
        text,
        tone: block.type === "note" ? block.tone : "info",
      };
  }
}

function BlockFields({
  block,
  onChange,
}: {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}) {
  if (block.type === "list") {
    return (
      <div className="space-y-1.5">
        <Label>items — one per line</Label>
        <Textarea
          value={block.items.join("\n")}
          onChange={(e) =>
            onChange({ type: "list", items: e.target.value.split("\n") })
          }
          rows={3}
          placeholder={
            "Measure before you schedule\nApply at the right rate\nLog every event"
          }
          className="resize-y"
        />
      </div>
    );
  }

  if (block.type === "code") {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label>terminal output / code</Label>
          <Textarea
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            rows={3}
            placeholder={"agriskills status --all\n[ok] ready"}
            className="resize-y font-mono text-xs"
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <Checkbox
            checked={block.prompt ?? false}
            onCheckedChange={(checked) =>
              onChange({ ...block, prompt: checked === true })
            }
          />
          render the first line as a command prompt
        </label>
      </div>
    );
  }

  if (block.type === "note") {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label>note text</Label>
          <Textarea
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            rows={2}
            placeholder="A callout worth highlighting…"
            className="resize-y"
          />
        </div>
        <div className="space-y-1.5">
          <Label>tone</Label>
          <Select
            value={block.tone}
            onValueChange={(tone) =>
              onChange({ ...block, tone: tone as "info" | "warn" })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">info — green note</SelectItem>
              <SelectItem value="warn">warn — amber caution</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Label>
        {block.type === "heading" ? "heading text" : "paragraph text"}
      </Label>
      {block.type === "heading" ? (
        <Input
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Section heading"
        />
      ) : (
        <Textarea
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          rows={3}
          placeholder="Body copy for this paragraph…"
          className="resize-y"
        />
      )}
    </div>
  );
}

function blockSummary(block: ContentBlock): string {
  if (block.type === "list") {
    const count = block.items.filter((i) => i.trim().length > 0).length;
    return `${count} item${count === 1 ? "" : "s"}`;
  }
  const text = block.text;
  return text.trim().length > 0 ? `${text.trim().length} chars` : "empty";
}

export function ContentEditor({
  course,
  open,
  onOpenChange,
}: {
  course: Doc<"courses"> | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const updateCourse = useMutation(api.courses.update);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [addType, setAddType] = useState<ContentBlock["type"]>("paragraph");
  const [saving, setSaving] = useState(false);

  // Load a fresh copy of the course content whenever the dialog opens.
  useEffect(() => {
    if (open && course) {
      setBlocks(course.content.map((b) => ({ ...b })));
      setAddType("paragraph");
    }
  }, [open, course]);

  const updateBlock = (index: number, block: ContentBlock) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? block : b)));
  };

  const removeBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    setBlocks((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const addBlock = () => {
    setBlocks((prev) => [...prev, blankBlock(addType)]);
  };

  const handleSave = async () => {
    if (!course) return;
    const cleaned: ContentBlock[] = [];
    for (const block of blocks) {
      if (block.type === "list") {
        const items = block.items
          .map((item) => item.trim())
          .filter((item) => item.length > 0);
        if (items.length > 0) {
          cleaned.push({ type: "list", items });
        }
      } else {
        const text = "text" in block ? block.text.trim() : "";
        if (text.length > 0) {
          cleaned.push({ ...block, text } as ContentBlock);
        }
      }
    }
    if (cleaned.length === 0) {
      toast.error("Add at least one block before saving.");
      return;
    }
    setSaving(true);
    try {
      await updateCourse({ id: course._id, content: cleaned });
      toast.success(`Saved ${cleaned.length} content blocks.`);
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not save content.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit course content</DialogTitle>
          <DialogDescription>
            {course?.title} — ordered blocks rendered top to bottom on the
            course page. Empty blocks are removed on save.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {blocks.length === 0 && (
            <div className="border border-border bg-muted/50 px-4 py-8 text-center text-xs text-muted-foreground">
              <p>
                <span className="text-term-amber">[warn]</span> no blocks yet —
                add one below.
              </p>
            </div>
          )}

          {blocks.map((block, i) => (
            <div key={i} className="border border-border bg-card">
              <div className="flex items-center justify-between gap-2 border-b border-border bg-muted px-3 py-1.5">
                <span className="text-[11px] text-muted-foreground">
                  #{String(i + 1).padStart(2, "0")} · {blockSummary(block)}
                </span>
                <span className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="size-6"
                    disabled={i === 0}
                    onClick={() => moveBlock(i, -1)}
                  >
                    <ArrowUp className="size-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="size-6"
                    disabled={i === blocks.length - 1}
                    onClick={() => moveBlock(i, 1)}
                  >
                    <ArrowDown className="size-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="size-6 text-destructive hover:text-destructive"
                    onClick={() => removeBlock(i)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </span>
              </div>

              <div className="space-y-3 p-3">
                <div className="space-y-1.5">
                  <Label>block type</Label>
                  <Select
                    value={block.type}
                    onValueChange={(type) =>
                      updateBlock(
                        i,
                        convertBlock(block, type as ContentBlock["type"]),
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOCK_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <BlockFields block={block} onChange={(b) => updateBlock(i, b)} />
              </div>
            </div>
          ))}
        </div>

        {/* add block */}
        <div className="flex items-end gap-2 border border-dashed border-border p-3">
          <div className="flex-1 space-y-1.5">
            <Label>add block</Label>
            <Select
              value={addType}
              onValueChange={(type) =>
                setAddType(type as ContentBlock["type"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BLOCK_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addBlock}>
            <Plus className="size-3.5" />
            add
          </Button>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="size-3.5 animate-spin" /> : null}
            save content
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
