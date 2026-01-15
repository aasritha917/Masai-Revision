import { useState, useEffect } from "react";

const DEFAULT_SETTINGS = {
  theme: "light",
  language: "en",
  notifications: true
};

export default function App() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem("settings");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Settings Panel</h2>

      <label>
        Theme:
        <select
          value={settings.theme}
          onChange={e => setSettings({ ...settings, theme: e.target.value })}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>

      <br /><br />

      <label>
        Language:
        <select
          value={settings.language}
          onChange={e => setSettings({ ...settings, language: e.target.value })}
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </label>

      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={settings.notifications}
          onChange={e =>
            setSettings({ ...settings, notifications: e.target.checked })
          }
        />
        Enable Notifications
      </label>

      <br /><br />

      <button onClick={resetSettings}>Reset to Defaults</button>
    </div>
  );
}
