export type RootStackParamList = {
    Home: undefined;
    Settings: undefined;
    Favorites: undefined;
}


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}