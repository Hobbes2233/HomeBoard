import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../ThemeProvider";
import { CalendarCard } from "./CalendarCard";

const meta: Meta<typeof CalendarCard> = {
  title: "Cards/CalendarCard",
  component: CalendarCard,
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Calendar",
  },
};

export const CustomTitle: Story = {
  args: {
    title: "My Events Calendar",
  },
};
