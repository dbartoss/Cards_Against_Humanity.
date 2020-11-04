
export interface IRoute {
    path: string;
    component: any;
    isProtected?: boolean;
    routes?: IRoute[];
}
