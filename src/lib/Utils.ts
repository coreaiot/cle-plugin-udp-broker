import { IUtils } from './IUtils';
import { Plugin } from './Plugin';
import { config } from '../config';

export type Utils = IUtils<Plugin, typeof config>;
