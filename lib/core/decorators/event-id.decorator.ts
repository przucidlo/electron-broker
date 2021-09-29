/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata';

import createParamDecorator from './create-param-decorator';

const EventId = createParamDecorator((options, eventData) => {
  return eventData.eventId;
});

export default EventId;
