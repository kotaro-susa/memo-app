import { Note } from "@/lib/type";

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
}

export default function NoteItem({ note, isSelected, onClick }: NoteItemProps) {
  const truncatedContent =
    note.content.length > 60
      ? `${note.content.substring(0, 60)}...`
      : note.content;

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/30 hover:bg-secondary/30"
      }`}
    >
      <h3 className="font-medium mb-1 line-clamp-1">
        {note.title || "Untitled"}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {truncatedContent || "No content"}
      </p>
      <p className="text-xs text-muted-foreground mt-2">{note.updatedAt}</p>
    </div>
  );
}
