export type RootStackParamList = {
    home: undefined;
    settings: undefined;
    favorites: undefined;
    'venues/blueNote': { selectedDate: string};
    'venues/jazzAtLincolnCenter': { selectedDate: string};
    'venues/mezzrow': { selectedDate: string};
    'venues/smalls': { selectedDate: string};
    'venues/stone': { selectedDate: string};
    'venues/villageVanguard': { selectedDate: string};
}


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}