globalThis.global = globalThis

import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { server } from './src/mocks/server';
import { beforeAll, afterAll, afterEach } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'node:util';
globalThis.TextEncoder = TextEncoder
globalThis.import = { meta: { env: { VITE_BACKEND_APP_URL: 'http://localhost:5000' } } };

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
