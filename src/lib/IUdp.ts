import { RemoteInfo } from "dgram";
import { Observable, Subject } from "rxjs";

export interface IUdp {
  receiver: Subject<IUdpRes>;
  sendStringCmd(sc: IStringCommand, options?: any, address?: string[]): Observable<IUdpResParsed>;
  sendBinaryCmd(bc: IBinaryCommand, mac?: string, address?: string[], options?: ArrayBuffer): Observable<IUdpResParsed>
}

export interface IUdpRes {
  msg: Buffer;
  rinfo: RemoteInfo;
}

export interface IUdpResParsed {
  data: Buffer;
  rinfo: RemoteInfo;
}

export interface IStringCommand {
  cmd: string;
  result: RegExp;
  safe?: boolean;
}

export interface IBinaryCommand {
  cmd: number;
  result: (x: Buffer) => any;
  safe?: boolean;
}
