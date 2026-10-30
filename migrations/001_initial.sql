CREATE TABLE IF NOT EXISTS coral_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'New chat',
  model TEXT NOT NULL DEFAULT 'gemini',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS coral_conversations_user_updated_idx ON coral_conversations (user_id, updated_at DESC);
CREATE TABLE IF NOT EXISTS coral_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES coral_conversations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'complete' CHECK (status IN ('pending','complete','failed')),
  model TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS coral_messages_conversation_created_idx ON coral_messages (conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS coral_messages_user_idx ON coral_messages (user_id);
CREATE TABLE IF NOT EXISTS coral_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  conversation_id UUID REFERENCES coral_conversations(id) ON DELETE CASCADE,
  original_filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  extracted_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS coral_attachments_user_idx ON coral_attachments (user_id, created_at DESC);