import fs from 'fs';

const USERS_FILE = './data/users.json';

export function login(username, password) {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    const usersData = JSON.parse(data);
    const user = usersData.users.find(u => 
      u.username === username && u.password === password
    );
    
    if (user) {
      return { success: true, role: user.role, username: user.username };
    }
    
    return { success: false, message: 'Invalid credentials' };
  } catch (error) {
    return { success: false, message: 'Error reading users' };
  }
}
