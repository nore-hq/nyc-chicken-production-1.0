import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Very basic parsing since it's a TS file
// To make it easy, we'll compile the TS file or just run it via ts-node
