import { useState } from "react";
import { Row } from "../../Shared/Row";
import { Column } from "../../Shared/Column";
import { css } from "@emotion/react";

export interface StickyNote {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StickyNotesCardProps {
  title?: string;
  initialNotes?: StickyNote[];
  cssStyles?: string;
}

const NOTE_COLORS = [
  "#ffeb3b", // Yellow
  "#ff9800", // Orange
  "#4caf50", // Green
  "#2196f3", // Blue
  "#9c27b0", // Purple
  "#f44336", // Red
  "#e91e63", // Pink
  "#00bcd4", // Cyan
];

export function StickyNotesCard({ title = "Sticky Notes", initialNotes = [], cssStyles }: StickyNotesCardProps) {
  const [notes, setNotes] = useState<StickyNote[]>(initialNotes);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);

  const addNote = () => {
    if (newNoteTitle.trim() || newNoteContent.trim()) {
      const newNote: StickyNote = {
        id: Date.now().toString(),
        title: newNoteTitle.trim(),
        content: newNoteContent.trim(),
        color: selectedColor,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes([newNote, ...notes]);
      setNewNoteTitle("");
      setNewNoteContent("");
      setSelectedColor(NOTE_COLORS[0]);
      setIsAddingNote(false);
    }
  };

  // const updateNote = (id: string, updates: Partial<StickyNote>) => {
  //   setNotes(notes.map(note =>
  //     note.id === id
  //       ? { ...note, ...updates, updatedAt: new Date() }
  //       : note
  //   ));
  // };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const cancelAddNote = () => {
    setNewNoteTitle("");
    setNewNoteContent("");
    setSelectedColor(NOTE_COLORS[0]);
    setIsAddingNote(false);
  };

  return (
    <div
      css={css`
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        ${cssStyles}
      `}
    >
      <div
        css={css`
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 16px;
          color: #333;
        `}
      >
        {title}
      </div>
      <Column gap="12px">
        {/* Add note button */}
        {!isAddingNote && (
          <button
            onClick={() => setIsAddingNote(true)}
            css={css`
              padding: 12px;
              background-color: #007bff;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-size: 14px;
              font-weight: bold;
              &:hover {
                background-color: #0056b3;
              }
            `}
          >
            + Add New Note
          </button>
        )}

        {/* Add note form */}
        {isAddingNote && (
          <div
            css={css`
              padding: 16px;
              background-color: #f8f9fa;
              border-radius: 8px;
              border: 2px dashed #dee2e6;
            `}
          >
            <Column gap="12px">
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Note title (optional)"
                css={css`
                  padding: 8px 12px;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  font-size: 14px;
                  &:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
                  }
                `}
              />

              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Write your note here..."
                rows={4}
                css={css`
                  padding: 8px 12px;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  font-size: 14px;
                  resize: vertical;
                  font-family: inherit;
                  &:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
                  }
                `}
              />

              {/* Color picker */}
              <div
                css={css`
                  display: flex;
                  gap: 8px;
                  align-items: center;
                `}
              >
                <span
                  css={css`
                    font-size: 14px;
                    color: #666;
                  `}
                >
                  Color:
                </span>
                {NOTE_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    css={css`
                      width: 24px;
                      height: 24px;
                      border-radius: 50%;
                      border: 2px solid ${selectedColor === color ? "#333" : "transparent"};
                      background-color: ${color};
                      cursor: pointer;
                      transition: transform 0.2s;
                      &:hover {
                        transform: scale(1.1);
                      }
                    `}
                  />
                ))}
              </div>

              {/* Action buttons */}
              <Row gap="8px" justifyContent="flex-end">
                <button
                  onClick={cancelAddNote}
                  css={css`
                    padding: 8px 16px;
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    &:hover {
                      background-color: #5a6268;
                    }
                  `}
                >
                  Cancel
                </button>
                <button
                  onClick={addNote}
                  disabled={!newNoteTitle.trim() && !newNoteContent.trim()}
                  css={css`
                    padding: 8px 16px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    &:hover:not(:disabled) {
                      background-color: #218838;
                    }
                    &:disabled {
                      background-color: #ccc;
                      cursor: not-allowed;
                    }
                  `}
                >
                  Add Note
                </button>
              </Row>
            </Column>
          </div>
        )}

        {/* Notes grid */}
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 12px;
            max-height: 400px;
            overflow-y: auto;
          `}
        >
          {notes.map((note) => (
            <div
              key={note.id}
              css={css`
                padding: 12px;
                background-color: ${note.color};
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                position: relative;
                min-height: 120px;
                word-wrap: break-word;
              `}
            >
              {/* Note header */}
              <Row gap="8px" alignItems="flex-start" justifyContent="space-between">
                {note.title && (
                  <div
                    css={css`
                      font-weight: bold;
                      font-size: 14px;
                      margin-bottom: 8px;
                      flex: 1;
                    `}
                  >
                    {note.title}
                  </div>
                )}
                <button
                  onClick={() => deleteNote(note.id)}
                  css={css`
                    background: none;
                    border: none;
                    color: rgba(0, 0, 0, 0.6);
                    cursor: pointer;
                    font-size: 16px;
                    padding: 0;
                    line-height: 1;
                    &:hover {
                      color: rgba(0, 0, 0, 0.8);
                    }
                  `}
                >
                  ×
                </button>
              </Row>

              {/* Note content */}
              {note.content && (
                <div
                  css={css`
                    font-size: 13px;
                    line-height: 1.4;
                    white-space: pre-wrap;
                  `}
                >
                  {note.content}
                </div>
              )}

              {/* Note footer */}
              <div
                css={css`
                  position: absolute;
                  bottom: 8px;
                  right: 8px;
                  font-size: 10px;
                  color: rgba(0, 0, 0, 0.5);
                `}
              >
                {note.updatedAt.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {notes.length === 0 && !isAddingNote && (
          <div
            css={css`
              text-align: center;
              color: #666;
              font-style: italic;
              padding: 40px 20px;
            `}
          >
            No notes yet. Click "Add New Note" to get started!
          </div>
        )}
      </Column>
    </div>
  );
}
