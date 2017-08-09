export interface MicroAppNavMenu {
    readonly label: string;
    readonly icon: string;
    readonly path: string;
    badge?: MicroAppNavBadge;
    readonly items?: MicroAppNavMenuItem[];
}

export interface MicroAppNavMenuItem {
    readonly label: string;
    readonly path: string;
    badge: MicroAppNavBadge;
}

export interface MicroAppNavBadge {
    status: MicroAppNavBadgeStatus;
    count: number;
}

export enum MicroAppNavBadgeStatus {
    info,
    warning,
    error,
    important
}