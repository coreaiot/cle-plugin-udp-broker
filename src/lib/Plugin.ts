import { IPlugin } from "./IPlugins";
import { status } from "../status";

export type Plugin = IPlugin<typeof status>;
