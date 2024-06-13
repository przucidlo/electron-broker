import fs from 'fs';

export function findFilePath(
  filename: string,
  path: string,
): string | undefined {
  const paths: string[] = fs.readdirSync(path, {
    recursive: true,
    encoding: 'utf-8',
  });

  return paths.find((path) => path.endsWith(filename));
}
