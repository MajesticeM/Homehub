const AGENT_REGISTRY_KEY = 'homehub_agent_registry_v1';
const ACTIVE_AGENT_KEY = 'homehub_active_agent_v1';

function getStorage() {
  if (typeof globalThis === 'undefined') return null;
  return globalThis.localStorage || null;
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function getAgentRegistry() {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const raw = storage.getItem(AGENT_REGISTRY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAgentRegistry(registry) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(AGENT_REGISTRY_KEY, JSON.stringify(registry));
}

export function getActiveAgent() {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(ACTIVE_AGENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveActiveAgent(agent) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(ACTIVE_AGENT_KEY, JSON.stringify(agent));
}

export function logoutAgent() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(ACTIVE_AGENT_KEY);
}

export function registerAgent(formData = {}) {
  const fullName = String(formData.fullName || formData.name || '').trim();
  const email = normalizeEmail(formData.email);
  const password = String(formData.password || '').trim();
  const agency = String(formData.agency || 'Independent Agent').trim();
  const phone = String(formData.phone || '').trim();

  if (!fullName || !email || !password) {
    return {
      ok: false,
      message: 'Full name, email, and password are required.'
    };
  }

  const registry = getAgentRegistry();
  const existing = registry.find((agent) => agent.email === email);
  if (existing) {
    return {
      ok: false,
      message: 'An agent account with this email already exists.'
    };
  }

  const agent = {
    id: `agent-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: fullName,
    role: 'agent',
    agency,
    email,
    phone,
    password,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
    createdAt: new Date().toISOString()
  };

  const updatedRegistry = [agent, ...registry];
  saveAgentRegistry(updatedRegistry);
  saveActiveAgent(agent);

  return {
    ok: true,
    agent,
    message: 'Agent account created successfully.'
  };
}

export function loginAgent({ email, password } = {}) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = String(password || '').trim();

  if (!normalizedEmail || !normalizedPassword) {
    return {
      ok: false,
      message: 'Email and password are required.'
    };
  }

  const registry = getAgentRegistry();
  const agent = registry.find(
    (candidate) => candidate.email === normalizedEmail && candidate.password === normalizedPassword
  );

  if (!agent) {
    return {
      ok: false,
      message: 'Invalid email or password.'
    };
  }

  saveActiveAgent(agent);

  return {
    ok: true,
    agent,
    message: 'Login successful.'
  };
}
