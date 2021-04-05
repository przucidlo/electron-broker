/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata';

import { createParamDecorator } from './create-param-decorator';

export const Data = createParamDecorator((options, eventData) => {
  return eventData.data;
});
