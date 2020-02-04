declare module '*.info' {
    interface Fileinfo {
        [name: string]: string
    }
    const Fileinfo: Fileinfo
    export = Fileinfo
}