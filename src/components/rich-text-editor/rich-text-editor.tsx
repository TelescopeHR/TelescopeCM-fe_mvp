"use client";

import { useRef, useEffect, useState } from "react";

import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Code,
  Link2,
  Heading2,
  Heading3,
  Quote,
  Undo2,
  Redo2,
} from "lucide-react";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [, setHasSelection] = useState(false);
  const savedSelectionRef = useRef<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && value && !isEditing) {
      editorRef.current.innerHTML = value;
    }
  }, [value, isEditing]);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const updateSelectionState = () => {
    const selection = window.getSelection();
    setHasSelection(selection ? selection.toString().length > 0 : false);
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelectionRef.current = selection.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (selection && savedSelectionRef.current) {
      selection.removeAllRanges();
      selection.addRange(savedSelectionRef.current);
    }
  };

  const executeCommand = (command: string, value?: string) => {
    restoreSelection();
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateSelectionState();
  };

  const createLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const formatHeading = (level: "h2" | "h3") => {
    executeCommand("formatBlock", `<${level}>`);
  };

  return (
    <div
      className={`border border-border rounded-lg overflow-hidden bg-card ${className}`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-3 border-b border-border bg-muted/50">
        {/* Text Formatting */}
        <div className="flex gap-1">
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              executeCommand("bold");
            }}
            title="Bold (Ctrl+B)"
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </span>
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              executeCommand("italic");
            }}
            title="Italic (Ctrl+I)"
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </span>
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              executeCommand("underline");
            }}
            title="Underline (Ctrl+U)"
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </span>
        </div>

        {/* Divider */}
        <div className="w-px bg-border" />

        {/* Headings */}
        <div className="flex gap-1">
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              formatHeading("h2");
            }}
            title="Heading 2"
            className="h-8 w-8 p-0"
          >
            <Heading2 className="h-4 w-4" />
          </span>
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              formatHeading("h3");
            }}
            title="Heading 3"
            className="h-8 w-8 p-0"
          >
            <Heading3 className="h-4 w-4" />
          </span>
        </div>

        {/* Divider */}
        <div className="w-px bg-border" />

        {/* Lists */}
        <div className="flex gap-1">
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              executeCommand("insertUnorderedList");
            }}
            title="Bullet List"
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </span>
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              executeCommand("insertOrderedList");
            }}
            title="Numbered List"
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="h-4 w-4" />
          </span>
        </div>

        {/* Divider */}
        <div className="w-px bg-border" />

        {/* Block Elements */}
        <div className="flex gap-1">
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              executeCommand("formatBlock", "<blockquote>");
            }}
            title="Quote"
            className="h-8 w-8 p-0"
          >
            <Quote className="h-4 w-4" />
          </span>
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              executeCommand("formatBlock", "<pre>");
            }}
            title="Code Block"
            className="h-8 w-8 p-0"
          >
            <Code className="h-4 w-4" />
          </span>
        </div>

        {/* Divider */}
        <div className="w-px bg-border" />

        {/* Links */}
        <div className="flex gap-1">
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              createLink();
            }}
            title="Insert Link"
            className="h-8 w-8 p-0"
          >
            <Link2 className="h-4 w-4" />
          </span>
        </div>

        {/* Divider */}
        <div className="w-px bg-border" />

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("undo");
            }}
            title="Undo"
            className="h-8 w-8 p-0"
          >
            <Undo2 className="h-4 w-4" />
          </span>
          <span
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("redo");
            }}
            title="Redo"
            className="h-8 w-8 p-0"
          >
            <Redo2 className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseUp={updateSelectionState}
        onKeyUp={updateSelectionState}
        onFocus={() => setIsEditing(true)}
        onBlur={() => {
          setIsEditing(false);
          setHasSelection(false);
        }}
        suppressContentEditableWarning
        className="min-h-28 max-h-[30vh] overflow-scroll p-4 outline-none prose prose-sm dark:prose-invert max-w-none
          focus:outline-none focus:ring-0
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
          [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-sm
          [&_ul]:list-disc [&_ul]:pl-6
          [&_ol]:list-decimal [&_ol]:pl-6
          [&_a]:text-primary [&_a]:underline [&_a]:cursor-pointer
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2
          [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-2"
        data-placeholder={placeholder}
      />
    </div>
  );
}
