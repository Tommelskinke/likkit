export function generateUsername(profile: any): string {
  // Implementation of generateUsername
  const nameParts = profile.name.givenName.split(' ');
  return nameParts.join('.').toLowerCase();
}

export async function createUniqueUsername(
  baseUsername: string,
  findUserByUsername: (username: string) => Promise<any>,
): Promise<string> {
  // Implementation of createUniqueUsername
  let uniqueUsername = baseUsername;
  let counter = 1;

  while ((await findUserByUsername(uniqueUsername)) !== undefined) {
    uniqueUsername = `${baseUsername}${counter}`;
    counter++;
  }

  return uniqueUsername;
}
