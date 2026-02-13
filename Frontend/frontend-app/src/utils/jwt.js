// utils/jwt.js
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode

export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getRolesFromToken = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) {
    return [];
  }

  let roles = [];
  // Check for 'roles' claim (array or string)
  if (decoded.roles) {
    if (Array.isArray(decoded.roles)) {
      roles = decoded.roles;
    } else {
      roles.push(decoded.roles);
    }
  }
  // Check for 'role' claim (string)
  if (decoded.role && !roles.includes(decoded.role)) { // Avoid duplicates if 'roles' also existed
    roles.push(decoded.role);
  }

  // Normalize roles (e.g., ensure 'ROLE_ADMIN' vs 'ADMIN' consistency)
  return roles.map(r => r.toUpperCase().replace('ROLE_', '')); // Standardize to ADMIN, USER etc.
};

export const isAdmin = (token) => {
    const roles = getRolesFromToken(token);
    return roles.includes('ADMIN'); // Check for 'ADMIN' in the normalized list
};

export const getUserRole = (token) => {
  const roles = getRolesFromToken(token);
  if (roles.includes('ADMIN')) return 'ROLE_ADMIN'; // Prioritize ADMIN for display if present
  if (roles.length > 0) return 'ROLE_' + roles[0]; // Return the first one if any
  return 'ROLE_USER'; // Default if no specific role found
};
