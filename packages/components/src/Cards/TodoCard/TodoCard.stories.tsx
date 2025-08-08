import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../ThemeProvider";
import { TodoCard } from "./TodoCard";

const meta: Meta<typeof TodoCard> = {
  title: "Cards/TodoCard",
  component: TodoCard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: "20px", background: "#f5f5f5", minHeight: "100vh" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    initialTodos: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "To-Do List",
    initialTodos: [],
  },
};

export const WithInitialTodos: Story = {
  args: {
    title: "My Tasks",
    initialTodos: [
      {
        id: "1",
        text: "Buy groceries",
        completed: false,
        createdAt: new Date(),
      },
      {
        id: "2",
        text: "Call dentist",
        completed: true,
        createdAt: new Date(),
      },
      {
        id: "3",
        text: "Write documentation",
        completed: false,
        createdAt: new Date(),
      },
    ],
  },
};
