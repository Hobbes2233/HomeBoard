import { useState } from "react";
import { Row } from "../../Shared/Row";
import { Column } from "../../Shared/Column";
import { css } from "@emotion/react";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoCardProps {
  title?: string;
  initialTodos?: TodoItem[];
  cssStyles?: string;
}

export function TodoCard({ title = "To-Do List", initialTodos = [], cssStyles }: TodoCardProps) {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
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
        {/* Add new todo input */}
        <Row gap="8px" alignItems="center">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            css={css`
              flex: 1;
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
          <button
            onClick={addTodo}
            disabled={!newTodoText.trim()}
            css={css`
              padding: 8px 16px;
              background-color: #007bff;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 14px;
              &:hover:not(:disabled) {
                background-color: #0056b3;
              }
              &:disabled {
                background-color: #ccc;
                cursor: not-allowed;
              }
            `}
          >
            Add
          </button>
        </Row>

        {/* Todo list */}
        <div
          css={css`
            max-height: 300px;
            overflow-y: auto;
          `}
        >
          {todos.length === 0 ? (
            <div
              css={css`
                text-align: center;
                color: #666;
                font-style: italic;
                padding: 20px;
              `}
            >
              No tasks yet. Add one above!
            </div>
          ) : (
            todos.map((todo) => (
              <Row
                key={todo.id}
                gap="8px"
                alignItems="center"
                css={css`
                  padding: 8px;
                  border-bottom: 1px solid #f0f0f0;
                  &:last-child {
                    border-bottom: none;
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  css={css`
                    margin: 0;
                    cursor: pointer;
                  `}
                />
                <span
                  css={css`
                    flex: 1;
                    font-size: 14px;
                    ${todo.completed &&
                    css`
                      text-decoration: line-through;
                      color: #666;
                    `}
                  `}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  css={css`
                    background: none;
                    border: none;
                    color: #dc3545;
                    cursor: pointer;
                    font-size: 16px;
                    padding: 4px;
                    border-radius: 4px;
                    &:hover {
                      background-color: #f8d7da;
                    }
                  `}
                >
                  ×
                </button>
              </Row>
            ))
          )}
        </div>

        {/* Summary */}
        {todos.length > 0 && (
          <div
            css={css`
              margin-top: 8px;
              padding-top: 8px;
              border-top: 1px solid #f0f0f0;
              font-size: 12px;
              color: #666;
              text-align: center;
            `}
          >
            {todos.filter((t) => t.completed).length} of {todos.length} tasks completed
          </div>
        )}
      </Column>
    </div>
  );
}
