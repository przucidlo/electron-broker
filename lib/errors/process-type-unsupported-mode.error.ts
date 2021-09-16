import Mode from '../constants/mode.enum';

export default class ProcessTypeUnsupportedModeError extends Error {
  constructor(mode: Mode | string) {
    super(`${mode} mode is not supported on "${process.type}" process type.`);

    this.name = 'ProcessTypeUnsupportedModeError';

    Object.setPrototypeOf(this, ProcessTypeUnsupportedModeError.prototype);
  }
}
