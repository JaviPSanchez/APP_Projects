/**
 *
 * Accesible routes for the public visitors, login and logout users
 * No Auth required
 * @type {string[]}
 */
export const publicRoutes = ["/", "/new-verification"];

/**
 *
 * Accesible for authenticated users, logIn users
 * Auth required
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
  "/error",
  "/reset",
  "/new-password",
];

/**
 *
 * Prefix for API authentication routes
 * Routes used for API authentification purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 *
 * Default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";
