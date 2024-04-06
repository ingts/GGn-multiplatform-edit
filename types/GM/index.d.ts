/*
Based on https://github.com/vannhi/userscript-typescript-webpack/blob/master/tampermonkey-module.d.ts
*/

declare namespace GMType {
  type RegisterMenuCommandListener = () => void;
  type MenuCommandId = number;
  type StorageValue = string | number | boolean;
  interface NotificationDetails {
    text?: string;
    title?: string;
    image?: string;
    highlight?: boolean;
    silent?: boolean;
    timeout?: number;
    ondone?: NotificationOnDone;
    onclick?: NotificationOnClick;
  }
  interface NotificationThis extends NotificationDetails {
    id: string;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type NotificationOnClick = (this: NotificationThis) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type NotificationOnDone = (this: NotificationThis, clicked: boolean) => any;
  interface XHRDetails<CONTEXT_TYPE> {
    method?: "GET" | "HEAD" | "POST" | "PUT";
    url?: string;
    headers?: { readonly [key: string]: string };
    data?: string;
    binary?: boolean;
    timeout?: number;
    context?: CONTEXT_TYPE;
    responseType?: "arraybuffer" | "blob" | "json";
    overrideMimeType?: string;
    anonymous?: boolean;
    fetch?: boolean;
    username?: string;
    password?: string;

    onload?: Listener<XHRResponse<CONTEXT_TYPE>>;
    onloadstart?: Listener<XHRResponse<CONTEXT_TYPE>>;
    onprogress?: Listener<XHRProgress<CONTEXT_TYPE>>;
    onreadystatechange?: Listener<XHRResponse<CONTEXT_TYPE>>;
    ontimeout?: Listener<XHRProgress<CONTEXT_TYPE>>;
    onabort?: Listener<XHRProgress<CONTEXT_TYPE>>;
    onerror?: Listener<XHRProgress<CONTEXT_TYPE>>;
  }

  interface AbortHandle<RETURN_TYPE> {
    abort(): RETURN_TYPE;
  }
  interface XHRProgress<CONTEXT_TYPE> extends XHRResponse<CONTEXT_TYPE> {
    done: number;
    lengthComputable: boolean;
    loaded: number;
    position: number;
    total: number;
    totalSize: number;
  }

  type Listener<OBJ> = (this: OBJ, event: OBJ) => unknown;

  interface XHRResponse<CONTEXT_TYPE> {
    DONE: 4;
    HEADERS_RECEIVED: 2;
    LOADING: 3;
    OPENED: 1;
    UNSENT: 0;

    context: CONTEXT_TYPE;
    finalUrl: string;
    readyState: 0 | 1 | 2 | 3 | 4;
    responseHeaders: string;
    status: number;
    statusText: string;
    response: unknown;
    responseText: string;
    responseXML: Document | null;
  }
}

interface GM {
  getValue(
    key: string,
    defaultValue: GMType.StorageValue,
  ): Promise<GMType.StorageValue>;
  setValue(key: string, value: GMType.StorageValue): Promise<void>;

  registerMenuCommand(
    caption: string,
    commandFunc: GMType.RegisterMenuCommandListener,
    accessKey?: string,
  ): Promise<GMType.MenuCommandId>;
  unregisterMenuCommand(menuCmdId: GMType.MenuCommandId): Promise<void>;

  addStyle(css: string): Promise<HTMLStyleElement>;

  notification(
    details: GMType.NotificationDetails,
    ondone?: GMType.NotificationOnDone,
  ): Promise<void>;
  notification(
    text: string,
    title: string,
    image?: string,
    onclick?: GMType.NotificationOnDone,
  ): Promise<void>;
  openInTab(url: string): Promise<void>;

  xmlHttpRequest: <CONTEXT_TYPE>(
    details: GMType.XHRDetails<CONTEXT_TYPE>,
  ) => GMType.AbortHandle<void>;
}

declare let GM: GM;
declare let unsafeWindow: Window;
