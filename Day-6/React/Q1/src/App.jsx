import { useState } from "react";

function Dashboard() {
  const [showStats, setShowStats] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [showActions, setShowActions] = useState(true);

  const noWidgets =
    !showStats && !showActivity && !showActions;

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={() => setShowStats(!showStats)}>
        Toggle User Stats
      </button>
      <button onClick={() => setShowActivity(!showActivity)}>
        Toggle Recent Activity
      </button>
      <button onClick={() => setShowActions(!showActions)}>
        Toggle Quick Actions
      </button>

      <hr />

      {noWidgets && <p>No widgets selected</p>}

      {showStats && <UserStats />}
      {showActivity ? <RecentActivity /> : null}
      {showActions && <QuickActions />}
    </div>
  );
}

function UserStats() {
  return <div>User Stats Widget</div>;
}

function RecentActivity() {
  return <div>Recent Activity Widget</div>;
}

function QuickActions() {
  return <div>Quick Actions Widget</div>;
}

export default Dashboard;
