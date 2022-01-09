export default class PreloadFileError extends Error {
  constructor() {
    super(
      'Missing or incomplete preload file \n. Check the documentation to find out how to setup the preload file.',
    );

    this.name = PreloadFileError.name;

    Object.setPrototypeOf(this, PreloadFileError.prototype);
  }
}
