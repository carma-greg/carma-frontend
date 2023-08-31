export type treesData = {
    treesData: userTrees
}

export type userTrees = {
    legacy_uk: number;
    legacy_offshore: number;
    legacy_uk_co2: number;
    legacy_offshore_co2: number;
    legacy_credit: number;
    veritree_uk: number;
    veritree_offshore: number;
    veritree_uk_co2: number;
    veritree_offshore_co2: number;
    total_uk: number;
    total_offshore: number;
    total_uk_co2: number;
    total_offshore_co2: number;
}

export type editMode = {
    editMode: boolean;
}