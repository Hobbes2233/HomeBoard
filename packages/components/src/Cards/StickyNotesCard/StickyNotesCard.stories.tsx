import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../ThemeProvider";
import { StickyNotesCard } from "./StickyNotesCard";

const meta: Meta<typeof StickyNotesCard> = {
  title: "Cards/StickyNotesCard",
  component: StickyNotesCard,
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
    initialNotes: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sticky Notes",
    initialNotes: [],
  },
};

export const WithInitialNotes: Story = {
  args: {
    title: "My Notes",
    initialNotes: [
      {
        id: "1",
        title: "Shopping List",
        content: "Milk\nBread\nEggs\nBananas",
        color: "#ffeb3b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Meeting Notes",
        content: "Discuss Q4 goals\nReview budget\nPlan team outing",
        color: "#4caf50",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        title: "Ideas",
        content: "New project idea\nFeature improvements\nBug fixes",
        color: "#2196f3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
};
