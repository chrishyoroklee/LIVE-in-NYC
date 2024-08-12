export type RootStackParamList = {
    home: undefined;
    settings: undefined;
    favorites: undefined;
    smalls: undefined;
    'venues/smalls': undefined;
    venue_details: undefined;
}


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}