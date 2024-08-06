export interface VkUserData {
    id: string;
    first_name: string;
    last_name: string;
    bdate?: string;
    bdate_visibility?: number;
    country?: string;
    timezone?: number;
    photo_200?: string;
    photo_max_orig?: string;
    sex?: number;
    photo_100?: string;
    photo_base?: string;
    can_access_closed?: boolean;
    is_closed?: boolean;
}