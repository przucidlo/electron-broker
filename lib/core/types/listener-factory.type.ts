import { ListenerAdapter } from '../client/listener-adapter/listener-adapter.interface';

export type ListenerFactory = () => ListenerAdapter;
