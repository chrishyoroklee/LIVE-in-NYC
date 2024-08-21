export type RootStackParamList = {
    home: undefined;
    settings: undefined;
    favorites: undefined;
    details: undefined;
    loadingScreen: undefined;
    event: { venue: string; date: string };
    'venues/blueNote': { selectedDate: string};
    'venues/jazzAtLincolnCenter': { selectedDate: string};
    'venues/mezzrow': { selectedDate: string};
    'venues/stone': { selectedDate: string};
    'venues/villageVanguard': { selectedDate: string};
}


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}