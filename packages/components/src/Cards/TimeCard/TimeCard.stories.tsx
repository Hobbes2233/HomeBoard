import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../../ThemeProvider";
import { TimeCard } from "./TimeCard";

const meta: Meta<typeof TimeCard> = {
  title: "Cards/TimeCard",
  component: TimeCard,
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
    showDate: { control: "boolean" },
    showSeconds: { control: "boolean" },
    timezone: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Current Time",
    showDate: true,
    showSeconds: true,
    timezone: "local",
  },
};

export const NoSeconds: Story = {
  args: {
    title: "Time Only",
    showDate: true,
    showSeconds: false,
    timezone: "local",
  },
};

export const NoDate: Story = {
  args: {
    title: "Clock",
    showDate: false,
    showSeconds: true,
    timezone: "local",
  },
};

export const CustomTimezone: Story = {
  args: {
    title: "UTC Time",
    showDate: true,
    showSeconds: true,
    timezone: "UTC",
  },
};
