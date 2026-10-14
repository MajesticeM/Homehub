import test from 'node:test';
import assert from 'node:assert/strict';
import { registerAgent, loginAgent, logoutAgent, getActiveAgent } from './agentAuth.js';

const originalLocalStorage = global.localStorage;

function setupStorage() {
  const store = new Map();
  global.localStorage = {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    }
  };
}

test('registerAgent stores an agent profile and returns it', () => {
  setupStorage();

  const result = registerAgent({
    fullName: 'Alice Agent',
    email: 'alice@example.com',
    password: 'secret123',
    agency: 'HomeHub Realty',
    phone: '0812345678'
  });

  assert.equal(result.ok, true);
  assert.equal(result.agent.email, 'alice@example.com');
  assert.equal(result.agent.role, 'agent');
  assert.equal(result.agent.agency, 'HomeHub Realty');
});

test('loginAgent authenticates a registered agent', () => {
  setupStorage();

  registerAgent({
    fullName: 'Bob Broker',
    email: 'bob@example.com',
    password: 'pass456',
    agency: 'Prime Properties',
    phone: '0823456789'
  });

  const result = loginAgent({ email: 'bob@example.com', password: 'pass456' });
  assert.equal(result.ok, true);
  assert.equal(result.agent.name, 'Bob Broker');
  assert.equal(getActiveAgent()?.email, 'bob@example.com');
});

test('loginAgent rejects wrong credentials', () => {
  setupStorage();

  registerAgent({
    fullName: 'Charlie Smith',
    email: 'charlie@example.com',
    password: 'abc123',
    agency: 'City Homes',
    phone: '0834567890'
  });

  const result = loginAgent({ email: 'charlie@example.com', password: 'wrong' });
  assert.equal(result.ok, false);
  assert.equal(result.message, 'Invalid email or password.');
});

test('logoutAgent removes the active session', () => {
  setupStorage();

  registerAgent({
    fullName: 'Dana Broker',
    email: 'dana@example.com',
    password: 'securepass',
    agency: 'North View Realty',
    phone: '0845678901'
  });

  loginAgent({ email: 'dana@example.com', password: 'securepass' });
  logoutAgent();

  assert.equal(getActiveAgent(), null);
});

process.on('exit', () => {
  if (global.localStorage !== originalLocalStorage) {
    global.localStorage = originalLocalStorage;
  }
});
