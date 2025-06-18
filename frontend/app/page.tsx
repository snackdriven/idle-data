"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Client from "@/app/lib/client";
import type { journal } from "@/app/lib/client";
import type { FC } from "react";
import { useEffect, useState, useId } from "react";
import { DateTime } from "luxon";

function App() {
  const [baseURL, setBaseURL] = useState("");
  useEffect(() => setBaseURL(window.location.origin), []);

  if (!baseURL) return null;

  return (
    <div className="lj-container">
      <Header />
      <UserHeader />
      <Navigation />
      <div className="lj-main">
        <div className="lj-content">
          <JournalEntries client={new Client(baseURL)} />
        </div>
        <div className="lj-sidebar">
          <Sidebar client={new Client(baseURL)} />
        </div>
      </div>
    </div>
  );
}

const Header: FC = () => {
  return (
    <div className="lj-top-header">
      <div className="lj-header-content">
        <div className="lj-logo">
          <span className="lj-logo-text">LIVEJOURNAL</span>
        </div>
        <div className="lj-top-nav">
          <a href="/find">FIND MORE</a>
          <a href="/friends">FRIENDS FEED</a>
          <a href="/shop">SHOP</a>
        </div>
        <div className="lj-user-section">
          <span className="lj-post-button">POST NEW ENTRY</span>
          <span className="lj-notifications">🔔</span>
          <span className="lj-username-top">HELLASPOOKY ▼</span>
          <span className="lj-search">🔍</span>
        </div>
      </div>
    </div>
  );
};

const UserHeader: FC = () => {
  return (
    <div className="lj-user-header">
      <span className="lj-username">HELLASPOOKY</span>
      <span className="lj-tagline">you speak only in riddles and loss</span>
    </div>
  );
};

const Navigation: FC = () => {
  return (
    <div className="lj-nav">
      <div className="lj-nav-tabs">
        <a href="/" className="active">RECENT ENTRIES</a>
        <a href="/friends">FRIENDS</a>
        <a href="/archive">ARCHIVE</a>
        <a href="/profile">PROFILE</a>
        <a href="/add">ADD TO MEMORIES</a>
        <a href="/rss">RSS</a>
      </div>
    </div>
  );
};

const JournalEntries: FC<{ client: Client }> = ({ client }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["journal-entries"],
    queryFn: () => client.journal.list(),
    refetchInterval: 30000, // 30s
    retry: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div style={{ color: 'red' }}>{(error as Error).message}</div>;
  }

  return (
    <>
      <PostNewEntry client={client} />
      {data?.entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} client={client} />
      ))}
    </>
  );
};

const PostNewEntry: FC<{ client: Client }> = ({ client }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("");
  const [music, setMusic] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "friends" | "private">("public");
  const privacyId = useId();

  const queryClient = useQueryClient();

  const createEntry = useMutation({
    mutationFn: async (params: journal.CreateEntryParams) => {
      return client.journal.create(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
      setSubject("");
      setBody("");
      setMood("");
      setMusic("");
      setIsOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    
    createEntry.mutate({
      subject: subject.trim() || undefined,
      body: body.trim(),
      mood: mood.trim() || undefined,
      music: music.trim() || undefined,
      privacy,
    });
  };

  if (!isOpen) {
    return (
      <button 
        type="button"
        className="lj-form" 
        style={{ cursor: 'pointer', border: 'none', background: '#f8f8f8' }}
        onClick={() => setIsOpen(true)}
      >
        <h3>POST NEW ENTRY</h3>
      </button>
    );
  }

  return (
    <form className="lj-form" onSubmit={handleSubmit}>
      <h3>POST NEW ENTRY</h3>
      
      <div style={{ marginBottom: '8px' }}>
        <input
          type="text"
          placeholder="Subject (optional)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <textarea
          placeholder="What's on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <input
          type="text"
          placeholder="Current mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ flex: 1 }}
        />
        <input
          type="text"
          placeholder="Current music"
          value={music}
          onChange={(e) => setMusic(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
        <label htmlFor={privacyId} style={{ fontSize: '11px' }}>Privacy:</label>
        <select 
          id={privacyId}
          value={privacy} 
          onChange={(e) => setPrivacy(e.target.value as "public" | "friends" | "private")}
          style={{ width: 'auto' }}
        >
          <option value="public">Public</option>
          <option value="friends">Friends</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="submit" disabled={createEntry.isPending || !body.trim()}>
          {createEntry.isPending ? 'Posting...' : 'Post Entry'}
        </button>
        <button type="button" onClick={() => setIsOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

const JournalEntry: FC<{ entry: journal.JournalEntry; client: Client }> = ({ entry, client }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSubject, setEditSubject] = useState(entry.subject || "");
  const [editBody, setEditBody] = useState(entry.body);
  const [editMood, setEditMood] = useState(entry.mood || "");
  const [editMusic, setEditMusic] = useState(entry.music || "");

  const queryClient = useQueryClient();

  const updateEntry = useMutation({
    mutationFn: async (params: {
      subject?: string;
      body?: string;
      mood?: string;
      music?: string;
      tags?: string[];
      privacy?: "public" | "friends" | "private";
    }) => {
      return client.journal.update(entry.id, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
      setIsEditing(false);
    },
  });

  const deleteEntry = useMutation({
    mutationFn: async () => {
      return client.journal.del(entry.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
    },
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateEntry.mutate({
      subject: editSubject.trim() || undefined,
      body: editBody.trim(),
      mood: editMood.trim() || undefined,
      music: editMusic.trim() || undefined,
    });
  };

  const createdAt = DateTime.fromISO(entry.createdAt);

  if (isEditing) {
    return (
      <div className="lj-entry">
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editSubject}
            onChange={(e) => setEditSubject(e.target.value)}
            placeholder="Subject"
            style={{ width: '100%', marginBottom: '8px' }}
          />
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            style={{ width: '100%', height: '120px', marginBottom: '8px' }}
            required
          />
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <input
              type="text"
              placeholder="Mood"
              value={editMood}
              onChange={(e) => setEditMood(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Music"
              value={editMusic}
              onChange={(e) => setEditMusic(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" disabled={updateEntry.isPending}>
              {updateEntry.isPending ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="lj-entry">
      <div className="lj-entry-header">
        <div className="lj-entry-date">
          {createdAt.toFormat('EEEE, MMMM d, yyyy')}
        </div>
        {entry.subject && (
          <div className="lj-entry-subject">
            🔒 {entry.subject}
          </div>
        )}
        <div className="lj-entry-meta">
          {entry.mood && <span className="lj-mood">Current mood: {entry.mood}</span>}
          {entry.mood && entry.music && <span> | </span>}
          {entry.music && <span className="lj-music">Current music: {entry.music}</span>}
        </div>
      </div>

      <div className="lj-entry-body">
        {entry.body.split('\n').map((paragraph, paragraphIndex) => (
          <p key={`paragraph-${entry.id}-${paragraphIndex}`} style={{ margin: '8px 0' }}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className="lj-entry-actions">
        <button 
          type="button"
          style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', fontSize: '11px', padding: 0, marginRight: '12px', textDecoration: 'none' }}
          onClick={() => setIsEditing(true)}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
        >
          Edit Entry
        </button>
        <button 
          type="button"
          style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', fontSize: '11px', padding: 0, marginRight: '12px', textDecoration: 'none' }}
          onClick={() => { /* TODO: implement */ }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
        >
          Add to Memories
        </button>
        <button 
          type="button"
          style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', fontSize: '11px', padding: 0, marginRight: '12px', textDecoration: 'none' }}
          onClick={() => { /* TODO: implement */ }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
        >
          Track This
        </button>
        <button 
          type="button"
          style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', fontSize: '11px', padding: 0, marginRight: '12px', textDecoration: 'none' }}
          onClick={() => { 
            if (confirm('Are you sure you want to delete this entry?')) {
              deleteEntry.mutate();
            }
          }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
        >
          Delete Entry
        </button>
      </div>
    </div>
  );
};

const Sidebar: FC<{ client: Client }> = ({ client }) => {
  const { data: entries } = useQuery({
    queryKey: ["journal-entries"],
    queryFn: () => client.journal.list(),
    refetchInterval: 30000,
    retry: false,
  });

  return (
    <div>
      <Calendar entries={entries?.entries || []} />
      <PageSummary entries={entries?.entries || []} />
      <Tags entries={entries?.entries || []} />
    </div>
  );
};

const Calendar: FC<{ entries: journal.JournalEntry[] }> = ({ entries }) => {
  const now = DateTime.now();
  const month = now.month;
  const year = now.year;
  
  // Get all days in current month
  const daysInMonth = now.daysInMonth || 30;
  const firstDayOfMonth = DateTime.fromObject({ year, month, day: 1 });
  const startDayOfWeek = firstDayOfMonth.weekday % 7; // Convert to 0-6 where 0 is Sunday
  
  // Create array of all days to display
  const calendarDays: (number | null)[] = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get entry dates for this month
  const entryDates = new Set(
    entries
      .map(entry => DateTime.fromISO(entry.createdAt))
      .filter(date => date.month === month && date.year === year)
      .map(date => date.day)
  );

  const monthName = now.toFormat('MMMM yyyy');

  return (
    <div className="lj-widget">
      <div className="lj-widget-header">
        {monthName}
      </div>
      <div className="lj-widget-content lj-calendar">
        <table>
          <thead>
            <tr>
              <th>S</th>
              <th>M</th>
              <th>T</th>
              <th>W</th>
              <th>T</th>
              <th>F</th>
              <th>S</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(calendarDays.length / 7) }, (_, weekIndex) => {
              const weekStart = weekIndex * 7;
              const weekEnd = Math.min(weekStart + 6, calendarDays.length - 1);
              const weekKey = `week-${year}-${month}-${weekStart}-${weekEnd}`;
              
              return (
                <tr key={weekKey}>
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const arrayIndex = weekIndex * 7 + dayIndex;
                    const day = calendarDays[arrayIndex];
                    const isToday = day === now.day;
                    const hasEntry = day ? entryDates.has(day) : false;
                    
                    let className = '';
                    if (isToday) className += ' today';
                    if (hasEntry) className += ' has-entry';
                    
                    return (
                      <td key={`day-${year}-${month}-${day || `empty-${arrayIndex}`}`} className={className}>
                        {day || ''}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PageSummary: FC<{ entries: journal.JournalEntry[] }> = ({ entries }) => {
  const recentEntries = entries.slice(0, 10);
  
  return (
    <div className="lj-widget">
      <div className="lj-widget-header">
        Page Summary
      </div>
      <div className="lj-widget-content lj-page-summary">
        <ul>
          {recentEntries.map((entry) => {
            const subject = entry.subject || "(no subject)";
            return (
              <li key={entry.id}>
                <a href={`#entry-${entry.id}`}>
                  {subject} — 1 comment
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const Tags: FC<{ entries: journal.JournalEntry[] }> = () => {
  // For now, we'll just show static tags like in the image
  return (
    <div className="lj-widget">
      <div className="lj-widget-header">
        Tags
      </div>
      <div className="lj-widget-content">
        <div style={{ fontSize: '11px' }}>
          I feel like I'm waiting for something better watch out livejournal welcome whatstapp
        </div>
      </div>
    </div>
  );
};

export default App;
