import { pmCommitMsg } from '../utils/commit-msg.js';
console.log('root hook called');
await pmCommitMsg({ fromRoot: true });
