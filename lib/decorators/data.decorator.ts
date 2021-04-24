/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata';
import createParamDecorator from './create-param-decorator';

const Data = createParamDecorator((options, eventData) => {
  return eventData.data;
});

export default Data;
