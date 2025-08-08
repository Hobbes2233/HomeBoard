import { Column, Row, TimeCard, CalendarCard, TodoCard, PhotoSlideshowCard, StickyNotesCard } from '@hakit/components';

function Dashboard() {
  return (
    <Column fullWidth fullHeight gap="16px" cssStyles={`
      padding: 16px;
      background-color: var(--ha-S100, #f8f9fa);
      min-height: 100vh;
    `}>
      <div css={`
        text-align: center;
        margin-bottom: 24px;
      `}>
        <h1 css={`
          font-size: 2.5rem;
          color: var(--ha-A400, #007bff);
          margin-bottom: 8px;
        `}>
          Dashboard
        </h1>
        <p css={`
          font-size: 1.1rem;
          color: var(--ha-S200-contrast, #666);
        `}>
          Welcome to your personalized dashboard
        </p>
      </div>

      {/* Top row with time and calendar */}
      <Row gap="16px" css={`
        @media (max-width: 768px) {
          flex-direction: column;
        }
      `}>
        <TimeCard 
          title="Current Time"
          showDate={true}
          showSeconds={true}
          cssStyles={`
            flex: 1;
            min-width: 200px;
          `}
        />
        <CalendarCard 
          title="Calendar"
          cssStyles={`
            flex: 2;
            min-width: 300px;
          `}
        />
      </Row>

      {/* Middle row with to-do list and photo slideshow */}
      <Row gap="16px" css={`
        @media (max-width: 768px) {
          flex-direction: column;
        }
      `}>
        <TodoCard 
          title="To-Do List"
          initialTodos={[
            {
              id: '1',
              text: 'Welcome to your dashboard!',
              completed: false,
              createdAt: new Date()
            },
            {
              id: '2',
              text: 'Add your first task',
              completed: false,
              createdAt: new Date()
            }
          ]}
          cssStyles={`
            flex: 1;
            min-width: 300px;
          `}
        />
        <PhotoSlideshowCard 
          title="Photo Slideshow"
          cssStyles={`
            flex: 1;
            min-width: 300px;
          `}
        />
      </Row>

      {/* Bottom row with sticky notes */}
      <StickyNotesCard 
        title="Sticky Notes"
        initialNotes={[
          {
            id: '1',
            title: 'Welcome Note',
            content: 'Welcome to your new dashboard! You can add notes, manage tasks, view your calendar, and enjoy a photo slideshow.',
            color: '#ffeb3b',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]}
        cssStyles={`
          width: 100%;
        `}
      />
    </Column>
  );
}

export default Dashboard;