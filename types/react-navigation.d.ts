export type RootStackParamList = {
    home: undefined;
    settings: undefined;
    favorites: undefined;
    details: undefined;
    loadingScreen: undefined;
    event: { venue: string; date: string };
}


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}