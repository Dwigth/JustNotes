declare function Nanorouter(opts: any): any;
declare namespace Nanorouter {
    let isLocalFile: any;
    let electron: any;
    let protocol: any;
    let domain: any;
    let qs: any;
    let stripElectron: any;
    let prefix: any;
    let normalize: any;
    let suffix: any;

    function constructor(opt: any): void;
    function on(routename: string, listener: any): void;
    function emit(routename: string): any;
    function match(routename: string): any;

    function pathname(routname: any, isElectron: any): any;
}
export = Nanorouter;