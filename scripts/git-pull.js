import { execSync } from 'child_process';

try {
  const cwd = '/vercel/share/v0-project';
  
  console.log('Current directory:', cwd);
  
  // Check git status
  try {
    const status = execSync('git status', { cwd }).toString();
    console.log('Git status:', status);
  } catch (e) {
    console.log('Git status error:', e.message);
  }

  // List files
  const files = execSync('ls -la', { cwd }).toString();
  console.log('Files:', files);

  // Try git pull
  try {
    const result = execSync('git pull origin main', { cwd }).toString();
    console.log('Git pull result:', result);
  } catch (e) {
    console.log('Git pull error:', e.message);
  }

  // List files after pull
  const filesAfter = execSync('ls -la', { cwd }).toString();
  console.log('Files after pull:', filesAfter);

  // Check public folder
  try {
    const publicFiles = execSync('find /vercel/share/v0-project/public -type f 2>/dev/null | head -50', { cwd }).toString();
    console.log('Public files:', publicFiles);
  } catch(e) {
    console.log('No public folder yet:', e.message);
  }

} catch (err) {
  console.error('Error:', err.message);
}
